const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { UserModel } = require("../models/");

const getUsers = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const [total, users] = await Promise.all([
    UserModel.countDocuments({ status: true }),
    UserModel.find({ status: true }).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({
    total,
    users,
  });
};

const createUser = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new UserModel({
    name,
    email,
    password,
    role,
  });

  // Encrypt password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  // Save data
  await user.save();
  res.status(201).json(user);
};

const updateUser = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...data } = req.body;

  // Validate into database
  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    data.password = bcryptjs.hashSync(password, salt);
  }

  const user = await UserModel.findByIdAndUpdate(id, data);

  res.json({
    message: "User updated successfully",
    data: user,
  });
};

const deleteUser = async (req, res = response) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndUpdate(id, { status: false });
  res.json(user);
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
