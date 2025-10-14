// App.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import QrScanner from "react-qr-scanner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

function App() {
  const [mode, setMode] = useState("issue");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [certificateID, setCertificateID] = useState("");
  const [qrByID, setQrByID] = useState("");
  const [qrByName, setQrByName] = useState("");
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyNameInput, setVerifyNameInput] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  const certificateRef = useRef();

  const handleIssue = async () => {
    try {
      const res = await axios.post("http://localhost:5000/issue-certificate", {
        name,
        course,
      });
      setCertificateID(res.data.certificateID);
      setQrByID(res.data.qrByID);
      setQrByName(res.data.qrByName);
      alert("Certificate issued successfully!");
    } catch (err) {
      console.error(err);
      alert("Error issuing certificate");
    }
  };

  const handleVerify = async (params) => {
    try {
      const res = await axios.get("http://localhost:5000/verify-certificate", {
        params,
      });
      setVerifyResult(res.data);
    } catch (err) {
      console.error(err);
      setVerifyResult({ success: false });
    }
  };

  const handleScan = (result) => {
    if (!result) return;
    try {
      const url = new URL(result.text);
      const id = url.searchParams.get("id");
      const name = url.searchParams.get("name");
      if (id) handleVerify({ id });
      else if (name) handleVerify({ name });
    } catch {}
  };
