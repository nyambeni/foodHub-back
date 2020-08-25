const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
const nodemailer = require('nodemailer');   


router.post ('/application',(req,res)=>{

     let rest={
          restuarant_id:req.body.restuarant_id,
          restuarant_name:req.body.restuarant_name,
          address:req.body.address,
         // dont need password while applying as user logged in already password:req.body.password,
          email_address:req.body.email_address
       }
         if(!rest)
          {
            res.send({'message': 'false'})
          }

      datb.query('SELECT * FROM restuarant_admin  where email_address = ?', rest.email_address, (error, results)=>{
        if(results[0]){
          res.send({'message':'restaurant already exits'});
        }else{
          datb.query('INSERT INTO restuarant_admin set ?', [rest], (error, results)=>{
            if(error){
              res.send({'message':'Something went wrong!'});
            }else{
              res.send({'message':'Application successfully submitted!'});
            }
          })
        /**/
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'kasifoodhub@gmail.com',
            pass: '2020#1food'
          }
        });
        
        var mailOptions = {
          from: 'kasifoodhub@gmail.com',
          to: rest.email_address,
          subject: 'Ekasi Foodhub',
          text: 'Your application is been approved!'
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            
          }
        }); 
        }
      }) 
  });
  


// view Products
router.get('/viewMenu', (req,res)=>{


  datb.query('SELECT * FROM  menu  ',function(error,results,fields){

      if(error)
      {
          res.send({"failed":"error occurred"})
      }
      else{
                 return res.send({data:results})
          }

  });
});


// view of menu from the 3 new tables 

router.get('/viewrest1', (req,res)=>{


  datb.query('SELECT * FROM  restaurantmenu1  ',function(error,results,fields){

      if(error)
      {
          res.send({"failed":"error occurred"})
      }
      else{
                 return res.send({data:results})
          }

  });
});

router.get('/viewrest2', (req,res)=>{


  datb.query('SELECT * FROM  restaurantmenu_2  ',function(error,results,fields){

      if(error)
      {
          res.send({"failed":"error occurred"})
      }
      else{
                 return res.send({data:results})
          }

  });
});

router.get('/viewrest3', (req,res)=>{


  datb.query('SELECT * FROM  restaurantmenu_3  ',function(error,results,fields){

      if(error)
      {
          res.send({"failed":"error occurred"})
      }
      else{
                 return res.send({data:results})
          }

  });
});


// view each specific restaurant menu 
router.get('/specMenu',(req, res)=> {

  let restuarant ={restuarant_id:req.body.restuarant_id}

  datb.query('SELECT * from menu where restuarant_id = ?',restuarant.restuarant_id,(error,results,fields)=>{
    if(error) throw error;
    else{
      return res.send({'data':results})
    }
  })
});



  // view a specific restaurant        
          router.get('/aRestaurant',(req, res) => {

            let restuarant ={restuarant_id:req.body.restuarant_id}
         
           datb.query('SELECT * FROM restuarant_admin WHERE  restuarant_id = ?',restuarant.restuarant_id, (error, results,fields) => {
               if(error) throw error;
               res.send({results});
           });
        });

// new products
// router.post ('/createMenu',(req,res)=>{

//   let items={
    
//     item_name:req.body.item_name,
//     item_price:req.body.item_price,
//     item_description:req.body.item_description
//   };
//   let item_id = req.body.item_id
//   datb.query('SELECT * FROM menu where item_id = ?', items.item_id, (error, results)=>{
//     if(results){
//       res.send({'message':'item already exits'});
//     }else{
//       datb.query('INSERT INTO menu set ?', [items], (error, results)=>{
//         if(error){
//           res.send({results});
//         }else{
//             res.send({'message':'item inserted successfully!'});
//         }
//       })
//     }
//   })  
// });

