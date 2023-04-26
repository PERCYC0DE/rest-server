const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../models/");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Read the user that corresponds to the uid
    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe DB",
      });
    }

    // Check if the uid has status true
    if (!user.status) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado: false",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token no válido",
      error,
    });
  }
};

module.exports = {
  validateJWT,
};
