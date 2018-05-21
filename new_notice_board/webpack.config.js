const webpack = require("webpack");

module.exports = {
	mode:"development",
	node:{
		fs:"empty",
		net:"empty",
		tls:"empty"
	},
	entry:  {
		app: __dirname + "/app/App.js"
	},
	output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},
	module: {
		rules : [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react','env','es2016','es2017','stage-0']
					}
				}	
			}
		]
	}
};