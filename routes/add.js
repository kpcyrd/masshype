var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var fs = require('fs');
var pwgen = require('password-generator');
var CJDNS = require('../cjdns');

function getFileName(email) {
    var hash = crypto.createHash('sha256');
    hash.update(email);
    return hash.digest('hex');
}

var config = JSON.parse(fs.readFileSync(process.env['HOME'] + '/.cjdnsadmin'));

router.post('/add', function(req, res) {
    var email = req.body.email;
    var pw = pwgen(31);

    var filename = getFileName(email);

    var data = JSON.stringify({email: email, password: pw});

    fs.writeFile('data/' + filename + '.json', data, function(err) {
        if(err) {
            console.log(err);
        } else {
            var cjdns = new CJDNS(config);

            cjdns.sendAuth({
                q: 'AuthorizedPasswords_add',
                args: {
                    user: email,
                    password: pw
                }
            }, function(err, data) {
                if(err) throw err;
                res.redirect('/');
            });
        }
    });
});

module.exports = router;
