
// src/components/Cert_Veri.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function Cert_Veri() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [certificateID, setCertificateID] = useState("");
  const [qrByID, setQrByID] = useState("");
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
      alert("✅ Certificate issued successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error issuing certificate");
    }
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    try {
      const dataUrl = await toPng(certificateRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("landscape", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${certificateID || "certificate"}.pdf`);
    } catch (err) {
      console.error("❌ PDF render failed:", err);
      alert("Failed to generate PDF — please try again.");
    }
  };

  return (
    <div className="flex  flex-col items-center justify-center  bg-white text-gray-900 dark:bg-gray-900   dark:text-white p-6 overflow-auto">
      {/* Input Section */}
      <div className="w-full max-w-2xl bg-gray-800/60 rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Issue Certificate
        </h2>

        <input
          className="w-full p-2 mb-3 rounded-md border border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          placeholder="Recipient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 rounded-md border border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          placeholder="Course Name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button
          onClick={handleIssue}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-medium py-2 rounded-md"
        >
          Issue Certificate
        </button>
      </div>

      {/* Certificate Section */}
      {certificateID && (
        <div className="mt-10 flex flex-col items-center w-full overflow-auto">
          <div
            ref={certificateRef}
            className="relative bg-[#fffef9] text-gray-900 rounded-xl shadow-2xl border-[10px] border-[#d4af37] p-10 overflow-hidden"
            style={{
              width: "1000px",
              height: "700px",
              maxWidth: "95vw",
              fontFamily: "'Times New Roman', serif",
              backgroundImage:
                "radial-gradient(circle at center, #fffef9 0%, #f9f8f3 100%)",
            }}
          >
            {/* Inner Border */}
            <div className="absolute inset-4 border-4 border-gray-300 rounded-xl pointer-events-none"></div>

            {/* Header */}
            <div className="text-center mt-12">
              <h1 className="text-5xl font-extrabold text-[#222] tracking-wide mb-2">
                Certificate of Completion
              </h1>
              <p className="italic text-lg mt-8 text-gray-600">
                This is proudly presented to
              </p>
              <h2 className="text-4xl mt-6 font-semibold text-gray-900  underline decoration-[#d4af37]/70 decoration-2">
                {name}
              </h2>
              <p className="italic text-lg mt-6 text-gray-700">
                for successfully completing the course
              </p>
              <h3 className="text-2xl font-medium text-gray-900 mt-6">
                “{course}”
              </h3>
            </div>

            {/* Divider */}
            <div className="w-2/3 mx-auto my-10 border-t-2 border-gray-400"></div>

            {/* Footer Section */}
            <div className="flex justify-between items-center px-12 mt-8">
              <div>
                <p className="uppercase text-xs text-gray-500">Issued On:</p>
                <p className="font-medium text-gray-800">
                  {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="text-center">
                <p className="uppercase text-xs text-gray-500">Certificate ID:</p>
                <p className="font-medium text-gray-800">{certificateID}</p>
              </div>

              <div>
                <img
                  src={qrByID}
                  alt="QR Code"
                  className="w-24 h-24 border border-gray-400 rounded-md"
                />
              </div>
            </div>

            {/* Signature */}
            <div className="absolute bottom-19 left-12 text-center">
              <div className="border-t border-gray-700 w-40 mx-auto mb-1"></div>
              <p className="text-xs text-gray-800 font-medium">
                Authorized Signature
              </p>
            </div>

            {/* Watermark */}
            <div
              className="absolute inset-0 flex justify-center items-center opacity-[0.04] select-none pointer-events-none"
              style={{
                fontSize: "10rem",
                fontWeight: "bold",
                color: "#1f2937",
                letterSpacing: "0.5rem",
              }}
            >
              CERTICHAIN
            </div>
          </div>

          <button
            onClick={downloadCertificate}
            className="w-full max-w-2xl bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-medium py-2 rounded-md mt-6"
          >
            Download Certificate PDF
          </button>
        </div>
      )}
    </div>
  );
}