router.post('/createMenu', function (req, res) {
  let items ={
      item_name:req.body.item_name,
      item_price:req.body.item_price,
      item_description:req.body.item_description,
      restuarant_id:req.body.restuarant_id

  }
           datb.query("INSERT INTO menu SET ?", [items], (err, results)=> {
               if (err) throw err
                else {
                   res.send({results})

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

  datb.query('SELECT * FROM category_id where category_id = ?', category.category_id, (error, results)=>{
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
  datb.query('UPDATE restuarant_admin SET ? WHERE restuarant_id = "'+restuarant_id+'"',[restuarant],function (error, results, fields)
  {
      if (error) throw error 
      else{
        datb.query('select * from  restuarant_admin where restuarant_id = "'+restuarant_id+'"',[restuarant],function (error, results, fields){
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


// update menu 

router.put('/updateMenu', (req,res)=>{
  let items ={ 
      
      item_name: req.body.item_name,
      item_price: req.body.item_price,
      item_description: req.body.item_description
     }
let item_id = (req.body.item_id)
     
  datb.query('UPDATE  menu  SET ? where item_id = "'+item_id+'"',[items],function (error, results, fields)
  {
      if (error) throw error;
      else
      {
        datb.query('select * from  menu  where item_id = "'+item_id+'"',[items],function (error, results, fields){
        return res.send({results})
    })
  }       
    })
  });



  // delete menu/ deactivating menu


  
           // deleting MENU permanently
           router.delete('/deleteMenu/:id',function(req, res){
   
            datb.query('DELETE FROM menu WHERE item_id = ?',[req.params.id], (err,results,fields)=>{
                 
              if(!err){
                res.send('Deleted successfully.');
            }else{
                console.log(err)
            }
            }); 
        });

 router.put('/deactivateMenu',(req ,res)=>{

  let item_id = req.body.item_id

  datb.query('UPDATE menu   SET status = 0 where item_id = "'+item_id+'"',(error,results,fields)=>
  { 
      if(error) throw error
      else{
          datb.query('select * from menu  where status =  1 ',function(error,results,fields){
              return res.send({results})
          })
      }

  })
})

// Change  menu status to available 

router.put('/changeStAvail',(req ,res)=>{

  let item_id = req.body.item_id
  datb.query('UPDATE menu  SET item_status = 1 where item_id =  "'+item_id+'"',(err,results,fields)=>
  {
 if(err) throw err

else 
{
datb.query('select * from menu where item_status = 1 ',function (error, results, fields){
    return res.send({results})

       })

     }
     }  
   )
 });
 
 //change item status to unavailble
 router.put('/changeStNotavail',(req ,res)=>{

  let item_id = req.body.item_id
  datb.query('UPDATE menu  SET item_status = 0 where item_id =  "'+item_id+'"',(error,results,fields)=>
  {
 if(error) throw error

else 
{
datb.query('select * from menu where item_status = 0 ',function (error, results, fields){
    return res.send({results})

       })
     }
     }  
   )
 });


//  accept orders

router.put('/AcceptedOrders',(req ,res)=>{

  let order_id = req.body.order_id
  datb.query('UPDATE orders  SET order_status = 1 where order_id =  "'+order_id+'"',(err,results,fields)=>
  {
 if(err) throw err

else 
{
datb.query('select * from orders where order_status = 1 ',function (error, results, fields){
    return res.send({results})

       })
     }
     }  
   )
 });
// decline orders

router.put('/DeclineOrders',(req ,res)=>{

  let order_id = req.body.order_id
  datb.query('UPDATE orders  SET order_status = 0 where order_id =  "'+order_id+'"',(err,results,fields)=>
 {
   if(err) throw err
else 
  {
   datb.query('select * from orders where order_status = 0',function (error, results, fields){
         return res.send({results})

})
}
}  
 )});


    // Reports

    // view total number of orders
    router.get('/totalOrders',(req,res)=>{
      datb.query('SELECT count(order_id) AS number from orders ',(error,results,fields)=>{
        if(error)throw error
        else{
          return res.send({'total orders':results})
        }
      })
    })

    // view total number of declined orders
    router.get('/declinedOrders',(req,res)=>{
      datb.query('SELECT count(order_id) AS number from orders where order_status = 0 ',(error,results,fields)=>{
        if(error)throw error
        else{
          return res.send({'number of declined orders :':results})
        }
      })
    })

    // view number of declined orders
    router.get('/AcceptedOrders',(req,res)=>{
      datb.query('SELECT count(order_id) AS number from orders where order_status = 1 ',(error,results,fields)=>{
        if(error)throw error
        else{
          return res.send({'number of Accepted orders :':results})
        }
      })
    })

    // view number of orders from a specific customer
    router.get('/cusOrders/:customer_ID', (req, res) => {

      let customer_ID ={customer_ID:req.body.customer_ID}
   
     datb.query('SELECT count(customer_ID) AS customerOrder from customer where customer_ID = ?',[customer_ID], (error, results,fields) => {
         if(error) throw error;
         res.send({results});
     });
  });


module.exports = router ;
