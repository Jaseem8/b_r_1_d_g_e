const axios = require("axios");
const { fetchQuote } = require("../services/quoteService");
const XY_API_URL = process.env.XY_API_URL;

const getQuote = async (req, res) => {
  try {
    const data = req.body;
    // console.log("quote");
    const srcChainId = data.fromCoin.chainId;
    const srcQuoteTokenAddress = data.fromCoin.address;
    const srcQuoteTokenAmount = data.amount;

    //
    const dstChainId = data.toCoin.chainId;
    const dstQuoteTokenAddress = data.toCoin.address;
    const slippage = 1;

    const url = `${XY_API_URL}/quote?srcChainId=${srcChainId}&srcQuoteTokenAddress=${srcQuoteTokenAddress}&srcQuoteTokenAmount=${srcQuoteTokenAmount}&dstChainId=${dstChainId}&dstQuoteTokenAddress=${dstQuoteTokenAddress}&slippage=${slippage}`;
    // const url = `${XY_API_URL}/quote?srcChainId=42161&srcQuoteTokenAddress=0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8&srcQuoteTokenAmount=999000000&dstChainId=59144&dstQuoteTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&slippage=1`;
    // console.log(url);

    const response = await axios.get(url);

    console.log("from quoteController", response.data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getQuote };
