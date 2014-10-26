var express = require('express');
var router = express.Router();
var fs = require('fs');

var config = require('../config.json');

router.get('/:id([a-z0-9]+)', function(req, res) {
    var id = req.url.slice(1);
    fs.readFile('data/' + id + '.json', function(err, data) {
        if(err) throw err;
        var node = JSON.parse(data);

        var constr = {};
        constr[config['addr']] = {
            "password": node.password,
            "publicKey": config.publicKey
        };

        node['constr'] = JSON.stringify(constr).slice(1);
        res.render('show', { title: 'Masshype', config: config, node: node });
    });
});

module.exports = router;

