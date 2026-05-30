//only API create here  not write any logic of API here ---->logic will be written in controller file and that controller file will be imported here and used here
const express=require('express');
const authController=require('../controllers/auth.controller');
const router=express.Router();

//register API banayi hai  or uska logic auth.controller.js me likha hai  or usko yaha use kiya hai
router.post('/register',authController.registerUser);


//export to use in app.js file  
module.exports=router;