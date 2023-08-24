import { useState, useEffect, useContext } from "react";
import { NFTContext } from "../context/NFTContext";
import { NFTCard, Loader, Button } from "../components";
import Image from "next/image";
import images from "../assets";
import { shortenAddress } from "../utils/shortenAddress";
import { useRouter } from "next/router";

export default function NFTDetails() {
    const { currentAccount } = useContext(NFTContext);
    const router = useRouter();
    const [nft, setNFT] = useState({
        image: "",
        name: "",
        description: "",
        tokenId: "",
        owner: "",
        price: "",
        seller: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!router.isReady) return;
        //this is an object containing all the info that we are passing through the url
        setNFT(router.query);
        setIsLoading(false);
    }, [router.isReady]);

    if (isLoading) {
        return (
            <div className="flexStart min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="relative flex justify-center md:flex-col min-h-screen">
            <div className="relative flex-1 flexCenter sm:px-4 px-12 border-r md:border-b dark:border-nft-black-1 border-nft-gray-1">
                <div className="relative w-[557px] h-[557px] minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300">
                    <Image
                        src={nft?.image}
                        objectFit="cover"
                        className="rounded-xl shadow-lg"
                        layout="fill"
                    />
                </div>
            </div>
            <div className="flex-1 justify-start sm:px-4 px-12 sm:pb-4">
                <div className="flex flex-row sm:flex-col">
                    <h2 className="font-poppings dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
                        {nft.name}
                    </h2>
                </div>
                <div className="mt-10">
                    <p className="font-poppings dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
                        Creator
                    </p>
                    <div className="flex flex-row items-center mt-3">
                        <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
                            <Image
                                src={images.creator1}
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <p className="font-poppings dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
                            {shortenAddress(nft.seller)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
