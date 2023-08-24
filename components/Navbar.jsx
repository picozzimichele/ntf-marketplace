import React, { useEffect, useState, useContext } from "react";
import { NFTContext } from "../context/NFTContext";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import images from "../assets";
import Button from "./Button";

const MenuItems = ({ isMobile, active, setActive, setIsOpen }) => {
    const generateLink = (index) => {
        switch (index) {
            case 0:
                return "/";
            case 1:
                return "/listed-nfts";
            case 2:
                return "/my-nfts";
            default:
                return "/";
        }
    };

    return (
        <ul className={`list-none flexCenter ${isMobile ? "flex-col h-full gap-10" : "flex-row"}`}>
            {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, index) => (
                <li
                    key={index}
                    onClick={() => {
                        setActive(item);
                        isMobile && setIsOpen(false);
                    }}
                    className={`flex flex-row items-center font-poppins font-semibold dark:hover:text-white hover:text-nft-black-1 mx-3 ${
                        active === item
                            ? "dark:text-white text-nft-black-1"
                            : "dark:text-nft-gray-3 text-nft-gray-2"
                    } ${isMobile ? "text-xl" : "text-base"}`}
                >
                    <Link href={generateLink(index)}>{item}</Link>
                </li>
            ))}
        </ul>
    );
};

const ButtonGroup = ({ setActive, router, isMobile, setIsOpen }) => {
    const { connectWallet, currentAccount } = useContext(NFTContext);

    return currentAccount ? (
        <Button
            btnName="Create"
            classStyles="mx-2 rounded-xl"
            handleClick={() => {
                setActive("");
                router.push("/create-nft");
                isMobile && setIsOpen(false);
            }}
        />
    ) : (
        <Button
            btnName="Connect"
            classStyles="mx-2 rounded-xl"
            handleClick={() => connectWallet()}
        />
    );
};

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [active, setActive] = useState("Explore NFTs");
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
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
            {/* Desktop Menu */}
            <div className="md:hidden flex">
                <MenuItems active={active} setActive={setActive} />
                <div className="ml-4">
                    <ButtonGroup setActive={setActive} router={router} />
                </div>
            </div>
            {/* Mobile Menu */}
            <div className="hidden md:flex ml-2">
                {isOpen ? (
                    <Image
                        src={images.cross}
                        objectFit="contain"
                        width={20}
                        height={20}
                        alt="close"
                        onClick={() => setIsOpen(false)}
                        className={theme === "light" && "filter invert"}
                    />
                ) : (
                    <Image
                        src={images.menu}
                        objectFit="contain"
                        width={25}
                        height={25}
                        alt="menu"
                        onClick={() => setIsOpen(true)}
                        className={theme === "light" && "filter invert"}
                    />
                )}
                {isOpen && (
                    <div className="top-65 fixed inset-0 dark:bg-nft-dark bg-white z-10 flex items-center justify-center">
                        <div className="flex flex-col p-4 justify-between w-full h-full">
                            <MenuItems
                                active={active}
                                setActive={setActive}
                                isMobile={true}
                                setIsOpen={setIsOpen}
                            />
                            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
                                <ButtonGroup
                                    setActive={setActive}
                                    router={router}
                                    setIsOpen={setIsOpen}
                                    isMobile={true}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
