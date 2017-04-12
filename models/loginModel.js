var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);

// 登陆
exports.login = function (res,data,callback) {

    pool.getConnection(function(err, connection) {
        var loginSql = "SELECT account,username,avator FROM USER WHERE " +
            " ACCOUNT = ? && PASSWORD = ?";
        var loginArr = [data.account,data.password];
        connection.query(
            loginSql,
            loginArr,
            function (err,rows) {
                if(err) throw err;
                var result = new Object();
                if(rows.length == 0){
                    result.flag = false;
                }else{ //登录成功
                    result.flag = true;
                }
                callback(result,rows);
                res.send(result);
                connection.release();
            }
        );

    });
};