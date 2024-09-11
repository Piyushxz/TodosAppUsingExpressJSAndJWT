const express = require("express")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "iloveyou"
const app = express()
const PORT = 3001;

let users =[]


app.use(express.json())
app.post("/signup",(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
    
    
        users = [...users,{username,password}];

        res.json({message:"Successfully added user"})
    }
    catch(err){
        res.json({message:"Failed to add user", error:err})
    }

})

app.post("/signin",(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        let foundUser = null;
        foundUser = users.find(user => user.username === username && user.password === password)

        if(foundUser){
            let token = jwt.sign({username:username},JWT_SECRET)
            res.json({token:token,message:"Signed In"})
        }
        else{
            res.json({message:"Coudnt sign in"})
        }
    }catch(err){
        res.json({message:"Coudnt sign in",error:err})
    }
})



app.listen(PORT , ()=>{
    console.log("App is running")
})



