import {Blockchain, Transaction} from "./blockchain";

const blockchain = new Blockchain(Number(process.argv[2] || 4));
const blockNumber = +process.argv[3] || 10;
let chain = blockchain.chain;

for (let i = 1; i <= blockNumber; i++) {
	const sampleTransaction: Transaction[] = [{
		id: "sampleID",
		sender: "Someone",
		receiver: "Someone else",
		amount: 100,
		timestamp: Date.now(),
		signature: "signature",
	}]
	const block = blockchain.createBlock(sampleTransaction);
	const mineInfo = blockchain.mineBlock(block.payload);
	chain = blockchain.pushBlock(mineInfo.minedBlock);
}

console.log("CHAIN\n");
console.table(chain);
