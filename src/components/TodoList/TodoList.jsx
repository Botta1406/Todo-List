
import { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaCheck, FaTimes } from "react-icons/fa";
import axios from 'axios';

const TodoList = ({ todos, onDelete, onEdit, onToggleComplete }) => {
    const [editingId, setEditingId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    const handleEditClick = (todo) => {
        setEditingId(todo._id);
        setEditedTitle(todo.title);
    };

    const handleSave = async (id) => {
        try {
            const response = await axios.put(`http://localhost:5003/api/todos/${id}`, { 
                title: editedTitle 
            });
    
            console.log("✅ Todo updated:", response.data);
    
            alert("✅ Todo updated successfully!");
    
            // Update the todo list immediately in the UI
            onEdit(id, editedTitle);
    
            // Reset editing state
            setEditingId(null);
            setEditedTitle("");  // This ensures the text box is updated
        } catch (error) {
            console.error("❌ Error updating todo:", error.response?.data || error);
            alert("❌ Failed to update todo. Please try again.");
        }
    };
    

    return (
        <div className="mt-3">
            {todos.map((todo) => (
                <div 
                    key={todo._id} 
                    className={`d-flex align-items-center justify-content-between p-2 border rounded mb-2 ${todo.completed ? 'bg-light' : ''}`}
                >
                    <div className="d-flex align-items-center">
                        {/* Completion status toggle */}
                        <button 
                            className={`btn btn-sm me-2 text-white ${todo.completed ? 'bg-success' : 'bg-danger'}`}
                            onClick={() => onToggleComplete(todo._id, !todo.completed)}
                            title={todo.completed ? "Mark incomplete" : "Mark complete"}
                        >
                            {todo.completed ? <FaCheck /> : <FaTimes />}
                        </button>

                        {/* Todo title or edit input */}
                        {editingId === todo._id ? (
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="form-control"
                                onKeyDown={(e) => e.key === 'Enter' && handleSave(todo._id)}
                                style={{ width: '200px' }}
                            />
                        ) : (
                            <span className={todo.completed ? 'text-muted' : ''}>
                                {todo.title}
                            </span>
                        )}
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        {editingId === todo._id ? (
                            <button 
                                className="btn btn-sm btn-success" 
                                onClick={() => handleSave(todo._id)}
                            >
                                <FaSave />
                            </button>
                        ) : (
                            <button 
                                className="btn btn-sm btn-warning" 
                                onClick={() => handleEditClick(todo)}
                            >
                                <FaEdit />
                            </button>
                        )}
                        <button 
                            className="btn btn-sm btn-danger" 
                            onClick={() => onDelete(todo._id)}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
