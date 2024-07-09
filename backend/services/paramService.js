const axios = require("axios");

const fetchParams = async (data) => {
  const response = await axios.post(`${XY_API_URL}/params`, data, {
    headers: { Authorization: `Bearer ${XY_API_KEY}` },
  });
  return response.data;
};

module.exports = { fetchParams };
