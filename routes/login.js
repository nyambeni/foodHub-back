const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');


router.get('/cust_login', function(req, res) {

    var email = req.body.email_address;
    var password = req.body.password;
 
    datb.query('select * from customer where email_address = ?',[email],(error,result)=>{
        if(error){
            res.send({"message":"error ocurred"});
        }else{
             if(result[0]){
                if(result[0].password == password){
                    res.send({"login successfully":result});
                    
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

    var email = req.body.email;
    var password = req.body.password;
 
    datb.query('select * from restuarant_admin where email = ?',[email],(error,result)=>{
        if(error){
            res.send({"message":"error ocurred"});
        } else{
             if(result[0]){
                if(result[0].password == password){
                    res.send({"login successfully":result});
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