const Note = require("../models/note");
const User = require("../models/user");
const { errorHandler } = require("../helpers/error");

const fetchAll = (re, res, next) => {};

const fetchPage = (re, res, next) => {};

const addNote = async (req, res, next) => {
  const { title, description } = req.body;
  const { verified, userId } = req.headers;

  if (!verified) {
    const err = new Error("Email or password was wrong");
    err.type = "ivalidUser";
    throw err;
  }

  if (!title || !description) {
    const err = new Error("Incomplete data was provided");
    err.type = "invalidData";
    throw err;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("User not found");
      err.type = "invalidUser";
      throw err;
    }

    const newNote = new Note({
      title,
      description,
      user,
    });
    const savedNote = await newNote.save();
    user.notes.push(savedNote._id);
    const savedUser = await user.save();
    res
      .status(200)
      .json({
        noteId: savedNote._id.toString(),
        title: savedNote.title,
        description: savedNote.description,
      })
      .end();
  } catch (error) {
    errorHandler(err, next);
  }
};

const editNote = (re, res, next) => {};

const deleteNote = (re, res, next) => {};

module.exports = { fetchAll, fetchPage, addNote, editNote, deleteNote };
