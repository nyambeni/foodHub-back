const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bodyParser = require('body-parser');


 router.use(session({
      	secret:'secret',
	   resave: true,
	  saveUninitialized: true
 }));

 router.use(bodyParser.urlencoded({extended : true}));
 router.use(bodyParser.json());


router.post('/cust_login', function(req, res) {

    let email = req.body.email_address;
    let password = req.body.password;

    if(!email || !password)
    {
        res.send({message:'enter all the fields'})
    }
   
        datb.query('select * from customer where email_address = ? AND password =?',[email,password],(error,result)=>{
            if(error)throw error;
                
            
            else{
                jwt.sign({email},'secretkey',{expiresIn:'30s'},(err,token)=>{
                    res.json({
                        token,
                        data:result
                    });
                });
            }
        }); 

    
 });
 

 router.post('/restu_login', function(req, res) {

    let email = req.body.email_address;
    var password = req.body.password;
    
    if(!email || !password)
    {
        res.send({message:'enter all the fields'})
    }
   
    datb.query('select * from restuarant_admin where email_address = ? AND password =?',[email,password],(error,results)=>{  
       if(error)throw error;
                else{
                    jwt.sign({email},'secretkey',{expiresIn:'60s'},(err,token)=>{
                        res.json({
                            token,
                            data:results
                        });
                    });  
                }
    }); 
 });
 
 

router.post('/admin_login', function(req, res) {

    let email = req.body.email_address;
    var password = req.body.password;
    
    if(!email || !password)
    {
        res.send({message:'enter all the fields'})
    }
   
    datb.query('select * from system_admin where email_address =? AND password =?',[email,password],(error,results)=>{  
       if(error)
       throw error;
             
                else
                {
                     
                      jwt.sign({email},'secretkey',{expiresIn:'60s'},(err,token)=>{
                        res.json({
                            token,
                            data:results
                        });
                       console.log(results)
                        
                    });
                }
                })
 });

 router.get('/logout', (req, res) => {
    req.logout();
	res.redirect('/login');
  });

module.exports = router;


 
