const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller.js");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("email", "El correo es obligatorio").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
