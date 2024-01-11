const jwt = require("jsonwebtoken");
const Author = require("../models/authorModel");
const asynchandler = require("express-async-handler");
const authorization = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      req.author = await Author.findById(decodedToken.id).select("-password");
      
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not authorized");
  }
});

module.exports = authorization;
