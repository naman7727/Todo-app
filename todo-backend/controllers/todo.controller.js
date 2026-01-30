const Todo = require("../models/Todo");


exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      boardId: req.params.boardId,
      userId: req.user.uid,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getTodosByBoard = async (req, res) => {
  try {
    const todos = await Todo.find({
      boardId: req.params.boardId,
      userId: req.user.uid,
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.uid,
      },
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.uid,
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
