import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import RyCoinAbi from "../../blockchain/artifacts/contracts/RyCoin.sol/RyCoin.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [recipient, setRecipient] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [mintAmount, setMintAmount] = useState<string>("");
  const [isMining, setIsMining] = useState(false);

  const contractAddress = "#"

  useEffect(() => {
    if (connected) {
      fetchBalance();
      fetchAccounts();
    }
  }, [connected]);

  async function connectWallet() {
    console.log("Connecting wallet...");
    if (!connected) {
      try {
        if (!window.ethereum) throw new Error("MetaMask is not installed!");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _walletAddress = await signer.getAddress();

        setConnected(true);
        setWalletAddress(_walletAddress);

        const ryCoinContract = new ethers.Contract(contractAddress, RyCoinAbi.abi, signer);
        console.log(ryCoinContract)
        setContract(ryCoinContract);
        console.log("Connected to wallet:", _walletAddress);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      setConnected(false);
      setWalletAddress("");
      setContract(null);
      setBalance(null);
      setAccounts([]);
    }
  }

  async function fetchAccounts() {
    console.log("Fetching accounts...");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const _accounts = await provider.listAccounts();
      setAccounts(_accounts.map(account => account.address));
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    }
  }

  async function fetchBalance() {
    console.log("Fetching balance...");
    if (!contract) {
      alert("Connect wallet first!");
      return;
    }

    try {
      console.log(walletAddress)
      const _balance = await contract.balanceOf(walletAddress);
      console.log(_balance)
      setBalance(ethers.formatUnits(_balance, 18));
    } catch (error) {
      console.error("Failed to get balance:", error);
      setBalance("0");
    }
  }

  async function handleTransfer() {
    console.log("Transferring tokens...");
    if (!contract) {
      alert("Connect wallet first!");
      return;
    }

    if (!recipient || !transferAmount) {
      alert("Please enter a recipient and amount!");
      return;
    }

    try {
      const tx = await contract.transfer(recipient, ethers.parseUnits(transferAmount, 18));
      await tx.wait();
      alert("Transfer successful!");
      fetchBalance();
    } catch (error) {
      console.error("Failed to make transfer:", error);
    }
  }

  async function handleMint() {
    console.log("Minting tokens...");
    if (!contract) {
      alert("Connect wallet first!");
      return;
    }

    if (!mintAmount) {
      alert("Please enter an amount to mint!");
      return;
    }

    try {
      setIsMining(true);
      const start = Date.now();

      const tx = await contract.mint(walletAddress, ethers.parseUnits(mintAmount, 18));
      await tx.wait();

      const end = Date.now();
      const miningTime = ((end - start) / 1000).toFixed(2);

      alert(`Mint successful! Mining time: ${miningTime} seconds`);
      fetchBalance();
    } catch (error) {
      console.error("Failed to mint tokens:", error);
    } finally {
      setIsMining(false);
    }
  }

  return (
    <div className="app">
      <div className="main">
        <div className="content">
          <button className="btn" onClick={connectWallet} disabled={isMining}>
            {connected ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
          <h3>Address</h3>
          <h4 className="wal-add">{walletAddress || "Not connected"}</h4>
          {connected && (
            <div>
              <button onClick={fetchBalance} disabled={isMining}>Ver Saldo</button>
              <h3>Saldo: {balance !== null ? `${balance} RYC` : "Carregando..."}</h3>

              <h3>Contas na Rede:</h3>
              <ul>
                {accounts.map((acc) => (
                  <li key={acc}>{acc}</li>
                ))}
              </ul>

              <h3>Transferir Tokens</h3>
              <input
                type="text"
                placeholder="Endereço do destinatário"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                disabled={isMining}
              />
              <input
                type="text"
                placeholder="Quantidade"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                disabled={isMining}
              />
              <button onClick={handleTransfer} disabled={isMining}>Transferir</button>

              <h3>Minerar Moedas</h3>
              <input
                type="text"
                placeholder="Quantidade a minerar"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
                disabled={isMining}
              />
              <button onClick={handleMint} disabled={isMining}>
                {isMining ? "Minerando..." : "Minerar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
