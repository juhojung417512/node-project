var express = require("express");
var router = express.Router();
var queryFunc = require("../models/query.js");
var needLoginURL = ["/logout","/notice-list","/notice-regist","notice-edit"];
router.use(function(req,res,next){
    res.locals.currentUser = req.currentUser;
    res.locals.errors = req.flash("error");
    res.locals.infoes = req.flash("info");
    if(req.currentUser == undefined && req.url in needLoginURL){
        req.flash("error","로그인이 필요합니다.");
        res.redirect("/login");
    }
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
            req.flash("error",result.err);
            res.redirect("/login");
        } else {
            req.session.user_id = result.id;
            req.session.pw = result.pw;
            req.session.name = result.name;
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
            req.flash("error",result.err);
            res.redirect("/signup");
        } else {
            req.session.user_id = result.id;
            req.session.pw = result.pw;
            req.session.name = result.name;
            res.render("index",{
                currentUser : result
            });
        }
    });    
});

router.get("/logout",function(req,res){
    req.session.destroy(function(err){
        if(err){
            req.flash("error",err);
            res.render("index");
        } else {
            res.render("index");
        }
    });
});

router.get("/notice-list",function(req,res){
    queryFunc.noticeboardList(function(result){
        if("err" in result || result == null){
            req.flash("error",result.err);
            res.render("notice_board");
        } else {
            res.render("notice_board",{
                notices : result,
                currentUser: {
                    user_id: req.session.user_id,
                    name: req.session.name
                }
            });
        }
    });
});

router.get("/notice-regist",function(req,res){
    res.render("notice_board_edit",{
        is_edit: false,
        currentUser: {
            user_id: req.session.user_id,
            name: req.session.name
        }
    });
});

router.get("/notice-edit/:id",function(req,res){
    console.log(req.body);
    queryFunc.noticeboardSelect(req.params.id,function(result){
        if("err" in result){
            req.flash("error",result.err);
            res.redirect("/notice-list");
        } else {
            res.render("notice_board_edit",{
                is_edit: true,
                notice: result
            });
        }
    });
    
});

router.post("/notice-regist",function(req,res){
    queryFunc.noticeboardRegist(req.body.title,req.body.posts,req.body.user_id,function(result){
        if("err" in result){
            req.flash("error",result.err);
            res.render("notice_board");
        } else {
            req.flash("info","등록하였습니다.");
            res.redirect("/notice-list");
        }
    });
});

router.post("/notice-edit",function(req,res){
    queryFunc.noticeboardEdit(req.body.id,req.body.title,req.body.posts,function(result){
        if("err" in result){
            req.flash("error",result.err);
            res.redirect("/notice-list");
        } else{
            req.flash("info","수정하였습니다.");
            res.redirect("/notice-list");
        }
    });
});
module.exports = router;