const getAllTasks = (req, res) => {
  res.send("Tasks in the controllers");
};

const createTask = (req, res) => {
  res.json(req.body);
};

const editTask = (req, res) => {
  res.send("edit a task");
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
