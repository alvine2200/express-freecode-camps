const express = require("express");
const Job = require("../models/UserModel");

const getJobs = async (req, res) => {
  res.send("get All jobs page");
};

const createJob = async (req, res) => {
  res.send("createJob page");
};

const editJob = async (req, res) => {
  res.send("editJob page");
};

const updateJob = async (req, res) => {
  res.send("update jobs page");
};

const deleteJob = async (req, res) => {
  res.send("delete jobs page");
};

module.exports = { getJobs, createJob, editJob, updateJob, deleteJob };
