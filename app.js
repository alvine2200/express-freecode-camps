const express = require("express");
const port = 3000;
const tasks = require("./routes/tasks");
const connectDB = require("./databse/connection");

const app = express();

app.use(express.static("/public"));
app.use(express.json());
//get all tasks
app.use("/api/v1/tasks", tasks);

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
