
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Wallet, JsonRpcProvider } from "ethers";
// import QRCode from "qrcode";
// import { CertGenerator, CertificateData } from "./certGenerator";

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// const provider = new JsonRpcProvider(process.env.INFURA_URL);
// const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);
// const certGen = new CertGenerator(wallet, process.env.CONTRACT_ADDRESS!);

// const normalizeName = (name: string) => name.trim().toLowerCase();

// // Issue certificate
// app.post("/issue-certificate", async (req, res) => {
//   const data: CertificateData = req.body;
//   if (!data.name || !data.course)
//     return res.status(400).json({ error: "Missing certificate data" });

//   const normalizedName = normalizeName(data.name);
//   const certificateID = data.certificateID || `${normalizedName}-${Date.now()}`;

//   try {
//     const tx = await certGen.generateCertificate(wallet.address, {
//       name: normalizedName,
//       course: data.course,
//       certificateID,
//     });

//     await tx.wait();

//     const qrByID = await QRCode.toDataURL(
//       `http://localhost:5000/verify-certificate?id=${encodeURIComponent(certificateID)}`
//     );
//     const qrByName = await QRCode.toDataURL(
//       `http://localhost:5000/verify-certificate?name=${encodeURIComponent(normalizedName)}`
//     );

//     res.json({
//       message: "Certificate issued!",
//       certificateID,
//       txHash: tx.hash,
//       qrByID,
//       qrByName,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err });
//   }
// });

// // Verify certificate
// app.get("/verify-certificate", async (req, res) => {
//   try {
//     const certificateID = req.query.id as string | undefined;
//     const name = req.query.name as string | undefined;

//     if (!certificateID && !name) {
//       return res.status(400).json({ success: false, error: "Provide either 'id' or 'name'" });
//     }

//     // By ID
//     if (certificateID) {
//       const cert = await certGen.getCertificate(certificateID);
//       return res.json({
//         success: true,
//         type: "id",
//         certificate: {
//           certificateID: cert.certificateID,
//           name: cert.name,
//           course: cert.course,
//           dateIssued: new Date(cert.dateIssued * 1000).toISOString(),
//         },
//       });
//     }

//     // By name
//     if (name) {
//       const normalizedName = normalizeName(name);
//       const certs = await certGen.getCertificatesByName(normalizedName);

//       return res.json({
//         success: true,
//         type: "name",
//         certificates: certs.map((c) => ({
//           certificateID: c.certificateID,
//           name: c.name,
//           course: c.course,
//           dateIssued: new Date(c.dateIssued * 1000).toISOString(),
//         })),
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err });
//   }
// });



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Wallet, JsonRpcProvider } from "ethers";
import QRCode from "qrcode";
import { CertGenerator, CertificateData } from "./certGenerator";
import { hash } from "crypto";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const provider = new JsonRpcProvider(process.env.INFURA_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);
const certGen = new CertGenerator(wallet, process.env.CONTRACT_ADDRESS!);

const normalizeName = (name: string) => name.trim().toLowerCase();

// Issue certificate
// app.post("/issue-certificate", async (req, res) => {
//   const data: CertificateData = req.body;
//   if (!data.name || !data.course)
//     return res.status(400).json({ error: "Missing certificate data" });

//   const normalizedName = normalizeName(data.name);
//   const certificateID = data.certificateID || `${normalizedName}-${Date.now()}`;

//   try {
//     const tx = await certGen.generateCertificate(wallet.address, {
//       name: normalizedName,
//       course: data.course,
//       certificateID,
//     });

//     await tx.wait();

//     const qrByID = await QRCode.toDataURL(
//       `http://localhost:5000/verify-certificate?id=${encodeURIComponent(certificateID)}`
//     );
//     const qrByName = await QRCode.toDataURL(
//       `http://localhost:5000/verify-certificate?name=${encodeURIComponent(normalizedName)}`
//     );

//     res.json({
//       message: "Certificate issued!",
//       certificateID,
//       txHash: tx.hash,
//       qrByID,
//       qrByName,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err });
//   }
// });


// Issue certificate
app.post("/issue-certificate", async (req, res) => {
  const data: CertificateData = req.body;
  if (!data.name || !data.course)
    return res.status(400).json({ error: "Missing certificate data" });

  const normalizedName = normalizeName(data.name);
  const certificateID = data.certificateID || `${normalizedName}-${Date.now()}`;

  try {
    const tx = await certGen.generateCertificate({
      name: normalizedName,
      course: data.course,
      certificateID,
      issuedBy: data.issuedBy, // ✅ required since Solidity expects it
    });

    await tx.wait();

    const qrByID = await QRCode.toDataURL(
      `http://localhost:5000/verify-certificate?id=${encodeURIComponent(certificateID)}`
    );
    const qrByName = await QRCode.toDataURL(
      `http://localhost:5000/verify-certificate?name=${encodeURIComponent(normalizedName)}`
    );

    res.json({
      message: "Certificate issued!",
      certificateID,
      txHash: tx.hash,
      qrByID,
      qrByName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err instanceof Error ? err.message : err });
  }
});


// Verify certificate
app.get("/verify-certificate", async (req, res) => {
  try {
    const certificateID = req.query.id as string | undefined;
    const name = req.query.name as string | undefined;

    if (!certificateID && !name) {
      return res.status(400).json({ success: false, error: "Provide either 'id' or 'name'" });
    }

    // By ID
    if (certificateID) {
      const cert = await certGen.getCertificate(certificateID);
      return res.json({
        success: true,
        type: "id",
        certificate: {
          certificateID: cert.certificateID,
          name: cert.name,
          course: cert.course,
          dateIssued: new Date(cert.dateIssued * 1000).toISOString(),
          issuedBy:cert.issuedBy,
          txhash:cert.txHash
          
        },
      });
    }

    // By name
    if (name) {
      const normalizedName = normalizeName(name);
      const certs = await certGen.getCertificatesByName(normalizedName);

      return res.json({
        success: true,
        type: "name",
        certificates: certs.map((c) => ({
          certificateID: c.certificateID,
          name: c.name,
          course: c.course,
          dateIssued: new Date(c.dateIssued * 1000).toISOString(),
            issuedBy:c.issuedBy,
          txhash:c.txHash
        })),
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
});

// ----------------------------
// NEW: Get all certificates issued by admin
// ----------------------------
app.get("/issued-certificates", async (req, res) => {
  try {
    const issuedCertificates = await certGen.getIssuedCertificates(provider);
    res.json({ success: true, certificates: issuedCertificates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err instanceof Error ? err.message : err });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
