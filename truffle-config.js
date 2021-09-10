require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(process.env.PRIVATE_KEY, `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`)
      },
      gas: 8000000,
      gasPrice: 220000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      from: process.env.SENDER_ADDRESS,
      network_id: "3"
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
