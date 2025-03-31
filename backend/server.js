const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { ObjectId } = mongoose.Types;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/student";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process on connection failure
  });

// Define Schema and Model
const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", TodoSchema);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("✅ Server is running. Use /todos to interact with the API.");
});

// ✅ GET All Todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

// ✅ POST a New Todo
app.post("/todos", async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    
    const newTodo = new Todo({
      title: req.body.title,
      completed: req.body.completed ?? false,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error saving todo", error });
  }
});

// ✅ Update Todo (Fixed)
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Todo ID" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Toggle Complete Status
app.put("/todos/:id/toggle", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Todo ID" });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error toggling status", error });
  }
});

// ✅ DELETE a Todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Deleted Successfully", deletedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

// Server Port
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
