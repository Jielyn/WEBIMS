var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);

// 查询所有好友信息
exports.loadFriendList = function(res, account, callback) {
    pool.getConnection(function(err, connection) {
        var sql = " SELECT a.account, a.username, a.avator, b.friend_remark, b.type " +
            " FROM user a, user_friend b " +
            " WHERE a.account = b.account_friend " +
            " AND b.account = ? " +
            " UNION " +
            " SELECT c.group_id, d.group_name, '', '', c.type" +
            " FROM user_group c, group_info d " +
            " WHERE c.group_id = d.group_id" +
            " AND c.account = ? ";
        var arr = [account, account];
        connection.query(sql, arr, function(err, rows) {
            if(err) throw err;
            callback(rows);
            connection.release();
        });
    });
};

// 查询所有群组信息

exports.loadGroupList = function() {

};