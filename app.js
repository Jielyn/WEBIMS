var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var mysql = require("mysql");

/*var index = require('./routes/index');
var users = require('./routes/users');*/

// 加载路由控制
var routes = require('./routes/index');

// 创建项目实例
var app = express();

//创建数据库连接
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'webims'
});

db.connect();
// view engine setup
app.set('port', process.env.PORT || 5000);

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());

app.use(session({
    secret:'123456',
    name:'testapp',
    cookie:{maxAge:80000},
    resave:false,
       saveUninitialized:true
}));
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

/*app.use('/', index);
app.use('/users', users);*/

routes(app,db);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

// 404错误处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

//输出模型
module.exports = app;
