
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
var jwt = require('jsonwebtoken');
const session = require('express-session');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


// vendor / customer/ and himself (super admin) CRUD
// products/ menu/ categories orders(vendor/restaurant)

router.get('/all_restuarant', (req,res)=>{

	if(typeof req.session.admin)
	{
		
		datb.query('SELECT * FROM restuarant',function(error,results,fields){
	 
			if(error)
			{
				res.send({"failed":"error occurred"})
			}
			else{
						console.log(req.session.admin);
						
					   return res.send({data:results})
				}

		});
	}else{
		 res.send({"failed":"try to log in first"})
		 console.log(req.session.admin)
	}
});


router.get('/all_customers', (req,res)=>{


	if(typeof req.session.admin)
	{
		datb.query('SELECT * FROM customer',function(error,results,fields){
	 
			if(error)
			{
				res.send({"failed":"error occurred"})
			}
			else{
						console.log(req.session.superAdmin)
					   return res.send({data:results})
				}

		});
	}else{
		
		 res.send({"failed":"try to log in first"})
		 
	}
});



//done
//update restaurant status
  router.put('/restu_update_status/:id', (req,res)=>{
    let restuarant ={ 
      status:req.body.status
          
    }
    //let email = (req.body.email)  
    datb.query('UPDATE restuarant SET status = "'+ req.body.Status + '" WHERE restuarant_id = ?',[req.params.id],function (error, results, fields)
    {
        if (error) throw error 
        else{
          datb.query('select * from restuarant where restuarant_id = ?',[req.params.id],function (error, results, fields){
              return res.send({results})
          })
      
          }
    })

})


//delete restaurant
router.delete('/restuarant/:id',function(req, res){
   
    datb.query('DELETE FROM restuarant WHERE restuarant_id = ?',[req.params.id], (err,results,fields)=>{
        if(!err)
		{
			res.send('Deleted successfully.');
		}else{
			console.log(err)
		}
    }); 
})



//update resturant all details by admin
 router.put('/restu_update/:id', (req,res)=>{
    let restuarant ={ 
      restuarant_name:req.body.restuarant_name,
      password:req.body.password,
      cellNo :req.body.cellNo, 
      email_address:req.body.email  
    }

    datb.query('UPDATE restuarant SET ? WHERE restuarant_id = "'+req.params.id+'"',[restuarant],function (error, results, fields)
    {
        if (error) throw error 
        else{
          datb.query('select * from restuarant where restuarant_id = "'+req.params.id+'"',function (error, results, fields){
              return res.send({results})
          })
      
          }
    })
	
	

})


//Update customer
router.put('/cust_update_admin/:customer_ID', (req,res)=>{
	  
	  
	  let cust ={ 
		  name:req.body.name,
		  surname:req.body.surname,
		  email_address:req.body.email_address,
		  cell_no:req.body.cell_no,
		  password:req.body.password   
		 }
			
		 var email = req.session.user;
		 
		  datb.query('UPDATE customer SET ? where customer_ID  = '+req.params.customer_ID+'',[cust],function (error, results, fields)
		  {
		  if (error) throw error;
		  else
		  {
			datb.query('select * from customer where email_address  = "'+cust.email_address+'"',function (error, results, fields){
			return res.send({results})
			})
		  }       
		})
	
})    


//update restaurant status
  router.put('/driver_update_status/:id', (req,res)=>{
    let restuarant ={ 
      status:req.body.status
          
    }
    //let email = (req.body.email)  
    datb.query('UPDATE driver SET status = "'+ req.body.Status + '" WHERE restuarant_id = ?',[req.params.id],function (error, results, fields)
    {
        if (error) throw error 
        else{
          datb.query('select * from driver where driver_id = ?',[req.params.id],function (error, results, fields){
              return res.send({results})
          })
      
          }
    })

})
	
//update driver all details by driver	
router.put('/driver_update/:id', (req,res)=>{
    let driver ={ 
      name:req.body.name,
	  surname:req.body.surname,
	  vehicleNo:req.body.vehicleNo,
      password:req.body.password,
      cellNo :req.body.cellNo, 
      email:req.body.email  
    }

    datb.query('UPDATE restuarant SET ? WHERE driver_id = "'+req.params.id+'"',[restuarant],function (error, results, fields)
    {
        if (error) throw error 
        else{
          datb.query('select * from driver where driver_id = "'+req.params.id+'"',function (error, results, fields){
              return res.send({results})
          })
      
          }
    })

})	
	
	
	
	
//delete customer
router.delete('/customer/:id',function(req, res){

	datb.query('DELETE FROM customer WHERE customer_ID = ?',[req.params.id], (err,results,fields)=>{
		 
	  if(!err){
		res.send('Deleted successfully.');
	}else{
		console.log(err)
	}
	}); 
});

//delete vendor
router.delete('/vendor/:id',function(req, res){

	datb.query('DELETE FROM restuarant WHERE restuarant_id = ?',[req.params.id], (err,results,fields)=>{
		 
	  if(!err){
		res.send('Deleted successfully.');
	}else{
		res.send(err)
	}
	}); 
});

//delete driver
router.delete('/driver/:id',function(req, res){

	datb.query('DELETE FROM driver WHERE driver_id = ?',[req.params.id], (err,results,fields)=>{
		 
	  if(!err){
		res.send('Deleted successfully.');
	}else{
		console.log(err)
	}
	}); 
});

module.exports = router;