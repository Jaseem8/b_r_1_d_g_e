import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BlockChain.css";

const BlockChain = ({ searchTerm, setToken, onClose, setChainID }) => {
  const [blockChains, setBlockChains] = useState([]);
  const [displayCount, setDisplayCount] = useState(5); // Initially show 4 tokens
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Fetch blockchain data from the backend
    const fetchBlockChains = async () => {
      try {
        const response = await axios.get(`${backendUrl}/blockchains`);
        setBlockChains(response.data.data);
        //  console.log(response.data.data);
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

  return (
    <div>
      <div className="grid-container">
        {displayedBlockChains.map((blockChain) => (
          <div key={blockChain.chainId} className="blockchain-item">
            <button
              className="blockchain-button"
              onClick={() => {
                setChainID(blockChain.chainId);
              }}
            >
              {blockChain.name}
            </button>
          </div>
        ))}
      </div>
      {displayCount < filteredBlockChains.length && (
        <button className="more-button" onClick={handleLoadMore}>
          More
        </button>
      )}
    </div>
  );
};

export default BlockChain;
