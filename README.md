# RyCoin DApp

![GitHub last commit](https://img.shields.io/github/last-commit/Ryrden/RyCoin)
![GitHub language count](https://img.shields.io/github/languages/count/Ryrden/RyCoin)
![Github repo size](https://img.shields.io/github/repo-size/Ryrden/RyCoin)
![Github stars](https://img.shields.io/github/stars/Ryrden/RyCoin?style=social)

![Capa do Projeto](https://picsum.photos/1280/720)

> Projeto DApp desenvolvido para implementar e interagir com o token RyCoin, criado em Solidity e integrado ao MetaMask.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes dependências instaladas:

- Node.js e npm. Você pode baixar [aqui](https://nodejs.org/).
- MetaMask como extensão do navegador (para conectar com a blockchain local).
- Vite para o desenvolvimento do frontend, instalado com: `npm install -g vite`

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

3. Defina as variáveis de ambiente

    No diretório `blockchain`, crie um arquivo `.env` com as seguintes variáveis de ambiente:

    ```bash
    ALCHEMY_GOERLI_URL="https://eth-goerli.g.alchemy.com/v2/SUA_CHAVE_ALCHEMY"
    PRIVATE_KEY="SUA_CHAVE_PRIVADA"
    ```

4. Execute o backend

    No diretório `blockchain`, inicie o nó local do Hardhat para simular uma blockchain Ethereum:

    ```bash
    npx hardhat node
    ```

    Em outro terminal, faça o deploy do contrato `RyCoin` na rede local:

    ```bash
    npx hardhat run scripts/deploy.ts --network localhost
    ```

5. Copie o ABI para o Frontend

    Após o deploy, copie o arquivo `RyCoin.json` com o ABI do contrato para o diretório do frontend:

    ```bash
    cp blockchain/artifacts/contracts/RyCoin.sol/RyCoin.json frontend/src/abi/RyCoin.json
    ```

    Esse arquivo será necessário para que o frontend possa interagir com o contrato.

6. Execute o Frontend

    No diretório `frontend`, inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

Abra o navegador e acesse o endereço fornecido pelo Vite para ver o DApp.

## Estrutura de Pastas

A estrutura de pastas do projeto é organizada da seguinte maneira:

```text
.
├── blockchain
│   ├── artifacts        # Artifacts de contratos compilados (Gerado após compilado)
│   ├── contracts        # Contratos Solidity (RyCoin.sol)
│   ├── scripts          # Scripts de deploy e interações com contratos
│   ├── .env             # Variáveis de ambiente do backend
│   └── hardhat.config.ts # Configuração do Hardhat
└── frontend
    ├── src
    │   ├── abi          # Arquivo ABI do contrato RyCoin
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
