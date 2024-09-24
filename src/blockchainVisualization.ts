import cytoscape from 'cytoscape';
import { Blockchain, Block, Transaction } from './blockchain'; 

export class BlockchainVisualization {
    private cy: any; 
    private blockchain: Blockchain;

    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain;
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
                        'target-arrow-shape': 'triangle'
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
        const id = `block${block.payload.blockIndex}`;
        this.cy.add({
            group: 'nodes',
            data: { id, label: `Block ${block.payload.blockIndex}` }
        });

        if (block.payload.blockIndex > 0) {
            const prevId = `block${block.payload.blockIndex - 1}`;
            this.cy.add({
                group: 'edges',
                data: { source: prevId, target: id }
            });
        }
        console.log("Block added to graph:", block);
    }

    mineBlock() {
        console.log("MINING BLOCK");

        const data: Transaction[] = []; // Transações de exemplo
        const block = this.blockchain.createBlock(data);
        console.log("Block Created:", block);
    
        const { minedBlock } = this.blockchain.mineBlock(block.payload);
        console.log("Block Mined:", minedBlock);
    
        this.blockchain.pushBlock(minedBlock);
        console.log("Block Added to Chain");
    
        this.addBlockToGraph(minedBlock);
        console.log("Block Added to Graph");
    
        this.cy.layout({ name: 'grid', rows: 1 }).run(); // Atualiza o layout
        console.log("Layout Updated");
    }
}