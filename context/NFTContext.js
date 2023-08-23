import { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { MarketAddress, MarketAbi } from "./constants";

export const NFTContext = createContext();

export const NFTProvider = ({ children }) => {
    const nftCurrency = "MATIC";

    return <NFTContext.Provider value={{ nftCurrency }}>{children}</NFTContext.Provider>;
};
