import { BlockchainVisualization } from "./blockchainVisualization";
import { Blockchain, Transaction } from './blockchain';

const difficulty = Number(prompt("Enter the mining difficulty (default: 4):", "4")) || 4;
const blockchain = new Blockchain(difficulty);
console.log("Blockchain created:", blockchain);

const blockchainViz = new BlockchainVisualization(blockchain);

const transactions: Transaction[] = [];

// Handle modal opening and closing
const transactionModal = document.getElementById('transactionModal') as HTMLDialogElement;
const createTransactionBtn = document.getElementById('createTransactionBtn') as HTMLButtonElement;
const closeModalBtn = document.getElementById('closeModalBtn') as HTMLButtonElement;
const transactionForm = document.getElementById('transactionForm') as HTMLFormElement;

createTransactionBtn.addEventListener('click', () => {
    transactionModal.showModal();
});

closeModalBtn.addEventListener('click', () => {
    transactionModal.close();
});

// Handle transaction form submission
transactionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const sender = (document.getElementById('sender') as HTMLInputElement).value;
    const receiver = (document.getElementById('receiver') as HTMLInputElement).value;
    const amount = Number((document.getElementById('amount') as HTMLInputElement).value);

    const transaction: Transaction = {
        id: crypto.randomUUID(),
        sender,
        receiver,
        amount,
        timestamp: Date.now(),
        signature: '', // Transaction signing logic can be added here
    };

    transactions.push(transaction);
    console.log('Transaction added:', transaction);

    // Close the modal after adding the transaction
    transactionModal.close();
});

// Mine block when clicking the "Mine Block" button
document.getElementById('mineBlockBtn')?.addEventListener('click', () => {
    if (transactions.length === 0) {
        alert('Please add at least one transaction before mining a block.');
        return;
    }

    blockchainViz.mineBlock(transactions);
    transactions.length = 0; // Clear transactions after mining the block
});
