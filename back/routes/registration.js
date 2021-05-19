const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const datb = require('../database/database');

router.post ('/cust_register',(req,res)=>{

  let cust={
    name:req.body.name,
    surname:req.body.surname,
    address:req.body.address,
    email_address:req.body.email_address,
    cell_no:req.body.cell_no,
    password:req.body.password
  }
  datb.query('SELECT * FROM customer where email_address = ?', cust.email_address, (error, results)=>{
    if(results[0]){
      res.send({'message':'User already exits'});
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
var status = "PENDING";
  let restaurant={
    restuarant_name:req.body.restuarant_name,
    address:req.body.address,
    password:req.body.password,
    email_address:req.body.email_address,
	cellNo:req.body.cellNo,
	status :status
  }

console.log(req.body.restuarant_name);
console.log(req.body.address);
console.log(req.body.password);
console.log(req.body.email_address);
console.log(req.body.cellNo);
console.log(status);


 datb.query('SELECT * FROM restuarant_admin where email_address = ?', [restaurant.email_address], (error, results)=>{
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

router.post ('/driver_register',(req,res)=>{
var status = "PENDING";
  let driver={
    name:req.body.name,
	surname:req.body.surname,
	email_address:req.body.email_address,
	vehicleNo:req.body.vehicleNo,
    address:req.body.address,
    password:req.body.password,
	cell_no:req.body.cell_no,
	status :status
  }

console.log(req.body.name);
console.log(req.body.surname);
console.log(req.body.address);
console.log(req.body.vehicleNo);
console.log(req.body.password);
console.log(req.body.email_address);
console.log(req.body.cell_no);
console.log(status);


 datb.query('SELECT * FROM driver where email_address = ?', [driver.email_address], (error, results)=>{
 if(results[0]){
  res.send({'message':'User already exits'});
}else{
  datb.query('INSERT INTO driver set ?', [driver], (error, results)=>{
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
  //done