var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var fs = require('fs');

router.post('/add', function(req, res) {
    var hash = crypto.createHash('sha256');
    var email = req.body.email;
    hash.update(email);
    var filename = hash.digest('hex');

    var data = JSON.stringify({email: email});

    fs.writeFile('data/' + filename + '.json', data, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
