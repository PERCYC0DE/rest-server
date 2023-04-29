const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (
  files,
  extensionAllowed = ["png", "jpg", "jpeg", "gif", "webp"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const { file } = files;

    const nameCut = file.name.split(".");
    const extension = nameCut[nameCut.length - 1];

    // Validate extension
    if (!extensionAllowed.includes(extension)) {
      return reject(
        `El tipo de archivo con extensión '${extension}' no está permitida - ${extensionAllowed}`
      );
    }

    // Generate random name for image
    const nameTmpImage = uuidv4() + "." + extension;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      folder,
      nameTmpImage
    );

    // Use the mv() method to place the file somewhere on your server
    file.mv(uploadPath, (err) => {
      if (err) reject(err);
      resolve(nameTmpImage);
    });
  });
};

module.exports = {
  uploadFile,
};
