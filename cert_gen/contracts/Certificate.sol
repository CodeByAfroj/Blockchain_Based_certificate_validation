// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string name;
        string course;
        uint256 dateIssued;
        string certificateID;
    }

    mapping(string => Cert) private certificates; // certificateID => Cert
    mapping(string => string[]) private certificatesByName; // normalized name => certificateIDs

    event CertificateIssued(
        string certificateID,
        string name,
        string course,
        uint256 dateIssued
    );

    function normalize(string memory str) internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        for (uint i = 0; i < bStr.length; i++) {
            if (bStr[i] >= 0x41 && bStr[i] <= 0x5A) {
                bStr[i] = bytes1(uint8(bStr[i]) + 32); // A-Z -> a-z
            }
        }
        return string(bStr);
    }

    function issueCertificate(
        string memory _name,
        string memory _course,
        string memory _certificateID
    ) public {
        require(bytes(certificates[_certificateID].certificateID).length == 0, "Certificate ID exists");

        certificates[_certificateID] = Cert({
            name: _name,
            course: _course,
            dateIssued: block.timestamp,
            certificateID: _certificateID
        });

        string memory normalizedName = normalize(_name);
        certificatesByName[normalizedName].push(_certificateID);

        emit CertificateIssued(_certificateID, _name, _course, block.timestamp);
    }

    function getCertificate(string memory _certificateID)
        public
        view
        returns (string memory name, string memory course, uint256 dateIssued, string memory certificateID)
    {
        Cert memory cert = certificates[_certificateID];
        require(bytes(cert.certificateID).length != 0, "Certificate does not exist");
        return (cert.name, cert.course, cert.dateIssued, cert.certificateID);
    }

function getCertificatesByName(string memory _name)
    public
    view
    returns (Cert[] memory)
{
    string memory normalizedName = normalize(_name);
    string[] memory ids = certificatesByName[normalizedName];

    // Return empty array if no certificates found
    if (ids.length == 0) {
        return new Cert[](0);
    }

    Cert[] memory results = new Cert[](ids.length);
    for (uint i = 0; i < ids.length; i++) {
        results[i] = certificates[ids[i]];
    }
    return results;
}
}