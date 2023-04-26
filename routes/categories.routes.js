const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");
const {
  createCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { existsCategory } = require("../helpers/dbValidators");

const router = Router();

// Get All Categories - Public Access
router.get("/", getAllCategories);

// Get One Category - Public Access
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsCategory),
    validateFields,
  ],
  getOneCategory
);

// Create a New Category - Private Access
router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

// Update a Category - Private Access
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existsCategory),
    validateFields,
  ],
  updateCategory
);

// Delete a Category - Private Access
router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(existsCategory),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
