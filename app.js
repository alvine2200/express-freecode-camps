const express = require("express");
const mongoose = require("mongoose");
const port = 300;
const app = express();

//get all tasks
app.get("/api/v1/tasks", (req, res) => {
  //perform tasks here
});

//create new tasks
app.post("/api/vi/create", (req, res) => {
  //perform tasks here
});

//edit tasks
app.get("api/v1/edit_tasks/:id", (req, res) => {
  //perform tasks here
});

//update tasks
app.put("api/v1/update_task/:id", (req, res) => {
  //perform tasks here
});

//delete task
app.delete("api/v1/delete_tasks/:id", (req, res) => {
  //perform tasks here
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
