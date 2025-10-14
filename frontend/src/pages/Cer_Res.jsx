// // src/components/Cert_Veri.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import QrScanner from "react-qr-scanner";
// import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

// /**
//  * Cert_Veri
//  * - verify by id: expects backend -> { success: true, certificate: { ... } }
//  * - verify by name: expects backend -> { success: true, certificates: [ ... ] }
//  * Any other response => treated as not verified.
//  */
// export default function Verify() {
//   const [verifyInput, setVerifyInput] = useState("");
//   const [verifyNameInput, setVerifyNameInput] = useState("");
//   const [verifyResult, setVerifyResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async (params) => {
//     // params is either { id } or { name }
//     if (!params || (params.id === "" && params.name === "")) return;

//     setLoading(true);
//     setVerifyResult(null);

//     try {
//       const res = await axios.get("http://localhost:5000/verify-certificate", { params });

//       // Defensive: normalize backend body
//       const body = res?.data ?? null;

//       // If request was by ID
//       if (params.id) {
//         // Only treat as verified if backend explicitly returns success true AND certificate object
//         if (body && body.success === true && body.certificate) {
//           // Attach explicit type so UI knows which branch to render
//           setVerifyResult({ success: true, type: "id", certificate: body.certificate });
//         } else {
//           // anything else -> not verified
//           setVerifyResult({ success: false });
//         }
//         setLoading(false);
//         return;
//       }

//       // If request was by Name
//       if (params.name) {
//         // Expect an array of certificates on success
//         if (body && body.success === true && Array.isArray(body.certificates) && body.certificates.length > 0) {
//           setVerifyResult({ success: true, type: "name", certificates: body.certificates });
//         } else {
//           // empty array, null, missing field, or success:false -> not verified
//           setVerifyResult({ success: false });
//         }
//         setLoading(false);
//         return;
//       }

//       // Fallback: not verified
//       setVerifyResult({ success: false });
//     } catch (err) {
//       console.error("Verification request failed:", err);
//       setVerifyResult({ success: false });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // QR code scan handling (same logic: call handleVerify with id or name)
//   const handleScan = (result) => {
//     if (!result) return;
//     try {
//       const url = new URL(result.text);
//       const id = url.searchParams.get("id");
//       const name = url.searchParams.get("name");
//       if (id) handleVerify({ id });
//       else if (name) handleVerify({ name });
//     } catch (err) {
//       console.error("QR parse failed:", err);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       style={{
//         backgroundColor: "#1f2937",
//         padding: "1.5rem",
//         borderRadius: "0.75rem",
//         maxWidth: "640px",
//         margin: "2rem auto",
//         boxShadow: "0 8px 30px rgba(0,0,0,0.45)",
//       }}
//     >
//       <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem", textAlign: "center", color: "#a7f3d0" }}>
//         Certificate Verification
//       </h2>

//       {/* Verify by ID */}
//       <div style={{ marginBottom: "1rem" }}>
//         <input
//           style={{
//             width: "100%",
//             padding: "0.75rem",
//             borderRadius: "0.5rem",
//             border: "1px solid #9ca3af",
//             backgroundColor: "#374151",
//             color: "#f9fafb",
//             marginBottom: "0.5rem",
//           }}
//           placeholder="Enter Certificate ID"
//           value={verifyInput}
//           onChange={(e) => setVerifyInput(e.target.value)}
//         />
//         <motion.button
//           whileTap={{ scale: 0.98 }}
//           style={{
//             width: "100%",
//             backgroundColor: "#16a34a",
//             padding: "0.75rem",
//             borderRadius: "0.5rem",
//             fontWeight: 600,
//             color: "#fff",
//             cursor: loading ? "not-allowed" : "pointer",
//             opacity: loading ? 0.7 : 1,
//           }}
//           onClick={() => handleVerify({ id: verifyInput.trim() })}
//           disabled={loading}
//         >
//           {loading ? "Verifying..." : "Verify by ID"}
//         </motion.button>
//       </div>

