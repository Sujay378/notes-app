const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const corsClient = require("./cors");
const { connectDB } = require("./db.js");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(corsClient);

app.use("/auth", authRoutes);

app.use("/note", noteRoutes);

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
  app.listen(process.env.NODE_PORT, () =>
    console.log(`Server listening on http://localhost${process.env.NODE_PORT}`)
  );
});
