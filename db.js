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

module.exports ={UserModel,TodoModel}