const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
var jwt = require('jsonwebtoken');

router.get('/cust_login', function(req, res) {

    var email = req.body.email_address;
    var password = req.body.password;
 
    datb.query('select * from customer where email_address = ?',[email],(error,result)=>{
        if(error){
            res.send({"message":"error ocurred"});
        }else{
             if(result[0]){
                if(result[0].password == password){
                    res.send({"login successfully":result})
                   
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
						
						//display the incoded token
						console.log(token);
						//here we decode and display the token 
						const header = jwt.decode(token);
						console.log(header.address);
					
					
						var details = {
							custID : header.custID,
							token : token
						}
						
						
						datb.query('INSERT INTO logbook set ?', [details], (error, results)=>{
							if(error){
							  res.send({'message':'Something went wrong!'});
							}else
							{
							  res.send({'message':'logbook updated'});
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
 
    datb.query('select * from restuarant where email_address = ?',[email],(error,result)=>{
        if(error){
            res.send({"message":"error ocurred"});
        } else{
             if(result[0]){
                if(result[0].password == password){
                    res.send({"login successfully":result});
					 const token = jwt.sign(
						{   
							restID : result[0].	restuarant_id,
							restuarant_name: result[0].restuarant_name,
							address : result[0].address,
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
						console.log(header.address);
					
					
                } else{
                    res.send({"message":"Email and password does not match"});
                }  
            }else{
                res.send({"message":"Email does not exits"});
            }
        }
    }); 
 });
 

module.exports = router;

//done