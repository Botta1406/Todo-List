import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddTodo({ addTodo }) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("incomplete"); // Default to incomplete

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            toast.error("Please enter a task!");
            return;
        }
        addTodo(title, status === "completed"); // Convert to boolean
        toast.success("Task added successfully!");
        setTitle("");
        setStatus("incomplete"); // Reset to default
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="d-flex align-items-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                {/* Status dropdown */}
                <select 
                    className="form-select mx-2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ width: '120px' }}
                >
                    <option value="incomplete">Incomplete</option>
                    <option value="completed">Completed</option>
                </select>
                
                <button type="submit" className="btn btn-primary">
                    Add Todo
                </button>
            </form>
            <ToastContainer position="bottom-right" autoClose={2000} />
        </>
    );
}

export default AddTodo;