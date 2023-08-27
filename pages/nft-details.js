import { useState, useEffect, useContext } from "react";
import { NFTContext } from "../context/NFTContext";
import { NFTCard, Loader, Button, Modal } from "../components";
import Image from "next/image";
import images from "../assets";
import { shortenAddress } from "../utils/shortenAddress";
import { useRouter } from "next/router";

const PaymentBodyCmp = ({ nft, nftCurrency }) => {
    return (
        <div className="flex flex-col">
            <div className="flexBetween">
                <p className="font-poppins dark:text-white text-nft-black-1 text-base font-semibold minlg:text-xl">
                    Item
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 text-base font-semibold minlg:text-xl">
                    Subtotal
                </p>
            </div>
            <div className="flexBetweenStart my-5">
                <div className="flex-1 flexStartCenter">
                    <div className="relative h-28 w-28">
                        <Image src={nft.image} layout="fill" objectFit="cover" />
                    </div>
                    <div className="flexCenterStart flex-col ml-5">
                        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
                            {shortenAddress(nft.seller)}
                        </p>
                        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
                            {nft.name}
                        </p>
                    </div>
                </div>
                <div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl">
                        {nft.price} <span className="font-semibold">{nftCurrency}</span>
                    </p>
                </div>
            </div>
            <div className="flexBetween mt-10">
                <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-base minlg:text-xl">
                    Total
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl">
                    {nft.price} <span className="font-semibold">{nftCurrency}</span>
                </p>
            </div>
        </div>
    );
};

export default function NFTDetails() {
    const { currentAccount, nftCurrency, buyNFT } = useContext(NFTContext);
    const router = useRouter();
    const [nft, setNFT] = useState({
        image: "",
        name: "",
        description: "",
        itemId: "",
        owner: "",
        price: "",
        seller: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [paymentModal, setPaymentModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

    const checkout = async () => {
        console.log(nft.price, nft.itemId);
        await buyNFT({ unformattedPrice: nft.price, itemId: nft.itemId });
        setPaymentModal(false);
        setSuccessModal(true);
    };

    useEffect(() => {
        if (!router.isReady) return;
        //this is an object containing all the info that we are passing through the url
        setNFT(router.query);
        console.log(nft);
        setIsLoading(false);
    }, [router.isReady]);

    if (isLoading) {
        return (
            <div className="flexStart min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="relative flex justify-center md:flex-col min-h-screen">
            <div className="relative flex-1 flexCenter sm:px-4 px-12 border-r md:border-b dark:border-nft-black-1 border-nft-gray-1">
                <div className="relative w-[557px] h-[557px] minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300">
                    <Image
                        src={nft?.image}
                        objectFit="cover"
                        className="rounded-xl shadow-lg"
                        layout="fill"
                    />
                </div>
            </div>
            <div className="flex-1 justify-start sm:px-4 px-12 sm:pb-4">
                <div className="flex flex-row sm:flex-col">
                    <h2 className="font-poppings dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
                        {nft.name}
                    </h2>
                </div>
                <div className="mt-10">
                    <p className="font-poppings dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
                        Creator
                    </p>
                    <div className="flex flex-row items-center mt-3">
                        <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
                            <Image
                                src={images.creator1}
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <p className="font-poppings dark:text-white text-nft-black-1 text-xs minlg:text-base font-semibold">
                            {shortenAddress(nft.seller)}
                        </p>
                    </div>
                </div>
                <div className="mt-10 flex flex-col">
                    <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
                        <p className="font-poppings dark:text-white text-nft-black-1 text-md minlg:text-base font-medium mb-2">
                            Details
                        </p>
                    </div>
                    <div className="mt-3">
                        <p className="font-poppings dark:text-white text-nft-black-1 text-md">
                            {nft.description}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col mt-10">
                    {currentAccount === nft.seller.toLowerCase() ? (
                        <p className="font-poppings dark:text-white text-nft-black-1 text-md border border-gray p-2">
                            You cannot buy your own NFT
                        </p>
                    ) : (
                        <Button
                            handleClick={() => setPaymentModal(true)}
                            classStyles="mr-5 sm:mr-0 rounded-xl"
                            btnName={`Buy for ${nft.price} ${nftCurrency}`}
                        />
                    )}
                </div>
            </div>
            {paymentModal && (
                <Modal
                    header="Check Out"
                    body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
                    footer={
                        <div className="flex flex-row">
                            <Button
                                handleClick={() => checkout()}
                                btnName="Checkout"
                                classStyles="mr-5 rounded-xl"
                            />
                            <Button
                                handleClick={() => setPaymentModal(false)}
                                btnName="Cancel"
                                classStyles="rounded-xl"
                            />
                        </div>
                    }
                    handleClose={() => setPaymentModal(false)}
                />
            )}
            {successModal && (
                <Modal
                    header={"Payment Successful"}
                    body={
                        <div
                            onClick={() => setSuccessModal(false)}
                            className="flexCenter flex-col text-center"
                        >
                            <div className="relative w-52 h-52">
                                <Image src={nft.image} objectFit="cover" layout="fill" />
                            </div>
                            <p className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm minlg:text-xl mt-10">
                                You successfully purchased{" "}
                                <span className="font-semibold">{nft.name}</span> from{" "}
                                <span className="font-semibold">{shortenAddress(nft.seller)}</span>
                            </p>
                        </div>
                    }
                    footer={
                        <div className="flexCenter flex-col">
                            <Button
                                handleClick={() => router.push("/my-nfts")}
                                btnName="Check it out"
                                classStyles="sm:mb-5 rounded-xl"
                            />
                        </div>
                    }
                    handleClose={() => setPaymentModal(false)}
                />
            )}
        </div>
    );
}
