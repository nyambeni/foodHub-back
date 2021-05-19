const express = require('express');
 const router = express.Router();
 const mysql = require('mysql');
 const datb = require('../database/database');

router.post('/b', (req, res) => {
    let prod = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_description: req.body.product_description,
		category: req.body.category
    }
    var sql = "INSERT INTO products SET ?";
             datb.query(sql, [prod], function (err, results) {
                 if (!err) {
                     res.send({ message: 'product inserted' })
 
                 } else {
                     res.send({ message: 'there are some error with query' })
                 }
             })
});

module.exports = router;