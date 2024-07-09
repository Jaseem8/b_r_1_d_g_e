const express = require("express");
const { getTokens } = require("../controllers/tokenController");

const router = express.Router();
router.get("/:chainID", getTokens);

module.exports = router;