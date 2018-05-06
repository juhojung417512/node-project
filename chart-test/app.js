var app = require("express")();
var path = require("path");
var MAX = 100;
app.set("views",path.resolve(__dirname,"views"))
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("index");
});

var server = require("http").createServer(app);
var io = require("socket.io")(server);

io.on("connection",function(socket){
    socket.on("random",function(data){
        socket.emit("random-value",{
            valueList: randomInteger(data.randomCount)
        });
        console.log("random value emit!");        
    });        
});

server.listen(3000,function(){
    console.log("app started on port 3000");
})

function randomInteger(randomCount){
    var randomList = []
    for(var i=0;i<randomCount;i++){
        randomList.push(Math.floor((Math.random()*MAX)));
    }
    
    return randomList;
}