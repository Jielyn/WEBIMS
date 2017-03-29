/**
 * Created by caolei on 2017/3/28.
 */
var http = require("http");
var fs = require("fs");
var join = require("path").join();
var express = require("express");
var mysql = require("mysql");
var routes = require("./routes");
var baseMange = require("./models");
var bodyParser = require("body-parser");

var app = express();

// 设置静态文件目录
app.use(express.static(join(__dirname, 'public')));

//数据库连接
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'webims'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//catch 404 and forward to error handler
app.use(function (req,res,next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});



routes(app,db);

// 监听程序， 启动程序
app.listen(3000, function() {
    console.log('服务器启动并监听3000端口号');
});