const Job = require("../models/JobModel");

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user_id: req.user.userId }).sort("createdAt");
    if (jobs) {
      return res.status(200).json({ status: "success", message: jobs });
    }
    return res.status(404).json({ status: "failed", message: "Not found" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error });
  }
};

const createJob = async (req, res) => {
  try {
    req.body.user_id = req.user.userId;
    const job = await Job.create(req.body);
    if (job) {
      return res.status(201).json({
        status: "success",
        message: "Job Created successfully",
        job: job,
      });
    }
    return res
      .status(400)
      .json({ status: "failed", message: "Something went wrong, try again" });
  } catch (error) {
    return res.json({ status: "failed", message: error });
  }
};

const editJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;

    const job = await Job.findOne({ _id: jobId, user_id: userId });
    if (!job) {
      return res
        .status(404)
        .json({ status: "failed", message: "Job not found, try again" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Job found", data: job });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
};

const updateJob = async (req, res) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req;

    if (company === "" || position === "") {
      return res.status(500).json({
        status: "failed",
        message: "Please provide the company and position data",
      });
    }
    const job = await Job.findByIdAndUpdate(
      { _id: jobId, user_id: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      return res
        .status(404)
        .json({ status: "failed", message: "Job not found, try again" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Job found", data: job });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
};

const deleteJob = async (req, res) => {
  try {
    const {
      user: userId,
      params: { id: jobId },
    } = req;

    const job = await Job.findByIdAndRemove({ _id: jobId, user_id: userId });
    if (!job) {
      return res
        .status(404)
        .json({ status: "failed", message: "Job not found, try again" });
    }
    return res.status(200).json({
      status: "success",
      message: "Job deleted successfully",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
};

module.exports = { getJobs, createJob, editJob, updateJob, deleteJob };
