const express = require("express");
const { getBlockchain } = require("../controllers/blockchainController");

const router = express.Router();
router.get("/", getBlockchain);

module.exports = router;
