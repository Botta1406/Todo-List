import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap
import "./App.css"; // ✅ Custom styles

const API_URL = "http://localhost:5003/todos"; // Backend API URL

function App() {
    const [todos, setTodos] = useState([]);

    // ✅ Fetch todos from backend
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error("❌ Error fetching todos:", error));
    }, []);

    // ✅ Add a new todo
    const addTodo = async (title, completed) => {
        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, completed }), // Send completed status
            });

            if (!res.ok) throw new Error("Failed to add todo");

            const newTodo = await res.json();
            setTodos([...todos, newTodo]); // ✅ Update state with new todo
        } catch (error) {
            console.error("❌ Error adding todo:", error);
        }
    };

    // ✅ Delete a todo
    // ✅ Delete a todo with confirmation and success popup
const deleteTodo = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) return; // Cancel deletion if user clicks "Cancel"

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete todo");

        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id)); // ✅ Remove from UI

        // ✅ Show success message
        window.alert("Todo deleted successfully!");
    } catch (error) {
        console.error("❌ Error deleting todo:", error);
        window.alert("Failed to delete todo. Please try again.");
    }
};


    // ✅ Edit a todo
    const editTodo = async (id, newTitle) => {
        console.log("🛠️ Updating Todo ID:", id);
        console.log("📝 New Title:", newTitle);

        try {
            const response = await fetch(`http://localhost:5003/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle }),
            });

            if (!response.ok) {
                throw new Error("Failed to update todo");
            }

            const updatedTodo = await response.json();
            console.log("✅ Updated Todo:", updatedTodo);

            // ✅ Ensure UI updates with the new data
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id ? updatedTodo : todo
                )
            );
        } catch (error) {
            console.error("❌ Error updating todo:", error);
            alert("Failed to update todo. Please try again.");
        }
    };

    return (
        <div className="container my-4">
            <h1 className="text-center text-primary font-bold">Todo App</h1>
            <div className="card p-3 shadow">
                <AddTodo addTodo={addTodo} />
                <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo} />
            </div>
        </div>
    );
}

export default App;
