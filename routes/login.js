var express = require('express'),
    router = express.Router(),
    API = require('../models/api.js'),
    crypto = require('crypto'),
    TITLE_LOGIN = '登录';

router.get('/', function(req, res) {
    res.render('login',{title:TITLE_LOGIN });
});

router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        isRem = req.body['chbRem'],
        md5 = crypto.createHash('md5');

    API.getUserByUserName(userName, function (results) {
        if(results == '')
        {
            res.locals.error = '用户不存在';
            res.render('login',{title:TITLE_LOGIN});
            return;
        }

        userPwd = md5.update(userPwd).digest('hex');
        if(results[0]['UserName'] != userName || results[0]['UserPass'] != userPwd)
        {
            res.locals.error = '用户名或密码有误';
            res.render('login',{title:TITLE_LOGIN});
            return;
        }
        else
        {
            if(isRem)
            {
                res.cookie('islogin',{userName:userName,isAdmin:results[0].isAdmin} , { maxAge: 604800000 });
            }

            req.session.islogin = userName;
            req.session.isAdmin = results[0].isAdmin;


            res.redirect('/blog?nav=index');
            return;
        }
    });
});

module.exports = router;