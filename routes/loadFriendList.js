var express = require('express');
var router = express.Router();
var loadFriendListModel = require('../models/loadFriendListModel');

// POST /loadFriendList 查询好友信息
router.post('/', function(req, res) {
    var account = req.body.account;
    loadFriendListModel.loadFriendList(res, account, function(friends) {
        res.send(friends);
    });
});

module.exports = router;