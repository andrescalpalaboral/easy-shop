const jwtValidations = require("../middlewares/validate-jwt");
const roleValidations = require("../middlewares/validate-role");
const fieldValidations = require("../middlewares/validateFields");
const fileValidatons = require("../middlewares/validate-files");

module.exports = {
  ...jwtValidations,
  ...roleValidations,
  ...fieldValidations,
  ...fileValidatons,
};
