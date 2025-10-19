npm i chai mocha truffle ts-node typechain typescript @typechain/ethers-v6
npm i @typechain/truffle-v5 @types/dotenv @types/express @types/node @types/qrc
npm i @truffle/hdwallet-provider web3 cors dotenv ethers express qrcode
npm install --save-dev typechain @typechain/ethers-v5 @typechain/truffle-v5 ethers
npm i ganache

//start  ganache a local bock chain //keep this in terminal to run continuously
npx ganache@7.9.1 --port 7545 

//get free 10 accounts
//update the .env file

# 3. Compile contracts
truffle compile
truffle migrate --reset

# generate TypeChain types
npm run typechain

//open second terminal

# 4. Deploy contracts
node scripts/deploy.js
//after deployment of a contract you will receive a contract address update it into .env file

//Compile & Migrate Smart Contract
truffle compile
truffle migrate --network development

npx typechain --target ethers-v6 --out-dir src/contracts/types ./build/contracts/*.json

npm start --> to run the server 






# 1. Start Ganache CLI (or open GUI)
npx ganache@7.9.1 --port 7545 

# 2. Install dependencies
npm install
npm install typescript ts-node @types/node --save-dev
npm install qrcode ethers dotenv cors express

# 3. Compile contracts
truffle compile
truffle migrate --reset
# generate TypeChain types
npm run typechain
# 4. Deploy contracts
node scripts/deploy.js

# 5. Optional: test in Truffle console
truffle console --network development

# 6. Run Node.js server
npx ts-node src/index.ts

# 7. Test API via curl or Postman
curl -X POST http://localhost:5000/issue-certificate -d '{"name":"John Doe","course":"Blockchain Basics","certificateID":"CERT001"}' -H "Content-Type: application/json"
curl "http://localhost:5000/verify-certificate-by-name?name=John%20Doe"
