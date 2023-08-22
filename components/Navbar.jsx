import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import images from "../assets";
import Button from "./Button";

const MenuItems = ({ isMobile, active, setActive }) => {
    const generateLink = (index) => {
        switch (index) {
            case 0:
                return "/";
            case 1:
                return "/created-nfts";
            case 2:
                return "/my-nfts";
            default:
                return "/";
        }
    };

    return (
        <ul className={`list-none flexCenter ${isMobile ? "flex-col h-full" : "flex-row"}`}>
            {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, index) => (
                <li
                    key={index}
                    onClick={() => {
                        setActive(item);
                    }}
                    className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-black-1 mx-3 ${
                        active === item
                            ? "dark:text-white text-nft-black-1"
                            : "dark:text-nft-gray-3 text-nft-gray-2"
                    }`}
                >
                    <Link href={generateLink(index)}>{item}</Link>
                </li>
            ))}
        </ul>
    );
};

const ButtonGroup = () => {
    const hasConnected = false;
    return hasConnected ? (
        <Button btnName="" classStyles="mx-2 rounded-xl" />
    ) : (
        <Button classStyles="mx-2 rounded-xl" />
    );
};

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [active, setActive] = useState("Explore NFTs");
    return (
        <nav className="flexBetween w-full z-10 fixed p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
            {/* Logo */}
            <div className="flex flex-1 flex-row justify-start">
                <Link href="/">
                    <div onClick={() => {}} className="flexCenter md:hidden cursor-pointer">
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
                </Link>
                <Link href="/">
                    <div onClick={() => {}} className="hidden md:flex">
                        <Image
                            src={images.logo02}
                            objectFit="contain"
                            width={32}
                            height={32}
                            alt="logo"
                        />
                    </div>
                </Link>
            </div>
            {/* Dark Mode Toggle */}
            <div className="flex flex-initial flex-row justify-end">
                <div className="flex items-center mr-2">
                    <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
                    />
                    <label
                        htmlFor="checkbox"
                        className="flexBetween label rounded-2xl bg-black p-1 relative h-4 w-8"
                    >
                        <i className="fas fa-sun" />
                        <i className="fas fa-moon" />
                        <div className="ball w-3 h-3 absolute rounded-full bg-white" />
                    </label>
                </div>
            </div>
            <div className="md:hidden flex">
                <MenuItems active={active} setActive={setActive} />
                <div className="ml-4">
                    <ButtonGroup />
                </div>
            </div>
        </nav>
    );
}
