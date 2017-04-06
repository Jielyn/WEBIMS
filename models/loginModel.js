var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);

// 登陆
exports.login = function (res,data,callback) {

    pool.getConnection(function(err, connection) {
        var loginSql = "SELECT COUNT(1) FROM USER WHERE " +
            " ACCOUNT = ? && PASSWORD = ?";
        var loginArr = [data.account,data.password];
        connection.query(
            loginSql,
            loginArr,
            function (err,rows,fields) {
                if(err) throw err;
                console.log("查询结果：" + rows[0]["COUNT(1)"]);
                var dbResult = rows[0]["COUNT(1)"];
                var result = new Object();
                if(dbResult == 0){
                    result.count = false;
                }else{ //登录成功
                    result.count = true;
                }
                callback(result);
                res.send(result);
                connection.release();
            }
        );

    });
};