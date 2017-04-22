var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkAuth').authentication;
var findGroupRoom = require('../models/loadFriendListModel').loadGroupList;
var userModel = require('../models/userModel');
global.users = {};  // 用户存储用户信息和用户被分配到的socket

module.exports = function(io) {
    // 用户连接
    io.on('connection', function(socket) {

        // 存储用户信息
        socket.on('loginInfo', function(account) {
            if(!global.users[account]) {
                socket.account = account;           // 将当前账户存入被分配的socket中
                global.users[account] = socket.id;  // 将socket和account关联
            }

            // 查询用户所在群聊房间并加入
            findGroupRoom(account,function(rooms) {
                rooms.forEach(function(room) {
                    socket.join(room.group_id);
                });
            });

        });

        // 用户断开时移除用户信息
        socket.on('disconnect', function() {
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
/***********************************************添加好友******************************************************/
        router.post('/findUser', function(req, res) {
            var account = req.body.account; // 被查找的用户
            userModel.findUser(account, function(user) {
                var user = user || false;
                if(user) {
                    if(req.session.user.account != account) {
                        userModel.checkIsAdd(req.session.user.account, account, function(result) {
                            if(result == 1) {
                                user.type = 0;  // 已添加的好友
                            } else {
                                user.type = 1;  // 未添加的好友
                            }
                            res.send(user);
                        });
                    } else {
                        user.type = 0;
                        res.send(user);
                    }
                } else {
                    res.send(user);
                }
            });
        });

        socket.on('addUser', function(data) {
            var account = socket.request.session.user.account;    // 当前用户
            var addBy_account = data.addAccount;  // 要添加的用户
            // 检查添加请求是否在数据中存在
            userModel.checkRequestIsExist(account, addBy_account, function(result) {
                if(result) {
                    socket.emit('err_addUser', '您已发起过添加请求，请耐心等待对方同意。');
                } else {
                    // 检查用户添加的人是否已向用户发起添加请求，如果是，则提醒用户在消息验证中处理请求
                    userModel.checkRequestIsExist(addBy_account, account, function(result) {
                        if(result) {
                            socket.emit('err_addUser', '您添加的用户已经向您发起添加请求了，请在验证消息中同意请求即可添加为好友');
                        } else {
                            // 将请求存入数据库
                            userModel.addAddFriendInfo(account, addBy_account, function() {
                                socket.emit('success_addUser', '发送添加请求成功');
                                // 如果用户在线，发送请求信息
                                if(users[addBy_account]) {
                                    // 查询该用户未处理的好友请求
                                    userModel.queryUnhadleRequests(addBy_account, function(data) {
                                        // 发送信息给该用户
                                        var socketId = users[addBy_account];
                                        var userSocket = io.sockets.sockets[socketId];
                                        userSocket.emit('addUser', data);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        router.post('/queryUnhandleRequest', function(req, res) {
            var account = req.session.user.account;
            userModel.queryUnhadleRequests(account, function(data) {
                res.send(data);
            });
        });

        // 接受添加请求
        socket.on('acceptAddUser', function(data) {
            var account_friend = data.account;                  // 要添加的账户
            var account = socket.request.session.user.account;  // 当前账户
            // 创建好友关系 相互创建
            userModel.connectUser(account, account_friend, function() {
                // 移除未处理请求
                userModel.removeUnhandleRequest(account_friend, account,function() {
                    socket.emit('acceptAddUser_add', account_friend);   // 发送给添加人
                    if(users[account_friend]) {
                        var accountFriendSocket =  getSocketByAccount(account_friend);
                        accountFriendSocket.emit('acceptAddUser_beAdd', account);   // 发送要添加的账户
                    }

                });
            });

        });

        // 拒绝添加请求

        // 通过账户获取socket
        function getSocketByAccount(account) {
            return io.sockets.sockets[users[account]];
        }
    });

    return router;
};

