var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);

exports.queryFriends = function(account, callback) {
    pool.getConnection(function(err, connection) {
        var sql = " SELECT a.account, a.username, a.avator, b.friend_remark " +
                  " FROM  user a, user_friend b " +
                  " WHERE a.account = b.account_friend " +
                  " AND b.account = ? ";
        var params = [account];
        connection.query(sql, params, function(err, rows) {
            if(err) throw err;
            callback(rows);
            connection.release();
        });
    });
};
