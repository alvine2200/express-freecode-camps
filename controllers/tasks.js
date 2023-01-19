const Tasks = require("../models/TaskModel");

const getAllTasks = async (req, res) => {
  try {
    const task = await Tasks.find({});
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ status: error.errors.name.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ status: error.errors.name.message });
  }
};

const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Tasks.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ status: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
};

const updateTask = (req, res) => {
  res.send("update a task");
};

const deleteTask = (req, res) => {
  res.send("delete a task");
};

module.exports = {
  getAllTasks,
  createTask,
  editTask,
  updateTask,
  deleteTask,
};
