var express = require("express");
var router = express.Router();
var queryFunc = require("../tools/query.js");
var needLoginURL = ["/logout","/notice-list","/notice-regist","notice-edit"];

// msg : message
// result : 에러 or 성공

//API 사용
function API(uri,func){
    router.post(uri,async function(req,res){
        try{
            await func(req,res)
        }catch(err){
            res.send({result:false, msg:err.toString()})
        }
    })
}

API("/api/user-search", async function(req,res){
    if(req.body.user_id){
        let rows = await queryFunc.login(req.body.user_id,req.body.pw)
        if(rows.length >= 1 && rows[0].password === pw){
            res.send({result:rows[0]});
        }
        else {
            res.send({result:false,msg:"세션이 만료되었습니다."})
        }
    }else{
        res.send({result : false});
    }
});

API("/api/login",async function(req,res){
    let rows = await queryFunc.login(req.body._id,req.body._pw)
    if(rows.length === 0){
        res.send({result:false,msg:"해당 유저가 없습니다."});    
    } else {
        res.send({result:rows[0]});
    }
});

API("/api/signup",async function(req,res){
    let rows = await queryFunc.userSearch(req.body._id)
    if(rows.length === 0){
        let rows2 = await queryFunc.signup(req.body._id,req.body._pw,req.body._name)
        if(rows2){
            res.send({result:rows2[0]});
        }
        else {
            res.send({result:false,msg:err});
        }
    } else {
        res.send({result:false,msg:"이미 사용중인 아이디입니다."});
    }   
});

API("/api/room-list",async function(req,res){
    let rows = await queryFunc.roomList();
    if(rows.length !== 0){
        res.send({result:rows});
    } else {
        res.send({result:false,msg:"error"})
    }
});

API("/api/room-create",async function(req,res){
    await queryFunc.roomCreate(rea.body.user_name,req.body.room_name);
    let room = await queryFunc.roomSelect(rea.body.room_name);
    if(room.length !== 0){
        await queryFunc.chatCreate(room[0].id,room[0].name);
        res.send({result:true});
    } else {
        res.send({result:false,msg:"error"})
    }
});

API("/api/into-chat",async function(req,res){
    let row = await queryFunc.chatSelect(req.body.id);
    if(row.length !== 0){
        res.send({result:row[0]});
    } else {
        res.send({result:false, msg:"사라진 채팅방입니다."});
    }
});

API("/api/chat-update",async function(req,res){
    await queryFunc.chatUpdate(req.body.id,req.body.contents);
    res.send({result:true});
});

API("/api/room-delete", async function(req,res){
    await queryFunc.chatDelete(req.body.chat_id);
    await queryFunc.roomDelete(req.body.room_id);
})

module.exports = router;