const Certificate = artifacts.require("Certificate");

contract("Certificate", (accounts) => {
  let certificateInstance;

  before(async () => {
    certificateInstance = await Certificate.deployed();
  });

  it("should deploy the contract", async () => {
    assert(certificateInstance.address !== "");
  });

  it("should issue a certificate", async () => {
    const tx = await certificateInstance.issueCertificate(
      "John Doe",
      "Blockchain Basics",
      "CERT123"
    );
    const event = tx.logs[0].args;

    assert.equal(event.certificateID, "CERT123");
    assert.equal(event.name, "John Doe");
    assert.equal(event.course, "Blockchain Basics");
  });

  it("should retrieve a certificate", async () => {
    const cert = await certificateInstance.getCertificate("CERT123");
    assert.equal(cert[0], "John Doe");
    assert.equal(cert[1], "Blockchain Basics");
  });
});
