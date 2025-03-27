import { useState } from "react";
import "./Todoitem.css";

function Todoitem({ todo, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleSave = () => {
        onEdit(todo.id, newText);
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="edit-input"
                />
            ) : (
                <span>{todo.text}</span>
            )}

            <div className="buttons">
                {isEditing ? (
                    <button className="save-btn" onClick={handleSave}>Save</button>
                ) : (
                    <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>
            </div>
        </div>
    );
}

export default Todoitem;
