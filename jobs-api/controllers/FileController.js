const fileModels = require("../models/fileModels");

const fileUpload = async (req, file, res) => {
  const { file } = req.body;
  const upload = await fileModels.create({
    name: file,
  });
  console.log(upload);
  return res.status(201).json({ message: "File uploaded successfuly" });
};
