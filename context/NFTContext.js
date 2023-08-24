import { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { create } from "ipfs-http-client";
import { MarketAddress, MarketAbi } from "./constants";

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;
const auth = `Basic ${Buffer.from(projectIdAndSecret).toString("base64")}`;

const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});

export const fetchContract = async (signerOrProvider) => {
    return new ethers.Contract(MarketAddress, MarketAbi, signerOrProvider);
};

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

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            return url;
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    };

    const createNFT = async (formInput, fileUrl, router) => {
        const { name, description, price } = formInput;
        if (!name || !description || !price || !fileUrl) {
            return;
        }

        const data = JSON.stringify({ name, description, image: fileUrl });

        try {
            const added = await client.add(data);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;

            await createSale(url, price);
            router.push("/");
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    };

    const createSale = async (url, formInputPrice, isReselling, id) => {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const price = ethers.utils.parseUnits(formInputPrice, "ether");
        const contract = await fetchContract(signer);
        console.log({ contract });
        console.log(2);
        const listingPrice = await contract.getListingPrice();
        console.log(3);

        const transaction = await contract.createToken(url, price, {
            value: listingPrice.toString(),
        });
        await transaction.wait();
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <NFTContext.Provider
            value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS, createNFT }}
        >
            {children}
        </NFTContext.Provider>
    );
};
