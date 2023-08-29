require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

const privateKey = fs.readFileSync(".secret").toString().trim();
const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const DEPLOYER_PRIVATE_KEY = process.env.NEXT_PUBLIC_DEPLOYER_PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    networks: {
        hardhat: {
            chainId: 1337,
        },
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
        },
        // mumbai: {
        //     url: `https://polygon-mumbai.infura.io/v3/${INFURA_API_KEY}`,
        //     accounts: [DEPLOYER_PRIVATE_KEY],
        // },
    },
    solidity: "0.8.4",
};
