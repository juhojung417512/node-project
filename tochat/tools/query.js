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
        where
        isOpen = 1
    `)
}

var roomListByName = function(name){
    return _query(`
        select
        *
        from
        room_list
        where
        name in "${name}"
    `)
}

var roomCreate = function(user_id,room_name,isOpen){
    let date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    return _query(`
        insert
        into
        room_list
        (name,owner,isOpen)
        values
        ("${room_name}","${user_id}","${isOpen}")
    `)
}

var roomSelect = function(room_name,user_id){
    return _query(`
        select
        *
        from
        room_list
        where
        name = "${room_name}"
        and
        owner = "${user_id}"
    `)
}

var roomDelete = function(room_id,user_id){
    return _query(`
        delete
        from
        room_list
        where
        id = ${room_id}
        and
        owner = "${user_id}"
    `)
}

var chatCreate = function(user_id,room_name,history){
    return _query(`
        insert
        into
        chat_history
        (user_id,room_name,history)
        values
        ("${user_id}","${room_name}","${history}")
    `)
}

var chatSelectByRoomId = function(roomId){
    return _query(`
        select
        *
        from
        chat_history
        where
        room_id=${roomId}
    `)
}

var chatSelectByUserId = function(userId){
    return _query(`
        select
        user_id,room_name
        from
        chat_history
        where
        userId=${userId}
        group by user_id, room_name
    `)
}

// var chatUpdate = function(chatId,contents){
//     return _query(`
//         update
//         chat_history
//         set
//         history=concat(history,"${contents}")
//         where
//         id=${chatId}
//     `)
// }

var chatDeleteById = function(chatId){
    return _query(`
        delete
        from
        chat_history
        where
        id=${chatId}
    `)
}

var chatDeleteByRoomId = function(roomId){
    return _query(`
        delete
        from
        chat_history
        where
        id=${roomId}
    `)
}

module.exports = {
    userSearch: userSearch,
    login: login,
    signup: signup,
    roomList: roomList,
    roomListByName: roomListByName,
    roomCreate: roomCreate,
    roomSelect: roomSelect,
    chatCreate: chatCreate,
    chatUpdate: chatUpdate,
    chatSelectByUserId: chatSelectByUserId,
    chatSelectByRoomId: chatSelectByRoomId,
    roomDelete: roomDelete,
    chatDeleteById: chatDeleteById,
    chatDeleteByRoomId: chatDeleteByRoomId
};