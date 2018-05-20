var express = require("express");
var router = express.Router();
var queryFunc = require("../tools/query.js");
var needLoginURL = ["/logout","/notice-list","/notice-regist","notice-edit"];

// message : info 넘기는것
// result : 에러 or 성공
router.get("/",function(req,res){
    if(req.session.user_id){
        async () => {
            await queryFunc.login(req.session.user_id,req.session.pw).then((rows) => {
                if(rows.length >= 1 && rows[0].pw === pw){
                    res.send({result:rows[0]});
                }
                else {
                    res.send({result:false,msg:"세션이 만료되었습니다."})
                }
            }).catch((err) => {
                res.send({result:false,msg:"DB ERROR"});
            });
        }
    }
});

router.post("/login",function(req,res){
    async () =>{
        await queryFunc.login(req.body._id,req.body._pw).then((rows)=>{
            req.session.user_id = rows[0].id;
            req.session.pw = rows[0].pw;
            req.session.name = rows[0].name;
            res.send({result:rows[0]});
        }).catch((err)=>{
            res.send({result:false,msg:err});
        });
    }
});

router.post("/signup",function(req,res){
    async () =>{
        await queryFunc.signup(req.body._id,req.body._pw,req.body._name).then((rows)=>{
            req.session.user_id = rows[0].id;
            req.session.pw = rows[0].pw;
            req.session.name = rows[0].name;
            res.send({result:rows[0]});
        }).catch((err) =>{
            res.send({result:false,msg:err});
        });
    }
});

router.get("/logout",function(req,res){
    req.session.destroy(function(err){
        if(err){
            res.send({result:false});
        } else {
            res.send({result:true});
        }
    });
});

router.get("/notice-list",function(req,res){
    async () => { 
        await queryFunc.noticeboardList().then((rows)=>{
            res.send({result:rows})
        }).catch((err)=>{
            res.send({result:false,msg:err});
        });
    }
});

router.get("/notice-edit/:id",function(req,res){
    async () => {
        await queryFunc.noticeboardSelect(req.params.id).then((rows)=>{
            res.send({result:rows[0]})
        }).catch((err)=>{
            res.send({result:false,msg:err})
        })
    }
});

router.post("/notice-regist",function(req,res){
    async () => {
        await queryFunc.noticeboardRegist(req.body.title,req.body.posts,req.body.user_id).then((rows)=>{
            res.send({result:rows[0],msg:"등록하였습니다."});
        }).catch((err)=>{
            res.send({result:false,msg:err});
        });
    }
});

router.post("/notice-edit",function(req,res){
    async () => {
        await queryFunc.noticeboardEdit(req.body.id,req.body.title,req.body.posts).then((rows)=>{
            res.send({result:rows[0],msg:"수정하였습니다."});
        }).catch((err)=>{
            res.send({result:false,msg:err});
        });
    }
});
module.exports = router;