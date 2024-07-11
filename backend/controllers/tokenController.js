// controllers/tokenController.js

const { fetchTokens } = require("../services/tokenService");

const getTokens = async (req, res) => {
  try {
    const chainID = req.params.chainID;
    const tokens = await fetchTokens(chainID);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTokens };
