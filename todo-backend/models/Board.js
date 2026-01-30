const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", boardSchema);
