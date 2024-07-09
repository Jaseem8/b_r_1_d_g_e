const axios = require("axios");
const XY_API_URL = process.env.XY_API_URL;

const fetchTokens = async (chainID) => {
  const response = await axios.get(
    `${XY_API_URL}/recommendedTokens?chainId=${chainID}`
  );
  return response.data;
};

module.exports = { fetchTokens };
