const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { login, googleSignIn } = require("../controllers/auth.controller.js");

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

router.post(
  "/google",
  [
    check("id_token", "El token de Google es necesario").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
