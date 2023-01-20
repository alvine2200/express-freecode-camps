const Tasks = require("../models/TaskModel");

const getAllTasks = async (req, res) => {
  try {     
    const task = await Tasks.find({});
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ status: error.errors.name.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    return res.status(201).json({ task });
  } catch (error) {
    return res.status(500).json({ status: error.errors.name.message });
  }
};

const editTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Tasks.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ status: `No task with id: ${taskID}` });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ status: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Tasks.findByIdAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ status: `No task with id: ${taskID}` });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ status: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Tasks.findByIdAndDelete({ _id: taskID });
    if (!task) {
      res.status(404).json(`id not found ${taskID}`);
      return;
    }
    res.status(200).json({ task: null, status: "success" });
    return;
  } catch (error) {
    res.status(500).json({ status: error });
    return;
  }
};

module.exports = {
  getAllTasks,
  createTask,
  editTask,
  updateTask,
  deleteTask,
};
