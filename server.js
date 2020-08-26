const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('./database/database');
const bodyParser = require('body-parser');
const multer = require('multer');
const { check } = require('express-validator');
const session = require('express-session');


app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json());
app.use(cors())

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 
  

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
// api routes

 app.use('/', require('./routes/login'));
 app.use('/', require('./routes/registration'));
 app.use('/', require('./routes/customer'));
 app.use('/', require('./routes/restaurant'));
 app.use('/', require('./routes/addOrder'));
 app.use('/', require('./routes/updateOrder'));
 app.use('/', require('./routes/upload_documents'));
 app.use('/', require('./routes/super_admin'));
 app.use('/', require('./routes/ViewUpdateHistory'));
 app.use('/', require('./routes/reset_password'));
 app.use('/', require('./routes/forgot'));
app.use('/', require('./routes/payment')); 
 
 

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
}); 

