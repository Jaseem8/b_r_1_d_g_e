const axios = require("axios");
const XY_API_URL = process.env.XY_API_URL;

const fetchQuote = async (data) => {
  // console.log("hello", data);
  const srcChainId = data.fromCoin.chainId;
  const srcQuoteTokenAddress = data.fromCoin.address;
  const srcQuoteTokenAmount = data.amount;

  //
  const dstChainId = data.toCoin.chainId;
  const dstQuoteTokenAddress = data.toCoin.address;
  const slippage = 1;

  const response = await axios.get(
    `${XY_API_URL}/quotes?srcChainId=${srcChainId}&srcQuoteTokenAddress=${srcQuoteTokenAddress}&srcQuoteTokenAmount=${srcQuoteTokenAmount}&dstChainId=${dstChainId}&dstQuoteTokenAddress=${dstQuoteTokenAddress}&slippage=${slippage}`
  );
  return response.data;
};

module.exports = { fetchQuote };
