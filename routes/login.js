var express = require('express');
var router = express.Router();
var loginModel = require('../models/loginModel');

// POST /login 用户登录
router.post('/', function (req, res) {
    var data = req.body;
    var user = {
        account : "account",
        password :"password"
    };
    loginModel.login(res,data,function (callData) {
        if(callData.flag){
            req.session.user = user;
        }
    });
});




module.exports = router;



