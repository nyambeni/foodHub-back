const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');



//here i will mess up the insert 

const multer= require('multer');
const path = require('path');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname)
    }
  })
   
var upload = multer({ storage: storage })

//new insert product
router.post('/new_products',upload.single('picture'),(req,res,next)=>{

    const file = req.file
	
	let product={
		product_name:req.body.product_name,
		product_price:req.body.price,
		product_description:req.body.product_description,
		category:req.body.category,
		resturantName:req.body.resturantName,
		picture: file.path
	  }
		  
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }else{
		var page = file.originalname;
		
		console.log(file.path);
		console.log(req.body.product_name);
		console.log(req.body.price);
		console.log(req.body.product_description);
		console.log(req.body.category);
		console.log(req.body.resturantName);
		
		
/*datb.query('SELECT * FROM category_id where resturantName ="'+product.resturantName+'" and product_name = ?', product.email_address, (error, results)=>{
 if(results[0]){
  res.send({'message':'category already exits'});
}else{
  datb.query('INSERT INTO category_id set ?', [category], (error, results)=>{
    if(error){
      res.send({'message':'Something went wrong!'});
    }else{
      res.send({'message':'category successfully entered!'});
    }
  })
}
})	*/
		
		
		datb.query('INSERT INTO products SET ?',[product], (error, results)=>{
			if(error){
			  res.send({'message':'Something went wrong!'})
			}else{
				res.send({'message':'product entered successfully!'})
				
			}
		})
     
	}
})


//get product by resturant
router.get('/selectProduct/:resturantName', (req,res)=>{

  connection.query('select * from proctuct where resturantName=?', [req.params.resturantName], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});


});




// new category doesnt make any sense y would u want to insert a category 
/*router.post ('/new_category',(req,res)=>{

  let category={
  
    Breakfast:req.body.Breakfast,
    lunch:req.body.lunch,
    dinner:req.body.dinner,
    dessert:req.body.dessert 
  }

  datb.query('SELECT * FROM category_id where category_id = ?', category.email_address, (error, results)=>{
 if(results[0]){
  res.send({'message':'category already exits'});
}else{
  datb.query('INSERT INTO category_id set ?', [category], (error, results)=>{
    if(error){
      res.send({'message':'Something went wrong!'});
    }else{
      res.send({'message':'category successfully entered!'});
    }
  })
}
}) 
});*/


// restuarant update
router.put('/restu_update', (req,res)=>{
  let restuarant ={ 
    address:req.body.address,
    password:req.body.password,
    email_address:req.body.email_address      
  }
  let restuarant_id = (req.body.restuarant_id)  
  datb.query('UPDATE restuarant SET ? WHERE restuarant_id = "'+restuarant_id+'"',[restuarant],function (error, results, fields)
  {
      if (error) throw error 
      else{
        datb.query('select * from restuarant where restuarant_id = ?',[restuarant_id],function (error, results, fields){
            return res.send({results})
        })
    
        }
  })

})

// categories update this one to doesnt make Any sense

/*router.put('/categories_update', (req,res)=>{
  let category ={ 
    Breakfast:req.body.Breakfast,
    lunch:req.body.lunch,
    dinner:req.body.dinner,
    dessert:req.body.dessert      
  }
  let category_id = (req.body.category_id)  
  datb.query('UPDATE categories SET ? WHERE category_id  = "'+category_id +'"',[category],function (error, results, fields)
  {
      if (error) throw error 
      else{
        datb.query('select * from categories  where category_id = "'+category_id+'"',[category],function (error, results, fields){
            return res.send({results})
        })
    
        }
  })

})*/

// products update
// datb.query('select * from products where product_id = "'+product_id+'"',[product],function (error, results, fields){

router.put('/product_update', (req,res)=>{
  let product ={ 
   product_name:req.body.name,
    product_price:req.body.price,
    product_description:req.body.product_description
          
  }
  let product_id = (req.body.product_id)  
  datb.query('UPDATE products SET ? WHERE product_id = "'+product_id+'"',[product],function (error, results, fields)
  {
      if (error) throw error 
      else{
        datb.query('select * from products where product_id = "'+product_id+'"',function (error, results, fields){
            return res.send({results})
        })
    
        }
  })

})


// delete restuarant

router.delete('/restu_delete/:id',function(req, res){
   
    let connection = mysql.createConnection(datb);
    //let email = ({email_address:req.body.email_address});
    //let sql = 'DELETE FROM restuarant_admin where email_address = "'+email_address+'"'
       
       connection.query('DELETE * FROM restuarant where restuarant_id =?', [req.params.id], function(error, results, fields){
           if(error) throw error;
           else
           {
               return res.send({'records has been deleted':results})
           }
       }); 
    })


module.exports = router ;


