const { default: axios } = require("axios");
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

    const response = await axios.get(
      `${XY_API_URL}/quotes?srcChainId=${srcChainId}&srcQuoteTokenAddress=${srcQuoteTokenAddress}&srcQuoteTokenAmount=${srcQuoteTokenAmount}&dstChainId=${dstChainId}&dstQuoteTokenAddress=${dstQuoteTokenAddress}&slippage=${slippage}`
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getQuote };
