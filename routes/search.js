const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');

router.get('/search',function(req,res){
 
    let search =req.body.search

    datb.query('SELECT product_name from products where product_name LIKE "%'+search+'%" OR product_description LIKE "%'+search+'%"',function(error, results, fields) {
        if(error)
		{	

			throw error;
		}
        else
        {    
          
            return res.send({"the results are ":results})
        }
          
    }); 

})


router.get('/searchCustomer/',function(req,res){
 
	console.log(req.session.user);
 
 
    let search = req.session.user

		datb.query('SELECT * from restuarant where email_address = "'+search+'"',function(error, results, fields) {
        if(error)
		{	

			throw error;
		}
        else
        {    
          
            return res.send({"the results are ":results})
        }
          
    }); 

})
 
module.exports = router;
//done