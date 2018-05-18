const express = require( 'express');
const bodyParser = require('body-parser');
const queryfunc = require("../tools/query");
const path = require('path');
const routes = require("./routes/router.js");
const app = express();
const port = 3000;

app.use(routes);
app.use('/', express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true })); 	
app.use(bodyParser.json());

const server = app.listen(port, () => {
	console.log('Express listening on port', port);
});

module.exports= {
	queryfunc : queryfunc 
}