//   src/components/SwapBridge.jsx
import React, { useEffect, useState } from "react";
import "./SwapBridge.css";
import TokenModal from "./TokenModal"; // Import the TokenModal component
import TokenButton from "./TokenButton"; // Import the TokenButton component

const SwapBridge = () => {
  const [fromCoin, setFromCoin] = useState({
    name: "ETH",
    address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  });
  const [toCoin, setToCoin] = useState({
    name: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  });
  const [fromAmount, setFromAmount] = useState(0.02);
  const [toAmount, setToAmount] = useState(0.1566943416099);
  const [balance, setBalance] = useState(0.04077);
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(2.5); // Example rate, this can be dynamic as well
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Fetch exchange rate from the API whenever fromAmount changes
    const fetchQuote = async () => {
      try {
        const response = await fetch(`${backendUrl}/quotes`, {
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
        console.log(data);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    if (fromAmount > 0) {
      fetchQuote();
    }
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
          <label className="dollar-value">Dollar value</label>
          <TokenButton
            onClick={() => setIsFromModalOpen(true)}
            token={fromCoin}
          />
        </div>

        <div className="to">
          <span>To (Quote)</span>
          <input
            type="number"
            value={toAmount.toFixed(10)}
            readOnly
            className="input"
          />
          <label className="dollar-value">Dollar value</label>
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
