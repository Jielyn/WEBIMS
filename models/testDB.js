/**
 * Created by caolei on 2017/3/29.
 */
var mysql = require("mysql");

//连接数据库
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'webims'
});

db.connect();

var sql = /*"INSERT INTO USER(USERNAME,PASSWORD)" +
          " VALUES(?,?)";*/
            "select * from user";
/*var dataArr = ["jiangxin","123456"];*/
//查询
db.query(sql,function (err,rows,fields) {
    if (err) {
        console.log("注册失败");
        return;
    }

    console.log("查询结果" + rows);
    console.log(fields);


//关闭数据库
    db.end();
});


