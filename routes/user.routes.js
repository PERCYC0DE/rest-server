const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} = require("../controllers/user.controller");
const {
  isRoleValid,
  isExistsEmail,
  existsUserForID,
} = require("../helpers/dbValidators");

const {
  validateFields,
  validateJWT,
  hasRole,
  isAdminRole,
} = require("../middlewares");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [
    // Can be move this section into custom middleware?
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio y debe tener mas de 6 letras")
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    check("email", "El email no es valido").isEmail(),
    check("email").custom(isExistsEmail),
    // check("role", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existsUserForID),
    check("role").custom(isRoleValid),
    validateFields,
  ],
  updateUser
);

router.delete(
  "/:id",
  [
    validateJWT,
    isAdminRole,
    // tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(existsUserForID),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
