const mysql = require('mysql');
const express = require('express');


const mysqlConn =mysql.createConnection({

  host:'localhost',
  user:'root',
  password:'',
  database:'ekasi-foodhub'

});

mysqlConn.connect((err)  =>{
if(!err)
console.log('database connection succeed!');
else
console.log('database connection failed!');
});

module.exports =mysqlConn;