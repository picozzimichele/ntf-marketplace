import { Banner, CreatorCard, Loader, NFTCard, SearchBar } from "../components";
import { useEffect, useRef, useState, useContext } from "react";
import images from "../assets";
import Image from "next/image";
import { useTheme } from "next-themes";
import { NFTContext } from "../context/NFTContext";
import { getCreators } from "../utils/getTopCreators";
import { shortenAddress } from "../utils/shortenAddress";

const Home = () => {
    const { fetchNFTs } = useContext(NFTContext);
    const [isLoading, setIsLoading] = useState(true);
    const [hideButtons, setHideButtons] = useState(false);
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNFTsCopy] = useState([]);
    const [activeSelect, setActiveSelect] = useState("Recently Added");
    const parentRef = useRef(null);
    const scrollRef = useRef(null);
    const { theme } = useTheme();

    const handleScroll = (direction) => {
        const { current } = scrollRef;

        const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

        if (direction === "left") {
            current.scrollLeft -= scrollAmount;
        }
        if (direction === "right") {
            current.scrollLeft += scrollAmount;
        }
    };

    const isScrollable = () => {
        const { current: parent } = parentRef;
        const { current: scroll } = scrollRef;

        if (scroll?.scrollWidth >= parent?.offsetWidth) {
            setHideButtons(false);
        } else {
            setHideButtons(true);
        }
    };

    const topCreators = getCreators(nftsCopy);

    const handleSearch = (value) => {
        const filteredNFTs = nfts.filter(({ name }) => {
            return name.toLowerCase().includes(value.toLowerCase());
        });

        if (filteredNFTs.length) {
            setNfts(filteredNFTs);
        } else {
            //show all NFTs
            setNfts(nftsCopy);
        }
    };
    const clearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setNfts(nftsCopy);
        }
    };

    useEffect(() => {
        isScrollable();
        window.addEventListener("resize", isScrollable);

        return () => {
            window.removeEventListener("resize", isScrollable);
        };
    }, []);

    useEffect(() => {
        fetchNFTs().then((items) => {
            setNfts(items);
            setNFTsCopy(items);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const sortedNFTs = [...nfts];

        switch (activeSelect) {
            case "Price (low to high)":
                setNfts(sortedNFTs.sort((a, b) => a.price - b.price));
                break;
            case "Price (high to low)":
                setNfts(sortedNFTs.sort((a, b) => b.price - a.price));
                break;
            case "Recently Added":
                setNfts(sortedNFTs.sort((a, b) => b.tokenId - a.tokenId));
                break;

            default:
                setNfts(nfts);
                break;
        }
    }, [activeSelect]);

    return (
        <div className="flex justify-center sm:px-4 p-12">
            <div className="w-full minmd:w-4/5">
                <Banner
                    parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
                    childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
                    name={
                        <>
                            Discover, collect, and sell
                            <br /> extraordinary NFTs
                        </>
                    }
                />
                {!isLoading && !nfts.length ? (
                    <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                        That's weird... No NFTs for sale!
                    </h1>
                ) : isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {/* Top Sellers */}
                        <div>
                            <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                                Top Sellers
                            </h1>
                            <div ref={parentRef} className="relative flex-1 max-w-full flex mt-3">
                                <div
                                    ref={scrollRef}
                                    className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                                >
                                    {topCreators.slice(0, 8).map((creator, index) => (
                                        <CreatorCard
                                            key={`creator-${index}`}
                                            rank={index + 1}
                                            creatorImage={images[`creator${index + 1}`]}
                                            creatorName={shortenAddress(creator.seller)}
                                            creatorEths={creator.sumall}
                                        />
                                    ))}
                                    {!hideButtons && (
                                        <>
                                            {/* Left Arrow */}
                                            <div
                                                onClick={() => handleScroll("left")}
                                                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                                            >
                                                <Image
                                                    src={images.left}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    alt="left_arrow"
                                                    className={
                                                        theme === "light" ? "filter invert" : ""
                                                    }
                                                />
                                            </div>
                                            {/* Right Arrow */}
                                            <div
                                                onClick={() => {
                                                    handleScroll("right");
                                                }}
                                                className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                                            >
                                                <Image
                                                    src={images.right}
                                                    layout="fill"
                                                    objectFit="contain"
                                                    alt="right_arrow"
                                                    className={
                                                        theme === "light" ? "filter invert" : ""
                                                    }
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* NFTs List */}
                        <div className="mt-10">
                            <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                                <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                                    Hot NFTs
                                </h1>
                                <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
                                    <SearchBar
                                        activeSelect={activeSelect}
                                        setActiveSelect={setActiveSelect}
                                        handleSearch={handleSearch}
                                        clearSearch={clearSearch}
                                    />
                                </div>
                            </div>
                            <div className="flex mt-3 w-full flex-wrap justify-start md:justify-center">
                                {nfts.length !== 0 &&
                                    nfts.map((nft) => (
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
                                        />
                                    ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
