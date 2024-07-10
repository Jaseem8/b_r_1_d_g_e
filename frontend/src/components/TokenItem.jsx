import React, { useEffect, useState } from "react";
import "./TokenItem.css";

const TokenItem = ({ token, setToken, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleTokenSelection = () => {
    setToken(token); // Set selected token
    onClose(); // Close the modal
  };

  return (
    <div
      className={`token-item ${isMounted ? "mount" : "unmount"}`}
      onClick={handleTokenSelection}
    >
      <img src={token.logoURI} alt={token.name} className="token-logo" />
      <div className="token-details">
        <span className="token-name">{token.name}</span>
        {/* <span className="token-symbol">{token.symbol}</span> */}
        {/* <span className="token-address">{token.address}</span> */}
      </div>
    </div>
  );
};

export default TokenItem;
