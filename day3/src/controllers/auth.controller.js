const userModel=require('../models/user.model');
//jsnowebtoken is used for creating token for user authentication and authorization
const jwt=require('jsonwebtoken'); //jwt use karne ke liye install karna padega npm i jsonwebtoken

async function registerUser(req,res){
    const {username,email,password}=req.body;

    const isUserAlreadyExist=await userModel.findOne({email}); //check kar raha hu ki email already exist to nahi kar raha hai database me agar email exist karta hai to usko register nahi karne dunga aur error message bhejunga ki email already exist karta hai
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:'User with this email already exists'
        });
    }
    const user=await userModel.create({
        username,email,password
    });
    //token create karna hai user ke liye jab wo register karega to usko token milega jisse wo apne aap ko authenticate kar sakega jab bhi wo login karega ya koi protected route access karega to us token ka use karega apne aap ko authenticate karne ke liye
    const token=jwt.sign(
        {id:user._id}, //token me user ka id store kar raha hu jisse wo apne aap ko authenticate kar sakega jab bhi wo login karega ya koi protected route access karega to us token ka use karega apne aap ko authenticate karne ke liye
        process.env.JWT_SECRET //secret key jo ki .env file me store hai jisse token create karne ke liye use karunga
    );
    res.cookie('token',token); //token ko cookie me store kar raha hu jisse wo client side me store ho jaye aur jab bhi user login karega ya koi protected route access karega to us token ka use karega apne aap ko authenticate karne ke liye

    res.status(201).json({
        message:'User registered successfully',
        user
    });
}

module.exports={registerUser};