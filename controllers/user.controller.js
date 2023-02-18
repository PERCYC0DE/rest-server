const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user.js");

const getUsers = (req, res = response) => {
  res.json({
    message: "Get Users API",
  });
};

const createUser = async (req, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json(errors);
  }
  const { name, email, password, role } = req.body;
  const user = new User({
    name,
    email,
    password,
    role,
  });

  // Validate if email exists
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    return res.status(400).json({
      message: "Hubo un error al intentar crear el usuario con ese email",
    });
  }

  // Encrypt password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  // Save data
  await user.save();
  res.json(user);
};

const updateUser = (req, res = response) => {
  res.json({
    data: req.body,
  });
};

const deleteUser = (req, res = response) => {
  res.json({
    message: "Delete User API",
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
