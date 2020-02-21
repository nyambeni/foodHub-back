const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');

router.get('/search',function(req,res){
 
    let product =req.body.product_name

    datb.query('SELECT product_name from products where product_name = "'+product+'"',function(error, results, fields) {
        if(error) throw error;
        else
        {    
          //  datb.query('SELECT * from products where product_name = "%'+product+'%"', 
           // function(error, results, fields){
            return res.send({"the results are ":results})
        }
           // )}
    }); 

})



 
module.exports = router;
//done