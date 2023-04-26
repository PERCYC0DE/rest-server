const { Router } = require("express");
const { check } = require("express-validator");
const {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const { existsCategory, existsProduct } = require("../helpers/dbValidators");
const { validateFields, validateJWT, isAdminRole } = require("../middlewares");

const router = Router();

// Get All Products
router.get("/", getAllProducts);

// Get One Product
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsProduct),
    validateFields,
  ],
  getOneProduct
);

// Create One Product
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "No es un id de Mongo válido").isMongoId(),
    check("category").custom(existsCategory),
    validateFields,
  ],
  createProduct
);

// Update One Product
router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id de Mongo válido").isMongoId(),
    // check("category", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsProduct),
    validateFields,
  ],
  updateProduct
);

// Delete One Product
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsProduct),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
