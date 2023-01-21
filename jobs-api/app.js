require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.static("public"));
app.use(express.json());

const start = async (req, res) => {
  try {
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch (error) {
    res.status(500).json({ status: "fail", reason: error });
  }
};

start();
