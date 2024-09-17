
const express = require("express")
const mongoose = require("mongoose")
const { UserModel, TodoModel } = require("./db.js");
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const JWT_SECRET = "iloveyou"
const {z} = require("zod")
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
        const requiredBody = z.object({
            email:z.string().min(11).max(50).email(),
            username:z.string().min(3).max(50),
            password:z.string().min(3).max(50)        
                            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                            .regex(/[0-9]/, "Password must contain at least one number")
                            .regex(/[\W_]/, "Password must contain at least one special character")
        })
    
        const parsedData = requiredBody.safeParse(req.body)
    
        if(!parsedData.success){
            res.status(400).json({message:"Invalid format",error:parsedData.error})
            return
        }
        const email = parsedData.data.email
        const username = parsedData.data.username;
        const password = parsedData.data.password;
        
        const hashedPassword = await  bcrypt.hash(password,5)
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
                password:hashedPassword
            })

            res.status(201).json({message:"Successfully added user"})
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
        })
        console.log(foundUser)


        if (!foundUser) {
            return res.status(404).json({ message: "Invalid credentials" });
        }


        const passwordMatch = await bcrypt.compare(password,foundUser.password)
        if(passwordMatch){
            let token = jwt.sign({id:foundUser._id.toString()},JWT_SECRET)
            res.status(200).json({token:token,message:"Signed In"})
        }
        else{
            res.status(404).json({message:"Invalid Credentials"})
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

            const user = await UserModel.findById(req.userId)
            

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
app.patch("/todos",auth,async (req,res)=>{
    const id = req.body.id;


    try{
        const todo = await TodoModel.findById(id)

        if(!todo){
             return res.status(404).json({message:"Todo Not Found"})
        }



        const completeTodo = await TodoModel.updateOne(
            {_id:id},
            {$set : {isCompleted : !todo.isCompleted}}

            
        )

        res.status(200).json({message:"Todo updated"})
    }catch(err){
        res.status(409).json({message : "Todo update failed",error:err})
    }
})
app.listen(PORT , ()=>{
    console.log("App is running")
})



