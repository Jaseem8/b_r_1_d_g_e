import React, { useState, useEffect } from "react";
import TokenItem from "./TokenItem"; // Assuming TokenItem component is defined elsewhere
import axios from "axios";
import "./TokenListing.css";
const TokenListing = ({ chainID, setToken, onClose }) => {
  const [tokens, setTokens] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    // Function to fetch tokens from backend URL
    const fetchTokens = async () => {
      try {
        console.log(chainID);

        const response = await axios.get(`${backendUrl}/tokens/${chainID}`);

        const data = await response.data;
        const success = await data.success;
        setSuccess(success);
        console.log(data);

        setTokens(data.recommendedTokens); // Assuming data is an array of tokens
        console.log("tokens", tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
        // Handle error state if needed
      }
    };

    fetchTokens();
  }, [chainID]);

  return (
    <div className="token-listing">
      {success &&
        tokens.map((token) => (
          <TokenItem
            key={token.address} // Assuming each token has a unique id
            token={token}
            setToken={setToken}
            onClose={onClose}
          />
        ))}
      {!success && (
        <span className="maintenance">
          The network chain id : {chainID} is under maintenance, please follow
          our update.
        </span>
      )}
    </div>
  );
};

export default TokenListing;
