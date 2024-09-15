import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Me = () => {
    const token = localStorage.getItem("token");
    const [activeUser, setActiveUser] = useState();
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [completedTodos, setCompletedTodos] = useState([]); // To track completed todos
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("https://todoappbackend-qqai.onrender.com/todos", {
                    headers: {
                        token: token
                    }
                });
                console.log(response);
                setTodos(response.data.todos);
                setActiveUser(response.data.user.username);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    console.log(todos)
    const handleTodoInputChange = (e) => {
        setTodo(e.target.value);
    };

    const handleAddTodo = async () => {
        try {
            const response = await axios.post("https://todoappbackend-qqai.onrender.com/todos", { todo }, {
                headers: {
                    token: token
                }
            });
            setTodos(response.data.todos);
            console.log(response.data.todos);
            setTodo("");
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            const response = await axios.delete("https://todoappbackend-qqai.onrender.com/todos", {
                data: { id },
                headers: {
                    token: token
                }
            });
            console.log(response);
            setTodos(response.data.todos || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleComplete = (id) => {
        setCompletedTodos((prevCompleted) =>
            prevCompleted.includes(id)
                ? prevCompleted.filter(todoId => todoId !== id)
                : [...prevCompleted, id]
        );
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <>
            <div className="header-container">
                <h1 className="todo-h1">Welcome {activeUser},</h1>
                <button className="btn-3" onClick={handleLogoutClick}>
                    <span className="material-symbols-outlined logout">logout</span>
                    <h3>Logout</h3>
                </button>
            </div>

            <h1 className="todo-h2">Your Todo's</h1>
            <div className="todo">
                <input
                    onChange={handleTodoInputChange}
                    value={todo}
                    className="inp"
                    type="text"
                />
                <button onClick={handleAddTodo} className="add">Add</button>
            </div>

            <div className="todo-container">
                {todos.map(({_id, description }) => (
                    <div key={_id} className="todos">
                        <h2
                            className={`h5 ${completedTodos.includes(_id) ? "completed" : ""}`}
                        >
                            {description}
                        </h2>
                        <button onClick={() => handleDeleteTodo(_id)} className="delete">
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                        <button onClick={() => handleToggleComplete(_id)} className="check">
                            <span className="material-symbols-outlined">check_circle</span>
                        </button>
                    </div>
                ))}-
            </div>
        </>
    );
};

export default Me;
