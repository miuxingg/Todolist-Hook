const mongoose = require("mongoose");
const taskSkhema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task must be require"],
    },
    status: {
      type: Boolean,
      required: [true, "status must be require"],
    },
    author: {
      type: String,
      required: [true, "Author must be require"],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", taskSkhema);
module.exports = Task;
