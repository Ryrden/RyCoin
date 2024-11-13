  import { HardhatUserConfig } from "hardhat/config";
  import "@nomicfoundation/hardhat-toolbox";

  const config: HardhatUserConfig = {
    solidity: "0.8.27",
    paths: {
      artifacts: "./artifacts",
      cache: "./cache",
    },
    networks: {
      besu: {
        url: "#",
        accounts: [`0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f`]
      },
    }
  };

  export default config;