const downloadCertificate = async () => {
  if (!certificateRef.current) return;

  // Capture certificate as canvas
  const canvas = await html2canvas(certificateRef.current, {
    scale: 3, // high resolution
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  // A4 landscape size in points
  const pdf = new jsPDF("landscape", "pt", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Maintain aspect ratio
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

  const scaledWidth = imgWidth * ratio;
  const scaledHeight = imgHeight * ratio;

  // Center the certificate
  const marginX = (pdfWidth - scaledWidth) / 2;
  const marginY = (pdfHeight - scaledHeight) / 2;

  pdf.addImage(imgData, "PNG", marginX, marginY, scaledWidth, scaledHeight);
  pdf.save(`${certificateID}.pdf`);
};


  return (
    <div style={{ minHeight: "100vh", padding: "1.5rem", backgroundColor: "#111827", color: "#ffffff", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", textAlign: "center", marginBottom: "1.5rem" }}>
        Blockchain Certificate System
      </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
        <motion.button
          onClick={() => setMode("issue")}
          style={{ padding: "0.5rem 1.5rem", borderRadius: "0.375rem", fontWeight: "600", backgroundColor: mode === "issue" ? "#2563eb" : "#374151", color: "#ffffff" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Issue Certificate
        </motion.button>
        <motion.button
          onClick={() => setMode("verify")}
          style={{ padding: "0.5rem 1.5rem", borderRadius: "0.375rem", fontWeight: "600", backgroundColor: mode === "verify" ? "#16a34a" : "#374151", color: "#ffffff" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Verify Certificate
        </motion.button>
      </div>

      <AnimatePresence exitBeforeEnter>
        {mode === "issue" ? (
          <motion.div
            key="issue"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ backgroundColor: "#1f2937", padding: "1.5rem", borderRadius: "0.5rem", maxWidth: "600px", margin: "0 auto", marginBottom: "2rem" }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Issue Certificate</h2>
            <input
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "0.375rem", border: "1px solid #9ca3af", backgroundColor: "#374151", color: "#f9fafb" }}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "0.375rem", border: "1px solid #9ca3af", backgroundColor: "#374151", color: "#f9fafb" }}
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
            <button
              style={{ backgroundColor: "#2563eb", padding: "0.5rem 1rem", borderRadius: "0.375rem", marginTop: "0.5rem", color: "#ffffff" }}
              onClick={handleIssue}
            >
              Issue Certificate
            </button>

            {certificateID && (
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontWeight: "600" }}>Certificate ID: {certificateID}</p>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                  <div>
                    <p style={{ fontWeight: "600" }}>QR by ID:</p>
                    <img src={qrByID} alt="QR by ID" style={{ width: "128px", height: "128px", border: "1px solid #d1d5db" }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: "600" }}>QR by Name:</p>
                    <img src={qrByName} alt="QR by Name" style={{ width: "128px", height: "128px", border: "1px solid #d1d5db" }} />
                  </div>
                </div>

                {/* Certificate Preview */}
                <div
                  ref={certificateRef}
                  style={{
                    minHeight: "400px",
                    fontFamily: "'Times New Roman', serif",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                   
                    padding: "1.5rem",
                    marginTop: "1.5rem",
                    borderRadius: "1rem",
                    position: "relative",
                  }}
                >
                 <div style={{
                    
                    fontFamily: "'Times New Roman', serif",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    border: "4px solid #d1d5db",
                    padding: "5pxpx",
                    borderRadius: "1rem",
                    position: "relative",
                  }}>
                   <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#111827" }}>Certificate of Completion</h1>
                  </div>

                  <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <p style={{ fontSize: "1.25rem", fontStyle: "italic", color: "#4b5563" }}>This is to certify that</p>
                    <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#111827", margin: "0.5rem 0" }}>{name}</h2>
                    <p style={{ fontSize: "1.25rem", fontStyle: "italic", color: "#4b5563" }}>has successfully completed the course</p>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827", margin: "0.5rem 0" }}>{course}</h3>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
                    <div>
                      <p style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#6b7280" }}>Issued on:</p>
                      <p style={{ fontWeight: "500", color: "#111827" }}>{new Date().toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#6b7280" }}>Certificate ID:</p>
                      <p style={{ fontWeight: "500", color: "#111827" }}>{certificateID}</p>
                    </div>
                    <div>
                      <img src={qrByID} alt="QR" style={{ width: "112px", height: "112px", border: "1px solid #d1d5db" }} />
                    </div>
                  </div>

                  <div style={{ position: "absolute", bottom: "1.5rem", left: "2rem", textAlign: "center" }}>
                    <div style={{ borderTop: "1px solid #4b5563", width: "8rem", marginBottom: "0.25rem" }}></div>
                    <p style={{ fontSize: "0.75rem", color: "#111827" }}>Authorized Signature</p>
                  </div>
                 </div>
                </div>

                <button
                  style={{ backgroundColor: "#16a34a", padding: "0.5rem 1rem", borderRadius: "0.375rem", marginTop: "1rem", color: "#ffffff" }}
                  onClick={downloadCertificate}
                >
                  Download Certificate PDF
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="verify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ backgroundColor: "#1f2937", padding: "1.5rem", borderRadius: "0.5rem", maxWidth: "600px", margin: "0 auto", marginBottom: "2rem" }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Verify Certificate</h2>
            <input
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "0.375rem", border: "1px solid #9ca3af", backgroundColor: "#374151", color: "#f9fafb" }}
              placeholder="Certificate ID"
              value={verifyInput}
              onChange={(e) => setVerifyInput(e.target.value)}
            />
            <button
              style={{ backgroundColor: "#16a34a", padding: "0.5rem 1rem", borderRadius: "0.375rem", marginBottom: "0.5rem", color: "#ffffff" }}
              onClick={() => handleVerify({ id: verifyInput })}
            >
              Verify by ID
            </button>

            <input
              style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "0.375rem", border: "1px solid #9ca3af", backgroundColor: "#374151", color: "#f9fafb" }}
              placeholder="Name"
              value={verifyNameInput}
              onChange={(e) => setVerifyNameInput(e.target.value)}
            />
            <button
              style={{ backgroundColor: "#f59e0b", padding: "0.5rem 1rem", borderRadius: "0.375rem", marginBottom: "0.5rem", color: "#ffffff" }}
              onClick={() => handleVerify({ name: verifyNameInput })}
            >
              Verify by Name
            </button>

            <div style={{ marginTop: "1rem" }}>
              <QrScanner
                onResult={(result) => handleScan(result)}
                constraints={{ facingMode: "environment" }}
                containerStyle={{ width: "100%" }}
              />
            </div>

            {verifyResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ backgroundColor: "#374151", padding: "1rem", marginTop: "1.5rem", borderRadius: "0.5rem", display: "flex", gap: "1rem", alignItems: "center" }}
              >
                {verifyResult.success ? (
                  <>
                    <CheckCircleIcon style={{ width: "3rem", height: "3rem", color: "#22c55e" }} />
                    <div>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#22c55e", marginBottom: "0.25rem" }}>Certificate Verified ✅</h3>
                      {verifyResult.type === "id" ? (
                        <div>
                          <p>Name: {verifyResult.certificate.name}</p>
                          <p>Course: {verifyResult.certificate.course}</p>
                          <p>Date Issued: {new Date(verifyResult.certificate.dateIssued).toLocaleDateString()}</p>
                        </div>
                      ) : (
                        <div>
                          <p>Certificates for this name:</p>
                          <ul>
                            {verifyResult.certificates.map((c) => (
                              <li key={c.certificateID}>{c.course} - {new Date(c.dateIssued).toLocaleDateString()}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <XCircleIcon style={{ width: "3rem", height: "3rem", color: "#ef4444" }} />
                    <p style={{ color: "#ef4444", fontWeight: "600" }}>Certificate not found ❌</p>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
