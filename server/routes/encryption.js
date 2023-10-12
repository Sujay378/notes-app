const router = require("express").Router();

const { getKey } = require("../controllers/encryption");

router.get("/key", getKey);

module.exports = router;
