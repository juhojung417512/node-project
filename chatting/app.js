var app = require("express")();
var routes = require("./routes.js");
var path = require("path");
app.set("views", path.resolve(__dirname,"views"));
app.set("view engine","ejs");
app.use(routes);

app.get("/",function(req,res){
    res.render("login");
});

var server = require("http").createServer(app);

var io = require("socket.io")(server);
var room_list = [];
// room system
io.on('connection', function(socket) {
    socket.on("login",function(data) {
        console.log('Client logged-in:\n name:' + data.username + '\n userid: ' + data.userid);
        socket.username = data.username;
        socket.userid = data.userid;
    });

    socket.on("room-list",function(data){
        console.log(room_list);
        socket.username = data.username;
        socket.userid = data.userid;
        io.emit("room-list",{rooms:room_list});
    });
    
    socket.on("room-select",function(data){
        var roomid = socket.roomid = data.roomid;
        socket.username = data.username;
        socket.userid = data.userid;
        console.log("Client room select :" + roomid + " user id:" + socket.userid);
        var rooms = io.sockets.adapter.rooms;
        if(roomid in rooms){
            socket.join(roomid);
            io.emit("login",socket.username);
        }
    });

    socket.on("room-create",function(data){
        var roomid = socket.roomid = data.roomid;
        socket.username = data.username;
        socket.userid = data.userid;
        console.log("Client room create :" + roomid + " user id:" + socket.userid);
        var rooms = io.sockets.adapter.rooms;
        if(!(roomid in rooms)){
            socket.join(roomid);
            io.emit("login",socket.username);
            room_list.push(roomid);
        }
    });
    
    socket.on("chat",function(data){
        socket.userid = data.userid;
        socket.username = data.username;
        socket.roomid = data.roomid;
        console.log('Message from %s: %s', socket.username, data.msg);
        var msg = {
            from: {
                name: socket.username,
                userid: socket.userid
            },
            msg: data.msg
        };
        //io.sockets.in(socket.roomid).emit("chat",msg);
        io.emit("chat",msg);
    });

    socket.on("forcedisconnect",function(){
        socket.disconnect();
    });

    socket.on("disconnect",function(){
        console.log("disconnect" + socket.name);
    });
});

server.listen(3000,function(){
    console.log("app started on port 3000");
});
