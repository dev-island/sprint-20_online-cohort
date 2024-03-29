const Todo = require("../models/Todo");

const createTodo = async (req, res) => {
  let statusCode = 500;
  try {
    const { title, description, user } = req.body;
    if (!title || !description || !user) {
      statusCode = 400;
      throw new Error("Title and description are required");
    }

    const todo = new Todo({
      title,
      description,
      user,
    });
    await todo.save();
    return res.status(201).json({ todo });
  } catch (error) {
    return res.status(statusCode).json({ error: error.message });
  }
}

const listTodos = async (req, res) => {
  let statusCode = 500;
  try {
    const todos = await Todo.find().populate("user");
    return res.status(200).json({ todos, message: "Todos retrieved successfully" });
  } catch (error) {
    return res.status(statusCode).json({ error: error.message });
  }
};


const getTodo = async (req, res) => {
  let statusCode = 500;
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      statusCode = 404;
      throw new Error("Todo not found");
    }
    return res.status(200).json({ todo });
  } catch (error) {
    return res.status(statusCode).json({ error: error.message });
  }
};

module.exports = {
  getTodo,
  listTodos,
  createTodo,
};
