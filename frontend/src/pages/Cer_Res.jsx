
// src/components/Cert_Veri.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, GraduationCap, Calendar, Hash, Download, Share2, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function Cer_Res() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    const value = input.trim();
    if (!value) return alert("Please enter a Certificate ID or Name");

    setLoading(true);
    setResult(null);

    const isId = /^[A-Za-z0-9_-]{6,}$/.test(value) || value.startsWith("CERT") || value.startsWith("ID");

    try {
      const params = isId ? { id: value } : { name: value };
      const res = await axios.get("http://localhost:5000/verify-certificate", { params });
      const data = res.data || {};

      if (isId) {
        if (data.success && data.certificate) setResult({ success: true, type: "id", certificate: data.certificate });
        else setResult({ success: false, message: "Certificate not found by ID" });
      } else {
        if (data.success && Array.isArray(data.certificates) && data.certificates.length > 0)
          setResult({ success: true, type: "name", certificates: data.certificates });
        else setResult({ success: false, message: "No certificates found for this name" });
      }
    } catch (err) {
      console.error(err);
      setResult({ success: false, message: "Error fetching certificate data." });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (cert) => {
    const report = `
Certificate Verification Report
==============================

Name: ${cert.name}
Course: ${cert.course}
Date Issued: ${cert.dateIssued ? new Date(cert.dateIssued).toLocaleDateString() : "N/A"}
Certificate ID: ${cert.certificateID}
Verified on: ${new Date().toLocaleString()}
`.trim();

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `certificate-${cert.certificateID}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = (cert) => {
    const shareData = {
      title: "Certificate Verified",
      text: `Certificate for ${cert.name} (${cert.certificateID}) verified successfully.`,
      url: window.location.href,
    };
    if (navigator.share) navigator.share(shareData).catch(() => navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`));
    else navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
  };

  const reset = () => {
    setInput("");
    setResult(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto mt-10 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">Certificate Verification</h2>

      {/* Input */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Enter Certificate ID or Student Name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleVerify()}
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          onClick={handleVerify}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
        >
          {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Verifying...</span> : "Verify"}
        </motion.button>
      </div>

      {result && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          {/* Status Badge */}
          <div className="flex justify-center">
            {result.success ? (
              <div className="bg-green-500 text-white px-6 py-3 rounded-md text-lg font-semibold">✓ Valid Certificate</div>
            ) : (
              <div className="bg-red-500 text-white px-6 py-3 rounded-md text-lg font-semibold">✗ Invalid Certificate</div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Single Certificate */}
            {result.success && result.type === "id" && result.certificate && (
              <>
                <div className="lg:col-span-2 space-y-6">
                  {/* Certificate Holder */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-3"><User className="h-6 w-6 text-green-600" /><h4 className="text-xl font-semibold">Certificate Holder</h4></div>
                    <p><strong>Full Name:</strong> {result.certificate.name}</p>
                    {result.certificate.rollNo && <p><strong>Roll Number:</strong> {result.certificate.rollNo}</p>}
                  </div>

                  {/* Course Information */}
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-3"><GraduationCap className="h-6 w-6 text-green-600" /><h4 className="text-xl font-semibold">Course Information</h4></div>
                    <p><strong>Course Name:</strong> {result.certificate.course}</p>
                    <p className="flex items-center gap-1"><strong>Issue Date:</strong> <Calendar className="h-4 w-4" /> {result.certificate.dateIssued ? new Date(result.certificate.dateIssued).toLocaleDateString() : "N/A"}</p>
                    {result.certificate.issuedBy && <p><strong>Issued By:</strong> {result.certificate.issuedBy}</p>}
                  </div>

                  {/* Blockchain Information */}
                 {/* Blockchain Information */}
<div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
  <div className="flex items-center gap-3 mb-3">
    <Hash className="h-6 w-6 text-green-600" />
    <h4 className="text-xl font-semibold">Blockchain Information</h4>
  </div>

  {/* Certificate ID */}
  <p>
    <strong>Certificate ID:</strong> {result.certificate?.certificateID || "N/A"}
  </p>

  {/* Transaction Hash with click-to-copy */}
  {result.certificate?.txHash && (
    <p className="break-all bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2">
      <strong>Tx Hash:</strong>{" "}
      <span
        className="cursor-pointer text-blue-400 hover:underline"
        onClick={() => navigator.clipboard.writeText(result.certificate.txHash)}
        title="Click to copy full hash"
      >
        {result.certificate.txHash.slice(0, 15)}...
      </span>
    </p>
  )}
</div>

                </div>

                {/* QR Code & Actions */}
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-center">
                    <h4 className="text-lg font-semibold mb-3">Verification QR Code</h4>
                    <div className="flex justify-center p-4 bg-white rounded-lg">
                      <QRCodeSVG value={`http://localhost:5173/verify/${result.certificate.certificateID}`} size={180} level="H" />
                    </div>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Scan to verify</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button onClick={() => handleDownload(result.certificate)} className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"><Download className="w-5 h-5" /> Download Report</button>
                    <button onClick={() => handleShare(result.certificate)} className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"><Share2 className="w-5 h-5" /> Share Result</button>
                    <button onClick={reset} className="px-4 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Verify Another Certificate</button>
                  </div>

                  {/* Verification Status */}
                  <div className="p-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg shadow text-center">
                    <div className="text-green-600 dark:text-green-400 font-semibold mb-2 text-lg">Verification Status</div>
                    <div className="text-sm text-green-700 dark:text-green-300">
                      This certificate has been successfully verified on the blockchain network and is confirmed as authentic.
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Multiple certificates (by name) */}
            {result.success && result.type === "name" && Array.isArray(result.certificates) && (
              <div className="lg:col-span-3 space-y-6">
                {result.certificates.map((c) => (
                  <div key={c.certificateID} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 space-y-4">
                    <h4 className="text-lg font-semibold">Certificate</h4>
                    <p><strong>Name:</strong> {c.name}</p>
                    <p><strong>Course:</strong> {c.course}</p>
                    <p><strong>Date Issued:</strong> {c.dateIssued ? new Date(c.dateIssued).toLocaleDateString() : "N/A"}</p>
                    <p><strong>Certificate ID:</strong> {c.certificateID}</p>

                    <div className="flex justify-center p-4 bg-white rounded-lg">
                      <QRCodeSVG value={`http://localhost:5173/verify/${c.certificateID}`} size={180} level="H" />
                    </div>

                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleDownload(c)} className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"><Download className="w-4 h-4" /> Download</button>
                      <button onClick={() => handleShare(c)} className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"><Share2 className="w-4 h-4" /> Share</button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-end mt-2"><button onClick={reset} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Verify Another</button></div>
              </div>
            )}

            {/* Failure */}
            {!result.success && (
              <div className="lg:col-span-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                {result.message || "No matching certificate found. Please check ID or Name."}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}


