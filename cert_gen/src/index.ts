import dotenv from "dotenv";
import { Wallet, JsonRpcProvider } from "ethers";
import { CertGenerator, CertificateData } from "./certGenerator";

dotenv.config();

async function main() {
  // ✅ 1. Check environment variables
  const { PRIVATE_KEY, INFURA_URL, CONTRACT_ADDRESS } = process.env;
  if (!PRIVATE_KEY) throw new Error("❌ Missing PRIVATE_KEY in .env");
  if (!INFURA_URL) throw new Error("❌ Missing INFURA_URL in .env");
  if (!CONTRACT_ADDRESS) throw new Error("❌ Missing CONTRACT_ADDRESS in .env");

  // ✅ 2. Initialize blockchain connection
  const provider = new JsonRpcProvider(INFURA_URL);
  const wallet = new Wallet(PRIVATE_KEY, provider);

  console.log(`🔗 Connected to network: ${await provider.getNetwork().then(n => n.name)}`);
  console.log(`👛 Using wallet: ${wallet.address}`);
  console.log(`📄 Contract address: ${CONTRACT_ADDRESS}`);

  const certGen = new CertGenerator(wallet, CONTRACT_ADDRESS);

  // ✅ 3. Certificate data
  const certificate: CertificateData = {
    name: "John Doe",
    course: "Blockchain Basics",
    certificateID: "CERT124",
  };

  try {
    // ✅ 4. Issue a certificate on the blockchain
    console.log("⏳ Issuing certificate...");
    const tx = await certGen.generateCertificate(wallet.address, certificate);
    await tx.wait(); // Wait for mining

    console.log(`✅ Certificate generated successfully!`);
    console.log(`🔗 Transaction hash: ${tx.hash}`);
    console.log(`🆔 Certificate ID: ${certificate.certificateID}`);

    // ✅ 5. Retrieve the certificate by ID
    const certDetails = await certGen.getCertificate(certificate.certificateID);
    console.log("\n📜 Certificate Details:");
    console.log({
      name: certDetails[0],
      course: certDetails[1],
      dateIssued: new Date(Number(certDetails[2]) * 1000).toLocaleString(),
    });

    // ✅ 6. Retrieve certificates by name (normalized)
    const certIDs = await certGen.getCertificatesByName("john doe"); // lowercase check
    console.log("\n🔍 Certificates found by name:");
    console.log(certIDs);

  } catch (err: any) {
    console.error("\n❌ Error:", err.reason || err.message || err);
  }
}

main();
