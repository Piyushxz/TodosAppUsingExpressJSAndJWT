import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
const Me = () =>{
    const token = localStorage.getItem("token")
    const [activeUser,setActiveUser] = useState()
    const [todos,setTodos] = useState()

    useEffect(()=>{
        ( async ()=>{
        try{
            const response = await axios.get("http://localhost:3006/todos",{
                headers:{
                    token:token
                }
            })
            console.log(response.data.todos)
            setTodos(response.data.todos)
            setActiveUser(response.data.username)
        }catch(err){
            console.log(err)
        }

     })
    ()


    },[])
    
    return(
        <>
         <div className="header-container">
            <h1 className="todo-h1">Welcome {activeUser}</h1>
            
            <button className="btn-3">Logout</button>
            
        </div>
        <h1 className="todo-h2">Your Todo's</h1>
        <div className="todo">
            <input className="inp" type="text"/>
            <button className="add">Add</button>

            { <div className="todo-container">
                {
                    todos.map(({id,todo})=>(
                        
                        <div key={id}>
                            <h3>{todo}</h3>
                            <button>Delete</button>
                        </div>
                    
                    )
                )
                }
            </div> }
        </div>
        </>

        
    )
}

export default Me