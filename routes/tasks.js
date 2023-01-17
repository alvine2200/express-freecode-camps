const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  editTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(editTask).put(updateTask).delete(deleteTask);

module.exports = router;
