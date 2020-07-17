# Essential Tools required for DAPP

    1. Nodejs - To install packages required for running app.

    2. Ganache - Personal Blockchain. Use to setup and run Local development blockchain that will allow you to create smart contracts and build blockchain applications using virtual accounts.

    3. Truffle Framework - Allow you to develop smart contract. Write the source code for the smart contracts, create tests, compile them, and deploy them to a blockchain.

    4. Metamask - This act like Ethereum Wallet that turns your web browser into a blockchain browser.

    5. Migration Contract file - Handles our migrations to the blockchain.
    Ethereum contracts are immutable and cost gas to deploy, Truffle offers a migration mechanism to keep track of which contracts (and which versions) have already been deployed. In a complex project with dozens of contracts and complex dependencies, you would not want to have to pay to redeploy contracts that haven’t changed. You would also not want to manually track which versions of which contracts have been deployed already. The Truffle migration mechanism does all that by deploying the smart contract Migrations.sol, which then keeps track of all other contract deployments.

    6. Migrations directory - This is where all of the migration files live.These migrations are similar to other web development frameworks that require migrations to change the state of a database.
    
    7. truffle-config.js file: this is the main configuration file for our Truffle project, where we'll handle things like network configuration.
    
    8. contract.json - This file is the compiled smart contract ABI file, which stands for "Abstract Binary Interface".
        a. It contains the compiled bytecode version of the Solidity smart contract code that can be run on a the Ethereum Virtual Machine (EVM).
        b. It contains a JSON representation of the smart contract functions that can be exposed to external clients, like client-side JavaScript applications.

# Here is an overview of all the functionality we'll get with the Truffle Framework:

    Smart Contract Management - write smart contracts with the Solidity programming language and compile them down to bytecode that be run on the Ethereum Virtal Machine (EVM).

    Automated Testing - write tests against your smart contracts to ensure that they behave the way you want them to. These tests can be written in JavaScript or Solidity, and can be run against any network configured by Truffle, including public blockchain networks.

    Deployment & Migrations - write scripts to migrate and deploy smart contracts to any public Ethereum blockchain network.

    Network Management - connect to any public Ethereum blockchain network, as well as any personal blockchain network you might use for development purposes.

    Development Console - interact with smart contracts inside a JavaScript runtime environment with the Truffle Console. You can connect to any blockchain network that you've specified within your network configuration to do this.

    Script Runner - write custom scripts that can run against a public blockchain network with JavaScript. You can write any arbitrary code inside this file and run it within your project.

    Client Side Development - configure your truffle project to host client side applications that talk to your smart contracts deployed to the blockchain.


# Some points with respect to Ethereum

    1. Ethereum was designed as a smart contract platform. Two other important and related concepts you’ll need to understand before working with Ethereum are the Ethereum Virtual Machine and gas.
    2. The Ethereum Virtual Machine (EVM) is where smart contracts run in Ethereum. A good metaphor is that the EVM is a distributed global computer where all smart contracts are executed.
    3. Every single operation that is executed inside the EVM is actually simultaneously executed by every node in the network. This is why gas exists.
    4. An Ethereum transaction contract code can trigger data reads and writes, do expensive computations like using cryptographic primitives, make calls (send messages) to other contracts, etc. Each of these operations have a cost measured in gas, and each gas unit consumed by a transaction must be paid for in Ether.
    5. This price is deducted from the Ethereum account sending the transaction. Transactions also have a gas limit parameter that is an upper bound on how much gas the transaction can consume.

