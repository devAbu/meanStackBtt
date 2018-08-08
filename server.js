var express = require('express')
var app = express()


const port = process.env.port || '3000';

app.use('/', express.static(__dirname + '/static'));

app.listen(port, function () {
	console.log('3000 port');
})

//test