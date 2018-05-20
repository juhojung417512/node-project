const mysql = require("mysql");

let dbconfig = require(__dirname+'/../server/config/db-config.json');
let connection = mysql.createConnection(dbconfig);

connection.connect();

function _query(sql,args){
    return new Promise((resolve,reject)=>{
        connection.query(sql,args,function(err,rows){
            if(err)
                return reject(err)
            console.log("ASDASDASD");
            return resolve(rows)
        })
    })
}

var result;
    
var login = function(id, pw){
    return _query(`
        select 
        * 
        from 
        user 
        where 
        user_id="${id}";
        `);
};
/////
var signup = async function(id,pw,name){
    await connection.query("select * from user where user_id=\""+id+"\";",async function(err,rows,fields)
    {
        if(!err && rows.length === 0){
            var insert_dict = {
                "user_id" : id,
                "pw" : pw,
                "name": name,
                "date": new Date().toISOString().slice(0, 19).replace('T', ' ')};
            //db insert
            await connection.query("insert into user set ?",insert_dict,function(err,res){
                return insert_dict;
            });
        }
        else{
            return {
                "err":"db error"
            };
        }
    });
};

var noticeboardList = async function(){
    result = [];
    await connection.query("select * from notice_board",function(err,rows,fields){
        if(!err){
            if(rows.length !== 0){
                for(var i=0;i<rows.length;i++){
                    result.push(rows[i]);
                }
            } else {
                result = null;
            }
        } else {
            result = {
                "err" : "db error"
            };
        }
        return result;
    });
};

var noticeboardSelect = async function(id){
    await connection.query("select * from notice_board where id=\""+id+"\"",function(err,rows,fields){
        if(!err){
            if(rows.length !== 0){
                result = rows[0];
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
        return result;
    });
};

var noticeboardRegist = async function(title,posts,user_id){
    var insert_dict = {
        "title" : title,
        "posts": posts,
        "date": new Date().toISOString().slice(0, 19).replace('T', ' '),
        "owner": user_id
    };
    await connection.query("insert into notice_board set?",insert_dict,function(err,res){
        let result;
        if(!err){
            result = insert_dict;
        } else {
            result = {"err":"db error"};
        }
        return result;
    });
};

var noticeboardEdit = async function(id,title,posts){
    var insert_dict = {
        "title" : title,
        "posts": posts,
        "date": new Date().toISOString().slice(0, 19).replace('T', ' '),
        "id": id
    };
    await connection.query("update notice_board set title=? , posts=? , date=? where id= ?",
                    [insert_dict.title,insert_dict.posts,insert_dict.date,insert_dict.id],function(err,res){
        let result;
        if(!err){
            result = insert_dict;
        } else {
            result = {"err":"db error"}
        }
        return result;
    });
};

module.exports = {
    login: login,
    signup: signup,
    noticeboardList: noticeboardList,
    noticeboardEdit: noticeboardEdit,
    noticeboardRegist: noticeboardRegist,
    noticeboardSelect: noticeboardSelect
};