# What is Web3.JS ?

    Simple task - Send ether from one account to another from Web3.js.
    Example : 
            web3.eth.sendTransaction({
                    from: '0xa4c30e1546820aaddf2a50b0186bb35f985e9465', // user address
                    to: '0xa552bf81fa9540a2df205a6789d603fe3370563a', // user address
                    value: 1000000000000000000, //Ether value in wei uint
                    gas: 21000,
                    gasPrice: 10000000000
            })

    In order to complete above task, you simply need to execute this code in a JavaScript runtime environment that connects to an Ethereum client through Web3JS.

    1. In simple words, it is the main JavaScript library for talking to the Ethereum blockchain. It allows you to read and write data, as well as execute code on the Ethereum blockchain.
    2. Ethereum is a peer-to-peer network where each node shares responsibility of maintaining the network. Each node gets a copy of all the data in the network, and each node participates in making sure that all of the data on each node is the same. This participation is referred to as Ethereum’s consensus algorithm.
    3. It is vital to ensure that each node has a copy of all the data on the network, and that there are no discrepancies because it keeps track of financial balances. The network ensures that the balance of each account is correct! This is what makes blockchain technology so powerful.
    4. In order to communicate with Ethereum, we only need to talk to one node because it acts on behalf of the entire network. We use Web3.js to do this. We can connect to an Ethereum node with a URL, and begin using the network itself.
    5. Once we have connected to this node, it will send a message to the Ethereum node we’re connected to, and that node will broadcast the transaction to the entire network.
    Once the transaction is complete, the balance of the `to` account will increase, and the balance of the `from` account will decrease. All of the nodes on the network will update their data to reflect this change in account balances to ensure that they are accurate.


# What is Ether?

    1.  Ether is the native cryptocurrency of the Ethereum blockchain. It is the value that gets transferred whenever you send value from one account to another.
    2. The Ethereum network performs all cryptocurrency calculations in Wei because it does not deal with any decimal places at a computational level. That’s why the value expressed in above code example is so large, because we don’t want to use any decimals.
    3. Ether is much like Bitcoin because it is the native cryptocurrency of its own network. It can be mined as well as sent to other accounts on the network.
    4. Ether is different from the Tokens that are built upon the Ethereum network because these tokens are controlled by smart contracts, and not by the network or miners.


# What is Gas ?

    1. Whenever you interact with the Ethereum blockchain, you are either reading data from it or writing data to it. Reading data from Ethereum is free, but writing to it costs money. This money is called “gas” and is paid in Ether by the account that initiates the transaction.

        gas: 21000,
        gasPrice: 10000000000

    gas 21000 -  the number of units of gas you are willing to pay to send the transaction. This is a limit. Any unused gas in the transaction will be refunded to the sender

    gasPrice 10000000000 - The gas price here is 10Gwei which will result in a fairly quick transaction. That’s because the higher the gas price, the faster the transaction and vice versa. The actual Ether cost of the gas used by the transaction can be obtained by multiplying the `gas` by the `gasPrice`.


# What is Proof of Work ?

    1. Ethereum is a peer-to-peer network of nodes that share responsibility for maintaining all of the data on the network and running computations on the network.
    2. All of the nodes on the network contain a copy of the data on the network and participate in the consensus algorithm that ensures that all the data is secured an unchanged.
    3. However, a smaller subset of these nodes actually opt into the mining process. In other words, only some of the nodes on the network are actually miners.
    4. Whenever a transaction is broadcast to the network, the miners compete to complete a cryptographic puzzle. Essentially, they are presented with an encrypted message, and the miners try to “guess” what the unencrypted message is by running it through a cryptographic hashing function and comparing the result to the original message.
    5. The first miner to guess correctly writes the transaction to the blockchain and is awarded the Ether, or gas, paid by the sender. This is called “Proof Of Work” because the miner is able to prove that they solved the puzzle and wrote the transaction to the blockchain.


# What is OpenZeppeline ?

    OpenZeppelin is an open framework of reusable and secure smart contracts in the Solidity language.

    It is community-driven, led by the Zeppelin team, with over a hundred external contributors. The main focus of the framework is security, achieved by applying industry-standard contract security patterns and best practices, drawing on all the experience the Zeppelin devs have gained from auditing a huge number of contracts, and through constant testing and auditing from the community that uses the framework as a base for their real-world applications.

    The OpenZeppelin framework is the most widely used solution for Ethereum smart contracts. The framework currently has an ample library of contracts including implementations of ERC20 and ERC721 tokens, many flavors of crowdsale models, and simple behaviors commonly found in contracts such as Ownable, Pausable, or LimitBalance. The contracts in this repository in some cases function as de facto standard implementations.


