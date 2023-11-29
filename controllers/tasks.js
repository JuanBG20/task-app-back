const Task = require("../models/task");

const postTasks = (req, res) => {
  const newTask = new Task(req.body);

  newTask
    .save()
    .then((task) => res.status(201).json({ ok: true, task }))
    .catch((err) => console.log(err));
};

const getTasks = async (req, res) => {
  const tasks = await Task.aggregate([
    {
      $match: { canceled: false },
    },
    { $sort: { _id: 1 } },
    { $sort: { done: 1 } },
  ]);

  res.status(200).json({ ok: true, tasks });
};

const cancelTasks = async (req, res) => {
  const { id, cancel } = req.params;

  if (cancel === "true") {
    await Task.findByIdAndUpdate(id, { canceled: false });
  } else if (cancel === "false") {
    await Task.findByIdAndUpdate(id, { canceled: true });
  }

  res.status(200).json({ ok: true, message: "Cambio en CANCELED" });
};

const doneTasks = async (req, res) => {
  const { id, done } = req.params;

  if (done === "true") {
    await Task.findByIdAndUpdate(id, { done: false });
  } else if (done === "false") {
    await Task.findByIdAndUpdate(id, { done: true });
  }

  res.status(200).json({ ok: true, message: "Cambio en DONE" });
};

const putTasks = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "No se encontró la tarea" });
    }

    task.client = req.body.client;
    task.description = req.body.description;
    task.budget = req.body.budget;
    task.limitDate = req.body.limitDate;

    const updatedTask = await task.save();
    res.status(200).json({ ok: true, updatedTask });
  } catch {
    res.status(500).send(error);
  }
};

module.exports = {
  postTasks,
  getTasks,
  cancelTasks,
  doneTasks,
  putTasks,
};
