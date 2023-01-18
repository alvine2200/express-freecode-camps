const mongoose = require("mongoose");
const conn =
  "mongodb+srv://codestepbystep:codestepbystep@cluster0.hp6rxd3.mongodb.net/Practise01?retryWrites=true&w=majority";
mongoose
  .connect(conn)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));
