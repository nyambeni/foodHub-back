 const express = require('express');
 const router = express.Router();
 const mysql = require('mysql');
 const datb = require('../database/database');
 
 
 // view carts for particular order 
 
router.get('/viewCart/:order_id', (req, res) => {

    let order_id ={order_id:req.body.order_id}
 
   datb.query('SELECT * FROM carts WHERE order_id = ?',[order_id], (error, results,fields) => {
       if(error) throw error;
       res.send({results});
   });
});


// view all carts
router.get('/aViewCart', (req, res) => {

  
   datb.query('SELECT * FROM carts ', (error, results,fields) => {
       if(error) throw error;
       res.send({results});
   });
});




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

// add orders 
router.post('/addOrder',function(req,res){
    let order ={
        order_id:req.body.order_id,
        customer_ID:req.body.customer_ID,
        name:req.body.name,
        qty:req.body.qty,
        price:req.body.price,  
       
    }
    let order_id = req.body.order_id
    datb.query('SELECT * from orders where order_id = ?',[order_id],function(error,results){
        if(error)throw error;
        else{
            datb.query('INSERT INTO orders SET ? ',[order],function(error,results){
                if(error)throw error
                else{
                    res.send({results});
                }
            })
        }
    })
});

//view all orders 

router.get('/viewOrders',(req,res)=>{
    datb.query('SELECT * from orders', function(error,results,fields){
        if(error)throw error
        else
        {
            return res.send({results});
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