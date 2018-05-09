var mysql = require("mysql");
//db
var connection = mysql.createConnection({
    host: "54.250.2.129",
    user: "root",
    password: "ubuntu",
    port: 3306,
    database: "test_db",
    datestrings: "date"
});
connection.connect();
//connection.end();
var result;
var login = function(id, pw, callback){
    connection.query("select * from user where user_id=\""+id+"\";",function(err,rows,fields){
        if(!err && rows.length >= 1){
            if(rows[0].pw == pw){
                result = {
                    "id" : id,
                    "pw" : pw,
                    "name" : rows[0].name,
                    "date" : rows[0].date
                };
            } else {
                result = {
                    "err":"error : 패스워드가 잘못되었습니다."
                };
            }
        } else {
            result = {
                "err":"error : 해당 유저가 없습니다."
            };
        }
        callback(result);
    });
};

var signup = function(id,pw,name,callback){
    connection.query("select * from user where user_id=\""+id+"\";",function(err,rows,fields)
    {
        if(!err && rows.length == 0){
            var insert_dict = {
                "user_id" : id,
                "pw" : pw,
                "name": name,
                "date": new Date().toISOString().slice(0, 19).replace('T', ' ')};
            //db insert
            connection.query("insert into user set ?",insert_dict,function(err,res){
                callback(insert_dict);
            });
        }
        else{
            result = {
                "err":"db error"
            };
            callback(result);
        }
    });
};

var noticeboardList = function(callback){
    result = [];
    connection.query("select * from notice_board",function(err,rows,fields){
        if(!err){
            if(rows.length != 0){
                for(var i=0;i<rows.length;i++){
                    result.push(rows[i]);
                    console.log(rows[i].title);
                }
                callback(result);
            } else {
                result = null;
                callback(result);
            }
        } else {
            result = {
                "err" : "db error"
            };
            callback(result);
        }
    });
};

var noticeboardSelect = function(id,user_id,callback){
    connection.query("select * from notice_board where id="+id + "and owner = \"" + user_id + "\"",function(err,rows,fields){
        if(!err){
            if(rows.length != 0){

            } else {
                result = {
                    "err" : "해당하는 게시물이 없습니다."
                };
            }
        } else {
            result = {
                "err" : "db error"
            };
        }
    });
};

var noticeboardRegist = function(title,posts,user_id,callback){
    var insert_dict = {
        "title" : title,
        "posts": posts,
        "date": new Date().toISOString().slice(0, 19).replace('T', ' '),
        "owner": user_id
    };
    connection.query("insert into notice_board set?",insert_dict,function(err,res){
        if(!err){
            callback(insert_dict);
        } else {
            callback({"err":"db error"});
        }
    });
};

module.exports = {
    login: login,
    signup: signup,
    noticeboardList: noticeboardList,
    noticeboardRegist: noticeboardRegist,
    noticeboardSelect: noticeboardSelect
};