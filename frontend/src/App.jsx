import React, { useState } from "react";
import "./App.css";
import { fetchParams } from "./utils/api";
import SwapBridge from "./components/SwapBridge ";
import { SwapBridgeProvider } from "./contexts/SwapBridgeContext";

const App = () => {
  const [quote, setQuote] = useState(null);
  const [params, setParams] = useState(null);

  const handleBridge = async () => {
    if (quote) {
      const transactionParams = await fetchParams({ quote });
      setParams(transactionParams);
    }
  };

  return (
    <>
      <div className="app">
        <SwapBridgeProvider>
          <SwapBridge />
        </SwapBridgeProvider>
      </div>
    </>
  );
};

export default App;
