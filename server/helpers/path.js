const main = require.main;
const path = require("node:path");

const getRootPath = () => main.path;
const getEnvPath = () => path.join(main.path, ".env");

module.exports = { getRootPath, getEnvPath };
