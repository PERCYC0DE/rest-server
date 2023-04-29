const path = require("path");
const fs = require("fs");

const { response } = require("express");
const cloudinary = require("cloudinary").v2;

const { uploadFile } = require("../helpers");
const { UserModel, ProductModel } = require("../models");

// Cloudinary configuration
cloudinary.config(process.env.CLOUDINARY_URL);

// Upload files to Server
const uploadFiles = async (req, res = response) => {
  try {
    // Images
    const pathComplete = await uploadFile(req.files, undefined, "images");
    // Texts
    // const pathComplete = await uploadFile(req.files, ["txt", "md"], "texts");
    res.json({ message: pathComplete });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// Update User or Product Images
const updateImage = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await UserModel.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "products":
      model = await ProductModel.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res
        .status(500)
        .json({ message: "Validación no implementada temporalmente" });
  }

  // Clean previous images
  if (model.image) {
    const pathImage = path.join(
      __dirname,
      "../uploads/",
      collection,
      model.image
    );
    if (fs.existsSync(pathImage)) {
      fs.unlink(pathImage);
    }
  }

  const name = await uploadFile(req.files, undefined, collection);
  model.image = name;

  await model.save();

  res.json(model);
};

// Show images of product or user
const showImages = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await UserModel.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "products":
      model = await ProductModel.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res
        .status(500)
        .json({ message: "Validación no implementada temporalmente" });
  }

  // Clean previous images
  if (model.image) {
    const pathImage = path.join(
      __dirname,
      "../uploads/",
      collection,
      model.image
    );
    if (fs.existsSync(pathImage)) return res.sendFile(pathImage);
  }

  // Send no-image found
  const pathImage = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImage);
};

// Upload image to Cloudinary Service
const updateImageCloudinary = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;
  switch (collection) {
    case "users":
      model = await UserModel.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `No existe un usuario con el id ${id}`,
        });
      }
      break;
    case "products":
      model = await ProductModel.findById(id);
      if (!model) {
        return res.status(400).json({
          message: `No existe un producto con el id ${id}`,
        });
      }
      break;
    default:
      return res
        .status(500)
        .json({ message: "Validación no implementada temporalmente" });
  }

  // Clean previous images of Cloudinary
  if (model.image) {
    const nameCut = model.image.split("/");
    const name = nameCut[nameCut.length - 1]; // Get last position
    const [public_id] = name.split(".");

    // Delete image from Cloudinary
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.image = secure_url;
  await model.save();
  res.json(model);
};

module.exports = {
  uploadFiles,
  updateImage,
  showImages,
  updateImageCloudinary,
};
