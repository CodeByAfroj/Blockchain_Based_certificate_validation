const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    goerli: {
      provider: () =>
        new HDWalletProvider([process.env.PRIVATE_KEY], process.env.INFURA_URL),
      network_id: 5,
      gas: 4465030,
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
};
