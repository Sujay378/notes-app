const router = require('express').Router();

const { register, login, forgotPassword, reset } = require('../controllers/auth');

router.post("/register", register, (req, res) => {
  res.setHeader;
});

router.post('/login', login);

router.post('/forgot/password', forgotPassword);

router.post('/reset/password', reset);

module.exports = router;
