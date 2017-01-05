var express = require('express'),
    router = express.Router(),
    mysql = require('./mysql.js'),
    api = require('./api.js'),
    crypto = require('crypto');
router.post('/user/reg',function (req,res,next){
    var name = req.body['name'],
        pass = req.body['password'],
        md5 = crypto.createHash('md5');
    var userinfo = {
      name : name,
      password : pass
    };
    api.getUserNumByName(userinfo.name,function (result){
        if (result != undefined && result[0]['num'] > 0) {
            res.send("0");
            return
        }
        userinfo.password = md5.update(userinfo.password).digest('hex');
        mysql.get("INSERT INTO userinfo(id,UserName,UserPass) VALUES(0,?,?)",[userinfo.name,userinfo.password],function (err,result){
            if(err){
                res.send("err");
                return
            }else{
                res.send("1")
            }
        });
    });
});
router.post('/admin/article',function (req,res,next){
    var article = {
        title : req.body['title'],
        content : req.body['content'],
        min : req.body['min'],
        tag : req.body['tag'],
        time : new Date().toLocaleString().substring(0,10)
    };
    console.log(article);
    mysql.get("INSERT INTO article(id,title,content,tag,min,time) VALUES(0,?,?,?,?,?)",[article.title,article.content,article.tag,article.min,article.time],function (err,result){
        if(err){ res.send("err"); return }
        res.send(result)
    })
});
router.post('/article',function (req,res,next){
    var comment = {
        commentId : req.body['id'],
        comment : req.body['comment'],
        commentName : req.body['name'] || req.session.islogin || "匿名用户",
        commentEmail : req.body['email'],
        num : req.body['num']
    };
    mysql.get("INSERT INTO comment(id,articleid,comment,commentname,commentemail) VALUES(0,?,?,?,?)",[comment.commentId,comment.comment,comment.commentName,comment.commentEmail],function (err,result){
        if(err){ res.send("err"); return}
        api.upDataArticleCommentNumber(comment,function (result){
            res.send({code:"1",name:comment.commentName});
            return
        })
    })
});
module.exports = router;
