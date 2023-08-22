import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import images from "../assets";
import Button from "./Button";

export default function Footer() {
    const { theme } = useTheme();

    return (
        <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16">
            <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
                <div className="flexStart flex-1 flex-col">
                    <div className="flexCenter cursor-pointer">
                        <Image
                            src={images.logo02}
                            objectFit="contain"
                            width={32}
                            height={32}
                            alt="logo"
                        />
                        <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
                            CryptoKet
                        </p>
                    </div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">
                        Get the latest updates
                    </p>
                </div>
            </div>
            <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
                <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
                        Picodepaperis, Inc. All Rights Reserved.
                    </p>
                    <div className="flex flex-row sm:mt-4">
                        {[images.instagram, images.twitter, images.telegram, images.discord].map(
                            (image, index) => (
                                <div key={index} className="mx-2 cursor-pointer">
                                    <Image
                                        src={image}
                                        objectFit="contain"
                                        width={24}
                                        height={24}
                                        alt="social"
                                        className={theme === "light" && "filter invert"}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
