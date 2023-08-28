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
    const nftCurrency = "ETH";

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
            const url = `https://ipfs.io/ipfs/${added.path}`;
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
            const url = `https://ipfs.io/ipfs/${added.path}`;

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
        const listingPrice = await contract.getListingPrice();

        const transaction = !isReselling
            ? await contract.createToken(url, price, {
                  value: listingPrice.toString(),
              })
            : await contract.resellToken(id, price, { value: listingPrice.toString() });
        await transaction.wait();
    };

    const fetchNFTs = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = await fetchContract(provider);

        const data = await contract.fetchMarketItems();

        const items = await Promise.all(
            data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                const tokenURI = await contract.tokenURI(tokenId);
                console.log({ tokenURI });
                const {
                    data: { image, name, description },
                } = await axios.get(tokenURI);
                console.log({ image, name, description });
                const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

                return {
                    price,
                    tokenId: tokenId.toNumber(),
                    seller,
                    owner,
                    image,
                    name,
                    description,
                    tokenURI,
                };
            })
        );

        return items;
    };

    const fetchMyNFTsOrListedNFTs = async (type) => {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = await fetchContract(signer);

        const data =
            type === "fetchItemsListed"
                ? await contract.fetchItemsListed()
                : await contract.fetchMyNFTs();

        const items = await Promise.all(
            data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                const tokenURI = await contract.tokenURI(tokenId);
                const {
                    data: { image, name, description },
                } = await axios.get(tokenURI);
                const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

                return {
                    price,
                    tokenId: tokenId.toNumber(),
                    seller,
                    owner,
                    image,
                    name,
                    description,
                    tokenURI,
                };
            })
        );

        return items;
    };

    const buyNFT = async ({ unformattedPrice, itemId }) => {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const contract = await fetchContract(signer);

        const price = ethers.utils.parseUnits(unformattedPrice.toString(), "ether");

        const transaction = await contract.createMarketSale(itemId, { value: price });

        await transaction.wait();
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <NFTContext.Provider
            value={{
                nftCurrency,
                connectWallet,
                currentAccount,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                createSale,
            }}
        >
            {children}
        </NFTContext.Provider>
    );
};
