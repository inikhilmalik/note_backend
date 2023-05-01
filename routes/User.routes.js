const express=require("express");
const {UserModel}=require("../models/User.model");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age}=req.body;
    try{
        bcrypt.hash(pass, 5, async(err, hash)=> {
            const user=new UserModel({name,email,pass:hash,age});
            await user.save();
            res.send({"msg":"user is added"});
        });
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try{
        const user=await UserModel.findOne({email});
        if(user)
        {
            bcrypt.compare(pass, user.pass).then(function(result) {
                if(result){
                    const token = jwt.sign({ authorID:user._id,author:user.name }, 'masai');
                    res.send({"msg":"Login Successfull","token":token,name:user.name})
                }
                else{
                    res.send({"msg":"wrong password"})
                }
            });
        }
        else{
            res.send({"msg":"wrong credintial"});
        }
    }catch(err){
        res.status(400).send({"err":err.message})
    }
})

module.exports={userRouter}