const express = require( 'express');
const bodyParser = require('body-parser');
const session = require("express-session");
const path = require('path');
const app = express();
const port = 3000;
const fs = require("fs")

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true })); 	
app.use(bodyParser.json());
app.use(session({
    key: "adsakjadshhkjlfdshjkldfg",
    secret: "DLRTMVPFptmWKDWKDaos@#%$%^*",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24// 쿠키 유효기간 1일
    }
}));

app.get("/*",function(req,res){
	let html = fs.readFileSync(__dirname + "/index.html").toString()
	res.end(html);
})

const server = app.listen(port, () => {
	console.log('Express listening on port', port);
});