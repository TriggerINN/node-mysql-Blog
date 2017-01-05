var express = require('express'),
    router = express.Router(),
    API = require('../models/api');
var articleData;
router.use(function (req,res,next){
    /*验证权限*/
    if(req.session.isAdmin != "管理员"){
        /*没权限返回错误页面*/
        res.render('admin/err');
        return
    }
    /*有权限往下执行*/
    API.getArticle(function (err,results){
        articleData = results;
        next();
    });
});
router.get('/', function(req, res, next) {
    API.getUserNumber(function (results){
        res.locals.userNumber = results[0]['num'];
        res.render('admin/admin',{title:"后台管理系统" });
    });
});
router.get('/nav', function(req, res, next) {
    API.getNavInfo(function (err,results){
        res.render('admin/nav',{title:"导航管理",nav:results });
    })
});
router.post('/nav', function(req, res, next) {
    var nav = req.body['nav'],
        url = "/blog?nav="+req.body['url'];
    res.render('admin/nav',{title:"导航管理" });
});
router.get('/article', function(req, res, next) {
    API.getArticle(function (results){
        articleData = results;
        res.render('admin/article',{title:"文章管理",data:articleData });
    });
});
router.post('/article', function(req, res, next) {
    var title = req.body['title'],
        content = req.body['content'],
        min = req.body['min'],
        tag = req.body['tag'],
        id = req.body['id'],
        time = new Date().toLocaleString().substring(0,10);
    if(title){
        var newArticle = new ADMINAPI({
            articleTitle: title,
            articleContent: content,
            min:min,
            articleTag: tag,
            time:time
        });
        newArticle.save(function (err,result){
            if (err) {
                return;
            }
        });
    }else if(id){
        API.deleteArticleById(id,function (result){});
        API.deleteCommentByArticleId(id,function (results){});
    }
    API.getArticle(function (results){
        articleData = results;
        res.redirect("article" );
        //res.render('admin/article',{title:"文章管理",data:articleData });
    });
});
/*router.get('/nav', function(req, res, next) {
    res.render('admin/nav',{title:"导航设置" });
});*/

module.exports = router;