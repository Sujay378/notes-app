const express = require("express");
const bodyParser = require("body-parser");

const cors = require("./cors");
const { connectDB } = require("./db.js");
const { initiateIO } = require("./socket");

const app = express();

const { getEnvPath } = require("./helpers/path");
require("dotenv").config({ path: getEnvPath() });

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");
const e2eRoutes = require("./routes/encryption");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors.corsClient);

app.use("/api/encryption", e2eRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/note", noteRoutes);

app.use((err, req, res, next) => {
  if (!err) {
    err.type = "invalidRequest";
    err.message = "Service not found";
  }
  res
    .status(err.status || 500)
    .json({ type: err.type, message: err.message })
    .end();
});

connectDB((client) => {
  const server = app.listen(process.env.NODE_PORT, () =>
    console.log(`Server listening on http://localhost${process.env.NODE_PORT}`)
  );
  initiateIO(server);
});
