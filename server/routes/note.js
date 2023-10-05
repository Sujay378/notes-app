const router = require('express').Router();

const verifyLogin = require('../middlewares/verify');
const {
  fetchAll,
  fetchPage,
  addNote,
  editNote,
  deleteNote,
} = require("../controllers/note");

router.get("/fetch", verifyLogin, fetchAll);

router.post("/fetch/:page/:count", verifyLogin, fetchPage);

router.post("/add", verifyLogin, addNote);

router.put('/edit/:id', verifyLogin, editNote);

router.delete('/delete/:id', verifyLogin, deleteNote);

module.exports = router;
