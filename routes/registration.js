	const express = require('express');
	const router = express.Router();
	const mysql = require('mysql');
	const bodyParser = require('body-parser');
	const datb = require('../database/database');
	var bcrypt = require('bcrypt');
	var nodemailer = require('nodemailer');
	//this will insert logo for resturent

const multer= require('multer');
const path = require('path');

	router.post ('/cust_register',(req,res)=>{
		
		bcrypt.hash(req.body.password, 10, (err,hash) => {
					
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
					email_address:req.body.email_address,
					cell_no:req.body.cell_no,
					password:req.body.password
				  }
				  
				  let add ={
					email: req.body.email_address,
					street: req.body.street,
					surburb: req.body.surburb,
					city: req.body.city,
					postalCode:req.body.postalCode
				  }
				  
				   let log ={
					email:req.body.email_address,
					token:"N/A"
				  }
				
				  datb.query('SELECT * FROM customer where email_address = ?', cust.email_address, (error, results)=>{
					if(results[0]){
					  res.send({'message':'User already exist'});
					}else{
						
						//to insert into customer table
					  datb.query('INSERT INTO customer set ?', [cust], (error, results)=>{
						if(error){
						  res.send({'message':'Something went wrong with customer !'});
						}else{
									//to insert into address table
									datb.query('INSERT INTO customeradd set ?', [add], (error, results)=>{
										if(error){
										  res.send({'message':'Something went wrong!'});
										}else{
											//to insert into logbook table
											datb.query('INSERT INTO logbook set ?', [log], (error, results)=>{
												if(error){
												  res.send({'message':'Something went wrong with logbook!'});
												}else{
													res.send({'message':'User successfully Registered!'});
													
													
												/*var transporter = nodemailer.createTransport({
													  service: 'gmail',
													  auth: {
														user: 'j.mnisi.c.jm@gmail.com',
														pass: '#Mdawekamatla1'
													  }
													});*/
													
													let transporter = nodemailer.createTransport({
														host: "smtp.gmail.com",
														port: 587,
														secure: true, // true for 587, false for other ports
														requireTLS: true,
														auth: {
															user: 'j.mnisi.c.jm@gmail.com', 
															pass: 'sina2015', 
														},
													});
													
													var mailOptions = {
													  from: 'j.mnisi.c.jm@gmail.com',
													  to: ''+cust.email_address+'',
													  subject: 'Tesing',
													  text: `This user is registered now`
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
										}
									})
						}
					  })
					}
				  })  
			}
	    })
	});
	 
	 
	 
	 
	 
	 
	 
	 


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/logo')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
   
var upload = multer({ storage: storage })
	 
	 
	 
	 
	 
	 
	 
	 //we have an error but it works proper
	router.post ('/restu_register',upload.single('picture'),(req,res,next)=>{
	var status = "PENDING";
	
	const file = req.file
	
		bcrypt.hash(req.body.Password, 10, (err,hash) => {
						
			if(err)
			{
				return res.status(500).json({
					error : err
				});
			}else
			{
					if(!file)
					{
						const error = new Error('Please upload a file')
						  error.httpStatusCode = 400
						  return next(error)
					}else
					{
							let restaurant={
							restuarant_name:req.body.restuarant_name,
							password:req.body.Password, //password:hash
							email_address:req.body.email_address,
							cellNo:req.body.cellNo,
							logo:file.path,
							status :status
						  }
				
						console.log(req.body.restuarant_name);
					
						console.log(req.body.Password);
						console.log(req.body.email_address);
						console.log(req.body.cellNo);
						console.log(status);
						
						
						let addRes ={
						email: req.body.email_address,
						street: req.body.street,
						surburb: req.body.surburb,
						city: req.body.city,
						postalCode:req.body.postalCode
					  }


						let logRes ={
							email:req.body.email_address,
							token:"N/A"
						 }

						 datb.query('SELECT * FROM restuarant where email_address = ?', [restaurant.email_address], (error, results)=>{
						 if(results[0]){
						  res.send({'message':'restuarant already exist'});
						}else{
						
						  //add resturent
						  datb.query('INSERT INTO restuarant set ?', [restaurant], (error, results)=>{
							if(error){
							  res.send({'message':'Something went wrong!'});
							}else{
								
								//to insert into address table
										datb.query('INSERT INTO restuarantadd set ?', [addRes], (error, results)=>{
											if(error){
											  res.send({'message':'Something went wrong!'});
											}else{
												//to insert into logbook table
												datb.query('INSERT INTO logbook set ?', [logRes], (error, results)=>{
													if(error){
													  res.send({'message':'Something went wrong with logbook!'});
													}else{
														res.send({'message':'User successfully Registered!'});
													}
												})
											}
										})
								
								
								
								
							
							}
						  })
						}
						}) 
				}
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
					status:value,
					email:req.body.email_address,
					cellNo:req.body.cell_no,
					pasword:hash
				  }
				  
				  
				  
				  
				  console.log(req.body.name);
				  console.log(req.body.surname);
				  console.log(req.body.vehiclNo);
					
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
								  
									var address =
									{
										email:req.body.email_address,
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
							
							
						}
					  })
					}
				  })  
			}
	    })
	});

	module.exports = router;
	  //done