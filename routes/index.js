var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checkAuth').authentication;
var checkNotLogin = require("../middlewares/checkAuth").checkUser;

router.get('/',checkNotLogin,function (req, res) {
    res.render('index', { title: 'Express' ,account:req.session.account});
});

// GET /chatSystem 登录成功,跳转到聊天页面
router.get('/chatSystem', checkLogin, function (req,res) {
    res.render('chatSystem', { title: 'chatSystem' });
});

module.exports = router;