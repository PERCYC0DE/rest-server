const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields, validateUploadedFile } = require("../middlewares/");
const {
  uploadFiles,
  updateImage,
  showImages,
  updateImageCloudinary,
} = require("../controllers/upload.controller");
const { collectionsAllowed } = require("../helpers");

const router = Router();

// Upload file to local server
router.post("/", validateUploadedFile, uploadFiles);

// Update image for user or product
router.put(
  "/:collection/:id",
  [
    validateUploadedFile,
    check("id", "El id debe ser un mongoID").isMongoId(),
    // Custom validation
    check("collection").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    validateFields,
  ],
  updateImageCloudinary
);

// Get public image
router.get(
  "/:collection/:id",
  [
    check("id", "El id debe ser un mongoID").isMongoId(),
    // Custom validation
    check("collection").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    validateFields,
  ],
  showImages
);

module.exports = router;
