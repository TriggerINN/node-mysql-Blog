var express = require('express'),
    router = express.Router(),
    API = require('../models/api.js');

var articleContent,
    article,
    articleId,
    articleComment,
    newarticle = {
        start:0,
        end:5
    };
router.get('/', function(req, res, next) {
    articleId = req.query.article;
    API.getArticleById(articleId,function (results){
        articleContent = results[0];
        API.getNewArticle(newarticle,function (results){
            article = results;
            API.getArticleCommentById(articleId,function (results){
                articleComment = results;
                res.render('article',{title:"文章详情 | 无虑Blog",articleContent:articleContent,article:article,articleComment:articleComment });
            });
        });
    });
});
router.post('/',function (req,res){
    var commentid = req.body['id'];
    var num =  articleContent.commentnum;
    console.log(articleContent.commentnum);
    var number = parseInt(num)-1;
    var id = articleContent['id'];
    console.log(number);
    console.log(commentid);
    API.deleteCommentById(commentid,function (err,result){
        API.getArticleCommentById(articleId,function (results){
            API.upDataArticleCommentNumber({commentId:id,num:number},function (result){});
            articleComment = results;
            API.getArticleById(articleId,function (results){
                articleContent = results[0];
                res.render('article',{title:"文章详情 | 无虑Blog",articleContent:articleContent,article:article,articleComment:articleComment });
            });
        });
    })
});
module.exports = router;