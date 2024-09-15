
const express = require("express")
const mongoose = require("mongoose")
const { UserModel, TodoModel } = require("./db.js");
const cors = require("cors")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid") 
const JWT_SECRET = "iloveyou"
const app = express()
const PORT = 3006;

// let users =[{
//     username:"TEST",
//     password:"test123",
//     todos:[
//         {
//             id:1,
//             todo:"Gym"
//         }
//     ]
// }]


async function connectDB(){
    try{
       await mongoose.connect('mongodb+srv://piyushsavale:o4rbYCxa6JxkBcR6@cluster0.qiepnx5.mongodb.net/Piyush-Todo-Database')

    }catch(e){
        console.log(e)
    }
}

connectDB()

app.use(express.json())
app.use(cors())
function auth(req,res,next){
    let token = req.headers.token;

    decodedUsername = jwt.verify(token,JWT_SECRET)
    if(decodedUsername.id){
        req.userId = decodedUsername.id
        next()
    }else{
        res.json({message:"Not logged In"})
    }

}
app.post("/signup",async (req,res)=>{
    try{
        const email = req.body.email
        const username = req.body.username;
        const password = req.body.password;
        
        let foundUser = null;

        // foundUser = users.find(user => user.username === username)

        foundUser = await UserModel.findOne({
            email:email
        })

        if(foundUser){
            return res.status(409).json({ message: "User already exists" });
        }
        
        else{
            // users = [...users,{username,password,todos:[]}];

            await UserModel.create({
                email,
                username,
                password
            })

            res.json({message:"Successfully added user"})
        }

    }
    catch(err){
        res.status(500).json({ message: "Failed to add user", error: err.message });   
     }

    // console.log(users)
})

app.post("/signin", async (req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        let foundUser = null;
        // foundUser = users.find(user => user.username === username && user.password === password)
        foundUser = await UserModel.findOne({
            email:email,
            password:password
        })
        console.log(foundUser)
        if(foundUser){
            let token = jwt.sign({id:foundUser._id.toString()},JWT_SECRET)
            res.status(200).json({token:token,message:"Signed In"})
        }
        else{
            res.status(404).json({message:"Coudnt sign in"})
        }
    }catch(err){
        res.json({message:"Coudnt sign in",error:err})
    }
})


app.get("/todos",auth, async (req,res)=>{
    try{


        // let foundUser = null;

        // foundUser = users.find(user => user.username === req.username)

        // foundUser = UserModel.findOne({
        //     _id:req.userId
        // })

        // if(foundUser){
        //     const todos =  await TodoModel.find({
        //         userId:foundUser._id
        //     })

            const todos = await TodoModel.find({
                userId:req.userId
            })

            const user = await UserModel.findOne({
                _id: req.userId.username// Correctly use _id to find the user
            });
            

            res.json({todos,user})
        
    }catch(err){
        res.json({error:err})
    }
})

app.post("/todos",auth, async (req,res)=>{
    try{
       
        const todo = req.body.todo
        

        await TodoModel.create({
            description:todo,
            isCompleted:false,
            userId:req.userId
        }


        )
        

        // let foundIndex = users.findIndex(user => user.username === req.username)

        let todos = await TodoModel.find({userId:req.userId})
        // if(foundIndex !== -1){
        //     users[foundIndex].todos.push({id:uuidv4(),todo:todo})
           
            
        // }

        res.json({todos})
        
    }catch(err){
        res.json({message:"Could not add todo", error:err})
    }
})

app.delete("/todos",auth,async (req,res)=>{
    try{
        
        const todoId = req.body.id;
   

        

        // let foundIndex = users.findIndex(user => user.username === req.username)

        // if(foundIndex!==-1){
        //     users[foundIndex].todos = users[foundIndex].todos.filter(todo => todo.id !== todoId)
        // }


        await TodoModel.deleteOne({
            _id:todoId
        })

        let todos = await TodoModel.find({userId:req.userId})
        res.json({todos})
        console.log(todos)
      

    }catch(err){
        res.json({message:"Codunt delete todo"})
    }
})
app.listen(PORT , ()=>{
    console.log("App is running")
})



