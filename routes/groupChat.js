var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkAuth').authentication;
global.users = {};  // 用户存储用户信息和用户被分配到的socket

module.exports = function(io) {
    // 用户连接
    io.on('connection', function(socket) {

        // 加入群聊房间
        socket.join('groupChat_1');

        // 存储用户信息
        socket.on('loginInfo', function(account) {
            if(!global.users[account]) {
                socket.account = account;           // 将当前账户存入被分配的socket中
                global.users[account] = socket.id;  // 将socket和account关联
                console.log(account+'的信息存储成功');
            } else {
                console.log(account+'的信息存储失败，当前账号已存在');
            }
        });

        // 用户断开时移除用户信息
        socket.on('disconnect', function() {
            console.log(socket.account+'已下线');
            delete users[socket.account];
            // 移除session
        });

        router.post('/groupChat', checkLogin, function(req, res) {
            res.send();
        });

        socket.on('groupChat', function(data) {
            socket.broadcast.to(data.groupRoom).emit('groupChat', {sendUserAccount: socket.account, groupRoom: data.groupRoom, msg: data.msg});
        });

        socket.on('sendTo', function(data) {
            if(users[data.account]) {
                // 发送在线消息
                var socketId = users[data.account];
                var receiveSocket = io.sockets.sockets[socketId];
                receiveSocket.emit('sendTo', {sendUserAccount: socket.account ,msg:data.msg});
                // 发送后将消息记录保存到数据库

                //...
            } else {
                // 发送离线消息
                console.log('发送离线消息');
            }

        });
    });

    return router;
};