const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const path  = require('path')
const datb = require('../database/database');
const multer = require('multer');
//const DIR = './routes/uploads';
const fs = require('fs')

//upload documents 

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './routes/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({storage: storage});

 router.post('/upload_file',upload.single('file'),function(req, res) {
   
    var message = "Error! in image upload."
    if (!req.file) {
          console.log("No file received");
          message = "Error! in document upload."
          res.send({message: message, status:'danger'});
  } else{
        
      console.log('file received');
      var sql = `INSERT INTO file_uploads (name, type, size) VALUES ('${req.file.filename}','${req.file.mimetype}','${req.file.size});`;

        
      message = "Successfully! uploaded";
      res.send({message: message, status:'success'});
 
      }
});

// upload multlple file
router.post('/uploadMultiple_file',upload.any('file'),function(req, res) {
   
  var message = "Error! in image upload."
  if (!req.file) {
        console.log("No file received");
        message = "Error! in document upload."
        res.send({message: message, status:'danger'});
} else{
      
    console.log('file received');
    var sql = `INSERT INTO file_uploads (name, type, size) VALUES ('${req.file.filename}','${req.file.mimetype}','${req.file.size});`;

      
    message = "Successfully! uploaded";
    res.send({message: message, status:'success'});

    }
});
// get file

router.get('/download',function(req,res,next){
  filepath =path.join(__dirname,'./uploads')+'/'+req.body.file;
  res.sendFile(filepath);
})



// router.post('/addDocument',upload.single('file'),(req,res)=>{
    
//   images = req.file.filename;

//   if (images) {

//       con.query("INSERT INTO restuarant(images) VALUES ('"+ images + "')", [images], function(err,results){
//           if (err) {
//               res.send("upload document - failed.........file not received");  
//           }
//           else{
//               return res.send({results,
//                 message: " successful!!! --file received"})
//           }
//           }) 
//   } else {
//       res.send("PLEASE UPLOAD YOUR DOCUMENT");
//   } 
// });






  module.exports = router;

  