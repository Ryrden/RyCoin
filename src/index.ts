import { BlockchainVisualization } from "./blockchainVisualization";
import { Blockchain } from './blockchain';

const difficulty = Number(prompt("Enter the mining difficulty (default: 4):", "4")) || 4;
const blockchain = new Blockchain(difficulty);
console.log("Blockchain created:", blockchain);

const blockchainViz = new BlockchainVisualization(blockchain);

document.getElementById('mineBlockBtn')?.addEventListener('click', () => {
    blockchainViz.mineBlock();
});

console.log("CHAMA NO BUILD MININO")