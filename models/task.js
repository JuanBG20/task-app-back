const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  client: String,
  canceled: { type: Boolean, default: false },
  done: { type: Boolean, default: false },
  description: { type: String, required: true },
  limitDate: String,
  budget: Number,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
