var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3000))

app.use('/', express.static(__dirname + '/static'));

app.listen(app.get('port'), function () {
	console.log('3000 port');
}