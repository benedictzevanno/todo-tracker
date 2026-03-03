const { Todo } = require("../models");

// List all todos
const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({ order: [["createdAt", "DESC"]] });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

// Get a single todo by ID
const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Create a new todo
const createTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const todo = await Todo.create({
      title,
      description: description || null,
      completed: completed ?? false,
    });

    res.status(201).json(todo);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({ error: "Validation error", messages });
    }
    next(error);
  }
};

// Update an existing todo
const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const { title, description, completed } = req.body;

    await todo.update({
      title: title !== undefined ? title : todo.title,
      description: description !== undefined ? description : todo.description,
      completed: completed !== undefined ? completed : todo.completed,
    });

    res.json(todo);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({ error: "Validation error", messages });
    }
    next(error);
  }
};

// Delete a todo
const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todo.destroy();
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
