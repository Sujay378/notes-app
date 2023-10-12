const cors = require("cors");

const corsOpt = {
  origin: ["http://localhost:4200"],
  allowedHeaders: ["Authorization", "Content-Type", "Socket", "Encryption"],
  exposedHeaders: ["Authorization", "Content-Type"],
};

const corsClient = cors(corsOpt);

module.exports = { corsClient, corsOpt };
