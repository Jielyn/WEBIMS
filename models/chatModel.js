var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);

