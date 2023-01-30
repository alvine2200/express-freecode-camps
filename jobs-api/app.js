require("dotenv").config();
const connectDB = require("./db/connectionDB");
const conn = process.env.MONGO_URL;
const router = require("./routes/router");
const file_upload = require("express-fileupload");

//SECURITY PACKAGES
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
var bodyParser = require("body-parser");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//enable if behind proxy by app.set('trust proxy',1)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //request per 15minutes
  max: 100, //limit 100 requests to 15minutes
});

// app.use(limiter());
app.use(file_upload({ createParentPath: true }));
app.use(cors());
app.use(xss());
app.use(helmet());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine", "ejs");
app.use("/api/v1/", router);

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
