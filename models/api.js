var sql = require('./mysql.js');
function api(){}
module.exports = api;
//根据用户名得到用户数量
api.getUserNumByName = function (username,callback){
    sql.get("SELECT COUNT(1) AS num FROM userinfo WHERE UserName = ?",[username],function (err,result){
        callback(result)
    })
};
//根据用户名得到用户信息
api.getUserByUserName = function (username, callback) {
    sql.get("SELECT * FROM userinfo WHERE UserName = ?",[username],function (err,result){
        callback(result)
    })
};
//得到用户数量
api.getUserNumber = function (callback){
    sql.get("SELECT COUNT(1) AS num FROM userinfo",function (err,result){
        callback(result)
    })
};
//文章 查询 DESC:新>旧
api.getArticle = function (callback){
    sql.get("SELECT * FROM article ORDER BY id DESC",function (err,result){
        callback(result)
    })
};
//根据tag查询文章
api.getArticleByTag = function (tag,callback){
    sql.get("SELECT * FROM article WHERE tag=? GROUP BY id DESC",[tag],function (err,result){
        callback(result)
    })
};
//根据id 删除文章
api.deleteArticleById = function (id,callback){
    sql.get("delete from article where id=?",[id],function (err,result){
        callback(result)
    })
};
//根据id 查询文章
api.getArticleById = function (id,callback){
    sql.get("SELECT * FROM article WHERE id = ?",[id],function (err,result){
        callback(result)
    })
};
//查询最新 N 篇文章
api.getNewArticle = function (articleNum,callback){
    sql.get("SELECT * FROM article ORDER BY id DESC  LIMIT ?,?",[articleNum.start,articleNum.end],function (err,result){
        callback(result)
    })
};
//查询文章评论数
api.getArticleCommentNumber = function (id,callback){
    sql.get("SELECT COUNT(1) AS num FROM comment WHERE articleid = ?",[id],function (err,result){
        callback(result)
    })
};
//更新评论数量
api.upDataArticleCommentNumber = function (commentnum,callback){
    sql.get("update article set commentnum = ? where id = ?;",[commentnum.num,commentnum.commentId],function (err,result){
        callback(result)
    })
};
//根据文章id查询评论
api.getArticleCommentById = function (id,callback){
    sql.get("SELECT * FROM comment WHERE articleid = ? GROUP BY id DESC",[id],function (err,result){
        callback(result)
    })
};
//根据id 删除评论
api.deleteCommentById = function (id,callback){
    sql.get("delete from comment where id=?",[id],function (err,result){
        callback(result)
    })
};
//根据文章id 删除评论
api.deleteCommentByArticleId = function (id,callback){
    sql.get("delete from comment where articleid =?",[id],function (err,result){
        callback(result)
    })
};