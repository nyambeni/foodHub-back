const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');

// update customer  profile
router.put('/cust_update', (req,res)=>{
  let cust ={ 
      name:req.body.name,
      surname:req.body.surname,
      address:req.body.address,
      email_address:req.body.email_address,
      cell_no:req.body.cell_no,
      password:req.body.password   
     }
let customer_ID = (req.body.customer_ID)
     
  datb.query('UPDATE customer SET ? where customer_ID = "'+customer_ID+'"',[cust],function (error, results, fields)
  {
      if (error) throw error;
      else
      {
        datb.query('select * from customer where customer_ID = "'+customer_ID+'"',[cust],function (error, results, fields){
        return res.send({results})
    })
  }       
    })
  })




  
       


// search by menu
router.get('/searchMenu',function(req,res){
 
  let items =req.body.item_name

  datb.query('SELECT * from menu where item_name = "'+items+'"',function(error, results, fields) {
      if(error) throw error;
      else
      {    
          return res.send({"the results are ":results})
      }
         
  }); 

})

// search by rest name
router.get('/searchShop',function(req,res){

  let restuarant =req.body.restuarant_name

  datb.query('SELECT restuarant_name from restuarant_admin where restuarant_name = "'+restuarant+'"',function(error, results, fields) {
      if(error) throw error;
      else
      {    
          return res.send({"the results are ":results})
      }
       
  }); 

})



  


router.delete('/customer/:id',function(req, res){
   
  datb.query('DELETE FROM customer WHERE customer_ID = ?',[req.params.id], (err,results,fields)=>{
           
      if(!err){
        res.send('Deleted successfully.');
      }else{
        console.log(err)
      }
        }); 
      })


module.exports = router ;