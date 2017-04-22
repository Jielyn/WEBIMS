var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel');

router.post('/findUser', function(req, res) {
    var account = req.body.account;
    userModel.findUser(res, account, function(user) {
        //res.send(user || false);
    });
});

module.exports = router;