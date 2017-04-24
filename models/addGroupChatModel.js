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

exports.createGroupChat = function(account, friends, callback) {
    pool.getConnection(function(err, connection) {
        var sql1 = " INSERT INTO group_info (group_name) SELECT " +
                   " (CONCAT((SELECT username FROM USER WHERE account = ?),'的群聊')) ";
        var params1 = [account];
        connection.query(sql1, params1, function(err, rows) {
            if(err) {
                connection.rollback(function() {
                    throw err;
                });
            }
            var group_id = rows.insertId;
            var params2 = [];
            friends.forEach(function(friend) {
                params2.push([friend, group_id]);
            });
            console.log(params2);
            var sql2 = " INSERT INTO user_group (account, group_id) VALUES ?";
            connection.query(sql2, [params2], function(err) {
                if(err) {
                    connection.rollback(function() {
                        throw err;
                    });
                }
                callback();
                connection.release();
            });
        });
    });
}
