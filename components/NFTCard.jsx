import React from "react";
import Image from "next/image";
import Link from "next/link";
import images from "../assets";

export default function NFTCard({ nft }) {
    return (
        <Link href={{ pathname: `nft-details`, query: { nft } }}>
            <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 bg-white rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
                <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
                    {" "}
                    <Image
                        src={nft?.image || images[`nft${nft.item}`]}
                        layout="fill"
                        objectFit="cover"
                        alt={`nft${nft.item}`}
                    />
                </div>
                {nft.name}
            </div>
        </Link>
    );
}
