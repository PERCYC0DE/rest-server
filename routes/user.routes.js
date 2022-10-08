const { Router } = require("express");

const {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUsers);
router.put("/:id", updateUser);
router.post("/:id", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
