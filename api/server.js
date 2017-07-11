var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./models/user');
var bodyParser = require('body-parser');
var session	= require('express-session');

var app = express();

var config = require('./configs/index');
var socketEvents = require('./socketEvents/index');
var router = require('./routers/index');
mongoose.connect(config.database);

app.use(session({
	secret: config.sessionSecret,
	saveUninitialized: true,
	resave: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'The API is at http://localhost:' + config.port + '/api'
	});
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', router());

let server = app.listen(config.port, function (err) {
	if (err) {
		throw err
	}
	console.log('API listen at http://localhost:' + config.port);
});

var io = require('socket.io').listen(server);
socketEvents(io);