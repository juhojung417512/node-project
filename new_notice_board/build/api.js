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
    console.log(req.session);
    if (req.session.user_id) {
        console.log(req.session.user_id);
        let rows = await queryFunc.login(req.session.user_id, req.session.pw);
        if (rows.length >= 1 && rows[0].pw === pw) {
            res.send({ result: rows[0] });
        } else {
            res.send({ result: false, msg: "세션이 만료되었습니다." });
        }
    } else {
        res.send("failed");
    }
});

API("/api/login", async function (req, res) {
    let rows = await queryFunc.login(req.body._id, req.body._pw);
    if (rows.length === 0) {
        res.send({ result: false, msg: "해당 유저가 없습니다." });
    } else {
        req.session.user_id = rows[0].user_id;
        req.session.pw = rows[0].pw;
        req.session.name = rows[0].name;
        res.send({ result: rows[0] });
    }
});

API("/api/signup", async function (req, res) {
    let rows = await queryFunc.userSearch(req.body._id);
    if (rows.length === 0) {
        let rows2 = await queryFunc.signup(req.body._id, req.body._pw, req.body._name);
        if (rows2) {
            req.session.user_id = rows2[0].user_id;
            req.session.pw = rows2[0].pw;
            req.session.name = rows2[0].name;
            res.send({ result: rows2[0] });
        } else {
            res.send({ result: false, msg: err });
        }
    } else {
        res.send({ result: false, msg: "이미 사용중인 아이디입니다." });
    }
});

API("/api/logout", function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.send({ result: false });
        } else {
            res.send({ result: true });
        }
    });
});

API("/api/notice-list", async function (req, res) {
    let rows = await queryFunc.noticeboardList().then(rows => {
        res.send({ result: rows });
    }, err => {
        res.send({ result: false, msg: err });
    });
});

API("/api/notice-edit-info/", async function (req, res) {
    await queryFunc.noticeboardSelect(req.body._id).then(rows => {
        res.send({ result: rows[0] });
    }, err => {
        res.send({ result: false, msg: err });
    });
});

API("/api/notice-regist", async function (req, res) {
    await queryFunc.noticeboardRegist(req.body.title, req.body.posts, req.body.user_id).then(rows => {
        res.send({ result: rows[0], msg: "등록하였습니다." });
    }, err => {
        res.send({ result: false, msg: err });
    });
});

API("/api/notice-edit", async function (req, res) {
    await queryFunc.noticeboardEdit(req.body.id, req.body.title, req.body.posts).then(rows => {
        res.send({ result: rows[0], msg: "수정하였습니다." });
    }, err => {
        res.send({ result: false, msg: err });
    });
});

module.exports = router;