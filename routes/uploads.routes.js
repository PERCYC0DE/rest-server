const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { uploadFiles } = require("../controllers/upload.controller");

const router = Router();

router.post(
  "/",
  // [
  //   check("email", "El correo es obligatorio").isEmail(),
  //   check("email", "El correo es obligatorio").not().isEmpty(),
  //   validateFields,
  // ],
  uploadFiles
);

module.exports = router;
