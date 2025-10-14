// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Wallet, JsonRpcProvider } from "ethers";
// import { CertGenerator, CertificateData } from "./certGenerator";
// import QRCode from "qrcode";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const provider = new JsonRpcProvider(process.env.INFURA_URL);
// const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);
// const certGen = new CertGenerator(wallet, process.env.CONTRACT_ADDRESS!);

// // Issue certificate route
// app.post("/issue-certificate", async (req, res) => {
//   const data: CertificateData = req.body;

//   if (!data.name || !data.course || !data.certificateID) {
//     return res.status(400).json({ error: "Missing certificate data" });
//   }

//   try {
//     // Issue certificate on blockchain
//     const tx = await certGen.generateCertificate(wallet.address, data);
//     await tx.wait();

//     // Create QR code that encodes the certificate ID or a URL to verify
//     const qrData = `${data.certificateID}`; 
//     // Or use a URL: `http://localhost:5000/verify-certificate/${data.certificateID}`
//     const qrCode = await QRCode.toDataURL(qrData);

//     res.json({
//       message: "Certificate issued!",
//       txHash: tx.hash,
//       qrCode, // Base64 image string
//     });
//   } catch (err) {
//     res.status(500).json({ error: err});
//   }
// });
// // Verify certificate route
// app.get("/verify-certificate/:id", async (req, res) => {
//   const certificateID = req.params.id;

//   try {
//     const cert = await certGen.getCertificate(certificateID);
//     res.json({
//       name: cert[0],
//       course: cert[1],
//       dateIssued: new Date(Number(cert[2]) * 1000).toUTCString(),
//     });
//   } catch (err) {
//     res.status(404).json({ error: "Certificate not found" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



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

// // POST /issue-certificate
// // POST /issue-certificate
// app.post("/issue-certificate", async (req, res) => {
//   const data: CertificateData = req.body;

//   if (!data.name || !data.course) {
//     return res.status(400).json({ error: "Missing certificate data" });
//   }

//   // Generate a unique certificateID if not provided
//   const certificateID = data.certificateID || `${data.name}-${Date.now()}`;

//   try {
//     const tx = await certGen.generateCertificate(wallet.address, {
//       name: data.name,
//       course: data.course,
//       certificateID,
//     });
//     await tx.wait();

//     // QR code for verifying by certificateID
//     const qrByID = await QRCode.toDataURL(
//       `http://localhost:5000/verify-certificate-by-id?id=${encodeURIComponent(certificateID)}`
//     );

//     // QR code for verifying by name
//     const qrByName = await QRCode.toDataURL(
//       `http://localhost:5000/verify-certificate-by-name?name=${encodeURIComponent(data.name)}`
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


// // GET /verify-certificate-by-name
// // GET /verify-certificate
// app.get("/verify-certificate", async (req, res) => {
//   try {
//     const certificateID = req.query.id as string | undefined;
//     const name = req.query.name as string | undefined;

//     if (!certificateID && !name) {
//       return res.status(400).json({ success: false, error: "Provide either 'id' or 'name'" });
//     }

//     if (certificateID) {
//       // Verify by certificateID
//       const cert = await certGen.getCertificate(certificateID);
//       return res.json({
//         success: true,
//         type: "id",
//         certificate: {
//           certificateID,
//           name: cert[0],
//           course: cert[1],
//           dateIssued: new Date(Number(cert[2]) * 1000).toISOString(),
//         },
//       });
//     }

//     if (name) {
//       // Verify by name
//       const certIDs = await certGen.getCertificatesByName(name);
//       const certificates = await Promise.all(
//         certIDs.map(async (id) => {
//           const c = await certGen.getCertificate(id);
//           return {
//             certificateID: id,
//             name: c[0],
//             course: c[1],
//             dateIssued: new Date(Number(c[2]) * 1000).toISOString(),
//           };
//         })
//       );
//       return res.json({
//         success: true,
//         type: "name",
//         certificates,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err });
//   }
// });





// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//v3

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

// // Helper function to normalize names
// const normalizeName = (name: string) => name.trim().toLowerCase();

// // POST /issue-certificate
// app.post("/issue-certificate", async (req, res) => {
//   const data: CertificateData = req.body;

//   if (!data.name || !data.course) {
//     return res.status(400).json({ error: "Missing certificate data" });
//   }

//   // Normalize name for storage
//   const normalizedName = normalizeName(data.name);

//   // Generate a unique certificateID if not provided
//   const certificateID = data.certificateID || `${normalizedName}-${Date.now()}`;

//   try {
//     const tx = await certGen.generateCertificate(wallet.address, {
//       name: normalizedName,
//       course: data.course,
//       certificateID,
//     });
//     await tx.wait();

//     // QR code for verifying by certificateID
//     const qrByID = await QRCode.toDataURL(
//       `http://localhost:5000/verify-certificate?id=${encodeURIComponent(certificateID)}`
//     );

//     // QR code for verifying by name
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



// // GET /verify-certificate
// // Can verify by either id or name
// app.get("/verify-certificate", async (req, res) => {
//   try {
//     const certificateID = req.query.id as string | undefined;
//     const name = req.query.name as string | undefined;

//     if (!certificateID && !name) {
//       return res
//         .status(400)
//         .json({ success: false, error: "Provide either 'id' or 'name'" });
//     }

//     // Verification by ID
//     if (certificateID) {
//       const cert = await certGen.getCertificate(certificateID);
//       return res.json({
//         success: true,
//         type: "id",
//         certificate: {
//           certificateID,
//           name: cert[0],
//           course: cert[1],
//           dateIssued: new Date(Number(cert[2]) * 1000).toISOString(),
//         },
//       });
//     }

//     // Verification by name
//     if (name) {
//       const normalizedName = normalizeName(name);
//       const certIDs = await certGen.getCertificatesByName(normalizedName);

//       if (!certIDs || certIDs.length === 0) {
//         return res.json({
//           success: true,
//           type: "name",
//           certificates: [],
//         });
//       }

//       const certificates = await Promise.all(
//         certIDs.map(async (id) => {
//           const c = await certGen.getCertificate(id);
//           return {
//             certificateID: id,
//             name: c[0],
//             course: c[1],
//             dateIssued: new Date(Number(c[2]) * 1000).toISOString(),
//           };
//         })
//       );

//       return res.json({
//         success: true,
//         type: "name",
//         certificates,
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

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const provider = new JsonRpcProvider(process.env.INFURA_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);
const certGen = new CertGenerator(wallet, process.env.CONTRACT_ADDRESS!);

const normalizeName = (name: string) => name.trim().toLowerCase();

// Issue certificate
app.post("/issue-certificate", async (req, res) => {
  const data: CertificateData = req.body;
  if (!data.name || !data.course)
    return res.status(400).json({ error: "Missing certificate data" });

  const normalizedName = normalizeName(data.name);
  const certificateID = data.certificateID || `${normalizedName}-${Date.now()}`;

  try {
    const tx = await certGen.generateCertificate(wallet.address, {
      name: normalizedName,
      course: data.course,
      certificateID,
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
    res.status(500).json({ error: err });
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
        })),
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

