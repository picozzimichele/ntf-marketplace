import { useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import images from "../assets";

export default function Modal({ header, body, footer, handleClick }) {
    const modalRef = useRef(null);
    const { theme } = useTheme();

    return (
        <div className="flexCenter animated fadeIn fixed inset-0 z-10 bg-overlay-black">
            <div
                ref={modalRef}
                className="w-2/5 md:11/12 minlg:2/4 dark:bg-nft-dark bg-white flex flex-col rounded-lg"
            >
                <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
                    <div
                        onClick={() => {}}
                        className="relative h-3 w-3 minlg:w-6 minlg:h-6 cursor-pointer"
                    >
                        <Image
                            src={images.cross}
                            alt="cross"
                            layout="fill"
                            className={theme === "light" && "filter invert"}
                        />
                    </div>
                </div>
                <div className="flexCenter w-full text-center p-4">
                    <h2 className="font-poppins dark:text-white text-nft-black-1 font-normal text-2xl">
                        Header Title
                    </h2>
                </div>
                <div className="p-1 sm:px-4 border-t border-b dark:border-nft-black-3 border-nft-gray-1">
                    Body
                </div>
                <div className="flexCenter p-4">footer</div>
            </div>
        </div>
    );
}
