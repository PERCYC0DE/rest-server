const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");
const validateRoles = require("../middlewares/validateRole");

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRoles,
};
