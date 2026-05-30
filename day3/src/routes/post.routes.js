const express=require('express');
const jwt=require('jsonwebtoken');
const UserModel=require('../models/user.model');

const router=express.Router();





router.post('/createpost',(req,res)=>{

    const token=req.cookies.token; //token ko cookie se access kar raha hu jisse wo client side me store ho jaye aur jab bhi user login karega ya koi protected route access karega to us token ka use karega apne aap ko authenticate karne ke liye

    //agar token nahi hai to unauthorized error bhejunga
    if(!token){
        return res.status(401).json({
            message:'Unauthorized'
        });
    }
    //agar token hai to usko verify karunga jisse wo apne aap ko authenticate kar sakega jab bhi wo login karega ya koi protected route access karega to us token ka use karega apne aap ko authenticate karne ke liye
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET); //decoded contains user_id jisse wo apne aap ko authenticate kar sakega jab bhi wo login karega ya koi protected route access karega to us token ka use karega apne aap ko authenticate karne ke liye
        res.status(201).json({
            message:'Post created successfully'
        });
    } catch (error) {
        res.status(401).json({
            message:'Invalid token'
        });
    }
});






module.exports=router;