// src/components/IssueCertificate.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Cert_Veri() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [certificateID, setCertificateID] = useState("");
  const [qrByID, setQrByID] = useState("");
  const [qrByName, setQrByName] = useState("");

  const certificateRef = useRef();

  const handleIssue = async () => {
    if (!name || !course) return alert("Please enter Name and Course");

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

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    const marginX = (pdfWidth - scaledWidth) / 2;
    const marginY = (pdfHeight - scaledHeight) / 2;

    pdf.addImage(imgData, "PNG", marginX, marginY, scaledWidth, scaledHeight);
    pdf.save(`${certificateID}.pdf`);
  };

  return (
    <div style={{ backgroundColor: "#1f2937", padding: "1.5rem", borderRadius: "0.5rem", maxWidth: "600px", margin: "0 auto", marginBottom: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#ffffff" }}>Issue Certificate</h2>
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
        <div style={{ marginTop: "1rem", color: "#ffffff" }}>
          <p style={{ fontWeight: "600" }}>Certificate ID: {certificateID}</p>
          
       

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
            <div
              style={{
                fontFamily: "'Times New Roman', serif",
                backgroundColor: "#ffffff",
                color: "#000000",
                border: "4px solid #d1d5db",
                padding: "5px",
                borderRadius: "1rem",
                position: "relative",
              }}
            >
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
    </div>
  );
}
