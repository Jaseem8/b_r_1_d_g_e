//   src/components/TokenModal.jsx

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import BlockChain from "./BlockChain";
import TokenListing from "./TokenListing"; // Import TokenListing component
import "./TokenModal.css";

const TokenModal = ({ isOpen, onClose, setToken, setBlockChain }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chainID, setChainID] = useState(1);

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <h3>Select Token</h3>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <BlockChain
          searchTerm={searchTerm}
          setToken={setToken}
          onClose={onClose}
          setChainID={setChainID}
          setBlockChain={setBlockChain}
        />

        {/* Render TokenListing component */}
        <TokenListing chainID={chainID} setToken={setToken} onClose={onClose} />

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default TokenModal;
