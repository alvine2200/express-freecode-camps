const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./db/connection");
const router = require("./router/connectionrouter");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static("/public"));
app.use(express.json());

app.use("/api/vi/", router);

const start = async () => {
  try {
    await connectDB();
    console.log("db connected...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
