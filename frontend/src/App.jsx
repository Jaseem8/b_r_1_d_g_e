import React, { useState } from "react";
import "./App.css";
import { fetchParams } from "./utils/api";
import SwapBridge from "./components/SwapBridge ";
import XyWidget from "./components/XyWidget";

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
        <SwapBridge />
        {/* <XyWidget /> */}
      </div>
    </>
  );
};

export default App;
