var app = require("express")();
var path = require("path"); //경로
var routes = require("./routes/router.js");//router
var bodyParser = require("body-parser"); // req.body -> json
var session = require("express-session"); // session 
var flash = require("connect-flash");

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");
app.use(session({
    key: "adsakjadshhkjlfdshjkldfg",
    secret: "DLRTMVPFptmWKDWKDaos@#%$%^*",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24// 쿠키 유효기간 1일
    }
}));
app.use(flash());
app.set("port",process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(routes);

app.listen(app.get("port"),function(){
    console.log("Server Started on port"+ app.get("port"));
});