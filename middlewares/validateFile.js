const { response } = require("express");

const validateUploadedFile = async (req, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({
      status: "error",
      message: "No hay archivos en la petición - validateUploadedFile",
    });
  }
  next();
};

module.exports = {
  validateUploadedFile,
};
