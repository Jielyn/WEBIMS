/*
* 操作数据库
* */
var mysql = require('mysql');

exports.login = function (db,res,data) {
    var loginSql = "SELECT COUNT(1) FROM USER WHERE " +
                   " ACCOUNT = ? && PASSWORD = ?";

    console.log(data);
    var loginArr = [data.account,data.password];

    //查询
    db.query(
        loginSql,
        loginArr,
        function (err,rows,fields) {
            if(err) throw err;
           /* if(err){
                console.log(err);
                res.status(404);
                res.send("查询失败");
            }*/
            console.log("查询结果：" + rows[0]["COUNT(1)"]);
            var dbResult = rows[0]["COUNT(1)"];
            var result = new Object();

            if(dbResult == 0){
                result.count = false;
            }else{
                result.count = true;
            }

            res.send(result);
            //res.end("success");
        }
    );


    //关闭连接
    //db.end();
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