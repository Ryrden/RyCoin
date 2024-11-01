import { ethers } from "hardhat";

async function main() {
    // TODO: Implement contract logic to get initial supply with MetaMask if possible.
    const initialSupply = 1000000; 
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);

    const Token = await ethers.getContractFactory("RyCoin");
    const token = await Token.deploy(initialSupply);

    await token.waitForDeployment();

    const tokenAddress = await token.getAddress()
    console.log("Token deployed to:", tokenAddress);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
      console.error(error);
      process.exit(1);
  });
