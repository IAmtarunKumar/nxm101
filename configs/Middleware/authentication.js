const jwt = require('jsonwebtoken')
// const bycrypt = require('bcrypt')

const authentication = (req,res,next)=>{
const token =req.headers.authorization

if(token){
var decoded = jwt.verify(token, 'masai');
if(decoded){
    // console.log("working")
    const userID = decoded.userID
    console.log(decoded.userID)
    req.body.userID =userID
    next()
}else{
    res.send("First you need to login")
}

}else{
res.send("First you need to login")
}

}

module.exports = {
    authentication
}
