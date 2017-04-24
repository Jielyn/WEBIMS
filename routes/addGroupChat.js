var express = require('express');
var router = express.Router();
var addGroupChatModel = require('../models/addGroupChatModel');

/*// POST /queryFriends 查询好友用于创建群聊
router.post('/queryFriends', function(req, res) {
    var account = req.body.account;
    addGroupChatModel.queryFriends(account, function(friends) {
        res.send(friends);
    });
});

// POST /createGroupChat 查询好友用于创建群聊
router.post('/createGroupChat', function(req, res) {
    var account = req.body['account'];
    var friends = req.body['friends[]'];
    addGroupChatModel.createGroupChat(account, friends, function() {
        res.send();
    });
});*/

module.exports = router;