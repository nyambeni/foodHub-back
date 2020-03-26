const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
var bcrypt = require('bcrypt-nodejs');

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
}
}) 
});


module.exports = router;