require("dotenv").config();
const connectDB = require("./db/connectionDB");
const conn = process.env.MONGO_URL;

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes/router");

app.use(express.static("public"));
app.use(express.json());

app.use("api/v1/", router);

const start = async (req, res) => {
  try {
    // await connectDB(conn);
    // console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
