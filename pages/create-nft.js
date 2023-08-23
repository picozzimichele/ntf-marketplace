import { useState, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "../components";
import images from "../assets";

export default function CreateNFT() {
    const [files, setFiles] = useState(null);
    const { theme } = useTheme();
    const router = useRouter();
    const onDrop = useCallback(() => {
        //upload file to IPFS
    }, []);

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 5000000,
    });

    const fileStyle = useMemo(
        () =>
            `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed 
            ${isDragActive && "border-file-active"} 
            ${isDragAccept && "border-file-accept"}
            ${isDragReject && "border-file-reject"}`,
        [isDragActive, isDragAccept, isDragReject]
    );

    return (
        <div className="flex justify-center sm:p-4 p-12">
            <div className="w-3/5 md:w-full">
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                    Create new NFT
                </h1>
                <div className="mt-16">
                    <p className="dark:text-white text-nft-black-1 font-poppins font-semibold text-xl">
                        Upload File
                    </p>
                    <div className="mt-4">
                        <div {...getRootProps()} className={`${fileStyle}`}>
                            <input {...getInputProps()} />
                            <div className="flexCenter flex-col text-center">
                                <p className="dark:text-white text-nft-black-1 font-poppins font-semibold text-xl">
                                    JPG, PNG, GIF, WEBM. Max 100mb.
                                </p>
                                <div className="my-12 w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
