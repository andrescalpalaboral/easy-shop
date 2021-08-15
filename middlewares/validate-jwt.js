const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const { environmentVariables } = require("../config");
const UserSchema = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({
        msg: "There is no token",
      });
    }

    const { uid } = jwt.verify(token, environmentVariables.jwt_secret_key);
    const userAuthenticated = await UserSchema.findById(uid);

    if (
      !userAuthenticated ||
      (userAuthenticated && !userAuthenticated.status)
    ) {
      return res.status(401).json({
        msg: "User token not found",
      });
    }

    req.userAuthenticated = userAuthenticated;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Invalid token",
    });
  }
};

module.exports = { validateJWT };
