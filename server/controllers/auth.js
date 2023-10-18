const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AES = require("crypto-js").AES;

const User = require("../models/user");
const { AuthToken, ResetToken } = require("../models/token");
const { errorHandler } = require("../helpers/error");
const { sendMail } = require("../helpers/mailer");
const { generateNewToken } = require("../util");
const { io } = require("../socket");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  const key = req.get("Encryption");
  const decodedPassword = AES.decrypt(password, key);

  try {
    if (!name || !email || !password) {
      const err = new Error("Invalid data was provided");
      err.type = "invalidData";
      throw err;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error("User already exists");
      err.type = "existingUser";
      throw err;
    }

    const hashedPassword = await bcrypt.hash(decodedPassword, 12);
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
  const key = req.get("Encryption");
  const decodedPassword = AES.decrypt(password, key);

  try {
    if (!email || !password) {
      const err = new Error("Invalid data was provided");
      err.type = "invalidData";
      throw err;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const err = new Error("Provided email or password was incorrect");
      err.type = "invalidData";
      throw err;
    }

    const validPassword = await bcrypt.compare(
      decodedPassword,
      existingUser.password
    );
    if (!validPassword) {
      const err = new Error("Provided email or password was incorrect");
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

    res.setHeader("Authorization", jsonToken);
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

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const origin = req.get("Origin");
  const socketId = req.get("Socket");

  if (!email || !origin) {
    const err = new Error("Insufficient data provided");
    err.type = "invalidData";
    throw err;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Invalid data provided");
      err.type = "invalidUser";
      throw err;
    }

    const token = generateNewToken();
    const hashedToken = await bcrypt.hash(token, 12);
    const tokenDoc = new ResetToken({
      token: hashedToken,
      user: user._id,
    });
    await tokenDoc.save();

    const resetToken = jwt.sign(
      { id: user._id.toString(), token, socketId },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );
    const resetUrl = `${origin}/reset?token=${resetToken}`;
    sendMail("reset", { name: user.name, email: user.email, link: resetUrl });
    res
      .status(200)
      .json({
        status: "success",
        message: "Reset link sent to user email",
      })
      .end();
  } catch (error) {
    errorHandler(error, next);
  }
};

const reset = async (req, res, next) => {
  const { password, resetToken } = req.body;

  try {
    if (!password || !resetToken) {
      const err = new Error("Insufficient data provided");
      err.type = "invalidData";
      throw err;
    }

    const decryptedToken = jwt.verify(resetToken, process.env.SECRET_KEY);
    if (!decryptedToken) {
      const err = new Error("Invalid token recieved");
      err.type = "malformedToken";
      throw err;
    }

    const { id, token, socketId } = decryptedToken;
    const user = await User.findById(id);
    const tokenDoc = await ResetToken.findOne({ user: id });
    if (!user || !tokenDoc) {
      const err = new Error("Invalid token recieved");
      err.type = "malformedToken";
      throw err;
    }

    const verified = await bcrypt.compare(token, tokenDoc.token);
    if (!verified) {
      const err = new Error("Invalid token recieved");
      err.type = "malformedToken";
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await tokenDoc.deleteOne();
    await user.updateOne({
      $set: {
        password: hashedPassword,
      },
    });

    res
      .status(200)
      .json({
        status: "success",
        message: "Password reset complete",
      })
      .end();

    if (socketId) io.to(socketId).emit("load-login");
  } catch (error) {
    errorHandler(error, next);
  }
};

module.exports = { register, login, forgotPassword, reset };
