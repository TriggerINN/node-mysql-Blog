var mysql = require('mysql'),
    connection;
function sql(){}
module.exports = sql;
sql.get = function (sql,variable, callback){
    connection   = mysql.createConnection({
        host     : '',
        user     : '',
        password : '',
        port: '',
        database:''
    });
    connection.connect();
    connection.query(sql,variable, function (err,result){
        callback(err, result);
    });
    connection.end();
};
