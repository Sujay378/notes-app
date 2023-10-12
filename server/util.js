const cryptoJs = require("crypto-js");

const generateNewToken = () => cryptoJs.lib.WordArray.random(16).toString();

module.exports = { generateNewToken };
