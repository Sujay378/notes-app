const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { AuthToken, ResetToken } = require("../models/token");

const { errorHandler } = require("../helpers/error");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      const err = new Error("Invalid data was proided");
      err.type = "invalidData";
      throw err;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error("User already exists");
      err.type = "existingUser";
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res
      .status(200)
      .json({
        success: true,
        message: "User created sucessfully",
      })
      .end();
  } catch (error) {
    errorHandler(error, next);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      const err = new Error("Invalid data was proided");
      err.type = "invalidData";
      throw err;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const err = new Error("User not found");
      err.type = "invalidData";
      throw err;
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      const err = new Error("Incorrect data");
      err.type = "invalidData";
      throw err;
    }

    const jsonToken = jwt.sign(
      { id: existingUser._id.toString() },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    await newToken.save();

    res.setHeader("Authorize", jsonToken);
    res
      .status(200)
      .json({
        id: existingUser._id.toString(),
        name: existingUser.name,
        email: existingUser.email,
      })
      .end();
  } catch (error) {
    errorHandler(error, next);
  }
};

const forgotPassword = (req, res, next) => {};

const reset = (req, res, next) => {};

module.exports = { register, login, forgotPassword, reset };
