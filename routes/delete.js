var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/delete', function(req, res) {
    var id = req.body.id;

    if(!/^[a-z0-9]+$/.test(id)) return;

    fs.unlink('data/' + id + '.json', function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
