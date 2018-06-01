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
        password="${pw}"
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
        (user_id,password,name,date)
        values
        ("${id}","${pw}","${name}","${date}")
    `);
};

var roomList = function(){
    return _query(`
        select
        *
        from
        room_list
    `)
}

var roomCreate = function(user_name,room_name){
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return _query(`
        insert
        into
        room_list
        (name,owner)
        values
        ("${room_name}","${user_name}")
    `)
}

var roomSelect = function(room_name){
    return _query(`
        select
        *
        from
        room_list
        where
        name = "${room_name}"
    `)
}

var roomDelete = function(room_id){
    return _query(`
        delete
        from
        room_list
        where
        id = ${room_id}
    `)
}

var chatCreate = function(room_id,room_name){
    return _query(`
        insert
        into
        chat_history
        (room_id,room_name)
        values
        ("${room_id}","${room_name}")
    `)
}

var chatSelect = function(roomId){
    return _query(`
        select
        *
        from
        chat_history
        where
        room_id=${roomId}
    `)
}
var chatUpdate = function(chatId,contents){
    return _query(`
        update
        chat_history
        set
        history=concat(history,"${contents}")
        where
        id=${chatId}
    `)
}

var chatDelete = function(chatId){
    return _query(`
        delete
        from
        chat_history
        where
        id=${chatId}
    `)
}

module.exports = {
    userSearch: userSearch,
    login: login,
    signup: signup,
    roomList: roomList,
    roomCreate: roomCreate,
    roomSelect: roomSelect,
    chatCreate: chatCreate,
    chatUpdate: chatUpdate,
    chatSelect: chatSelect,
    roomDelete: roomDelete,
    chatDelete: chatDelete
};