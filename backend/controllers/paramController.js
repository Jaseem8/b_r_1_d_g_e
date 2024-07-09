const { fetchParams } = require('../services/paramService');

const getParams = async (req, res) => {
  try {
    const params = await fetchParams(req.body);
    res.json(params);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getParams };
