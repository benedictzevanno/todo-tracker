const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// List all todos
router.get("/", getAllTodos);

// Get a single todo
router.get("/:id", getTodoById);

// Create a new todo
router.post("/", createTodo);

// Update a todo
router.put("/:id", updateTodo);

// Delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
