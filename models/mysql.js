var mysql = require('mysql'),
    connection;
function sql(){}
module.exports = sql;
sql.get = function (sql,variable, callback){
    connection   = mysql.createConnection({
        host     : 'rds27r2g3eq30zx6bnc41o.mysql.rds.aliyuncs.com',
        user     : 'wulv5',
        password : 'moonseowulv5',
        port: '3306',
        database:'wulv5'
    });
    connection.connect();
    connection.query(sql,variable, function (err,result){
        callback(err, result);
    });
    connection.end();
};
/*改变this指向
* */