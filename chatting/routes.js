var express = require("express");
var router = express.Router();

router.get("/",function(req,res){
    res.render("login");
});

router.get("/room-list",function(req,res){
    res.render("room-select");
});

router.post("/room-select",function(req,res){
    res.render("chat");
});

router.post("/room-create",function(req,res){
    res.render("chat");
});

module.exports = router;