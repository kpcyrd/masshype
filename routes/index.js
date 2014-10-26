var express = require('express');
var router = express.Router();
var fs = require('fs');

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

        res.render('index', { title: 'Masshype', nodes: nodes, csrfToken: req.csrfToken() });
    });
});

module.exports = router;
