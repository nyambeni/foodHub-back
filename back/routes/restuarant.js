const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');

// new products
router.post ('/new_products',(req,res)=>{



console.log(req.body.product_name);
console.log(req.body.product_price);
console.log(req.body.product_description);


  let product={
    
    product_name:req.body.product_name,
    product_price:req.body.product_price,
    product_description:req.body.product_description,

  }

  datb.query('SELECT * FROM products where product_name = ?', product.product_name, (error, results)=>{
    if(results[0]){
      res.send({'message':'product already exits'});
    }else{
      datb.query('INSERT INTO products set ?', [product], (error, results)=>{
        if(error){
          res.send({'message':'Something went wrong!'});
        }else{
            res.send({'message':'product entered successfully!'});
        }
      })
    }
  })  
});
// new category
router.post ('/new_category',(req,res)=>{

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
});


// restuarant update
router.put('/restu_update', (req,res)=>{
  let restuarant ={ 
    address:req.body.address,
    password:req.body.password,
    email_address:req.body.email_address      
  }
  let restuarant_id = (req.body.restuarant_id)  
  datb.query('UPDATE categories SET ? WHERE restuarant_id = "'+restuarant_id+'"',[restuarant],function (error, results, fields)
  {
      if (error) throw error 
      else{
        datb.query('select * from categories where restuarant_id = "'+restuarant_id+'"',[restuarant],function (error, results, fields){
            return res.send({results})
        })
    
        }
  })

})

// categories update

router.put('/categories_update', (req,res)=>{
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

})

// products update
router.put('/product_update', (req,res)=>{
  let product ={ 
    product_price:req.body.address,
    product_description:req.body.product_description
          
  }
  let product_id = (req.body.product_id)  
  datb.query('UPDATE products SET ? WHERE product_id = "'+product_id+'"',[product],function (error, results, fields)
  {
      if (error) throw error 
      else{
        datb.query('select * from products where product_id = "'+product_id+'"',[product],function (error, results, fields){
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
       
       connection.query('DELETE * FROM restuarant_admin where restuarant_id =?', [req.params.id], function(error, results, fields){
           if(error) throw error;
           else
           {
               return res.send({'records has been deleted':results})
           }
       }); 
    })


module.exports = router ;


