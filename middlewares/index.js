const validaCampos = require("../middlewares/validateFields");
const validarJWT = require("../middlewares/validateJWT");
const validaRoles = require("../middlewares/validateRole");

module.exports = {
  ...validaCampos,
  ...validarJWT,
  ...validaRoles,
};
