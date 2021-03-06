var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var ejs = require("ejs");

// 创建项目实例
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var sessionMiddleware = session({
    secret: '123456',
    name: 'WEBIMS',
    cookie: {maxAge:null},
    resave: true,
    saveUninitialized: true
});

app.set('port', process.env.PORT || 5000);

//注册html模块引擎
app.engine('html',ejs.__express);

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 定义日志和输出级别
//app.use(logger('dev'));

// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 定义cookie解析器
app.use(cookieParser());

app.use(sessionMiddleware);

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(function (req,res,next) {
    res.locals.user = req.session.user;
    next();
});

// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 加载路由控制
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');                        // 登陆路由
var regRouter = require('./routes/register');                       // 注册路由
var loadFriendListRouter = require('./routes/loadFriendList');      // 加载好友列表路由
var userRouter = require('./routes/user')(io);                      // 通讯
var addFriendsRouter = require('./routes/addFriends');
var addGroupChat = require('./routes/addGroupChat');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/reg', regRouter);
app.use('/loadFriendList', loadFriendListRouter);
app.use('/', userRouter);
app.use('/addFriends', addFriendsRouter);
app.use('/', addGroupChat);

server.listen(app.get('port'), function() {
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

module.exports = app;
