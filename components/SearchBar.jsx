import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import images from "../assets";

export default function SearchBar() {
    const [search, setSearch] = useState("");
    const [toggle, setToggle] = useState(false);
    const { theme } = useTheme();
    return (
        <>
            <div className="flex-1 flexCenter dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 rounded-md py-3">
                <Image
                    src={images.search}
                    objectFit="contain"
                    width={20}
                    height={20}
                    alt="search"
                    className={theme === "light" && "filter invert"}
                />
                <input
                    type="text"
                    placeholder="Search NFT"
                    className="dark:bg-nft-black-2 bg-white mx-4 w-full dark:text-white text-nft-black-1 text-xs outline-none"
                    onChange={() => {}}
                    value=""
                />
            </div>
            <div
                onClick={() => {
                    setToggle((prev) => !prev);
                }}
                className="relative flexBetween ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 px-4 rounded-md py-3"
            >
                <p className="font-poppins dark:text-white text-nft-black-1 text-xs font-normal">
                    Recently Listed
                </p>
                <Image
                    src={images.arrow}
                    objectFit="contain"
                    width={15}
                    height={15}
                    alt="arrow"
                    className={theme === "light" && "filter invert"}
                />
                {toggle && (
                    <div className="absolute top-full right-0 left-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
                        {["Recently Added", "Price (low to high)", "Price (high to low)"].map(
                            (option) => (
                                <p className="font-poppins dark:text-white text-nft-black-1 text-xs font-normal my-3 cursor-pointer">
                                    {option}
                                </p>
                            )
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
