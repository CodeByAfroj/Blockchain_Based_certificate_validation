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
import { Wallet, Provider } from "ethers";
import { Certificate, Certificate__factory } from "./contracts/types"; // TypeChain types

export interface CertificateData {
  name: string;
  course: string;
  certificateID: string;
}

export class CertGenerator {
  public contract: Certificate; // <-- typed contract

  constructor(private wallet: Wallet, contractAddress: string) {
    this.contract = Certificate__factory.connect(contractAddress, wallet);
  }

  async generateCertificate(recipient: string, data: CertificateData) {
    const tx = await this.contract.issueCertificate(data.name, data.course, data.certificateID);
    await tx.wait();
    return tx;
  }

  async getCertificate(certificateID: string) {
    const cert = await this.contract.getCertificate(certificateID);
    return {
      certificateID: cert[3],
      name: cert[0],
      course: cert[1],
      dateIssued: Number(cert[2]),
    };
  }

  async getCertificatesByName(name: string) {
    const certs = await this.contract.getCertificatesByName(name.trim().toLowerCase());
    return certs.map((c: any) => ({
      certificateID: c.certificateID,
      name: c.name,
      course: c.course,
      dateIssued: Number(c.dateIssued),
    }));
  }

  async getIssuedCertificates(provider: Provider) {
    const events = await this.contract.queryFilter(this.contract.filters.CertificateIssued());
    const issuedByAdmin = [];

    for (const evt of events) {
      const tx = await provider.getTransaction(evt.transactionHash);
      if (!tx) continue;

      // cast to EventLog to access args
      const event = evt as unknown as {
        args: { certificateID: string; name: string; course: string; dateIssued: bigint };
        transactionHash: string;
      };

      if (tx.from.toLowerCase() === this.wallet.address.toLowerCase()) {
        issuedByAdmin.push({
          certificateID: event.args.certificateID,
          name: event.args.name,
          course: event.args.course,
          dateIssued: new Date(Number(event.args.dateIssued) * 1000).toISOString(),
          txHash: event.transactionHash,
        });
      }
    }

    return issuedByAdmin;
  }
}
