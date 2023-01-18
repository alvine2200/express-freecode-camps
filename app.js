const express = require("express");
const port = 3000;
const tasks = require("./routes/tasks");
const connectDB = require("./databse/connection");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello home");
});

app.use(express.json());
//get all tasks
app.use("/api/v1/tasks", tasks);

//create new tasks
app.post("/api/vi/tasks", (req, res) => {
  //perform tasks here
});

//edit tasks
app.get("api/v1/tasks/:id", (req, res) => {
  //perform tasks here
});

//update tasks
app.put("api/v1/tasks/:id", (req, res) => {
  //perform tasks here
});

//delete task
app.delete("api/v1/tasks/:id", (req, res) => {
  //perform tasks here
});

const start = async () => {
  try {
    await connectDB();
    console.log("Database connected...");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
