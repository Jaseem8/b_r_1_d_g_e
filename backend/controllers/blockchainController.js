const { blockchains } = require("../utils/blockchains");

const getBlockchain = async (req, res) => {
  try {
    res.json({ data: blockchains });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBlockchain };
