import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

function App() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text) => {
        setTodos([...todos, { id: Date.now(), text }]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    return (
        <div className="app-container">
            <Header />
            <AddTodo onAdd={addTodo} />
            <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
        </div>
    );
}

export default App;
