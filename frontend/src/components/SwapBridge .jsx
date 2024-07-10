//   src/components/SwapBridge.jsx
import React, { useEffect, useState } from "react";
import "./SwapBridge.css";
import TokenModal from "./TokenModal"; // Import the TokenModal component
import TokenButton from "./TokenButton"; // Import the TokenButton component

const SwapBridge = () => {
  const [fromCoin, setFromCoin] = useState({
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    symbol: "ETH",
    name: "ETH",
    chainId: 1,
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  });
  const [toCoin, setToCoin] = useState({
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    name: "DAI",
    chainId: 1,
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/9956/small/4943.png?1636636734",
  });
  const [fromAmount, setFromAmount] = useState(2);
  const [toAmount, setToAmount] = useState(0);
  const [balance, setBalance] = useState(0.04077);
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(2.5); // Example rate, this can be dynamic as well
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [success, setSuccess] = useState(false);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    // Fetch exchange rate from the API whenever fromAmount changes
    const fetchQuote = async () => {
      try {
        const response = await fetch(`${backendUrl}/quote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fromCoin: fromCoin,
            toCoin: toCoin,
            amount: fromAmount,
          }),
        });
        const data = await response.json();
        setSuccess(data.success);
        setQuote(data.routes[0]);
        console.log(success);
        console.log(quote);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchQuote();
  }, [fromAmount, fromCoin, toCoin]);

  const handleMaxClick = () => {
    setFromAmount(balance);
    setToAmount(balance * exchangeRate);
  };

  const handleFromAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setFromAmount(value);
  };

  return (
    <div className="swap-bridge">
      <div className="address">
        <span>0xE002...F3d5</span>
      </div>
      <h2>Swap & Bridge</h2>
      <div className="balance">
        <span>Balance: {balance.toFixed(5)}</span>
        <button className="max-button" onClick={handleMaxClick}>
          Max
        </button>
      </div>
      <div className="swap-section">
        <div className="from">
          <span>From</span>
          <input
            type="number"
            className="input"
            value={fromAmount}
            min={0}
            onChange={handleFromAmountChange}
          />
          {success && (
            <label className="dollar-value">
              {quote.srcQuoteTokenUsdValue}
            </label>
          )}
          <TokenButton
            onClick={() => setIsFromModalOpen(true)}
            token={fromCoin}
          />
        </div>

        <div className="to">
          <span>To (Quote)</span>
          <input
            type="number"
            value={quote.dstQuoteTokenAmount}
            readOnly
            className="input"
          />
          {success && (
            <label className="dollar-value">
              {quote.dstQuoteTokenUsdValue}
            </label>
          )}{" "}
          <TokenButton onClick={() => setIsToModalOpen(true)} token={toCoin} />
        </div>
        <div className="quote">
          <span>
            1 {fromCoin.name} = {exchangeRate} {toCoin.name}
          </span>
        </div>
      </div>
      <button className="swap-button">Swap & Bridge</button>

      <TokenModal
        isOpen={isFromModalOpen}
        onClose={() => setIsFromModalOpen(false)}
        setToken={setFromCoin}
      />

      <TokenModal
        isOpen={isToModalOpen}
        onClose={() => setIsToModalOpen(false)}
        setToken={setToCoin}
      />
    </div>
  );
};

export default SwapBridge;
