const mysql = require("mysql");

let dbconfig = require(__dirname+'/../server/config/db-config.json');
let connection = mysql.createConnection(dbconfig);

connection.connect();

function _query(sql,args){
    return new Promise((resolve,reject)=>{
        connection.query(sql,args,function(err,rows){
            if(err)
                return reject(err)
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
        user_id="${id}"
        and
        pw="${pw}"
        `);
};

var userSearch = function(id){
    return _query(`
    select 
    * 
    from 
    user 
    where 
    user_id="${id}"
    `);
}

var signup = function(id,pw,name){
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return _query(`
        insert
        into
        user
        (user_id,pw,name,date)
        values
        ("${id}","${pw}","${name}","${date}")
    `);
};

var noticeboardList = async function(){
    return _query(`
        select 
        *
        from
        notice_board
    `);
};

var noticeboardSelect = async function(id){
    return _query(`
        select
        *
        from
        notice_board
        where
        id= "${id}"
    `)
};

var noticeboardRegist = async function(title,posts,user_id){
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return _query(`
        insert
        into
        notice_board
        (title,posts,date,owner)
        values
        ("${title}","${posts}","${date}","${user_id}")
    `)
};

var noticeboardEdit = async function(id,title,posts){
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return _query(`
        update
        notice_board
        set
        title="${title}",
        posts="${posts}",
        date="${date}"
        where
        id=${id}
    `)
};

module.exports = {
    userSearch: userSearch,
    login: login,
    signup: signup,
    noticeboardList: noticeboardList,
    noticeboardEdit: noticeboardEdit,
    noticeboardRegist: noticeboardRegist,
    noticeboardSelect: noticeboardSelect
};