# What is a DApp?
    A DApp is an application that is mostly or entirely decentralized.
    Consider all the possible aspects of an application that may be decentralized:

    Backend software (application logic)

    Frontend software

    Data storage

    Message communications

    Name resolution


# DApp advantages 

    Resiliency
        Because the business logic is controlled by a smart contract, a DApp backend will be fully distributed and managed on a blockchain platform. Unlike an application deployed on a centralized server, a DApp will have no downtime and will continue to be available as long as the platform is still operating.

    Transparency
        The on-chain nature of a DApp allows everyone to inspect the code and be more sure about its function. Any interaction with the DApp will be stored forever in the blockchain.

    Censorship resistance
        As long as a user has access to an Ethereum node (running one if necessary), the user will always be able to interact with a DApp without interference from any centralized control. No service provider, or even the owner of the smart contract, can alter the code once it is deployed on the network

-------------------------------------------------------------------------------------------

    Backend (Smart Contract)
            In a DApp, smart contracts are used to store the business logic (program code) and the related state of your application. You can think of a smart contract replacing a server-side (aka "backend") component in a regular application. This is an oversimplification, of course. One of the main differences is that any computation executed in a smart contract is very expensive and so should be kept as minimal as possible. It is therefore important to identify which aspects of the application need a trusted and decentralized execution platform.

    Frontend (Web User Interface)
            Unlike the business logic of the DApp, which requires a developer to understand the EVM and new languages such as Solidity, the client-side interface of a DApp can use standard web technologies (HTML, CSS, JavaScript, etc.). This allows a traditional web developer to use familiar tools, libraries, and frameworks. Interactions with Ethereum, such as signing messages, sending transactions, and managing keys, are often conducted through the web browser, via an extension such as MetaMask

    Data Storage
            Due to high gas costs and the currently low block gas limit, smart contracts are not well suited to storing or processing large amounts of data. Hence, most DApps utilize off-chain data storage services, meaning they store the bulky data off the Ethereum chain, on a data storage platform. That data storage platform can be centralized (for example, a typical cloud database), or the data can be decentralized, stored on a P2P platform such as the IPFS, or Ethereum’s own Swarm platform.


    Decentralized Message Communications Protocols
            Another major component of any application is inter-process communication. That means being able to exchange messages between applications, between different instances of the application, or between users of the application. Traditionally, this is achieved by reliance on a centralized server. However, there are a variety of decentralized alternatives to server-based protocols, offering messaging over a P2P network. The most notable P2P messaging protocol for DApps is Whisper,


# EVM (Ethereum Virtual Machine) ?

    EVM can be thoughtful as Quasi-Turing complete machine. Turing machine refers to system with data manipluation rules. Examples Programming languages, CPUs can be refered as turing machine. A turing complete machine can be mathematically proven to have capability of performing any possible calculation. The EVM is only Quasi-Turing complete machine because computations performed by the machine are bound by the Gas and hence it has limitations to perform number of computations.



#   Database                                                Blockchain

Centralized                                             Decentralized
Permissioned                                            Permission-less
Administrator                                           No Administrator
Scalable                                                Less Scalable
Not Secure                                              Secured
Mutable                                                 Non-mutable
Single point of failure                                 Highly fault tolerable
Less transaction fee                                    High transaction fee


#  How is the Hash calculated ?

    Index + PreviousHash + Nounce + Timestamp + Data = Hash of current block and will be feed to next block as a previousHash.


#  Nonce: How many iterations did we go through before we found a valid block or hash ?
The process of finding a nonce that corresponds to a valid hash is mining.