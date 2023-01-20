require("dotenv").config();
const connectDB = require("./db/connection");
const router = require("./router/connectionrouter");
const express = require("express");
const app = express();

const conn = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

app.use(express.static("/public"));
app.use(express.json());

app.use("/api/v1/", router);

const start = async () => {
  try {
    await connectDB(conn);
    console.log("db connected...");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
