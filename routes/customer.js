const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
var cookieParser = require('cookie-parser');

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
  
  
  
 router.get('/all_restuarant_cust', (req,res)=>{

		if(req.session.user)
		{
			console.log(req.session.user);
			datb.query('select * from customeradd where email = "'+req.session.user+'"',function (error, results, fields){
			
				if(results[0].surburb)
				{
					datb.query('SELECT * FROM restuarant a, restuarantadd b WHERE a.email_address = b.mail_address AND b.surburb = "'+ results[0].surburb +'"', (error, result1,fields)=>{
				 
						if(error)
						{
							res.send({"failed":"No restureants found"});
						}
						else
						{
									
							res.send({data:result1});
						}

					})
				}
			})
			
		}else{
			 res.send({"failed":"try to log in first"})
			 console.log(req.session.user)
		}
	
	
	
}); 

//get product by resturant
router.get('/all_resturant_foods/:resturantNam', (req,res)=>{
	 
	 var name = req.params.resturantNam;
  datb.query('SELECT * FROM products WHERE resturantName = "'+name+'"', function (error, results, fields) {
	  if(error)
	  {
		   throw error;
	  }else{
		res.send(results);
	  }
	})

});



  
 router.put('/cust_logout', (req,res)=>{

		var date_ob = new Date();
		var details = 	{
							token : "N/A",
							login_Time: date_ob
						}
		  datb.query('UPDATE logbook SET ? WHERE email = "'+req.session.user+'"',[details],function (errors, results, fields)
		  {
			  if(errors)
			  {	
				
				 res.send({"failed":"try again"})
				//res.redirect('/'); 
			  }else{
				  req.session.user = '';
				res.send({"message":"logged out successfully"})
			  }				  
		})
	
}); 
  
 router.get('/cust_profile', (req,res)=>{

		if(req.session.user)
		{
		
			datb.query('select * from customer where email_address = "'+req.session.user+'"',function (error, results, fields){
			
				if(error)
				{
					res.send({"failed":"try to log in first"})	
				}else{
					 res.send({results})
				}
			})
			
		}else{
			 res.send({"failed":"try to log in first"})
			 console.log(req.session.user)
		}
	
	
	
});   

module.exports = router ;