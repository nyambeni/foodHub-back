	const express = require('express');
	const router = express.Router();
	const mysql = require('mysql');
	const bodyParser = require('body-parser');
	const datb = require('../database/database');
	var bcrypt = require('bcrypt');

	router.post ('/cust_register',(req,res)=>{
		
		bcrypt.hash(req.body.Password, 10, (err,hash) => {
					
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
					password:hash
				  }
				
				  datb.query('SELECT * FROM customer where email_address = ?', cust.email_address, (error, results)=>{
					if(results[0]){
					  res.send({'message':'User already exist'});
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
	
		bcrypt.hash(req.body.Password, 10, (err,hash) => {
						
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
					  res.send({'message':'restuarant already exist'});
					}else{
					  datb.query('INSERT INTO restuarant set ?', [restaurant], (error, results)=>{
						if(error){
						  res.send({'message':'Something went wrong!'});
						}else{
						  res.send({'message':'restuarant successfully Registered!'});
						}
					  })
					}
					}) 
			
			}
		})
	});


	router.post ('/driver_register',(req,res)=>{
		var value = "ACTIVE";
		bcrypt.hash(req.body.Password, 10, (err,hash) => {
					
			if(err)
			{
				return res.status(500).json({
					error : err
				});
			}else
			{
				  let driver={
					name:req.body.name,
					surname:req.body.surname,
					vehicleNo:req.body.vehiclNo,
					address:req.body.address,
					status:value,
					email:req.body.email_address,
					cellNo:req.body.cell_no,
					pasword:hash
				  }
				  
				  
				  
				  
				  console.log(req.body.name);
				  console.log(req.body.surname);
				  console.log(req.body.vehiclNo);
					console.log(req.body.address);
					console.log(hash);
					console.log(req.body.email_address);
					console.log(req.body.cell_no);
					console.log(value);
				
				  datb.query('SELECT * FROM driver where email = ?', driver.email, (error, results)=>{
					if(results[0]){
					  res.send({'message':'Driver already exist'});
					}else{
					  datb.query('INSERT INTO driver set ?', [driver], (error, results)=>{
						if(error){
						  res.send({'message':'Something went wrong!'});
						}else{
							
							datb.query('SELECT * FROM driver where email = ?', driver.email, (error, results)=>{
								if(results[0]){
								  
									var addess =
									{
										driverID:id
										street:req.body.street,
										surburb:req.body.surburb,
										city:req.body.city,
										postalCode:req.body.postalCode
									}
								  
								  
								  
									datb.query('INSERT INTO driveradd set ?', [address], (error, results)=>{
									if(error){
									  res.send({'message':'Something went wrong!'});
									}else{
										
										res.send({'message':'Driver successfully Registered!'});
									}
								  })
								  
								  
								  
								  
								  
								  
								  
								  
								  
								}else{	
									res.send({'message':'Driver already exist'});
								
								}
							})
							
							res.send({'message':'Driver successfully Registered!'});
						}
					  })
					}
				  })  
			}
	    })
	});

	module.exports = router;
	  //done