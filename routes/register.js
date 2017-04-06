var express = require('express');
var router = express.Router();
var regModel = require('../models/regModel');

router.post('/', function (req, res) {
    var data = req.body;
    regModel.reg(res,data,function(callData){
        var result = new Object();
        if(callData != 0){
            result.regResult = false;
            res.send(result);
            console.log("不能注册！！！");
        }else{
            //注册
            regModel.doReg(res,data);
            console.log("注册成功！！！！");
        }
    });
});

module.exports = router;
