const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const Users = new Schema({
    email:{type:String,unique:true},
    username:String,
    password:String
})


const Todos = new Schema({
    description:String,
    isCompleted:Boolean,
    userId:ObjectId
})



const UserModel = mongoose.model("Users",Users)
const TodoModel = mongoose.model("Todos",Todos)

<<<<<<< HEAD
module.exports ={UserModel,TodoModel}
=======
module.exports ={UserModel,TodoModel}
>>>>>>> 3b21e301fa7e1f80ff499f567e1e9de9add040c7
