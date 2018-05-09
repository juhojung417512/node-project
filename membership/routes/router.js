var express = require("express");
var router = express.Router();
var queryFunc = require("../models/query.js");

router.use(function(req,res,next){
    res.locals.currentUser = req.currentUser;
    res.locals.errors = req.flash("error");
    next();
});

router.get("/",function(req,res){
    if(req.session.user_id){
        queryFunc.login(req.session.user_id,req.session.pw,function(result) {
            if("err" in result){
                req.flash("error","세션이 만료되었습니다.");
                res.render("index");
            } else {
                res.render("index",{
                    currentUser : result
                });
            }
        });        
    } else {
        res.render("index");
    }    
});

router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",function(req,res){
    queryFunc.login(req.body._id,req.body._pw,function(result){
        if("err" in result){
            req.flash("error",result["err"]);
            res.redirect("/login");
        } else {
            req.session.user_id = result["id"];
            req.session.pw = result["pw"];
            req.session.name = result["name"];
            res.render("index",{
                currentUser : result
            });
        }
    });    
});

router.get("/signup",function(req,res){
    res.render("signup");
});

router.post("/signup",function(req,res){
    queryFunc.signup(req.body._id,req.body._pw,req.body._name,function(result){
        if("err" in result){
            req.flash("error",result["err"]);
            res.redirect("/signup");
        } else {
            req.session.user_id = result["id"];
            req.session.pw = result["pw"];
            req.session.name = result["name"];
            res.render("index",{
                currentUser : result
            });
        }
    });    
});

router.get("/logout",function(req,res){
    req.session.destroy(function(err){
        if(err){
            res.render("index");
        } else {
            res.render("index");
        }
    });
});
////// notice router, 각 함수 인자값
router.get("/notice-list",function(req,res){
    res.render("notice_board");
});

router.get("/notice-regist",function(req,res){
    res.render("notice_board_edit");
});

router.get("/notice-edit",function(req,res){
    res.render("notice_board_edit");
});

router.post("/posts",function(req,res){
    res.render("notice_board");
});

module.exports = router;