var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);

// 注册前查询
exports.reg = function (res,data,callback) {
    pool.getConnection(function(err, connection) {
        var queryAccount = "SELECT COUNT(1) FROM USER WHERE ACCOUNT = ?";
        var queryArr = [data.account] ;
        connection.query(queryAccount,queryArr,function (err,rows) {
            if(err) throw err;
            var dbResult = rows[0]["COUNT(1)"];
            console.log(dbResult + ":账号查询结果" );
            callback(dbResult);
            connection.release();
        });
    });
};

// 注册
exports.doReg = function (res,data) {
    pool.getConnection(function(err, connection) {
        var regSql = "INSERT INTO USER(ACCOUNT,USERNAME,PASSWORD)" +
            " VALUES(?,?,?)";
        var paramsArr = [data.account,data.username,data.password];
        connection.query(regSql,paramsArr,function (err) {
            var result = new Object();
            result.regResult = false;
            if(err) throw err;
            result.regResult = true;
            res.send(result);
            connection.release();
        });
    });
};