var mysql = require('mysql');
var dbconfig = require('../config/dbconfig');

// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);

// 根据用户名查询用户信息
exports.findUser = function(account, callback) {
    pool.getConnection(function(err, connection) {
        var sql = " SELECT account, username, avator " +
                  " FROM USER " +
                  " WHERE account = ?";
        var params = [account];
        connection.query(sql,params,function(err, rows) {
            if(err) throw err;
            callback(rows[0]);
            connection.release();
        });
    });
};

// 查询用户是否存在已被添加的情况
exports.checkIsAdd = function(currentAccount, account, callback) {
    pool.getConnection(function(err, connection) {
        var sql = " SELECT COUNT(1) " +
                  " FROM user_friend " +
                  " WHERE account = ? " +
                  " AND account_friend = ? ";
        var params = [currentAccount, account];
        connection.query(sql,params,function(err, rows) {
            if(err) throw err;
            callback(rows[0]["COUNT(1)"]);
            connection.release();
        });
    });
};

// 将添加好友请求存入数据库
exports.addAddFriendInfo = function(account, addBy_account, callback) {
    pool.getConnection(function(err, connection) {
        var sql = " INSERT INTO unhandlerequest " +
                  " VALUES(?, ?)";
        var params = [account, addBy_account];
        connection.query(sql, params, function(err) {
            if(err) throw err;
            callback();
            connection.release();
        });
    });
};

// 查询请求是否已经在数据库中存在
exports.checkRequestIsExist = function(account, addBy_account, callback) {
    pool.getConnection(function(err, connection) {
        var sql = " SELECT COUNT(1) " +
                  " FROM unhandlerequest " +
                  " WHERE account = ? " +
                  " AND addBy_account = ? ";
        var params = [account, addBy_account];
        connection.query(sql, params, function(err, rows) {
            if(err) throw err;
            callback(rows[0]['COUNT(1)']);
            connection.release();
        });
    });
};

// 查询未处理的请求
exports.queryUnhadleRequests = function(addBy_account, callback) {
    pool.getConnection(function(err, connection) {
        var sql = " SELECT a.account, a.addBy_account, b.username, b.avator " +
                  " FROM unhandlerequest a, user b " +
                  " WHERE a.account = b.account " +
                  " AND a.addBy_account = ? ";
        var params = [addBy_account];
        connection.query(sql, params, function(err, rows) {
            if(err) throw err;
            callback(rows);
            connection.release();
        });
    });
};

// 移除未处理的请求
exports.removeUnhandleRequest = function(account_friend, account, callback) {
    pool.getConnection(function(err, connection) {
        var sql = "DELETE FROM unhandlerequest WHERE account = ? AND addBy_account = ?";
        var params = [account_friend, account];
        connection.query(sql, params, function(err) {
            if(err) throw err;
            callback();
            connection.release();
        });
    });
};
// 添加好友关系
exports.connectUser = function(account, account_friend, callback) {
    pool.getConnection(function(err, connection) {
        var sql = "INSERT INTO user_friend(account, account_friend) VALUES(?, ?)";
        var params = [account, account_friend];
        var params1 = [account_friend, account];
        connection.query(sql, params, function(err) {
            if(err) throw err;
            connection.query(sql, params1, function(err) {
                if(err) throw err;
            });
            callback();
            connection.release();
        });
    });
};