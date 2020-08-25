
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const datb = require('../database/database');



//customer forgot their password

router.get('/cust_forgot_pass', function(req, res) {

var email = req.body.email_address;
    datb.query('select * from customer where email_address = ?',[email],(error,result)=>{

        if(error){

            res.send({"message":"error ocurred"})

        } else{

            if(result[0]){

                res.send({"message":"Reset password link sent to the registered email"});       

            } else{

                res.send({"message":"This email is not registered "});

            }

        }

    });



});





//vendor forgot their password

router.get('/vendor_forgot_pass', function(req, res) {

  

    var email = req.body.email_address;



    datb.query('select * from restuarant_admin where email_address = ?',[email],(error,result)=>{

        if(error){

            res.send({"message":"error ocurred"})

        } else{

            if(result[0]){

                res.send({"message":"Reset password link sent to the registered email"});       

            } else{

                res.send({"message":"This email is not registered "});

            }

        }

    });



});

module.exports = router;


