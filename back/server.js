const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('./database/database');
const bodyParser = require('body-parser');
const multer = require('multer')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(cors())
app.use(function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
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

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
}); 
