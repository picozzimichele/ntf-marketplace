import React from "react";

export default function Banner({ parentStyles, childStyles, name }) {
    return (
        <div
            className={`nft-gradient relative w-full flex items-center z-0 overflow-hidden ${parentStyles}`}
        >
            <p className={`font-bold text-5xl font-poppins leadding-70 text-white ${childStyles}`}>
                {name}
            </p>
            <div className="absolute w-48 h-48 sm:h-32 sm:w-32 rounded-full white-bg -top-9 -left-16 -z-5" />
            <div className="absolute w-72 h-72 sm:h-56 sm:w-56 rounded-full white-bg -bottom-24 -right-14 -z-5" />
        </div>
    );
}
