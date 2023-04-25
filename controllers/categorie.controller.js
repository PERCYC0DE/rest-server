const { response } = require("express");
const { Category } = require("../models");

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      message: `La categoria ${categoryDB.name} ya existe.`,
    });
  }

  // Create data to save
  const data = {
    name,
    user: req.usuario._id,
  };

  const category = await new Category(data);
  await category.save();

  res.json(category);
};

module.exports = {
  createCategory,
};
