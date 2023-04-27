const { response } = require("express");
const { CategoryModel } = require("../models");

const getAllCategories = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.params;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    CategoryModel.countDocuments(query),
    CategoryModel.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "name"),
  ]);

  res.json({
    total,
    categories,
  });
};

const getOneCategory = async (req, res = response) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id).populate("user", "name");
  res.json(category);
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await CategoryModel.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      message: `La categoria ${categoryDB.name} ya existe.`,
    });
  }

  // Create data to save
  const data = {
    name,
    user: req.user._id,
  };

  const category = await new CategoryModel(data);
  await category.save();

  res.status(201).json(category);
};

const updateCategory = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await CategoryModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json(category);
};

const deleteCategory = async (req, res = response) => {
  const { id } = req.params;
  const categoryDeleted = await CategoryModel.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json(categoryDeleted);
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
