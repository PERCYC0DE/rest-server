const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { UserModel } = require("../models");

const collectionsAllowed = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res) => {
  isMongoID = ObjectId.isValid(term); // Return true or false

  if (isMongoID) {
    const user = await UserModel.findById(term);
    res.json({
      results: user ? [user] : [],
    });
  }
};

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      message: `Las colecciones permitidas son: ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      break;
    case "products":
      break;
    default:
      break;
  }

  res.json({ collection, term });
};

module.exports = {
  search,
};
