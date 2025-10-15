import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { XCircleIcon } from "@heroicons/react/solid";
import { QRCodeSVG } from "qrcode.react";
import { Calendar, User, Download, Share2 } from "lucide-react";

export default function Cert_Res() {
  const [searchInput, setSearchInput] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);

const handleVerify = async () => {
  const query = searchInput.trim();
  if (!query) return;

  setLoading(true);
  setVerifyResult(null);

  try {
    const params = {};

    // Only add param if it has a value
    if (/^\d+$/.test(query)) {
      params.name = query;
    } else {
      params.id = query;
    }

    const res = await axios.get("http://localhost:5000/verify-certificate", { params });
    const body = res?.data ?? null;

    if (body?.success) {
      if (body.certificate) {
        setVerifyResult({ success: true, type: "id", certificate: body.certificate });
      } else if (Array.isArray(body.certificates) && body.certificates.length > 0) {
        setVerifyResult({ success: true, type: "name", certificates: body.certificates });
      } else {
        setVerifyResult({ success: false });
      }
    } else {
      setVerifyResult({ success: false });
    }
  } catch (err) {
    console.error(err);
    setVerifyResult({ success: false });
  } finally {
    setLoading(false);
  }
};



  const handleDownloadReport = (cert) => {
    const report = `
BLOCKCHAIN CERTIFICATE VERIFICATION REPORT
==========================================

Certificate Details:
- Name: ${cert.name}
- Course: ${cert.course}
- Date Issued: ${cert.dateIssued}
- Certificate ID: ${cert.certificateID}

Verified on: ${new Date().toLocaleString()}
Verification Method: Blockchain Network
`.trim();

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate-verification-${cert.certificateID}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = (cert) => {
    const shareData = {
      title: "Certificate Verification Result",
      text: `Certificate for ${cert.name} has been verified as authentic on the blockchain.`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`));
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg"
    >
      <h2 className="text-center text-2xl font-semibold mb-6 text-teal-400">Certificate Verification</h2>

      <div className="mb-4">
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-gray-100 mb-2"
          placeholder="Enter Certificate ID or Student Name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="w-full" onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {verifyResult && (
        <div className="mt-6 space-y-4">
          {verifyResult.success ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4 bg-gray-800 p-4 rounded-md">
                {verifyResult.type === "id" && verifyResult.certificate && (
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-teal-400" />
                      <span className="font-semibold text-gray-200">Certificate Holder</span>
                    </div>
                    <p><strong>Name:</strong> {verifyResult.certificate.name}</p>
                    <p><strong>Course:</strong> {verifyResult.certificate.course}</p>
                    <p className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {new Date(verifyResult.certificate.dateIssued).toLocaleDateString()}
                    </p>
                    <p><strong>Certificate ID:</strong> {verifyResult.certificate.certificateID}</p>
                  </div>
                )}

                {verifyResult.type === "name" && Array.isArray(verifyResult.certificates) && (
                  verifyResult.certificates.map((c) => (
                    <div key={c.certificateID} className="border border-gray-700 p-2 rounded-md mt-2">
                      <p><strong>{c.course}</strong></p>
                      <p>Date Issued: {new Date(c.dateIssued).toLocaleDateString()}</p>
                      <p>Certificate ID: {c.certificateID}</p>
                      <QRCodeSVG value={c.certificateID} size={128} className="mt-2" />
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleDownloadReport(c)}>
                          <Download className="w-4 h-4 mr-1" /> Download
                        </button>
                        <button onClick={() => handleShare(c)}>
                          <Share2 className="w-4 h-4 mr-1" /> Share
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {verifyResult.type === "id" && verifyResult.certificate && (
                <div className="space-y-4">
                  <QRCodeSVG value={verifyResult.certificate.certificateID} size={160} />
                  <div className="flex flex-col gap-2 mt-2">
                    <button onClick={() => handleDownloadReport(verifyResult.certificate)}>
                      <Download className="mr-2 w-4 h-4" /> Download Report
                    </button>
                    <button onClick={() => handleShare(verifyResult.certificate)}>
                      <Share2 className="mr-2 w-4 h-4" /> Share Result
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-md">
              <XCircleIcon className="w-12 h-12 text-red-500 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-400">Certificate Not Verified ❌</h3>
                <p className="text-gray-200">No matching certificate found. Please check the ID or Name and try again.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
