var express = require('express');
var router = express.Router();
var addGroupChatModel = require('../models/addGroupChatModel');

// POST /queryFriends 查询好友用于创建群聊
router.post('/queryFriends', function(req, res) {
    var account = req.body.account;
    addGroupChatModel.queryFriends(account, function(friends) {
        res.send(friends);
    });
});
module.exports = router;