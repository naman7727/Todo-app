const Board = require("../models/Board");

exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      userId: req.user.uid,
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user.uid });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.uid },
      { title: req.body.title },
      { new: true }
    );

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.uid,
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json({ message: "Board deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
