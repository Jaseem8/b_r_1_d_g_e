const axios = require('axios');

const apiClient = axios.create({
  baseURL: process.env.XY_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.XY_API_KEY}`
  }
});

module.exports = apiClient;
