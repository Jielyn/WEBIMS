/**
 * Created by Lin on 2017/3/28.
 */
//模拟dao层

var mysql = require("mysql");

exports.login = function (db,res,data) {
    var loginSql = "SELECT COUNT(1) FROM USER";
    db.query(
        loginSql,
            function (err,rows) {
                if (err) throw err;
                res.end("没有查找到");
            }
    );
};

