const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { home, login, register } = require("../controllers/UserController");
const {
  getJobs,
  createJob,
  editJob,
  updateJob,
  deleteJob,
} = require("../controllers/JobsController");

router.route("/home").get(auth, home);
router.route("/register").post(register);
router.route("/login").post(login);

router.route("/jobs").get(auth, getJobs).post(auth, createJob);
router
  .route("/jobs/:id")
  .get(auth, editJob)
  .patch(auth, updateJob)
  .delete(auth, deleteJob);

module.exports = router;
