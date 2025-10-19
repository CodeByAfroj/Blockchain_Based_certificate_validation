// import { Wallet } from "ethers";
// import { Certificate__factory } from "./contracts/types"; // Adjust path if needed

// export interface CertificateData {
//   name: string;
//   course: string;
//   certificateID: string;
// }

// export class CertGenerator {
//   private contract;

//   constructor(private wallet: Wallet, contractAddress: string) {
//     // Connect the wallet to the contract using TypeChain factory
//     this.contract = Certificate__factory.connect(contractAddress, wallet);
//   }

//   // Generate a certificate on the blockchain
//   async generateCertificate(recipient: string, data: CertificateData) {
//     const tx = await this.contract.issueCertificate(
//       data.name,
//       data.course,
//       data.certificateID
//     );
//     await tx.wait();
//     return tx;
//   }

//   // Retrieve certificate details
//   async getCertificate(certificateID: string) {
//     return await this.contract.getCertificate(certificateID);
//   }
// }


// import { Wallet } from "ethers";
// import { Certificate__factory } from "./contracts/types";

// export interface CertificateData {
//   name: string;
//   course: string;
//   certificateID: string;
// }

// export class CertGenerator {
//   private contract;

//   constructor(private wallet: Wallet, contractAddress: string) {
//     this.contract = Certificate__factory.connect(contractAddress, wallet);
//   }

//   async generateCertificate(recipient: string, data: CertificateData) {
//     const tx = await this.contract.issueCertificate(data.name, data.course, data.certificateID);
//     await tx.wait();
//     return tx;
//   }

//   async getCertificate(certificateID: string) {
//     return await this.contract.getCertificate(certificateID);
//   }
// async getCertificatesByName(name: string): Promise<string[]> {
//   const normalizedName = name.trim().toLowerCase(); // trim spaces and lowercase
//   const certs = await this.contract.getCertificatesByName(normalizedName);
//   return certs.map(c => c.toString());
// }



// }



// import { Wallet } from "ethers";
// import { Certificate__factory } from "./contracts/types";

// export interface CertificateData {
//   name: string;
//   course: string;
//   certificateID: string;
// }

// export interface CertificateByNameResult {
//   names: string[];
//   courses: string[];
//   datesIssued: number[];
//   certificateIDs: string[];
// }

// export class CertGenerator {
//   private contract;

//   constructor(private wallet: Wallet, contractAddress: string) {
//     this.contract = Certificate__factory.connect(contractAddress, wallet);
//   }

//   async generateCertificate(recipient: string, data: CertificateData) {
//     const tx = await this.contract.issueCertificate(
//       data.name,
//       data.course,
//       data.certificateID
//     );
//     await tx.wait();
//     return tx;
//   }

//   async getCertificate(certificateID: string) {
//     return await this.contract.getCertificate(certificateID);
//   }

//   async getCertificatesByName(name: string): Promise<CertificateByNameResult> {
//     const normalizedName = name.trim().toLowerCase();
//     const [names, courses, datesIssued, certificateIDs] =
//       await this.contract.getCertificatesByName(normalizedName);

//     // Convert BigNumber timestamps to numbers
//     const dates = datesIssued.map((d: any) => Number(d));

//     return { names, courses, datesIssued: dates, certificateIDs };
//   }
// }

//working uptil issued by
// import { Wallet, Provider } from "ethers";
// import { Certificate, Certificate__factory } from "./contracts/types"; // TypeChain types

// export interface CertificateData {
//   name: string;
//   course: string;
//   certificateID: string;
// }

// export class CertGenerator {
//   public contract: Certificate; // <-- typed contract

//   constructor(private wallet: Wallet, contractAddress: string) {
//     this.contract = Certificate__factory.connect(contractAddress, wallet);
//   }

//   async generateCertificate(recipient: string, data: CertificateData) {
//     const tx = await this.contract.issueCertificate(data.name, data.course, data.certificateID);
//     await tx.wait();
//     return tx;
//   }

//  async getCertificate(certificateID: string, provider?: Provider) {
//   const cert = await this.contract.getCertificate(certificateID);
//   const result = {
//     certificateID: cert[3],
//     name: cert[0],
//     course: cert[1],
//     dateIssued: Number(cert[2]),
//     txHash: "", // default
//   };

//   if (provider) {
//     const events = await this.contract.queryFilter(this.contract.filters.CertificateIssued(certificateID));
//     if (events.length > 0) {
//       result.txHash = events[0].transactionHash;
//     }
//   }

