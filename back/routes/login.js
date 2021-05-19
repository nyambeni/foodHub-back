const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
const session = require('express-session');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');



router.get('/cust_login', function(req, res) {

    var email = req.body.email_address;
    var password = req.body.password;
	//this is a session dont mess with it please
	req.session.user = req.body.email_address;
	
    datb.query('select * from customer where email_address = ?',[email],(error,result)=>{
        if(error){
            res.send({"message":"error ocurred"});
        }else{
             if(result[0]){
				 	
                if(result[0].password == password){
                    res.send({"login successfully":result})
                   req.session.user = req.body.email_address;
				   console.log(req.session.user);
				   const token = jwt.sign(
						{   
							custID : result[0].customer_ID,
							name: result[0].name,
							surname : result[0].surname,
							address : result[0].address,
							email : result[0].email_address,
							cellNo : result[0].cell_no
							
							},
							'login',
							{
								expiresIn: "1h"
							}
						)
						
						console.log(token);
						
						
						
						//here we decode and display the token 
						const header = jwt.decode(token);
						
						var date_ob = new Date();
					

						var details = {
							token : token,
							login_Time: date_ob
						}
						
						
						datb.query('UPDATE logbook SET ? where email = "'+req.session.user+'"',[details],function (errors, results, fields)
						{
							  if(results[0])
							  {	
								datb.query('select * from customer where email_address = "'+req.session.user+'"',function (errors, results, fields)
								{
									if(results[0].email_address)
									{
									 res.send(results)
									 res.send({"message":"successfully logged in"})
									
									}
								})
								
								
							  }       
						})
					
                } else{
                    res.send({"message":"Email and password does not match"});
                }
  
            }else{
                res.send({"message":"Email does not exits"});
            }
        }
    }); 
 });
 

 router.get('/restu_login', function(req, res) {
	
    var email = req.body.email_address;
    var password = req.body.password;
	
	req.session.admin = req.body.email_address;
	req.session.user = req.body.email_address;
	
	
    datb.query('select * from restuarant_admin where email_address = ?',[email],(error,result)=>{
        if(error){
            res.send({"message":"error ocurred"});
        } else{
             if(result[0]){
                if(result[0].password == password){
					
					req.session.admin = req.body.email_address;
					
                    res.send({"login successfully":result});
					 const token = jwt.sign(
						{   
							restID : result[0].	restuarant_id,
							restuarant_name: result[0].restuarant_name,
							
							email : result[0].email_address,
							cellNo : result[0].cell_no
							
							},
							'login',
							{
								expiresIn: "1h"
							}
						);
						
						//display the incoded token
						console.log(token);
						//here we decode and display the token 
						const header = jwt.decode(token);
						console.log(req.session.admin);
					
                } else{
                    res.send({"message":"Email and password does not match"});
                }  
            }else{
                res.send({"message":"Email does not exits"});
            }
        }
    }); 
 });
 


router.get('/forgot_pass', function(req, res) {

    var email = req.body.email_address;
   
	req.session.user = req.body.email_address;
	
    datb.query('select * from customer where email_address = ?',[email],(error,result)=>{
        if(error){
            res.send({"message":"error ocurred"});
        }else{
            if(result[0])
			{
				 	
				let transporter = nodemailer.createTransport({
					host: "smtp.gmail.com",
					port: 587,
					secure: true, // true for 587, false for other ports
					requireTLS: true,
					auth: {
						user: 'j.mnisi.c.jm@gmail.com', 
						pass: '#', 
					},
				});
				
				var mailOptions = {
				  from: 'j.mnisi.c.jm@gmail.com',
				  to: ''+ email +'',
				  subject: 'Forgot password',
				  text: `This user is registered now`
				};

				transporter.sendMail(mailOptions, function(error, info){
				  if (error) {
					console.log(error);
				  } else {
					console.log('Email sent: ' + info.response);
				  }
				});
  
            }else{
						//this is for admin password
						datb.query('select * from restuarant where email_address = ?',[email],(error,result)=>{
						if(error){
							res.send({"message":"error ocurred"});
						}else{
							if(result[0])
							{
									
								let transporter = nodemailer.createTransport({
									host: "smtp.gmail.com",
									port: 587,
									secure: true, // true for 587, false for other ports
									requireTLS: true,
									auth: {
										user: 'j.mnisi.c.jm@gmail.com', 
										pass: '#', 
									},
								});
								
								var mailOptions = {
								  from: 'j.mnisi.c.jm@gmail.com',
								  to: ''+ email +'',
								  subject: 'Forgot password',
								  text: `This user is registered now`
								};

								transporter.sendMail(mailOptions, function(error, info){
								  if (error) {
									console.log(error);
								  } else {
									console.log('Email sent: ' + info.response);
								  }
								});
				  
							}else{
								res.send({"message":"Email does not exits"});
							}
						}
					});
            }
        }
    }); 
 });
module.exports = router;

//done