const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const datb = require('../database/database');

// new products
router.get ('/viewReady_Order',(req,res)=>{



	var surburb = 
	var value= "READY";

	datb.query('select * from orders where status=?  and surburb ="'++'"', [value], function (error, results, fields) {
		if (error) 
		{		 
			res.send({'message':'Something went wrong!'});
		}else{
			res.end(JSON.stringify(results));
		}
	});
});

module.exports = router ;