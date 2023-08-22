import React from "react";
import Image from "next/image";
import images from "../assets";

export default function CreatorCard({ rank, creatorImage, creatorName, creatorEths }) {
    return (
        <div className="flex flex-col min-w-190 minlg:min-w-240 dark:bg-nft-black-3 bg-white border dark:border-nft-black-1 border-nft-gray-1 rounded-3xl p-4 m-4">
            <div className="flexCenter w-8 h-8 minlg:w-10 minlg:h-10 rounded-full bg-nft-red-violet">
                <p className="font-poppins text-white font-semibold text-base minlg:text-lg">
                    {rank}
                </p>
            </div>
            <div className="my-2 flex justify-center">
                <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
                    <Image
                        src={creatorImage}
                        layout="fill"
                        objectFit="cover"
                        alt="creator"
                        className="rounded-full"
                    />
                    <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
                        <Image src={images.tick} layout="fill" objectFit="contain" alt="tick" />
                    </div>
                </div>
            </div>
            <div>
                <p>{creatorName}</p>
                <p>{creatorEths.toFixed(2)}</p>
            </div>
        </div>
    );
}
