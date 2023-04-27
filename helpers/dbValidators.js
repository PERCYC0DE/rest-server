const Role = require("../models/rol");
const { UserModel, CategoryModel, ProductModel } = require("../models");

const isRoleValid = async (rol = "") => {
  const existsRol = await Role.findOne({ rol });
  if (!existsRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const isExistsEmail = async (email = "") => {
  const existsEmail = await UserModel.findOne({ email });
  if (existsEmail) {
    throw new Error(`El email ${email} ya esta registrado`);
  }
};

const existsUserForID = async (id = "") => {
  const existsUser = await UserModel.findById(id);
  if (!existsUser) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existsCategory = async (id) => {
  const existsCategory = await CategoryModel.findById(id);
  if (!existsCategory) {
    throw new Error(`El id ${id} no existe`);
  }
};

const existsProduct = async (id) => {
  const existsProduct = await ProductModel.findById(id);
  if (!existsProduct) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = {
  isRoleValid,
  isExistsEmail,
  existsUserForID,
  existsCategory,
  existsProduct,
};
