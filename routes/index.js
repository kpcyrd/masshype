var express = require('express');
var router = express.Router();
var fs = require('fs');
var _ = require('underscore');
var CJDNS = require('../cjdns');
var cjdns_config = require('../cjdns-config');

/* GET home page. */
router.get('/', function(req, res) {

    fs.readdir('data/', function(err, files) {
        var nodes = [];

        files.forEach(function(a) {
            if(found = a.match(/([a-z0-9]+).json/)) {
                var config = require('../data/' + a);
                config['file'] = found[1];
                nodes.push(config);
            }
        });

        var cjdns = new CJDNS(cjdns_config);

        cjdns.sendAuth({
            q: 'AuthorizedPasswords_list',
        }, function(err, data) {
            if(err) throw err;

            var missing = nodes.slice(0);
            data['users'].forEach(function(x) {
                missing = _.without(missing, x);
            });

            missing.forEach(function(x) {
                cjdns.sendAuth({
                    q: 'AuthorizedPasswords_add',
                    args: {
                        user: x.email,
                        password: x.password
                    }
                }, function(err, data) {
                    if(err) throw err;
                });
            });

            res.render('index', { title: 'Masshype', nodes: nodes, csrfToken: req.csrfToken() });
        });
    });
});

module.exports = router;
