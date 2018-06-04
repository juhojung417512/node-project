var express = require("express");
var router = express.Router();
var queryFunc = require("../tools/query.js");
var needLoginURL = ["/logout", "/notice-list", "/notice-regist", "notice-edit"];

// msg : message
// result : 에러 or 성공

//API 사용
function API(uri, func) {
    router.post(uri, async function (req, res) {
        try {
            await func(req, res);
        } catch (err) {
            res.send({ result: false, msg: err.toString() });
        }
    });
}

API("/api/user-search", async function (req, res) {
    if (req.body.user_id) {
        let rows = await queryFunc.login(req.body.user_id, req.body.pw);
        if (rows.length >= 1 && rows[0].password === pw) {
            res.send({ result: rows[0] });
        } else {
            res.send({ result: false, msg: "세션이 만료되었습니다." });
        }
    } else {
        res.send({ result: false });
    }
});

API("/api/login", async function (req, res) {
    let rows = await queryFunc.login(req.body._id, req.body._pw);
    if (rows.length === 0) {
        res.send({result:false, msg:"아이디 혹은 비밀번호가 올바르지 않습니다."});
    } else {
        res.send({ result: rows[0] });
    }
});

API("/api/signup", async function (req, res) {
    let rows = await queryFunc.userSearch(req.body._id);
    if (rows.length === 0) {
        let rows2 = await queryFunc.signup(req.body._id, req.body._pw, req.body._name);
        if (rows2) {
            res.send({ result: rows2[0] });
        } else {
            res.send({ result: false, msg: err });
        }
    } else {
        res.send({ result: false, msg: "이미 사용중인 아이디입니다." });
    }
});

API("/api/room-list/mine", async function (req, res) {
    let rows = await queryFunc.chatSelectByUserId(req.body.user_id);
    if(rows.length !== 0){
        let room_name = [];
        for(var i = 0;i<rows.length;i++){
            room_name.push("\""+rows[i].room_name+"\"");
        }
        let rooms = await queryFunc.roomListByName(room_name);
        if (rooms.length !== 0) {
            res.send({ result: rooms });
        } else {
            res.send({ result: []});
        }
    }
});

API("/api/room-list/open", async function (req, res) {
    let rows = await queryFunc.roomList(req.body.user_id);
    if (rows.length !== 0) {
        res.send({ result: rows });
    } else {
        res.send({ result: []});
    }
});

API("/api/room-create", async function (req, res) {
    let row = await queryFunc.roomCreate(rea.body.user_id, req.body.room_name, req.body.isOpen);
    if (row) {
        res.send({ result: true });
    } else {
        res.send({ result: false, msg: "error" });
    }
});

API("/api/into-chat", async function (req, res) {
    if(req.body.isFirst){
        await queryFunc.chatCreate(req.body.user_id,req.body.user_name,req.body.room_name,"Enter");
    }
    let rows = await queryFunc.chatSelectByRoomName(req.body.room_name);
    if(rows.length !== 0){
        res.send({result: rows});
    } else {
        res.send({ result: false, msg: "이전 대화내용이 없습니다." });
    }
    
});

API("/api/chat-insert", async function (req, res) {
    let rows = await queryFunc.chatCreate(req.body.user_id,req.body.user_name,req.body.room_name,req.body.history);
    if (rows.length !== 0) {
        res.send({ result: true });
    } else {
        res.send({ result: false, msg: "채팅 전송 불가" });
    }
});

API("/api/room-delete", async function (req, res) {
    await queryFunc.chatDeleteByRoomId(req.body.room_id);
    await queryFunc.roomDelete(req.body.room_id);
});

API("/api/chat-delete", async function (req, res) {
    await queryFunc.chatDeleteById(req.body.chat_id);
});

module.exports = router;