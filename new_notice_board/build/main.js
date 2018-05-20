const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const queryfunc = require("../tools/query");
const path = require('path');
const routes = require("../routes/router.js");
const app = express();
const port = 3000;

app.use('/', express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    key: "adsakjadshhkjlfdshjkldfg",
    secret: "DLRTMVPFptmWKDWKDaos@#%$%^*",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 쿠키 유효기간 1일
    }
}));
app.use(routes);

const server = app.listen(port, () => {
    console.log('Express listening on port', port);
});

module.exports = {
    queryfunc: queryfunc
};