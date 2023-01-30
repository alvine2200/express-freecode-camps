const fileModels = require("../models/fileModels");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fileUpload = async (req, res) => {
  try {
    if (!req.files) {
      res.status(500).json({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let image = req.files.image;

      //Use the mv() method to place the file in the upload directory (i.e. "uploads")
      image.mv("./uploads/" + image.name);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: image.name,
          mimetype: image.mimetype,
          size: image.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { fileUpload };
