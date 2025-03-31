import { useState } from "react";
import "./TodoItem.css";

function TodoItem({ todo, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleSave = async (id) => {
        try {
            await axios.put(`http://localhost:5003/api/todos/${id}`, { 
                title: editedTitle 
            });
            onEdit(id, editedTitle);
            setEditingId(null);
            alert('Text updated successfully.');
        } catch (error) {
            console.error('Error saving todo:', error.response ? error.response.data : error.message);
            alert('Failed to update todo. Please try again.');
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSave(); // ✅ Save on Enter
        } else if (e.key === "Escape") {
            setIsEditing(false); // ✅ Cancel on Escape
            setNewTitle(todo.title); // ✅ Revert changes
        }
    };

    return (
        <li className="todo-item">
            {isEditing ? (
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onBlur={handleSave} // ✅ Save on clicking outside
                    onKeyDown={handleKeyDown} // ✅ Handle Enter/Escape
                    className="edit-input"
                    autoFocus // ✅ Focus input automatically
                />
            ) : (
                <span>{todo.title}</span>
            )}

            <div className="buttons">
                {isEditing ? (
                    <button className="save-btn" onClick={handleSave}>
                        Save
                    </button>
                ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                )}
                <button className="delete-btn" onClick={() => onDelete(todo._id)}>
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;

