	const express = require('express');
	const router = express.Router();
	const mysql = require('mysql');
	const bodyParser = require('body-parser');
	const datb = require('../database/database');
	var bcrypt = require('bcrypt');

	router.post ('/cust_register',(req,res)=>{
		
		bcrypt.hash(request.body.Password, 10, (err,hash) => {
					
			if(err)
			{
				return res.status(500).json({
					error : err
				});
			}else
			{
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
			}
	    })
	});
	 
	router.post ('/restu_register',(req,res)=>{
	var status = "PENDING";
	
		bcrypt.hash(request.body.Password, 10, (err,hash) => {
						
			if(err)
			{
				return res.status(500).json({
					error : err
				});
			}else
			{
					let restaurant={
						restuarant_name:req.body.restuarant_name,
						address:req.body.address,
						password:hash,
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


					 datb.query('SELECT * FROM restuarant where email_address = ?', [restaurant.email_address], (error, results)=>{
					 if(results[0]){
					  res.send({'message':'User already exits'});
					}else{
					  datb.query('INSERT INTO restuarant set ?', [restaurant], (error, results)=>{
						if(error){
						  res.send({'message':'Something went wrong!'});
						}else{
						  res.send({'message':'User successfully Registered!'});
						}
					  })
					}
					}) 
			
			}
		})
	});


	module.exports = router;
	  //done