const { response, json } = require("express");
const bcryptjs = require("bcryptjs");
const { UserModel } = require("../models/");
const { generateJWT } = require("../helpers/generateJwt");
const { googleVerify } = require("../helpers/googleVerify");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Validate if email exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // If user is not active
    if (!user.status) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // Verify Password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Hubo algún error. Comuníquese con el administrador",
      error: error,
    });
  }
};

/**
 * Function to login with Google Account
 */
const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, image, email } = await googleVerify(id_token);

    let user = await UserModel.findOne({ email });

    if (!user) {
      // Create new user
      const data = {
        name,
        email,
        password: "password",
        image,
        google: true,
      };

      user = new UserModel(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        message: "Hable con el administrador, usuario bloqueado.",
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  login,
  googleSignIn,
};
