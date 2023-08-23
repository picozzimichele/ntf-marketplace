import { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { MarketAddress, MarketAbi } from "./constants";

export const NFTContext = createContext();

export const NFTProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const nftCurrency = "MATIC";

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) {
            return alert("Make sure you have metamask!");
        }

        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
        } else {
            console.log("No authorized account found");
        }

        console.log({ accounts });
    };

    const connectWallet = async () => {
        if (!window.ethereum) {
            return alert("Make sure you have metamask!");
        }
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        setCurrentAccount(accounts[0]);

        window.location.reload();
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount }}>
            {children}
        </NFTContext.Provider>
    );
};
