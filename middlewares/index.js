const jwtValidations = require("../middlewares/validate-jwt");
const roleValidations = require("../middlewares/validate-role");
const fieldValidations = require("../middlewares/validateFields");

module.exports = {
  ...jwtValidations,
  ...roleValidations,
  ...fieldValidations,
};
