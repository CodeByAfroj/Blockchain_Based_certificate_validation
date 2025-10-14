// App.js
import React, { useState, useRef } from "react";
import axios from "axios";
import { QrReader } from "react-qr-reader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [certificateID, setCertificateID] = useState("");
  const [qrByID, setQrByID] = useState("");
  const [qrByName, setQrByName] = useState("");
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyNameInput, setVerifyNameInput] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);

  const certificateRef = useRef();

  // Issue certificate
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

  // Verify by ID or Name
  const handleVerify = async (params) => {
    try {
      const res = await axios.get("http://localhost:5000/verify-certificate", {
        params,
      });
      setVerifyResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Certificate not found");
    }
  };

  // QR scan
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

  // Generate PDF
  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${certificateID}.pdf`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Blockchain Certificate System</h1>

      {/* Issue Certificate */}
      <div className="bg-gray-800 p-6 rounded shadow-md max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Issue Certificate</h2>
        <input
          className="w-full p-2 mb-2 rounded border text-black"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 rounded border text-black"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button
          className="bg-blue-600 px-4 py-2 rounded mt-2 hover:bg-blue-700"
          onClick={handleIssue}
        >
          Issue Certificate
        </button>

        {certificateID && (
          <div className="mt-4">
            <p className="font-semibold">Certificate ID: {certificateID}</p>
            <div className="flex gap-4 mt-2">
              <div>
                <p className="font-semibold">QR by ID:</p>
                <img src={qrByID} alt="QR by ID" className="w-32 h-32 border" />
              </div>
              <div>
                <p className="font-semibold">QR by Name:</p>
                <img src={qrByName} alt="QR by Name" className="w-32 h-32 border" />
              </div>
            </div>

            {/* Certificate Preview */}
            <div
              ref={certificateRef}
              className="bg-white text-black p-8 mt-6 rounded shadow-lg relative w-full max-w-2xl mx-auto"
              style={{ minHeight: "400px" }}
            >
              <h2 className="text-3xl font-bold text-center mb-6">Certificate of Completion</h2>
              <p className="text-center text-xl">This is to certify that</p>
              <h3 className="text-2xl font-semibold text-center my-4">{name}</h3>
              <p className="text-center text-xl">has successfully completed the course</p>
              <h3 className="text-2xl font-semibold text-center my-4">{course}</h3>
              <p className="text-center mt-6">Issued on: {new Date().toLocaleDateString()}</p>
              <p className="text-center mt-2">Certificate ID: {certificateID}</p>
              <img
                src={qrByID}
                alt="QR Code"
                className="absolute bottom-4 right-4 w-24 h-24"
              />
            </div>

            <button
              className="bg-green-600 px-4 py-2 rounded mt-4 hover:bg-green-700"
              onClick={downloadCertificate}
            >
              Download Certificate PDF
            </button>
          </div>
        )}
      </div>

      {/* Verification Section */}
      <div className="bg-gray-800 p-6 rounded shadow-md max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Verify Certificate</h2>
        <input
          className="w-full p-2 mb-2 rounded border text-black"
          placeholder="Certificate ID"
          value={verifyInput}
          onChange={(e) => setVerifyInput(e.target.value)}
        />
        <button
          className="bg-green-600 px-4 py-2 rounded mb-4 hover:bg-green-700"
          onClick={() => handleVerify({ id: verifyInput })}
        >
          Verify by ID
        </button>

        <input
          className="w-full p-2 mb-2 rounded border text-black"
          placeholder="Name"
          value={verifyNameInput}
          onChange={(e) => setVerifyNameInput(e.target.value)}
        />
        <button
          className="bg-yellow-600 px-4 py-2 rounded mb-4 hover:bg-yellow-700"
          onClick={() => handleVerify({ name: verifyNameInput })}
        >
          Verify by Name
        </button>
      </div>

      {/* QR Scanner */}
      <div className="bg-gray-800 p-6 rounded shadow-md max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">Scan QR to Verify</h2>
        <QrReader
          onResult={(result) => handleScan(result)}
          constraints={{ facingMode: "environment" }}
          containerStyle={{ width: "100%" }}
        />
      </div>

      {/* Verification Result */}
      {verifyResult && (
        <div className="bg-gray-800 p-6 rounded shadow-md max-w-xl mx-auto mb-8">
          {verifyResult.success ? (
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                Certificate Verified ✅
              </h3>
              {verifyResult.type === "id" ? (
                <div>
                  <p>Name: {verifyResult.certificate.name}</p>
                  <p>Course: {verifyResult.certificate.course}</p>
                  <p>
                    Date Issued:{" "}
                    {new Date(verifyResult.certificate.dateIssued).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div>
                  <p>Certificates for this name:</p>
                  <ul className="list-disc ml-5">
                    {verifyResult.certificates.map((c) => (
                      <li key={c.certificateID}>
                        {c.course} - {new Date(c.dateIssued).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-red-600 font-semibold">Certificate not found ❌</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