//       {/* Verify by Name */}
//       <div style={{ marginBottom: "1rem" }}>
//         <input
//           style={{
//             width: "100%",
//             padding: "0.75rem",
//             borderRadius: "0.5rem",
//             border: "1px solid #9ca3af",
//             backgroundColor: "#374151",
//             color: "#f9fafb",
//             marginBottom: "0.5rem",
//           }}
//           placeholder="Enter Student Name"
//           value={verifyNameInput}
//           onChange={(e) => setVerifyNameInput(e.target.value)}
//         />
//         <motion.button
//           whileTap={{ scale: 0.98 }}
//           style={{
//             width: "100%",
//             backgroundColor: "#f59e0b",
//             padding: "0.75rem",
//             borderRadius: "0.5rem",
//             fontWeight: 600,
//             color: "#fff",
//             cursor: loading ? "not-allowed" : "pointer",
//             opacity: loading ? 0.7 : 1,
//           }}
//           onClick={() => handleVerify({ name: verifyNameInput.trim() })}
//           disabled={loading}
//         >
//           {loading ? "Verifying..." : "Verify by Name"}
//         </motion.button>
//       </div>

//       {/* QR Scanner */}
//       <div style={{ marginTop: 12 }}>
//         <p style={{ textAlign: "center", color: "#cbd5e1", marginBottom: 8 }}>Or scan a QR code to verify</p>
//         <div style={{ border: "2px solid #374151", borderRadius: 8, overflow: "hidden" }}>
//           <QrScanner
//             onResult={(result) => handleScan(result)}
//             constraints={{ facingMode: "environment" }}
//             containerStyle={{ width: "100%", height: "auto" }}
//           />
//         </div>
//       </div>

//       {/* Result */}
//     {verifyResult && (
//   <motion.div
//     key="result"
//     initial={{ opacity: 0, y: 12 }}
//     animate={{ opacity: 1, y: 0 }}
//     style={{
//       backgroundColor: "#1f2937",
//       padding: 24,
//       marginTop: 24,
//       borderRadius: 16,
//       display: "flex",
//       flexDirection: "column",
//       gap: 16,
//       boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
//       color: "#e6e6e6",
//       maxWidth: 700,
//       marginLeft: "auto",
//       marginRight: "auto",
//     }}
//   >
//     <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//       {verifyResult.success ? (
//         <CheckCircleIcon style={{ width: 56, height: 56, color: "#22c55e", flexShrink: 0 }} />
//       ) : (
//         <XCircleIcon style={{ width: 56, height: 56, color: "#ef4444", flexShrink: 0 }} />
//       )}
//       <h2
//         style={{
//           margin: 0,
//           fontSize: 22,
//           fontWeight: 700,
//           color: verifyResult.success ? "#86efac" : "#fca5a5",
//         }}
//       >
//         {verifyResult.success ? "Certificate Verified ✅" : "Certificate Not Verified ❌"}
//       </h2>
//     </div>

//     <div style={{ marginTop: 8, fontSize: 15, lineHeight: 1.6 }}>
//       {verifyResult.success ? (
//         <>
//           {/* ID branch */}
//           {verifyResult.type === "id" && verifyResult.certificate ? (
//             <div style={{ backgroundColor: "#111827", padding: 16, borderRadius: 12 }}>
//               <p><strong>Name:</strong> {verifyResult.certificate.name}</p>
//               <p><strong>Course:</strong> {verifyResult.certificate.course}</p>
//               <p><strong>Date Issued:</strong> {new Date(verifyResult.certificate.dateIssued).toLocaleDateString()}</p>
//               <p><strong>Certificate ID:</strong> {verifyResult.certificate.certificateID}</p>
//             </div>
//           ) : null}

//           {/* Name branch */}
//           {verifyResult.type === "name" && Array.isArray(verifyResult.certificates) ? (
//             <div style={{ backgroundColor: "#111827", padding: 16, borderRadius: 12 }}>
//               <p style={{ fontWeight: 600, marginBottom: 12 }}>Certificates for this name:</p>
//               <ul style={{ margin: 0, paddingLeft: 20 }}>
//                 {verifyResult.certificates.map((c) => (
//                   <li key={c.certificateID} style={{ marginBottom: 8 }}>
//                     <strong>{c.course}</strong> — {new Date(c.dateIssued).toLocaleDateString()} (ID: {c.certificateID})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : null}
//         </>
//       ) : (
//         <div style={{ backgroundColor: "#111827", padding: 16, borderRadius: 12 }}>
//           <p>No matching certificate found. Please check the ID or Name and try again.</p>
//         </div>
//       )}
//     </div>
//   </motion.div>
// )}

