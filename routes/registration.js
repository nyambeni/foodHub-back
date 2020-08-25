const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
var bcrypt = require('bcrypt-nodejs');
const nodemailer = require('nodemailer');

router.post ('/cust_register',(req,res)=>{

  let cust={
    name:req.body.name,
    surname:req.body.surname,
    address:req.body.address,
    email_address:req.body.email_address,
    cell_no:req.body.cell_no,
    password:bcrypt.hashSync(req.body.password, null, null)  
  }

  datb.query('SELECT * FROM customer where email_address = ?', cust.email_address, (error, results)=>{
    if(results[0]){
      res.send({'message':'user already exist'});
    }else{
      datb.query('INSERT INTO customer set ?', [cust], (error, results)=>{
        if(error){

          res.send({'message':'Something went wrong!'});
        }else{
            res.send({'message':'User successfully Registered!'});
        }
      })
    }
  })  
});

router.post ('/restu_register',(req,res)=>{

  let restaurant={
   
    restuarant_name:req.body.restuarant_name,
    address:req.body.address,
    password:bcrypt.hashSync(req.body.password, null, null),
    email_address:req.body.email_address
  }
  if(!restaurant){
    res.send({'message': 'false'})
  }

  datb.query('SELECT * FROM restuarant_admin where email_address = ?', restaurant.email_address, (error, results)=>{
 if(results[0]){
  res.send({'message':'User already exits'});
}else{
  datb.query('INSERT INTO restuarant_admin set ?', [restaurant], (error, results)=>{
    if(error){
      res.send({'message':'Something went wrong!'});
    }else{
      res.send({'message':'User successfully Registered!'});
    }
  })
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kasifoodhub@gmail.com',
      pass: '2020#1food'
    }
  });
  
  var mailOptions = {
    from: 'kasifoodhub@gmail.com',
    to: restaurant.email_address,
    subject: 'Ekasi Foodhub',
    text: 'restaurant succesfully registered!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      
    }
  }); 
  }
}) 
});
 


module.exports = router;