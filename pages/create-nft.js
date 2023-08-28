import { useState, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button, Input } from "../components";
import images from "../assets";
import { NFTContext } from "../context/NFTContext";

export default function CreateNFT() {
    const { uploadToIPFS, createNFT } = useContext(NFTContext);
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, setFormInput] = useState({ price: "", name: "", description: "" });
    const { theme } = useTheme();
    const router = useRouter();

    const onDrop = useCallback(async (acceptedFile) => {
        //upload file to IPFS
        const url = await uploadToIPFS(acceptedFile[0]);

        setFileUrl(url);
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
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold xs:ml-0">
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
                                <div className="my-12 w-full flex justify-center">
                                    <Image
                                        src={images.upload}
                                        width={100}
                                        height={100}
                                        objectFit="contain"
                                        alt="upload"
                                        className={theme === "light" ? "filter invert" : ""}
                                    />
                                </div>
                                <p className="dark:text-white text-nft-black-1 font-poppins font-semibold text-sm">
                                    Drag and drop your file here
                                </p>
                                <p className="dark:text-white text-nft-black-1 font-poppins font-semibold text-sm mt-2">
                                    or Browse media on your device
                                </p>
                            </div>
                        </div>
                        {fileUrl && (
                            <aside>
                                <div>
                                    <img src={fileUrl} alt="asset_file" />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
                <Input
                    inputType="input"
                    title="Name"
                    placeholder="NFT Name"
                    handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
                />
                <Input
                    inputType="textarea"
                    title="Description"
                    placeholder="NFT Description"
                    handleClick={(e) => setFormInput({ ...formInput, description: e.target.value })}
                />
                <Input
                    inputType="number"
                    title="Price"
                    placeholder="NFT Price"
                    handleClick={(e) => setFormInput({ ...formInput, price: e.target.value })}
                />
                <div className="mt-7 w-full flex justify-end">
                    <Button
                        btnName="Create NFT"
                        classStyles="rounded-xl"
                        handleClick={() => createNFT(formInput, fileUrl, router)}
                    />
                </div>
            </div>
        </div>
    );
}
