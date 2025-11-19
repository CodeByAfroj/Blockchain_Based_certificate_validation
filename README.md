# Blockchain Certificate Generator & Verifier

> Navigation
>
> - Quick Start
> - What this does
> - Very Quick Demo (1-minute)
> - Full Setup (step-by-step)
> - API (examples you can copy)
> - Files you'll care about
> - Troubleshooting & FAQ
> - Contributing & License

> Quick Info
>
> - Licence: MIT
> - Node.js: v22.x (tested on v22.17.1)
> - Solidity: 0.8.x
> - Backend: Node.js + TypeScript + Express
> - Blockchain: Ganache (local) or Infura (remote)
> - Contract: contracts/Certificate.sol
> - Default backend port: 5000 (configurable via .env)

Overview — in one sentence
This repo lets organizations issue tamper-proof certificates on a blockchain and verify them by certificate ID or student name (case-insensitive). QR codes are generated for quick verification.

Why this README is special
- Simple, plain English steps you can copy-paste.
- Example commands that work on a fresh machine.
- Minimal troubleshooting tips so you don’t get stuck.

Very quick demo (1 minute)
1. Clone:
   git clone <repo-url> && cd cert_gen
2. Install:
   npm install
3. Create .env with these values:
   PRIVATE_KEY=<your_wallet_private_key>
   INFURA_URL=<your_infura_rpc_url or Ganache RPC>
   CONTRACT_ADDRESS=<deployed_contract_address or leave blank until deploy>
   PORT=5000
4. Start local blockchain (Ganache GUI or ganache-cli), compile & deploy:
   truffle compile
   truffle migrate --network development
5. Start backend:
   npm run dev
6. Issue a certificate (in another terminal):
   curl -X POST http://localhost:5000/issue-certificate \
     -H "Content-Type: application/json" \
     -d '{"name":"Alice","course":"Blockchain Basics","certificateID":"ALICE2025"}'
7. Verify:
   curl "http://localhost:5000/verify-certificate?id=ALICE2025"
   curl "http://localhost:5000/verify-certificate?name=alice"

If the server is up and the contract is deployed correctly, you’ll see JSON responses and QR code strings (base64).

Full setup — step-by-step (easy)
1. Prerequisites
   - Node.js 22.x installed
   - npm or pnpm
   - truffle installed globally (optional but recommended): npm install -g truffle
   - Ganache running locally OR an Infura RPC URL and funded account private key
   - Optional: Postman or curl for testing

2. Clone and install
   git clone <repo-url>
   cd cert_gen
   npm install

3. Create .env file in project root (example)
   PRIVATE_KEY="0x..."
   INFURA_URL="https://goerli.infura.io/v3/YOUR_PROJECT_ID"   # or http://127.0.0.1:7545 for Ganache
   CONTRACT_ADDRESS=""      # fill after deploy
   PORT=5000

4. Compile & deploy smart contract (local Ganache)
   truffle compile
   truffle migrate --network development
   After migration, copy the deployed contract address and paste into .env as CONTRACT_ADDRESS.

5. Start backend server
   npm run dev
   - The backend will use Ethers.js to connect to the blockchain and the deployed contract.
   - It creates endpoints for issuing and verifying certificates and generates QR codes.

6. Test APIs with curl (copy/paste examples below)

API — copy-paste examples

1) Issue Certificate (POST /issue-certificate)
Request:
curl -X POST http://localhost:5000/issue-certificate \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "course": "Blockchain Basics",
    "certificateID": "ALICE2025"
  }'

Response (example):
{
  "message": "Certificate issued!",
  "certificateID": "ALICE2025",
  "txHash": "0x123abc...",
  "qrByID": "data:image/png;base64,iVBORw0K...",
  "qrByName": "data:image/png;base64,iVBORw0K..."
}

Notes:
- certificateID is optional. If omitted, the backend will generate a unique ID.
- qrByID and qrByName are base64 PNG images you can embed directly in an <img> tag.

2) Verify by Certificate ID (GET /verify-certificate?id=ID)
Request:
curl "http://localhost:5000/verify-certificate?id=ALICE2025"

Response (example):
{
  "success": true,
  "type": "id",
  "certificate": {
    "certificateID": "ALICE2025",
    "name": "Alice",
    "course": "Blockchain Basics",
    "dateIssued": "2025-10-14T11:00:54.000Z"
  }
}

3) Verify by Student Name (GET /verify-certificate?name=alice)
Request:
curl "http://localhost:5000/verify-certificate?name=alice"

Response (example):
{
  "success": true,
  "type": "name",
  "certificates": [ ... all certificates where name matches case-insensitively ... ]
}

What the QR codes do
- QR codes encode URLs to your backend verification endpoints (by ID and by name).
- Scan the QR code to open the verification page or endpoint.
- The API returns base64 image strings; the frontend can render them directly.

Files you'll care about (simple map)
- contracts/Certificate.sol — Solidity smart contract for storing certificates.
- migrations/ — Truffle migration scripts to deploy the contract.
- src/certGenerator.ts — Code that talks to the blockchain and issues certificates.
- src/server.ts — Express server with API endpoints (issue + verify).
- build/ — Truffle build artifacts after compile/migrate.
- .env — environment variables (do not commit!)
- package.json — scripts:
  - npm run dev  (start the server in development)
  - npm run build (if applicable)
  - truffle commands for compile & migrate

Common gotchas & troubleshooting (fast fixes)
- Error: cannot connect to provider
  - Make sure Ganache or your RPC (INFURA_URL) is running and correct in .env.
  - If using Ganache, default RPC is http://127.0.0.1:7545 or 8545.
- Transactions failing / revert
  - Ensure PRIVATE_KEY funds the address (has some ETH on the chosen network).
  - Check contract ABI and address are correct in src config.
- QR not visible
  - The API returns a data URL: data:image/png;base64,... Use <img src="..."> to display it.

FAQ (short)
Q: Can anyone issue certificates?
A: In this simple demo, yes. For production you must add role-based access control to the contract.

Q: Can I store certificate files or metadata on IPFS?
A: Yes — future improvement: store certificate metadata on IPFS and store the IPFS hash in the contract.

Q: How do I make name lookup case-insensitive?
A: Names are normalized to a single case (e.g., lowerCase) before adding and searching.

Security & production notes (very short)
- Never commit PRIVATE_KEY and .env to git.
- Use environment-specific RPC endpoints and guard who can call issue endpoints.
- For production, use role-based access control in the smart contract and HTTPS on the server.

Contributing (one-liner)
- Open an issue or PR. Keep changes small and explain why. Tests welcome!

License
- MIT

Want me to also:
- simplify server.ts and show the exact code you can copy-paste to run? (Yes/No)
- create a super-simple front-end example that scans QR and shows the verification? (Yes/No)
