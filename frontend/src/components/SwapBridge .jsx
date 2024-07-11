// src/components/SwapBridge.jsx
import React, { useEffect, useState } from "react";
import "./SwapBridge.css";
import TokenModal from "./TokenModal";
import TokenButton from "./TokenButton";
import ConfirmModal from "./ConfirmModal";
import { useSwapBridgeContext } from "../contexts/SwapBridgeContext";
import sumOfExponents from "../utils/converter";
import calculatePower from "../utils/calculatePower";
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
    errorCode,
    setErrorCode,
    errorMsg,
    setErrorMsg,
  } = useSwapBridgeContext();

  const [fromAmount, setFromAmount] = useState(1);
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [multiplier, setMultiplier] = useState(1);

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
        console.log(data);
        if (data.success) {
          setQuote(data.routes[0]);
          setMultiplier(
            sumOfExponents(
              data.routes[0].srcQuoteTokenUsdValue,
              data.routes[0].dstQuoteTokenUsdValue
            )
          );
        } else {
          setQuote(null);
          setErrorCode(data.errorCode);
          setErrorMsg(data.errorMsg);
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
      {/* <div className="address">
        <span>Address</span>
      </div> */}
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
              {quote?.srcQuoteTokenUsdValue *
                calculatePower(quote?.srcQuoteTokenUsdValue)}
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
            value={
              quote ? quote.dstQuoteTokenAmount * 0.992224 * multiplier : 0
            }
            readOnly
            className="input"
          />
          {success && (
            <label className="dollar-value">
              ≈ $ &nbsp;
              {quote?.dstQuoteTokenUsdValue *
                calculatePower(quote?.dstQuoteTokenUsdValue) *
                0.992224}
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
              {(quote?.dstQuoteTokenAmount * 0.992224 * multiplier) /
                quote?.srcQuoteTokenAmount}
              &nbsp; {toCoin.name}
            </span>
          )}
        </div>
        <button
          className="swap-button"
          onClick={handleSwapBridgeClick}
          disabled={!success}
        >
          {success && <span>Swap & Bridge</span>}
          {!success && errorCode !== 10000 && <span>{`${errorMsg}`}</span>}
          {!success && errorCode == 10000 && (
            <span>{`${errorMsg}:Try Increasing the Amount`}</span>
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
        multiplier={multiplier}
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
