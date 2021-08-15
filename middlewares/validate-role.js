const { request, response } = require("express");
const ADMIN_ROLE = "ADMIN_ROLE";

const validateAdminRole = (req = request, res = response, next) => {
  const userAuthenticated = req.userAuthenticated;
  if (!userAuthenticated) {
    return res.status(500).json({
      msg: "JWT has not been validated",
    });
  }

  if (userAuthenticated.role != ADMIN_ROLE) {
    return res.status(401).json({
      msg: "User should have admin role to execute this operation",
    });
  }

  next();
};

const validateIfContainsRole = (roles) => {
  return (req = request, res = response, next) => {
    const userAuthenticated = req.userAuthenticated;
    if (!userAuthenticated) {
      return res.status(500).json({
        msg: "JWT has not been validated",
      });
    }

    if (!roles.includes(userAuthenticated.role)) {
      return res.status(401).json({
        msg: `User should have one of this roles ${roles} to execute this operation`,
      });
    }
    next();
  };
};

module.exports = { validateAdminRole, validateIfContainsRole };
