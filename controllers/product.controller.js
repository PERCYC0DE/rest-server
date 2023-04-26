const { response } = require("express");
const { ProductModel } = require("../models");

const getAllProducts = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.params;
  const query = { status: true };

  const [total, products] = await Promise.all([
    ProductModel.countDocuments(query),
    ProductModel.find(query)
      .populate("user", "name")
      .populate("category", "name")
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

const getOneProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id)
    .populate("user", "name")
    .populate("category", "name");
  res.json(product);
};

const createProduct = async (req, res = response) => {
  const { status, user, ...body } = req.body;

  const productDB = await ProductModel.findOne({ name: body.name });

  if (productDB) {
    return res.status(400).json({
      message: `El producto ${productDB.name} ya existe.`,
    });
  }

  // Create data to save
  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.usuario._id,
  };

  const product = await new ProductModel(data);
  await product.save();

  res.status(201).json(product);
};

const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }
  data.user = req.usuario._id;

  const product = await ProductModel.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const productDeleted = await ProductModel.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json(productDeleted);
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
