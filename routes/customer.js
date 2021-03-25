const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');

router.put('/cust_update', (req,res)=>{
	  
	if(req.session.user) //
	{  
		  let cust ={ 
			  name:req.body.name,
			  surname:req.body.surname,
			  address:req.body.address,
			  email_address:req.body.email_address,
			  cell_no:req.body.cell_no,
			  password:req.body.password   
			 }
				
			 var email = req.session.user;
			 
			  datb.query('UPDATE customer SET ? where email_address = "'+email+'"',[cust],function (error, results, fields)
			  {
			  if (error) throw error;
			  else
			  {
				datb.query('select * from customer where email_address = "'+cust.email_address+'"',function (error, results, fields){
				return res.send({results})
				})
			  }       
			})
	}else{
		 res.send({"failed":"try to log in first"})
		 console.log(req.session.user)
	}
})

  //done
  
  
  
  
  
  
  
  

module.exports = router ;