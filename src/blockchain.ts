import SHA256 from "crypto-js/sha256";

export interface Block {
	header: {
		nonce: number;
		blockHash: string;
	};
	payload: {
		blockIndex: number;
		timestamp: number;
		data: Transaction[];
		previousHash: string;
	};
}

export interface Transaction {
	id: string; // UUID
	sender: string;
	receiver: string;
	amount: number;
	timestamp: number; // Unix timestamp
	signature: string;
}

export class Blockchain {
	#chain: Block[] = [];
	private powPrefix = "0";

	constructor(private readonly difficulty: number = 4) {
		const genesisTransaction: Transaction = {
			id: crypto.randomUUID(),
			sender: "Ryan",
			receiver: "Genesis",
			amount: 0,
			timestamp: Date.now(),
			signature: '',
		};
	
		const genesisBlock: Block = {
			header: {nonce: 0, blockHash: ""},
			payload: {
				blockIndex: 0,
				timestamp: Date.now(),
				data: [genesisTransaction],
				previousHash: "",
			},
		};
	
		this.#chain.push(genesisBlock);
		console.log("Genesis block created with Ryan as the sender!");
	}

	get chain() {
		return this.#chain;
	}

	private get lastBlock(): Block {
		return this.#chain.at(-1) as Block;
	}

	private getPreviousBlockHash() {
		return this.lastBlock.header.blockHash;
	}

	public createBlock(data: Transaction[]): Block {
		console.log(`Creating block #${this.lastBlock.payload.blockIndex + 1}...`);
		const payload = {
			blockIndex: this.lastBlock.payload.blockIndex + 1,
			timestamp: Date.now(),
			data,
			previousHash: this.getPreviousBlockHash(),
		};

		console.log(`Created block #${payload.blockIndex}: ${JSON.stringify(payload, null, 2)}`);
		return {
			header: {nonce: 0, blockHash: ""},
			payload,
		};
	}

	public mineBlock(block: Block["payload"]) {
		let nonce = 0;
		let startTime = Date.now();

		while (true) {
			const blockHash = this.hash(JSON.stringify(block));
			const proofingHash = this.hash(blockHash + nonce);

			if (this.isHashProofed(proofingHash)) {
				const endTime = Date.now();
				const shortHash = blockHash.slice(0, 12);
				const mineTime = (endTime - startTime) / 1000;

				console.log(
					`Mined block ${block.blockIndex} in ${mineTime} seconds. Hash: ${shortHash} (${nonce} attempts)`
				);

				return {
					minedBlock: {
						payload: {...block},
						header: {nonce, blockHash},
					},
					minedHash: proofingHash,
					shortHash,
					mineTime,
				};
			}
			nonce++;
		}
	}

	public verifyBlock(block: Block): boolean {
		if (block.payload.previousHash !== this.getPreviousBlockHash()) {
			console.error(
				`Invalid block #${
					block.payload.blockIndex
				}: Previous block hash is "${this.getPreviousBlockHash().slice(
					0,
					12
				)}" not "${block.payload.previousHash.slice(0, 12)}"`
			);
			return false;
		}

		if (
			!this.isHashProofed(this.hash(this.hash(JSON.stringify(block.payload)) + block.header.nonce))
		) {
			console.error(
				`Invalid block #${block.payload.blockIndex}: Hash is not proofed, nonce ${block.header.nonce} is not valid`
			);
			return false;
		}

		return true;
	}

	public pushBlock(block: Block): Block[] {
		if (this.verifyBlock(block)) {
			this.#chain.push(block);
			console.log(`Pushed block #${block.payload.blockIndex}`);
		}
		return this.#chain;
	}

	private hash(data: string): string {
		return SHA256(data).toString();
			}
	

	private isHashProofed(hash: string): boolean {
		const prefix = this.powPrefix.repeat(this.difficulty);
		return hash.startsWith(prefix);
	}
}
