var app = require("express")();
var path = require("path");
var mysql = require("mysql");
var MAX = 100;

app.set("views",path.resolve(__dirname,"views"))
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index");
});

//db
var connection = mysql.createConnection({
    host: "54.250.2.129",
    user: "root",
    password: "ubuntu",
    port: 3306,
    database: "test_db"
});
connection.connect();
connection.query("select * from user",function(err,rows,fields){
    if(!err){
        console.log("id : "+rows[id]+ ", name : " + rows[name] + ", date : " + rows[date]);
    } else {
        console.log("db connect error!");
    }
});
connection.end();

var server = require("http").createServer(app);
var io = require("socket.io")(server);

io.on("connection",function(socket){
    socket.on("random",function(data){
        socket.emit("random-value",{
            value: randomInteger()
        });
    });        
});

server.listen(3000,function(){
    console.log("app started on port 3000");
})


//random func
function randomInteger(){    
    return Math.floor((Math.random()*MAX));
}