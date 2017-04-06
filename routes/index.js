/*var dbManger = require("../models/dbManger");
module.exports = function(app,db) {

    app.get('/', function (req, res) {
        //res.send();
        //req.session.account = 'admin';
        res.render('index', { title: 'Express' ,account:req.session.account});

    });

    app.post('/login', function (req, res) {
        var data = req.body;
        var user = {
            account : "account",
            password :"password"
        };
        dbManger.login(db,res,data,function (callData) {
                if(callData.count){
                     req.session.user = user;
                     console.log(req.session);
                }

        });
    });

    //登录成功，跳转到聊天页面
    app.get('/chatSystem',authentication,function (req,res) {
        //authentication(req,res);
        res.render('chatSystem', { title: 'chatSystem' });
    });

    app.post('/reg', function (req, res) {
        var data = req.body;
        //dbManger.reg(db,res,data);
        dbManger.reg(db,res,data,function(callData){
            var result = new Object();
            if(callData != 0){
                result.regResult = false;
                res.send(result);
                console.log("不能注册！！！");
            }else{
                //注册
                dbManger.doReg(db,res,data);
                console.log("注册成功！！！！");
            }
        });

    });

    function authentication(req,res,next){
        if(!req.session.user){
            return res.redirect("/");
        }
        next();
    };

};*/

var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkAuth').authentication;

router.get('/', function (req, res) {
    res.render('index', { title: 'Express' ,account:req.session.account});
});

// GET /chatSystem 登录成功,跳转到聊天页面
router.get('/chatSystem', checkLogin, function (req,res) {
    res.render('chatSystem', { title: 'chatSystem' });
});

module.exports = router;