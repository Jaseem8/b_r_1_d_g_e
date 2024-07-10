// src/contexts/SwapBridgeContext.jsx
import React, { createContext, useContext, useState } from "react";

export const SwapBridgeContext = createContext();

export const SwapBridgeProvider = ({ children }) => {
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

  const [fromBlockChain, setFromBlockChain] = useState({
    chainId: 1,
    name: "ETHEREUM",
    logoURI:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  });

  const [toBlockChain, setToBlockChain] = useState({
    chainId: 1,
    name: "ETHEREUM",
    logoURI:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
  });

  const [balance, setBalance] = useState(15);
  const [success, setSuccess] = useState(false);
  const [quote, setQuote] = useState(null);
  return (
    <SwapBridgeContext.Provider
      value={{
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
      }}
    >
      {children}
    </SwapBridgeContext.Provider>
  );
};

export const useSwapBridgeContext = () => useContext(SwapBridgeContext);
