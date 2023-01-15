const express = require("express")

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {UserModel} = require("../model/user.model")
const cors = require('cors')



const uesrRouter = express.Router()
uesrRouter.use(cors())
uesrRouter.get("/show",async(req,res)=>{
  try {
    let data =await UserModel.find()
    res.send(data)
  } catch (error) {
    
  }
})

//register
uesrRouter.post("/register", async (req, res) => {
    const {email,name,pass} = req.body;
   
    try {
      bcrypt.hash(pass,5, async(err, securepassword)=> {
        // Store hash in your password DB.
   

        if(err){
          console.log(err)
        }else{
           //only single user //insertMany for multiple user
      const user = new UserModel({email,name,pass:securepassword});
      await user.save();
     
      res.send({"msg":"Registerd"});
        }
    });
     
    } catch (error) {
      res.send("Error while Registering the user");
      console.log(error);
    }
  });
  
  
  //login
  uesrRouter.post("/login", async (req, res) => {
    const { name, pass } = req.body;
    try {
      const user = await UserModel.find({name});
      if (user.length > 0) {
        
        bcrypt.compare(pass, user[0].pass, (err, result)=> {
          // result == true
          console.log(user[0])
          if(result){
            var token = jwt.sign({ userID : user[0]._id }, 'masai');
            res.send({"msg" : "Login Succesful",token});
          }else{
            res.send({"msg":"Wrong Credintional"});
          }
      });
      } else {
        res.send({"msg":"Wrong Credintional"});

      }
    } catch (error) {
      // res.send("Wrong Credintional");
      console.log(error);
    }
  });
  
  module.exports={
    uesrRouter
  }