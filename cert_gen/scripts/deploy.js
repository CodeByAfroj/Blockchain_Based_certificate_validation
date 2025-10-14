const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Certificate = require("../build/contracts/Certificate.json");
require("dotenv").config();

const provider = new HDWalletProvider(
  [process.env.PRIVATE_KEY], // wrap in an array
  process.env.INFURA_URL
);


const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying from account:", accounts[0]);

  const result = await new web3.eth.Contract(Certificate.abi)
    .deploy({ data: Certificate.bytecode })
    .send({ from: accounts[0], gas: 6000000 });

  console.log("Contract deployed to:", result.options.address);
  provider.engine.stop();
};

deploy();