//   return result;
// }


//   async getCertificatesByName(name: string) {
//     const certs = await this.contract.getCertificatesByName(name.trim().toLowerCase());
//     return certs.map((c: any) => ({
//       certificateID: c.certificateID,
//       name: c.name,
//       course: c.course,
//       dateIssued: Number(c.dateIssued),
//     }));
//   }

//   async getIssuedCertificates(provider: Provider) {
//     const events = await this.contract.queryFilter(this.contract.filters.CertificateIssued());
//     const issuedByAdmin = [];

//     for (const evt of events) {
//       const tx = await provider.getTransaction(evt.transactionHash);
//       if (!tx) continue;

//       // cast to EventLog to access args
//       const event = evt as unknown as {
//         args: { certificateID: string; name: string; course: string; dateIssued: bigint };
//         transactionHash: string;
//       };

//       if (tx.from.toLowerCase() === this.wallet.address.toLowerCase()) {
//         issuedByAdmin.push({
//           certificateID: event.args.certificateID,
//           name: event.args.name,
//           course: event.args.course,
//           dateIssued: new Date(Number(event.args.dateIssued) * 1000).toISOString(),
//           txHash: event.transactionHash,
//         });
//       }
//     }

//     return issuedByAdmin;
//   }
// }


import { Wallet, Provider } from "ethers";
import { Certificate, Certificate__factory } from "./contracts/types"; // Adjust import path if needed

export interface CertificateData {
  name: string;
  course: string;
  certificateID: string;
  issuedBy: string;
}

export interface CertificateResult {
  certificateID: string;
  name: string;
  course: string;
  dateIssued: number;
  issuedBy: string;
  txHash?: string;
}

export class CertGenerator {
  public contract: Certificate;

  constructor(private wallet: Wallet, contractAddress: string) {
    // Connect wallet to the deployed Certificate contract
    this.contract = Certificate__factory.connect(contractAddress, wallet);
  }

  /** 🪄 Issue a new certificate on-chain */
  async generateCertificate(data: CertificateData) {
    const tx = await this.contract.issueCertificate(
      data.name,
      data.course,
      data.certificateID,
      data.issuedBy
    );
    await tx.wait();
    return tx;
  }

  /** 🔍 Get a single certificate by ID */
  async getCertificate(certificateID: string, provider?: Provider): Promise<CertificateResult> {
    const cert = await this.contract.getCertificate(certificateID);

    // cert is returned as a tuple, so destructure properly:
    const [name, course, dateIssued, id, issuedBy] = cert;

    const result: CertificateResult = {
      certificateID: id,
      name,
      course,
      dateIssued: Number(dateIssued),
      issuedBy,
    };

    // Optional: fetch transaction hash from emitted event
    if (provider) {
      const events = await this.contract.queryFilter(
        this.contract.filters.CertificateIssued(certificateID)
      );
      if (events.length > 0) {
        result.txHash = events[0].transactionHash;
      }
    }

    return result;
  }

  /** 📜 Get all certificates belonging to a person by name (case-insensitive) */
  async getCertificatesByName(name: string): Promise<CertificateResult[]> {
    const normalized = name.trim().toLowerCase();
    const certs = await this.contract.getCertificatesByName(normalized);

    return certs.map((c: any) => ({
      certificateID: c.certificateID,
      name: c.name,
      course: c.course,
      dateIssued: Number(c.dateIssued),
      issuedBy: c.issuedBy,
    }));
  }

  /** 🧾 Get all certificates issued by the current wallet address */
  async getIssuedCertificates(provider: Provider): Promise<CertificateResult[]> {
    const events = await this.contract.queryFilter(this.contract.filters.CertificateIssued());
    const issuedByAdmin: CertificateResult[] = [];

    for (const evt of events) {
      const tx = await provider.getTransaction(evt.transactionHash);
      if (!tx) continue;

      // cast to event with args
      const event = evt as unknown as {
        args: {
          certificateID: string;
          name: string;
          course: string;
          dateIssued: bigint;
          issuedBy: string;
        };
        transactionHash: string;
      };

      if (tx.from.toLowerCase() === this.wallet.address.toLowerCase()) {
        issuedByAdmin.push({
          certificateID: event.args.certificateID,
          name: event.args.name,
          course: event.args.course,
          dateIssued: Number(event.args.dateIssued),
          issuedBy: event.args.issuedBy,
          txHash: event.transactionHash,
        });
      }
    }

    return issuedByAdmin;
  }
}



