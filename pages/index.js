import { Banner, CreatorCard } from "../components";
import { useEffect, useRef, useState } from "react";
import images from "../assets";
import { makeId } from "../utils/makeId";

const Home = () => {
    const parentRef = useRef(null);
    const scrollRef = useRef(null);

    return (
        <div className="flex justify-center sm:px-4 p-12">
            <div className="w-full minmd:w-4/5">
                <Banner
                    parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
                    childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
                    name="Discover, collect, and sell extraordinary NFTs"
                />
                <div>
                    <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                        Best Creators
                    </h1>
                    <div ref={parentRef} className="relative flex-1 max-w-full flex mt-3">
                        <div
                            ref={scrollRef}
                            className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                        >
                            {[6, 7, 8, 9, 10].map((item, index) => (
                                <CreatorCard
                                    key={`creator-${item}`}
                                    rank={index + 1}
                                    creatorImage={images[`creator${item}`]}
                                    creatorName={`0x${makeId(3)}...${makeId(4)}`}
                                    creatorEths={10 - item * 0.5}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
