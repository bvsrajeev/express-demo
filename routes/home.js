const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
  // res.send("Hello world!!!");
  //To send an html file we need to use res.render and file name with all the values need to be populated!!!
  res.render('index',{title: 'My express App',message: 'Hello!!!'});
});

module.exports = router;
