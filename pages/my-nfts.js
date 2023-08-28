import { useState, useEffect, useContext } from "react";
import { NFTContext } from "../context/NFTContext";
import { NFTCard, Loader, Banner, SearchBar } from "../components";
import Image from "next/image";
import images from "../assets";
import { shortenAddress } from "../utils/shortenAddress";

export default function MyNFTs() {
    const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
    const [nfts, setNFTs] = useState([]);
    const [nftsCopy, setNFTsCopy] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeSelect, setActiveSelect] = useState("Recently Added");

    const handleSearch = (value) => {
        const filteredNFTs = nfts.filter(({ name }) => {
            return name.toLowerCase().includes(value.toLowerCase());
        });

        if (filteredNFTs.length) {
            setNFTs(filteredNFTs);
        } else {
            //show all NFTs
            setNFTs(nftsCopy);
        }
    };
    const clearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setNFTs(nftsCopy);
        }
    };

    useEffect(() => {
        fetchMyNFTsOrListedNFTs("MyNFTs").then((items) => {
            setNFTs(items);
            setNFTsCopy(items);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="flexStart min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full flex justify-start items-center flex-col min-h-screen">
            <div className="w-full flexCenter flex-col">
                <Banner
                    name="Your Nifty NFTs"
                    childStyles="text-center mb-4"
                    parentStyles="h-80 justify-center"
                />
                <div className="flexCenter flex-col -mt-20 z-0">
                    <div className="flexCenter w-40 h-40 sm:h-36 sm:w-36 p-1 bg-nft-black-1 rounded-full">
                        <Image
                            src={images.creator1}
                            className="rounded-full object-cover"
                            objectFit="cover"
                        />
                    </div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mt-6">
                        {shortenAddress(currentAccount)}
                    </p>
                </div>
            </div>
            {!isLoading && nfts.length === 0 ? (
                <div className="flexCenter sm:p-4 p-16">
                    <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-3xl">
                        No NFTs Owned
                    </h1>
                </div>
            ) : (
                <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
                    <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
                        <SearchBar
                            activeSelect={activeSelect}
                            setActiveSelect={setActiveSelect}
                            handleSearch={handleSearch}
                            clearSearch={clearSearch}
                        />
                    </div>
                    <div className="mt-3 w-full flex flex-wrap">
                        {nfts.map((nft) => (
                            <NFTCard
                                key={nft.tokenId}
                                nft={{
                                    description: nft.description,
                                    image: nft.image,
                                    name: nft.name,
                                    seller: nft.seller,
                                    owner: nft.owner,
                                    price: nft.price,
                                    itemId: nft.tokenId,
                                    tokenURI: nft.tokenURI,
                                }}
                                onProfilePage={true}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
