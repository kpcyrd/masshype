var express = require('express');
var router = express.Router();
var fs = require('fs');
var CJDNS = require('../cjdns');
var cjdns_config = require('../cjdns-config');

router.post('/delete', function(req, res) {
    var id = req.body.id;

    if(!/^[a-z0-9]+$/.test(id)) return;

    var config = require('../data/' + id);

    console.log(config);

    fs.unlink('data/' + id + '.json', function(err) {
        if(err) {
            console.log(err);
        } else {
            var cjdns = new CJDNS(cjdns_config);

            cjdns.sendAuth({
                q: 'AuthorizedPasswords_remove',
                args: {
                    user: config.email
                }
            }, function(err, data) {
                if(err) throw err;
                res.redirect('/');
            });
        }
    });
});

module.exports = router;
