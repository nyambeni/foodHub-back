const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');



router.put('./updateOrder', (req, res) => {
    
    const order_ID = (body.req.orderID);

    datb.query('UPDATE orders SET ? WHERE order_id = "'+order_ID+'"' ,function(error, results, fields){

        if(error)
        {
            throw error
        }
        else
        {
            datb.query('SELECT * FROM orders WHERE order_id = "'+order_ID+'"', function (error, result, fields) {
                return res.send({results}) 
            })
        }
    });
});


// Updating one particular order


router.put('./updateOrder/:id', (req, res) => {
    
    const order_ID = (body.req.orderID);

    datb.query('UPDATE orders SET ? WHERE order_id = "'+order_ID+'"',function(error, results, fields){

        if(error)
        {
            throw error
        }
        else
        {
            datb.query('SELECT * FROM orders WHERE order_id = "'+order_ID+'"',function (error, result, fields) {
                return res.send({results}) 
            })
        }
    });
});

module.exports = router;
