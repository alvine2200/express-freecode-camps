const jwt = require("jsonwebtoken");
require("dotenv").config();

const AuthenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      status: "failed",
      message: `Not Auhorized to view this page,Login first`,
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded) {
      return res.status(403).json({
        status: "failed",
        message: `Cant view This page, Login first`,
      });
    }
    next();
    // return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "error", error: error });
  }
};

module.exports = AuthenticationMiddleware;
