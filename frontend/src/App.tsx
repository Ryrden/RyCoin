import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import RyCoinAbi from "./abi/RyCoin.json";  // ABI do contrato

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const contractAddress = "#";

  async function connectWallet() {
    if (!connected) {
      try {
        if (!window.ethereum) throw new Error("MetaMask is not installed!");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _walletAddress = await signer.getAddress();

        setConnected(true);
        setWalletAddress(_walletAddress);

        const ryCoinContract = new ethers.Contract(contractAddress, RyCoinAbi.abi, signer);
        setContract(ryCoinContract);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      setConnected(false);
      setWalletAddress("");
      setContract(null);
    }
  }

  async function getBalance() {
    if (!contract) {
      alert("Connect wallet first!");
      return;
    }

    try {
      const balance = await contract.balanceOf(walletAddress);
      console.log("Balance:", ethers.formatUnits(balance, 18));
    } catch (error) {
      console.error("Failed to get balance:", error);
    }
  }

  return (
    <div className="app">
      <div className="main">
        <div className="content">
          <button className="btn" onClick={connectWallet}>
            {connected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
          <h3>Address</h3>
          <h4 className="wal-add">{walletAddress || "Not connected"}</h4>
          {connected && (
            <button onClick={getBalance}>Ver Saldo</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
