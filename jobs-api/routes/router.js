const express = require("express");
const router = express.Router();
const { home, login, register } = require("../controllers/UserController");
const {
  getJobs,
  createJob,
  editJob,
  updateJob,
  deleteJob,
} = require("../controllers/JobsController");

router.route("/home").get(home);
router.route("/register").post(register);
router.route("/login").post(login);

router.route("/jobs").get(getJobs).post(createJob);
router.route("/jobs/:id").get(editJob).patch(updateJob).delete(deleteJob);

module.exports = router;
