import cytoscape from 'cytoscape';
import { Blockchain, Block, Transaction } from './blockchain'; 

export class BlockchainVisualization {
    private cy: any; 
    private blockchain: Blockchain;
    private balances: Map<string, number>; // Map to track balances for each person

    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain;
        this.balances = new Map(); // Initialize the balances map
        this.initCytoscape();
        this.generateBlocks();
    }

    initCytoscape() {
        this.cy = cytoscape({
            container: document.getElementById('cy'),

            elements: [],

            style: [
                {
                    selector: 'node',
                    style: {
                        'label': 'data(label)',
                        'background-color': '#6FB1FC',
                        'shape': 'rectangle'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle',
                        'label': 'data(label)',
                        'font-size': '10px',
                        'text-background-color': '#ffffff',
                        'text-background-opacity': 0.8,
                        'text-background-shape': 'roundrectangle',
                        'text-margin-y': -10,
                        'color': '#333'
                    }
                }
            ],

            layout: {
                name: 'grid',
                rows: 1
            }
        });
    }
    

    generateBlocks() {
        const chain = this.blockchain.chain;

        for (const element of chain) {
            this.addBlockToGraph(element);
        }
    }

    addBlockToGraph(block: Block) {
        const sender = block.payload.data[0]?.sender;
        const receiver = block.payload.data[0]?.receiver;
        const amount = block.payload.data[0]?.amount;
    
        if (!sender || !receiver) {
            console.log("Block does not contain valid transaction data.");
            return;
        }
    
        if (!this.balances.has(sender)) {
            this.balances.set(sender, 100); 
        }
    
        if (!this.balances.has(receiver)) {
            this.balances.set(receiver, 100);
        }
    
        const senderBalance = this.balances.get(sender)! - amount;
        const receiverBalance = this.balances.get(receiver)! + amount;
        this.balances.set(sender, senderBalance);
        this.balances.set(receiver, receiverBalance);
    
        if (!this.cy.getElementById(sender).length) {
            this.cy.add({
                group: 'nodes',
                data: { id: sender, label: `${sender} (Balance: ${this.balances.get(sender)})` },
                position: { x: Math.random() * 500, y: Math.random() * 500 }
            });
        } else {
            this.updateBalance(sender);
        }
    
        if (!this.cy.getElementById(receiver).length) {
            this.cy.add({
                group: 'nodes',
                data: { id: receiver, label: `${receiver} (Balance: ${this.balances.get(receiver)})` },
                position: { x: Math.random() * 500, y: Math.random() * 500 }
            });
        } else {
            this.updateBalance(receiver);
        }
    
        let existingEdgeAB = this.cy.edges(`[source="${sender}"][target="${receiver}"]`);
        let existingEdgeBA = this.cy.edges(`[source="${receiver}"][target="${sender}"]`);
    
        let totalTransactions = 1; 
        let totalAmount = amount; 
    
        if (existingEdgeAB.length > 0 || existingEdgeBA.length > 0) {
            if (existingEdgeAB.length > 0) {
                totalTransactions += parseInt(existingEdgeAB.data('transactions'));
                totalAmount += parseFloat(existingEdgeAB.data('totalAmount'));
                existingEdgeAB.remove();
            }
            if (existingEdgeBA.length > 0) {
                totalTransactions += parseInt(existingEdgeBA.data('transactions'));
                totalAmount += parseFloat(existingEdgeBA.data('totalAmount'));
                existingEdgeBA.remove();
            }
        }
    
        this.cy.add({
            group: 'edges',
            data: {
                source: sender,
                target: receiver,
                label: `${totalTransactions} tx(s), Total: ${totalAmount}`,
                transactions: totalTransactions,
                totalAmount: totalAmount
            }
        });
    
        console.log(`Added or updated connection: ${sender} → ${receiver} for amount: ${amount}`);
        this.cy.layout({ name: 'grid' }).run(); // Apply layout to re-arrange
    }

    updateBalance(nodeId: string) {
        const balance = this.balances.get(nodeId) ?? 100;
        const node = this.cy.getElementById(nodeId);
        node.data('label', `${nodeId} (Balance: ${balance})`);
    }
    
    mineBlock(transactions: Transaction[]) {
        console.log("MINING BLOCK with transactions:", transactions);
    
        const block = this.blockchain.createBlock(transactions);
        console.log("Block Created:", block);
        
        const { minedBlock } = this.blockchain.mineBlock(block.payload);
        console.log("Block Mined:", minedBlock);
        
        this.blockchain.pushBlock(minedBlock);
        console.log("Block Added to Chain");
        
        minedBlock.payload.data.forEach((transaction) => {
            const senderBlock = { ...minedBlock, payload: { ...minedBlock.payload, data: [transaction] } };
            this.addBlockToGraph(senderBlock);
        });
    
        console.log("Blocks and transactions visualized.");
        this.cy.layout({ name: 'grid' }).run(); 
    }    
    
}