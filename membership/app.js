var app = require("express")();
var path = require("path");
var mysql = require("mysql");

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

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
