const jwt = require("jsonwebtoken");

const verifyLogin = (req, res, next) => {
  const bearerToken = req.get("Authorization");
  if (!bearerToken) {
    const err = new Error("Authorization needed for this action");
    err.type = "missingToken";
    throw err;
  }

  const authToken = bearerToken.split(" ")[1];
  const verified = jwt.verify(authToken, process.env.SECRET_KEY);
  if (!verified) {
    const err = new Error("Malformed token");
    err.type = "invalidToken";
    throw err;
  }

  const newToken = jwt.sign({ id: verified.id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  res.setHeader("Authorization", newToken);
  req.verified = true;
  req.userId = verified.id;
  next();
};

module.exports = verifyLogin;
