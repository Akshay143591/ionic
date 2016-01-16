var express = require('express'),
	mongoose = require('mongoose'),
	path = require('path'),
	bodyParser = require('body-parser'),
    app = express();

mongoose.connect('mongodb://localhost/whatsapp');
app.use(express.static('www'));
app.use(express.static(path.resolve('./app/uploads/')));

app.use(bodyParser.json()); // parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded

var server = app.listen(3000);
var io = require('socket.io').listen(server);

require('./app/models/whats-app');
require('./app/routes/admin')(app);

var ctrl = require('./app/controllers/usersController');

io.on('connection', function (socket){
	console.log('Connected Socket-io');
	ctrl.setSocket(socket, io);	
});

console.log('Express server listening on port 3000');