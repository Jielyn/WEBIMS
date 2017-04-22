var express = require('express');
var router = express.Router();
var loginModel = require('../models/loginModel');

// POST /login 用户登录
router.post('/', function (req, res) {
    var data = req.body;
    var user = {};
    loginModel.login(res,data,function (callData,rows) {
        if(callData.flag){
            user.account = rows[0]['account'];
            user.username = rows[0]['username'];
            user.avator = rows[0]['avator'];
            req.session.user = user;
        }
    });
});

module.exports = router;



