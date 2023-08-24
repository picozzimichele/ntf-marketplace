import { useState, useEffect, useContext } from "react";
import { NFTContext } from "../context/NFTContext";
import { NFTCard, Loader } from "../components";

export default function ListedNFTs() {
    const [nfts, setNFTs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) {
        return (
            <div className="flexStart min-h-screen">
                <Loader />
            </div>
        );
    }

    if (!isLoading && nfts.length === 0) {
        return (
            <div className="flexCenter sm:p-4 p-16 min-h-screen">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-bold">
                    No NFT Listed for Sale
                </h1>
            </div>
        );
    }
}
