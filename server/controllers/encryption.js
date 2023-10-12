const { generateNewToken } = require("../util");

const getKey = (req, res, next) => {
  const key = generateNewToken();
  res.status(200).json({ key }).end();
};

module.exports = { getKey };
