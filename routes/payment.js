const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');
const path = require('path') 
const app = express() 

var Publishable_Key = 'pk_test_51HCjoXCp71m9KMQuzhegHPbWREpe6PbgUy0IMmXrjsCZGH5DzlVO2JaUT0AXlN0mQu0YVEZNmjgBCrjBz31lypvL00J4BZIWnY';
var Secret_Key = 'sk_test_51HCjoXCp71m9KMQuL7MNkgfptWffLe9KYu6D5TXeXCZj7Tf8tVVbJ4deh0qstjNFYdJGifk80u45sPaJc989mDZl00HMILoO51';

const stripe = require('stripe')(Secret_Key);
 
app.get('/', function(req, res){ 
    res.render('Home', { 
        key: Publishable_Key 
    }) 
}) 
app.post('/payment', function(req, res){ 
    var amount = req.body.totalAmt;
  
    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Olwethu Nyangule', 
        address: { 
            line1: '24 New Mutual Road', 
            postal_code: '2001', 
            city: 'Pretoria', 
            state: 'Gauteng', 
            country: 'South Africa', 
        } 
    }) 
    .then((customer) => { 
  
        return stripe.charges.create({ 
            amount,     // Charing Rs 25 
            description: 'online food ordering', 
            currency: 'ZAR', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("payment success")  // If no error occurs 
    }) 
    .catch((error) => { 
        res.send(error)       // If some error occurs 
    }); 
}) 
  
//module.exports = router ;