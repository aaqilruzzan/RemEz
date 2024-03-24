import jwt from "jsonwebtoken";
import userModel from "../models/user.js"; 

// Middleware to protect routes
const requireAuth = async (req, res, next) => {
  if (req.path === "/login" || req.path === "/register") {
    return next();
  }

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findOne({ _id: decodedToken._id }).select("_id");
    console.log("User is authenticated");
    next();
  } catch (error) {
    console.log("Error while authenticating:", error);
    return res.status(401).send({ error: "Request is not authorized" });
  }
};

export default requireAuth;
