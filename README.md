# RyCoin DApp

![GitHub last commit](https://img.shields.io/github/last-commit/Ryrden/RyCoin)
![GitHub language count](https://img.shields.io/github/languages/count/Ryrden/RyCoin)
![Github repo size](https://img.shields.io/github/repo-size/Ryrden/RyCoin)
![Github stars](https://img.shields.io/github/stars/Ryrden/RyCoin?style=social)

![Capa do Projeto](https://github.com/user-attachments/assets/55173bda-e672-4183-b9ad-62ad1430a16c)


> Projeto DApp desenvolvido para implementar e interagir com o token RyCoin, criado em Solidity e integrado ao MetaMask.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas:

- Node.js e npm. Você pode baixar [aqui](https://nodejs.org/).
- MetaMask como extensão do navegador (para conectar com a blockchain local).
- Vite para o desenvolvimento do frontend, instalado com: `npm install -g vite`
- Besu para instanciação da rede blockchain. Você pode baixar [aqui](https://besu.hyperledger.org/private-networks/get-started/install)

## Como executar o projeto

Siga as etapas abaixo para executar o projeto em sua máquina local:

1. Clone este repositório

    ```bash
    git clone <link-do-repositorio>
    ```

    Este link pode ser encontrado no botão verde acima `Code`.

2. Instale as dependências

    ```bash
    cd blockchain
    npm install
    cd ../frontend
    npm install
    ```

3. Inicie a rede Besu

    Abra 3 terminais (Linux ou WSL) No diretório `blockchain/besu-nodes` e para cada pasta, execute os comandos:

    Pasta `Node1`:

    ```bash
    besu --data-path=data --genesis-file=../privateNetworkGenesis.json --miner-enabled --miner-coinbase f17f52151EbEF6C7334FAD080c5704D77216b732 --rpc-http-enabled --host-allowlist="*" --rpc-http-cors-origins="all"
    ```

    Aguarde a iniciacialização deste nó e copie a string `enode` que ele irá expor, ela se parece com isso aqui: `enode://<hash>.0.0.1:30303`

    Para as proximas pastas execute o mesmo comando substituindo o atributo `<Node-1 Enode URL>` pelo enode obtido do Node anterior.
    Pasta `Node2` e `Node3`:

    ```bash
    besu --data-path=data --genesis-file=../privateNetworkGenesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30304 --profile=ENTERPRISE
    ```

    Deixe os 3 terminais rodando e siga o tutorial em outro.

    Para mais informações, deste passo a passo, siga o guia da [documentação oficial](https://besu.hyperledger.org/private-networks/tutorials/ethash)

4. Compile o contrato e faça deploy na rede Besu.

    No diretório `blockchain`, execute o comando

    ```bash
    npx hardhat run scripts/deploy.ts --network besu
    ```

    Copie o valor do Contract Address.

5. Cole o contract Address no Frontend e execute-o

    Após o deploy do contrato e obtendo o endereço de contrato, substituia-o na variavel `contractAddress` no arquivo [App.tsx](./frontend/src/App.tsx)
    Esse arquivo será necessário para que o frontend possa interagir com o contrato.

    Dentro do diretorio do frontend, execute o comando `npm run dev`

6. Configure o Metamask.

    Após execução do frontend, entre na extensão do metamask e crie uma nova rede localhost com o endereço exposto pela rede besu, que no caso, é:
    `localhost:8545` com chainId de valor `1337`.

    Feito isso, tudo configurado, utilize sua rede descentralizada :)

Abra o navegador e acesse o endereço fornecido pelo Vite para ver o DApp.

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte maneira:

```text
.
├── blockchain
│   ├── artifacts        # Artifacts de contratos compilados (Gerado após compilado)
│   ├── besu-nodes       # pasta onde estará exposto a rede P2P Besu da Blockchain.
│   │   ├── Node1
│   │   ├── Node2
│   │   └── Node3
│   ├── contracts        # Contratos Solidity (RyCoin.sol)
│   ├── scripts          # Scripts de deploy e interações com contratos
│   └── hardhat.config.ts # Configuração do Hardhat
└── frontend
    ├── src
    │   ├── App.tsx      # Componente raiz do frontend
    │   └── main.tsx     # Ponto de entrada do Vite
    ├── public           # Arquivos públicos, incluindo o index.html
    └── vite.config.ts   # Configuração do Vite
```

## Como contribuir

Se você deseja contribuir para este projeto, siga as etapas abaixo:

1. Faça um fork deste repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Criar a solicitação de pull.

Como alternativa, consulte a documentação do GitHub sobre [como criar uma solicitação de pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Licença

Este projeto está sob licença. Consulte [LICENSE](LICENSE) para obter mais informações.

## Voltar ao topo

[⬆ Voltar ao topo](#rycoin-dapp)
