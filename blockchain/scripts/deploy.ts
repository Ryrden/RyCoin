import { ethers } from "hardhat";

async function main() {
    console.log("⏳ Connecting to the Besu network...");

    const [deployer] = await ethers.getSigners();

    if (!deployer) {
        throw new Error("❌ Failed to connect to the Besu network. Please check your configuration and try again.");
    }

    console.log("✅ Successfully connected to the Besu network!");
    console.log("🚀 Deployer account detected:", deployer.address);

    const initialSupply = 10000; 
    console.log(`📦 Setting initial supply for RyCoin token: ${initialSupply}`);

    console.log("⏳ Deploying RyCoin contract...");
    const Token = await ethers.getContractFactory("RyCoin");
    const token = await Token.deploy(initialSupply);

    await token.waitForDeployment();

    const tokenAddress = await token.getAddress();
    console.log("🎉 RyCoin contract successfully deployed!");
    console.log("📍 RyCoin token address on the Besu network:", tokenAddress);
}

main()
    .then(() => {
        console.log("🏁 Deployment completed successfully!");
        process.exit(0);
    })
    .catch(error => {
        console.error("❌ An error occurred during deployment:", error);
        process.exit(1);
    });
