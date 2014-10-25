var express = require('express');
var router = express.Router();
var fs = require('fs');

var config = require('../config.json');

/* GET home page. */
router.get('/', function(req, res) {

    fs.readdir('data/', function(err, files) {
        var nodes = [];

        files.forEach(function(a) {
            if(/.json$/.test(a))
                nodes.push(require('../data/' + a));
        });

        res.render('index', { title: 'Masshype', config: config, nodes: nodes });
    });
});

module.exports = router;
