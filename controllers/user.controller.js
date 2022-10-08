const { response } = require("express");

const getUsers = (req, res = response) => {
  res.json({
    message: "Get Users API",
  });
};

const createUser = (req, res = response) => {
  const data = req.body;
  res.json({
    data,
  });
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
