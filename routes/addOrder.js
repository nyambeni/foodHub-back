 const express = require('express');
 const router = express.Router();
 const mysql = require('mysql');
 const datb = require('../database/database');
 
 

 router.post('/add', function (req, res) {
    let prod = {
        name: req.body.name,
        price: req.body.price,
        qty: req.body.qty

    }
    //var qty = req.body.qty;
    var name = req.body.name;
    var sql1 = "SELECT * FROM carts WHERE name = ?";
    datb.query(sql1, [name], function (err, results) {
        if (results.length > 0) {
            res.send("Sorry, this item is already exist in cart")
        }
        else {
            var sql = "INSERT INTO carts SET  ?";
            datb.query(sql, [prod], function (err, results) {
                if (!err) {
                    res.send({ message: 'inserted' })

                } else {
                    res.send({ message: 'there are some error with query' })
                }
            })
        }

    })
})

//update the cart
 router.put('/addtocart', function (req, res) {
 
     var name = req.body.name
     var qty = req.body.qty
     var price = req.body.price
 
     sql = "UPDATE carts SET qty = ? where name = ?";
     datb.query(sql, [qty, name], function (err, results, fields) {
         if (!err) {
 
             res.send({ data: results })
         }
         else {
             res.send("wrong")
         }
     })
 });
 

 //delete an item from cart
 router.delete('/carts/:id', (req,res) => {
    datb.query('DELETE FROM carts WHERE order_id = ?',[req.params.id], (err,results,fields)=>{
         if(!err){
             res.send('Deleted successfully.');
         }else{
             console.log(err)
         }
         
 
     })
 })
 module.exports = router;