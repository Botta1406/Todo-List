import Todoitem from "../Todoitem/Todoitem";
import "./TodoList.css";

function TodoList({ todos, onDelete, onEdit }) {
    return (
        <div className="todo-list">
            {todos.length === 0 ? (
                <p className="empty-message">No tasks yet. Add one!</p>
            ) : (
                todos.map(todo => (
                    <Todoitem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} />
                ))
            )}
        </div>
    );
}

export default TodoList;