//     </motion.div>
//   );
// }








// src/components/Cert_Veri.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { CheckCircle, XCircle, Loader2, QrCode, Share2, Download } from "lucide-react";
// import { QRCodeSVG } from "qrcode.react";

// export default function Verify() {
//   const [input, setInput] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async () => {
//     const value = input.trim();
//     if (!value) {
//       alert("Please enter a Certificate ID or Name");
//       return;
//     }

//     setLoading(true);
//     setResult(null);

//     const isId = /^[A-Za-z0-9_-]{6,}$/.test(value) || value.startsWith("CERT") || value.startsWith("ID");

//     try {
//       const params = isId ? { id: value } : { name: value };
//       const res = await axios.get("http://localhost:5000/verify-certificate", { params });
//       const data = res.data || {};

//       if (isId) {
//         if (data.success && data.certificate) {
//           setResult({ success: true, type: "id", certificate: data.certificate });
//         } else {
//           setResult({ success: false, message: "Certificate not found by ID" });
//         }
//       } else {
//         if (data.success && Array.isArray(data.certificates) && data.certificates.length > 0) {
//           setResult({ success: true, type: "name", certificates: data.certificates });
//         } else {
//           setResult({ success: false, message: "No certificates found for this name" });
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       setResult({ success: false, message: "Wrong Credentials.  Please Enter Valid Id Or Name" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = (cert) => {
//     const report = `
// Certificate Verification Report
// ==============================

// Name: ${cert.name}
// Course: ${cert.course}
// Date Issued: ${new Date(cert.dateIssued).toLocaleDateString()}
// Certificate ID: ${cert.certificateID}
// Verified on: ${new Date().toLocaleString()}
// `.trim();

//     const blob = new Blob([report], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `certificate-${cert.certificateID}.txt`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const handleShare = (cert) => {
//     const shareData = {
//       title: "Certificate Verified",
//       text: `Certificate for ${cert.name} (${cert.certificateID}) verified successfully.`,
//       url: window.location.href,
//     };
//     if (navigator.share) {
//       navigator.share(shareData).catch(() => navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`));
//     } else {
//       navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
//     }
//   };

//   const reset = () => {
//     setInput("");
//     setResult(null);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8"
//     >
//       <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
//         Certificate Verification
//       </h2>

//       {/* Search Input */}
//       <div className="flex flex-col sm:flex-row gap-3 mb-6">
//         <input
//           type="text"
//           placeholder="Enter Certificate ID or Student Name"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleVerify()}
//           className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <motion.button
//           whileTap={{ scale: 0.97 }}
//           disabled={loading}
//           onClick={handleVerify}
//           className={`px-5 py-2 rounded-lg text-white font-semibold transition ${
//             loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
//           }`}
//         >
//           {loading ? (
//             <span className="flex items-center gap-2">
//               <Loader2 className="animate-spin w-5 h-5" /> Verifying...
//             </span>
//           ) : (
//             "Verify"
//           )}
//         </motion.button>
//       </div>

//       {/* Verification Result */}
//       {result && (
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mt-6 space-y-6"
//         >
//           {/* Header */}
//           <div className="flex items-center gap-3">
//             {result.success ? <CheckCircle className="text-green-600 w-8 h-8" /> : <XCircle className="text-red-600 w-8 h-8" />}
//             <h3
//               className={`text-lg font-semibold ${
//                 result.success ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
//               }`}
//             >
//               {result.success ? "Certificate Verified ✅" : result.message || "Certificate Not Verified ❌"}
//             </h3>
//           </div>

//           {/* Single certificate (ID) */}
//           {result.success && result.type === "id" && result.certificate && (
//             <div className="space-y-4">
//               {/* Certificate Details Box */}
//               <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
//                 <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Certificate Details</h4>
//                 <p><strong>Name:</strong> {result.certificate.name}</p>
//                 <p><strong>Course:</strong> {result.certificate.course}</p>
//                 <p><strong>Date Issued:</strong> {new Date(result.certificate.dateIssued).toLocaleDateString()}</p>
//                 <p><strong>Certificate ID:</strong> {result.certificate.certificateID}</p>
//               </div>

//               {/* QR Code Box */}
//               <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 flex flex-col items-center">
//                 <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Blockchain Verification</h4>
//                 <QRCodeSVG value={result.certificate.certificateID} size={140} />
//               </div>

//               {/* Action Buttons Box */}
//               <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 flex justify-center gap-3">
//                 <button
//                   className="flex items-center gap-1 px-4 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700"
//                   onClick={() => handleDownload(result.certificate)}
//                 >
//                   <Download className="w-4 h-4" /> Download
//                 </button>
//                 <button
//                   className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                   onClick={() => handleShare(result.certificate)}
//                 >
//                   <Share2 className="w-4 h-4" /> Share
//                 </button>
//                 <button
//                   className="px-4 py-1.5 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
//                   onClick={reset}
//                 >
//                   Verify Another
//                 </button>
//               </div>

//                 <div className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 ">
//             <div className="pt-6">
//               <div className="text-center">
//                 <div className="text-green-600 dark:text-green-400 font-semibold mb-2">Verification Status</div>
//                 <div className="text-sm text-green-700 dark:text-green-300">
//                   This certificate has been successfully verified on the blockchain network and is confirmed as
//                   authentic.
//                 </div>
//               </div>
//             </div>
//           </div>
//             </div>
//           )}

//           {/* Multiple certificates (Name) */}
//           {result.success && result.type === "name" && Array.isArray(result.certificates) && (
//             <div className="space-y-4">
//               {result.certificates.map((c) => (
//                 <div
//                   key={c.certificateID}
//                   className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 space-y-3"
//                 >
//                   <h4 className="font-semibold text-gray-800 dark:text-gray-100">Certificate Details</h4>
//                   <p><strong>Course:</strong> {c.course}</p>
//                   <p><strong>Date Issued:</strong> {new Date(c.dateIssued).toLocaleDateString()}</p>
//                   <p><strong>Certificate ID:</strong> {c.certificateID}</p>

//                   <div className="flex flex-col items-center mt-2">
//                     <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Blockchain Verification</h4>
//                     <QRCodeSVG value={c.certificateID} size={100} />
//                   </div>

//                   <div className="flex justify-center gap-2 mt-2">
//                     <button
//                       className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
//                       onClick={() => handleDownload(c)}
//                     >
//                       <Download className="w-4 h-4" /> Download
//                     </button>
//                     <button
//                       className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//                       onClick={() => handleShare(c)}
//                     >
//                       <Share2 className="w-4 h-4" /> Share
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               <div className="flex justify-end mt-2">
//                 <button
//                   className="px-4 py-1.5 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
//                   onClick={reset}
//                 >
//                   Verify Another
//                 </button>
//               </div>

//                 <div className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 ">
//             <div className="pt-6">
//               <div className="text-center">
//                 <div className="text-green-600 dark:text-green-400 font-semibold mb-2">Verification Status</div>
//                 <div className="text-sm text-green-700 dark:text-green-300">
//                   This certificate has been successfully verified on the blockchain network and is confirmed as
//                   authentic.
//                 </div>
//               </div>
//             </div>
//           </div>
//             </div>


//           )}

//           {/* Failure */}
//           {!result.success && (
//             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
//               {result.message || "No matching certificate found. Please check the ID or Name and try again."}
//             </div>


//           )}

//         </motion.div>
//       )}
//     </motion.div>
//   );
// }



// src/components/Cert_Veri.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { CheckCircle, XCircle, Loader2, Share2, Download, User, GraduationCap, Calendar, Hash } from "lucide-react";
// import { QRCodeSVG } from "qrcode.react";

// export default function Verify() {
//     const [input, setInput] = useState("");
//     const [result, setResult] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleVerify = async () => {
//         const value = input.trim();
//         if (!value) return alert("Please enter a Certificate ID or Name");

//         setLoading(true);
//         setResult(null);

//         const isId = /^[A-Za-z0-9_-]{6,}$/.test(value) || value.startsWith("CERT") || value.startsWith("ID");

//         try {
//             const params = isId ? { id: value } : { name: value };
//             const res = await axios.get("http://localhost:5000/verify-certificate", { params });
//             const data = res.data || {};

//             if (isId) {
//                 if (data.success && data.certificate) {
//                     setResult({ success: true, type: "id", certificate: data.certificate });
//                 } else {
//                     setResult({ success: false, message: "Certificate not found by ID" });
//                 }
//             } else {
//                 if (data.success && Array.isArray(data.certificates) && data.certificates.length > 0) {
//                     setResult({ success: true, type: "name", certificates: data.certificates });
//                 } else {
//                     setResult({ success: false, message: "No certificates found for this name" });
//                 }
//             }
//         } catch (err) {
//             console.error(err);
//             setResult({ success: false, message: "Error fetching certificate data." });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDownload = (cert) => {
//         const report = `
// Certificate Verification Report
// ==============================

// Name: ${cert.name}
// Course: ${cert.course}
// Date Issued: ${new Date(cert.dateIssued).toLocaleDateString()}
// Certificate ID: ${cert.certificateID}
// Verified on: ${new Date().toLocaleString()}
// `.trim();

//         const blob = new Blob([report], { type: "text/plain" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `certificate-${cert.certificateID}.txt`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     };

//     const handleShare = (cert) => {
//         const shareData = {
//             title: "Certificate Verified",
//             text: `Certificate for ${cert.name} (${cert.certificateID}) verified successfully.`,
//             url: window.location.href,
//         };
//         if (navigator.share) {
//             navigator.share(shareData).catch(() => navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`));
//         } else {
//             navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
//         }
//     };

//     const reset = () => {
//         setInput("");
//         setResult(null);
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//             className="max-w-5xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8"
//         >
//             <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
//                 Certificate Verification
//             </h2>

//             {/* Input */}
//             <div className="flex flex-col sm:flex-row gap-3 mb-6">
//                 <input
//                     type="text"
//                     placeholder="Enter Certificate ID or Student Name"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleVerify()}
//                     className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 />
//                 <motion.button
//                     whileTap={{ scale: 0.97 }}
//                     disabled={loading}
//                     onClick={handleVerify}
//                     className={`px-5 py-2 rounded-lg text-white font-semibold transition ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
//                         }`}
//                 >
//                     {loading ? (
//                         <span className="flex items-center gap-2">
//                             <Loader2 className="animate-spin w-5 h-5" /> Verifying...
//                         </span>
//                     ) : (
//                         "Verify"
//                     )}
//                 </motion.button>
//             </div>

//             {result && (
//                 <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//                     {/* Status */}
//                     <div className="flex justify-center">
//                         {result.success ? (
//                             <div className="bg-green-500 text-white px-4 py-2 rounded-md text-base">✓ Valid Certificate</div>
//                         ) : (
//                             <div className="bg-red-500 text-white px-4 py-2 rounded-md text-base">✗ Invalid Certificate</div>
//                         )}
//                     </div>

//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                         {/* Single Certificate */}
//                         {result.success && result.type === "id" && result.certificate && (
//                             <>
//                                 <div className="lg:col-span-2 space-y-4">
//                                     {/* Certificate Holder */}
//                                     <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
//                                         <div className="flex items-center gap-2 mb-2">
//                                             <User className="h-5 w-5 text-green-600" />
//                                             <h4 className="font-semibold text-gray-800 dark:text-gray-100">Certificate Holder</h4>
//                                         </div>
//                                         <p><strong>Name:</strong> {result.certificate.name}</p>
//                                         {result.certificate.rollNo && <p><strong>Roll No:</strong> {result.certificate.rollNo}</p>}
//                                     </div>

//                                     {/* Course Info */}
//                                     <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
//                                         <div className="flex items-center gap-2 mb-2">
//                                             <GraduationCap className="h-5 w-5 text-green-600" />
//                                             <h4 className="font-semibold text-gray-800 dark:text-gray-100">Course Information</h4>
//                                         </div>
//                                         <p><strong>Course Name:</strong> {result.certificate.course}</p>
//                                         <p>
//                                             <strong>Issue Date:</strong> {result.certificate.dateIssued ? new Date(result.certificate.dateIssued).toLocaleDateString() : "N/A"}
//                                         </p>                    {result.certificate.issuedBy && <p><strong>Issued By:</strong> {result.certificate.issuedBy}</p>}
//                                     </div>

//                                     {/* Blockchain Info */}
//                                     <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
//                                         <div className="flex items-center gap-2 mb-2">
//                                             <Hash className="h-5 w-5 text-green-600" />
//                                             <h4 className="font-semibold text-gray-800 dark:text-gray-100">Blockchain Info</h4>
//                                         </div>
//                                         <p><strong>Certificate ID:</strong> {result.certificate.certificateID}</p>
//                                         {result.certificate.hash && <p className="break-all"><strong>Hash:</strong> {result.certificate.hash}</p>}
//                                     </div>
//                                 </div>

//                                 {/* QR & Actions */}
//                                 <div className="space-y-4">
//                                     <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 text-center">
//                                         <h4 className="font-semibold mb-2">Verification QR Code</h4>
//                                         <div className="flex justify-center p-4 bg-white rounded-lg">
//                                             <QRCodeSVG
//                                                 value={`http://localhost:5173/verify/${result.certificate.certificateID}`}
//                                                 size={180}
//                                                 bgColor="#ffffff"
//                                                 fgColor="#000000"
//                                                 level="H"
//                                             />
//                                         </div>

//                                         <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Scan to verify</p>
//                                     </div>

//                                     <div className="flex flex-col gap-2">
//                                         <button onClick={() => handleDownload(result.certificate)} className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
//                                             <Download className="w-4 h-4" /> Download
//                                         </button>
//                                         <button onClick={() => handleShare(result.certificate)} className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//                                             <Share2 className="w-4 h-4" /> Share
//                                         </button>
//                                         <button onClick={reset} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
//                                             Verify Another
//                                         </button>
//                                     </div>
//                                 </div>
//                             </>
//                         )}

//                      {result.success && result.type === "name" && Array.isArray(result.certificates) && (
//   <div className="lg:col-span-3 space-y-4">
//     {result.certificates.map((c) => (
//       <div key={c.certificateID} className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 space-y-3">
//         <h4 className="font-semibold text-gray-800 dark:text-gray-100">Certificate</h4>
//         <p><strong>Name:</strong> {c.name}</p>
//         <p><strong>Course:</strong> {c.course}</p>
//         <p>
//           <strong>Date Issued:</strong>{" "}
//           {c.dateIssued ? new Date(c.dateIssued).toLocaleDateString() : "N/A"}
//         </p>
//         <p><strong>Certificate ID:</strong> {c.certificateID}</p>

//         <div className="flex flex-col items-center mt-2">
//           <div className="flex justify-center p-4 bg-white rounded-lg">
//             <QRCodeSVG
//               value={`http://localhost:5173/verify/${c.certificateID}`} // ✅ use c.certificateID
//               size={180}
//               bgColor="#ffffff"
//               fgColor="#000000"
//               level="H"
//             />
//           </div>
//         </div>

//         <div className="flex justify-center gap-2 mt-2">
//           <button onClick={() => handleDownload(c)} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
//             <Download className="w-4 h-4" /> Download
//           </button>
//           <button onClick={() => handleShare(c)} className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
//             <Share2 className="w-4 h-4" /> Share
//           </button>
//         </div>
//       </div>
//     ))}
//     <div className="flex justify-end mt-2">
//       <button onClick={reset} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
//         Verify Another
//       </button>
//     </div>
//   </div>
// )}

//                         {/* Failure */}
//                         {!result.success && (
//                             <div className="lg:col-span-3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
//                                 {result.message || "No matching certificate found. Please check ID or Name."}
//                             </div>
//                         )}
//                     </div>
//                 </motion.div>
//             )}
//         </motion.div>
//     );
// }

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
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-3"><Hash className="h-6 w-6 text-green-600" /><h4 className="text-xl font-semibold">Blockchain Information</h4></div>
                    <p><strong>Certificate ID:</strong> {result.certificate.certificateID}</p>
                    {result.certificate.hash && <p className="break-all bg-gray-100 dark:bg-gray-700 p-2 rounded"><strong>Hash:</strong> {result.certificate.hash}</p>}
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


