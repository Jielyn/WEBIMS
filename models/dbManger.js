/*
* 操作数据库
* */
var mysql = require('mysql');

exports.login = function (db,res,data,callback) {
    var loginSql = "SELECT account,username,avator FROM USER WHERE " +
                   " ACCOUNT = ? && PASSWORD = ?";

    var loginArr = [data.account,data.password];

    //查询
    db.query(
        loginSql,
        loginArr,
        function (err,rows,fields) {
            if(err) throw err;
            console.log("查询结果：" + rows[0]["username"]);
            var result = new Object();
            if(rows.length == 0){
                result.flag = false;
            }else{ //登录成功
                result.flag = true;
            }
            callback(result,rows);
            res.send(result);
        }
    );
};

exports.reg = function (db,res,data,callback) {
    var queryAccount = "SELECT COUNT(1) FROM USER WHERE ACCOUNT = ?";
    var queryArr = [data.account] ;
    db.query(queryAccount,queryArr,function (err,rows,fields) {
        if(err) throw err;
        var dbResult = rows[0]["COUNT(1)"];
        console.log(dbResult + ":账号查询结果" );
        callback(dbResult);
    });

};

exports.doReg = function (db,res,data) {
    //注册
    var regSql = "INSERT INTO USER(ACCOUNT,USERNAME,PASSWORD)" +
        " VALUES(?,?,?)";
    var paramsArr = [data.account,data.username,data.password];
    db.query(regSql,paramsArr,function (err,rows,fields) {
        var result = new Object();
        result.regResult = false;
        if(err) {
            //result = false;
            return;
        };
        console.log("做注册操作");
        result.regResult = true;
        res.send(result);
    });
};