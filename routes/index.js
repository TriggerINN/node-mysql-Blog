var express = require('express'),
    router = express.Router(),
    api = require('../models/api.js');

router.get('/', function(req, res, next) {
    res.render('index',{title:"无虑Blog" });
});
router.get('/reg', function(req, res, next) {
    res.render('reg',{title:"注册" });
});
router.get('/blog', function(req, res, next) {
    var articleData,
    nav = req.query.nav;
    if(nav == "index"){
        api.getArticle(function (result){
            articleData = result;
            res.render('blog',{title:"无虑Blog | 博客首页" ,articleData:articleData});
        })
    }else{
        api.getArticleByTag(nav,function (result){
            articleData = result;
            res.render('blog',{title:"无虑Blog | 博客首页" ,articleData:articleData});
        })
    }
});
router.get('/logout',function (req,res){
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect("/" );
});
module.exports = router;
