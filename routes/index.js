/*var express = require('express');
var router = express.Router();*/

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/
var dbManger = require("../models/dbManger");
module.exports = function(app,db) {
   /* app.all("*",function (req,res,next) {
        //设置响应头属性值 next();
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });

    });*/

    app.get('/', function (req, res) {
        //res.send();
        req.session.account = 'admin';
        res.render('index', { title: 'Express' ,account:req.session.account});

    });
    //登录成功，跳转到聊天页面
    app.get('/chatSystem',function (req,res) {
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

    app.post('/login', function (req, res) {
        //console.log("根据param方法取参：" + req.param("username")　+ req.param("password"));
        var data = req.body;
        dbManger.login(db,res,data);
    });
};
