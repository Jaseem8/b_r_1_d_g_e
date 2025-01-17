import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BlockChain.css";
import downArrow from "../assets/downArrow.png";

const BlockChain = ({
  searchTerm,
  setToken,
  onClose,
  setChainID,
  setBlockChain,
}) => {
  const [blockChains, setBlockChains] = useState([]);
  const [displayCount, setDisplayCount] = useState(5); // Initially show 5 tokens
  const [selectedChain, setSelectedChain] = useState(null); // State to track selected chain
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Fetch blockchain data from the backend
    const fetchBlockChains = async () => {
      try {
        const response = await axios.get(`${backendUrl}/blockchains`);
        setBlockChains(response.data.data);
      } catch (error) {
        console.error("Error fetching blockchain data:", error);
      }
    };

    fetchBlockChains();
  }, [backendUrl]);

  useEffect(() => {
    setDisplayCount(5); // Reset display count when search term changes
  }, [searchTerm]);

  const filteredBlockChains = blockChains.filter((blockChain) =>
    blockChain["name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedBlockChains = filteredBlockChains.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  const handleBlockchainClick = (blockChain) => {
    setBlockChain(blockChain);
    setChainID(blockChain.chainId);
    setSelectedChain(blockChain.chainId); // Set selected chain
  };

  return (
    <div>
      <span className="blockChain-title">BlockChains</span>
      <div className="grid-container">
        {displayedBlockChains.map((blockChain) => (
          <div key={blockChain.chainId} className={`blockchain-item `}>
            <button
              className={`blockchain-button ${
                selectedChain === blockChain.chainId ? "selected" : ""
              }`}
              onClick={() => handleBlockchainClick(blockChain)}
            >
              <img
                src={blockChain.logoURI}
                className="image"
                alt={`${blockChain.name} logo`}
              />
              {blockChain.name}
            </button>
          </div>
        ))}
      </div>
      {displayCount < filteredBlockChains.length && (
        <button className="more-button" onClick={handleLoadMore}>
          More
          <img src={downArrow} className="downArrow" alt="Down Arrow" />
        </button>
      )}
    </div>
  );
};

export default BlockChain;
