const Role = require("../models/rol");
const User = require("../models/user");

const isRoleValid = async (rol = "") => {
  const existsRol = await Role.findOne({ rol });
  if (!existsRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const isExistsEmail = async (email = "") => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error(`El email ${email} ya esta registrado`);
  }
};

const existsUserForID = async (id = "") => {
  const existsUser = await User.findById(id);
  if (!existsUser) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = {
  isRoleValid,
  isExistsEmail,
  existsUserForID,
};
