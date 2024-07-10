// src/components/SwapBridge.jsx
import React, { useEffect, useState } from "react";
import "./SwapBridge.css";
import TokenModal from "./TokenModal";
import TokenButton from "./TokenButton";
import ConfirmModal from "./ConfirmModal";
import { useSwapBridgeContext } from "../contexts/SwapBridgeContext";
import convertAndScaleScientificNumber from "../utils/converter";

const SwapBridge = () => {
  const {
    fromCoin,
    setFromCoin,
    toCoin,
    setToCoin,
    fromBlockChain,
    setFromBlockChain,
    toBlockChain,
    setToBlockChain,
    balance,
    setBalance,
    success,
    setSuccess,
    quote,
    setQuote,
  } = useSwapBridgeContext();

  const [fromAmount, setFromAmount] = useState(2);
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
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
        if (data.success) {
          setQuote(data.routes[0]);
        } else {
          setQuote(null);
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchQuote();
  }, [fromAmount, fromCoin, toCoin]);

  const handleMaxClick = () => {
    setFromAmount(balance);
  };

  const handleFromAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setFromAmount(value);
  };

  const handleSwapBridgeClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmTransaction = () => {
    // Handle the actual transaction confirmation logic here
    console.log("Transaction confirmed");
    setIsConfirmModalOpen(false);
  };

  return (
    <div className="swap-bridge">
      <div className="address">
        <span>Address</span>
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
              ≈ $ &nbsp;{" "}
              {convertAndScaleScientificNumber(quote?.srcQuoteTokenUsdValue)}
            </label>
          )}
          <TokenButton
            onClick={() => setIsFromModalOpen(true)}
            token={fromCoin}
            blockChain={fromBlockChain}
          />
        </div>

        <div className="to">
          <span>To (Quote)</span>
          <input
            type="number"
            value={quote ? quote.dstQuoteTokenAmount * 0.992224 : 0}
            readOnly
            className="input"
          />
          {success && (
            <label className="dollar-value">
              ≈ $ &nbsp;
              {convertAndScaleScientificNumber(quote?.dstQuoteTokenUsdValue)}
            </label>
          )}
          <TokenButton
            onClick={() => setIsToModalOpen(true)}
            token={toCoin}
            blockChain={toBlockChain}
          />
        </div>
        <div className="quote">
          {success && (
            <span className="exchange">
              1 {fromCoin.name} ={" "}
              {(quote?.dstQuoteTokenAmount * 0.992224) / fromAmount}{" "}
              {toCoin.name}
            </span>
          )}
        </div>
        <button
          className="swap-button"
          onClick={handleSwapBridgeClick}
          disabled={!success}
        >
          {success && <span>Swap & Bridge</span>}
          {!success && (
            <span>Chosen Bridging Is not Possible. Choose Another</span>
          )}
        </button>
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        fromCoin={fromCoin}
        toCoin={toCoin}
        fromAmount={fromAmount}
        quote={quote}
        fromBlockChain={fromBlockChain}
        toBlockChain={toBlockChain}
        onConfirm={handleConfirmTransaction}
      />

      {isFromModalOpen && (
        <TokenModal
          isOpen={isFromModalOpen}
          onClose={() => setIsFromModalOpen(false)}
          setToken={setFromCoin}
          setBlockChain={setFromBlockChain}
        />
      )}
      {isToModalOpen && (
        <TokenModal
          isOpen={isToModalOpen}
          onClose={() => setIsToModalOpen(false)}
          setToken={setToCoin}
          setBlockChain={setToBlockChain}
        />
      )}
    </div>
  );
};

export default SwapBridge;
