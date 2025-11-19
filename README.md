# Blockchain Certificate Generator & Verifier

**License:** MIT  
**Node.js Version:** v22.17.1  
**Solidity Version:** 0.8.0  

---

## 📖 Description

This is a decentralized application (DApp) for issuing and verifying certificates on the blockchain.  
It allows educational institutions and organizations to issue tamper-proof certificates and verify them via Certificate ID or Student Name.

---

## ✨ Features

- **Issue Certificates**:
  - Student Name
  - Course Name
  - Date of Issue
  - Unique Certificate ID
- **Verify Certificates**:
  - By Certificate ID (single certificate)
  - By Student Name (all certificates of a student)
- **QR Code Integration**:
  - Generate QR codes for quick verification
  - Scan QR codes to verify certificates
- **Case-Insensitive Name Lookup**

---

## 🛠 Tech Stack

### Blockchain & Smart Contracts
- Solidity 0.8
- Ethereum / Ganache (local blockchain)
- Truffle (for compiling & deploying)
- Ethers.js (for blockchain interaction)

### Backend
- Node.js + TypeScript
- Express.js REST API
- QR Code generation using `qrcode`

### Frontend (Optional)
- React or Vue.js for QR scanning and verification

---

## 📂 Project Structure

```plaintext
cert_gen/
├─ contracts/          # Solidity contracts
│   └─ Certificate.sol
├─ migrations/         # Truffle migration scripts
├─ src/
│   ├─ certGenerator.ts # Certificate generation & blockchain interaction
│   └─ server.ts        # Express backend API
├─ build/              # Compiled contracts (Truffle output)
├─ .env                # Environment variables
├─ package.json
└─ truffle-config.js
```

---

## 🚀 Getting Started

### 1 Clone the Repository

```bash
git clone <repo-url>
cd cert_gen
```

### 2 Install Dependencies

```bash
npm install
```

### 3 Configure Environment Variables

Create a `.env` file in the project root and add the following:

```ini

Wallet_Address=<your_wallet_Address>
PRIVATE_KEY=<your_wallet_private_key>
CONTRACT_ADDRESS=<deployed_contract_address>
INFURA_URL=http://127.0.0.1:7545
PORT=5000
```
### 4 Run Ganache in separate terminal and do not close this terminal
```
npx ganache@7.9.1 --port 7545
```
### 5 Compile & Deploy the Smart Contract(use another terminal)

```bash
truffle compile
truffle migrate --network development
```
###Before running the backend, make sure all the environment variables are set correctly
### 6 Start the Backend Server
```bash
npm run dev
```

---

## 🌐 API Endpoints

### 1️⃣ Issue Certificate

**Endpoint:** `POST /issue-certificate`  
**Request Body:**

```json
{
  "name": "Alice",
  "course": "Blockchain Basics",
  "certificateID": "ALICE2025" // Optional
}
```

**Response:**

```json
{
  "message": "Certificate issued!",
  "certificateID": "ALICE2025",
  "txHash": "<transaction_hash>",
  "qrByID": "<base64_qrcode>",
  "qrByName": "<base64_qrcode>"
}
```

---

### 2️⃣ Verify Certificate by ID

**Endpoint:** `GET /verify-certificate?id=<certificateID>`  
**Response:**

```json
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
```

---

### 3️⃣ Verify Certificates by Name

**Endpoint:** `GET /verify-certificate?name=<student_name>`  
**Response:**

```json
{
  "success": true,
  "type": "name",
  "certificates": [
    {
      "certificateID": "ALICE2025",
      "name": "Alice",
      "course": "Blockchain Basics",
      "dateIssued": "2025-10-14T11:00:54.000Z"
    },
    {
      "certificateID": "ALICE2026",
      "name": "Alice",
      "course": "Smart Contracts",
      "dateIssued": "2025-11-01T10:20:30.000Z"
    }
  ]
}
```

---

## 📝 Notes

- **Blockchain Requirements**:
  - Ganache or Infura must be running before issuing/verifying certificates.
- **Case-Insensitive Name Lookup**:
  - Names are case-insensitive for name-based verification.
- **QR Code Integration**:
  - QR codes link directly to verification endpoints.

---

## 🔮 Future Improvements

- Frontend UI for scanning QR codes and displaying certificates
- Integration with IPFS for certificate metadata storage
- Multi-network support (e.g., Polygon, Ethereum mainnet)
- Role-based access control for issuing certificates

---

## 📜 License

This project is licensed under the **MIT License**.
