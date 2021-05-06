var http = require("http");
const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('./database/database');
const bodyParser = require('body-parser');
const multer = require('multer');
var jwt = require('jsonwebtoken');
const session = require('express-session');
var cookieParser = require('cookie-parser');

//session express


//app.use(router)
 app.use(cookieParser());
var MemoryStore =session.MemoryStore;
var sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {},
	store: new MemoryStore(),
	saveUninitialized: false, //false
	unset: '',
	resave: false,
	name: 'session cookie name',
	secret: 'secret token',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000
}
app.use(session(sess));



//we are using app because of express
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
// api routes

 app.use('/', require('./routes/login.js'));
 app.use('/', require('./routes/registration'));
 app.use('/', require('./routes/admin'));
 app.use('/', require('./routes/customer'));
 app.use('/', require('./routes/restuarant'));
 app.use('/', require('./routes/search'));
 app.use('/', require('./routes/addOrder'));
 app.use('/', require('./routes/product'));
 app.use('/', require('./routes/driver'));
// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
}); 
