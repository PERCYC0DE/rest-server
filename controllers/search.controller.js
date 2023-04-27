const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { UserModel, CategoryModel, ProductModel } = require("../models");

const collectionsAllowed = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term); // Return true or false

  if (isMongoID) {
    const user = await UserModel.findById(term);
    res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const users = await UserModel.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });
  res.json({
    results: users,
  });
};

const searchCategories = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term);

  if (isMongoID) {
    const category = await CategoryModel.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const categories = await CategoryModel.find({ name: regex, status: true });

  res.json({
    results: categories,
  });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoID = ObjectId.isValid(term);

  if (isMongoID) {
    const product = await ProductModel.findById(term).populate(
      "category",
      "name"
    );
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, "i");
  const products = await ProductModel.find({
    name: regex,
    status: true,
  }).populate("category", "name");

  res.json({
    results: products,
  });
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
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    default:
      res.status(500).json({
        message: "Se le olvido hacer esta búsquda",
      });
      break;
  }
};

module.exports = {
  search,
};
