const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [check("email", "El email no es valido`").isEmail],
  createUser
);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
