import React from "react";
import "./TokenButton.css";

const TokenButton = ({ onClick, token }) => {
  return (
    <div
      className="token-button"
      onClick={() => {
        onClick();
      }}
    >
      <img src={token.logoURI} alt={token.symbol} />
      <span>{token.name}</span>
    </div>
  );
};

export default TokenButton;
