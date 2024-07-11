// src/components/ConfirmModal.jsx
import React from "react";
import ReactDOM from "react-dom";
import "./ConfirmModal.css";
import calculatePower from "../utils/calculatePower";

const ConfirmModal = ({
  isOpen,
  onClose,
  fromCoin,
  toCoin,
  fromAmount,
  quote,
  fromBlockChain,
  toBlockChain,
  onConfirm,
  multiplier,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="confirm-modal">
      <div className="modal-content">
        <h3>Confirm Transaction</h3>
        <div className="transaction-details">
          <div className="detail">
            <span>From:</span>
            <span>
              {fromAmount} {fromCoin.symbol}
            </span>
          </div>
          <div className="detail">
            <span>To:</span>
            <span>
              {quote.dstQuoteTokenAmount * 0.992224 * multiplier}
              {toCoin.symbol}
            </span>
          </div>
          <div className="detail">
            <span>Exchange Rate:</span>
            <span>
              1 {fromCoin.symbol} ={" "}
              {(quote?.dstQuoteTokenAmount * 0.992224 * multiplier) /
                quote?.srcQuoteTokenAmount}
              &nbsp;
              {toCoin.symbol}
            </span>
          </div>
          <div className="detail">
            <span>Estimated Value:</span>
            <span>
              ${" "}
              {quote?.dstQuoteTokenUsdValue *
                calculatePower(quote?.dstQuoteTokenUsdValue) *
                0.992224}
            </span>
          </div>
          <div className="detail">
            <span>Gas Required:</span>
            <span>{quote?.estimatedGas || "N/A"}</span>
          </div>
          <div className="detail">
            <span>Source Blockchain:</span>
            <span>{fromBlockChain.name}</span>
          </div>
          <div className="detail">
            <span>Source Token:</span>
            <span>{fromCoin.name}</span>
          </div>
          <div className="detail">
            <span>Destination Blockchain:</span>
            <span>{toBlockChain.name}</span>
          </div>
          <div className="detail">
            <span>Destination Token:</span>
            <span>{toCoin.name}</span>
          </div>
        </div>
        <div className="modal-actions">
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
