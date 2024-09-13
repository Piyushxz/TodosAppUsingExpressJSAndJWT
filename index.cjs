
const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid") 
const JWT_SECRET = "iloveyou"
const app = express()
const PORT = 3006;

let users =[{
    username:"TEST",
    password:"test123",
    todos:[
        {
            id:1,
            todo:"Gym"
        }
    ]
}]



app.use(express.json())
app.use(cors())
function auth(req,res,next){
    let token = req.headers.token;

    decodedUsername = jwt.verify(token,JWT_SECRET)
    if(decodedUsername.username){
        req.username = decodedUsername.username
        next()
    }else{
        res.json({message:"Not logged In"})
    }

}
app.post("/signup",(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        
        let foundUser = null;

        foundUser = users.find(user => user.username === username)

        if(foundUser){
            return res.status(409).json({ message: "User already exists" });
        }
        
        else{
            users = [...users,{username,password,todos:[]}];

            res.json({message:"Successfully added user"})
        }

    }
    catch(err){
        res.status(500).json({ message: "Failed to add user", error: err.message });   
     }

    console.log(users)
})

app.post("/signin",(req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;

        let foundUser = null;
        foundUser = users.find(user => user.username === username && user.password === password)

        if(foundUser){
            let token = jwt.sign({username:username},JWT_SECRET)
            res.status(200).json({token:token,message:"Signed In"})
        }
        else{
            res.status(404).json({message:"Coudnt sign in"})
        }
    }catch(err){
        res.json({message:"Coudnt sign in",error:err})
    }
})


app.get("/todos",auth, (req,res)=>{
    try{


        let foundUser = null;

        foundUser = users.find(user => user.username === req.username)

        if(foundUser){
            res.json({username:foundUser.username ,todos:foundUser.todos})
        }else{
            res.json({message:"Codunt find user"})
        }
    }catch(err){
        res.json({error:err})
    }
})

app.post("/todos",auth,(req,res)=>{
    try{
       
        const todo = req.body.todo
        

        

        let foundIndex = users.findIndex(user => user.username === req.username)

        if(foundIndex !== -1){
            users[foundIndex].todos.push({id:uuidv4(),todo:todo})
           
            
        }

        res.json({todos:users[foundIndex].todos,message:`${todo} added to User ${users[foundIndex].username}`})
        console.log(users[foundIndex].todos)
    }catch(err){
        res.json({message:"Could not add todo", error:err})
    }
})

app.delete("/todos",auth,(req,res)=>{
    try{
        
        const todoId = req.body.id;
   

        

        let foundIndex = users.findIndex(user => user.username === req.username)

        if(foundIndex!==-1){
            users[foundIndex].todos = users[foundIndex].todos.filter(todo => todo.id !== todoId)
        }

        res.json({todos:users[foundIndex].todos,message:`todo with${todoId} removed`})
        console.log(users[foundIndex].todos)
      

    }catch(err){
        res.json({message:"Codunt delete todo"})
    }
})
app.listen(PORT , ()=>{
    console.log("App is running")
})



