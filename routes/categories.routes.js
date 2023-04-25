const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, validateFields } = require("../middlewares");
const { createCategory } = require("../controllers/categorie.controller");

const router = Router();

// Get All Categories - Public Access
router.get("/", (req, res) => {
  res.send("Get All Categories");
});

// Get One Categorie - Public Access
router.get("/:id", (req, res) => {});

// Create a New Category - Private Access
router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createCategory
);

// Update a Category - Private Access
router.put("/:id", (req, res) => {});

// Delete a Category - Private Access
router.delete("/:id", (req, res) => {});

module.exports = router;
