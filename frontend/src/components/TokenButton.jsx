import React from "react";
import "./TokenButton.css";
import downArrow from "../assets/downArrow.png";
const TokenButton = ({ onClick, token, blockChain }) => {
  return (
    <div
      className="token-button"
      onClick={() => {
        onClick();
      }}
    >
      <div>
        <img src={token.logoURI} alt={token.symbol} className="tokenImage" />

        <img
          src={blockChain?.logoURI}
          alt={blockChain.name}
          className="blockChainImage"
        />
      </div>
      <div>
        <span className="tokenName">{token.name}</span>
        <span className="blockChainName">{blockChain?.name}</span>
      </div>
      <img src={downArrow} className="downArrow" />
    </div>
  );
};

export default TokenButton;
