//### node packages ###################################
const express = require("express");
//### Setting up router module and importing User model ######################################
const authRouter = express.Router();
const User = require("../models/models").User;





//### sign up form ########################
authRouter.post("/signUp",function(req,res){
   User.findOne({ email: req.body.email },function(err,docs){ //### checking if account already exists
        if(docs === null){
           if(req.body.password === req.body.passwordCheck){ //### checking passwords are ok
               User.create(req.body,function(err , user){
                   if(err != null){
                       res.render("index",{error:"Issue with database server please try again"});
                   }else{
                    res.cookie("useId", user._id,{ expires: 0});
                    res.cookie("userName",user.name,{ expires: 0});
                    res.render("chat",{ userName: user.name , teams: user.teams , freeAgentId: user.freeAgentProfile , requests: user.requests}); 
                   }   
               });
           }else{
            res.render("index",{error:"password check failed"});
           }
        }else{
            res.render("index",{error:"email is already used"});
        }  
    })
});

//### log in form ######################
authRouter.post("/logIn",function(req,res){
    User.findOne({ email:req.body.email , password: req.body.password },function(err,user){
        if(user === null){
            res.render("index",{error:"user not found"});
        }else{
            res.cookie("useId",user._id ,{ expires: 0});
            res.cookie("userName",user.name,{ expires: 0});
            res.render("chat",{ userName: user.name });
        }
    })
});





module.exports = authRouter;