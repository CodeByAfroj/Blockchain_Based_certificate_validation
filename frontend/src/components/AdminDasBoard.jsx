import { useState, useEffect } from "react";
import {
  Plus,
  FileText,
  Users,
  Shield,
  Copy,
  Eye,
  Calendar,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import axios from "axios";
import Cert_Veri from "./Cert_Veri";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

export default function AdminDashBoard({ darkMode: parentDarkMode }) {
  const darkModeRedux = useSelector((state) => state.theme.darkMode);
  const darkMode = parentDarkMode ?? darkModeRedux;

  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, valid: 0, thisMonth: 0 });
  const [activeTab, setActiveTab] = useState("issue");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/issued-certificates");
      const allCertificates = res.data.certificates || [];
      setCertificates(allCertificates);

      const now = new Date();
      const total = allCertificates.length;
      const valid = allCertificates.length;
      const thisMonth = allCertificates.filter((cert) => {
        const issueDate = new Date(cert.dateIssued);
        return (
          issueDate.getMonth() === now.getMonth() &&
          issueDate.getFullYear() === now.getFullYear()
        );
      }).length;

      setStats({ total, valid, thisMonth });
    } catch (err) {
      console.error("Failed to fetch certificates:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard");
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} space-y-8 p-4 min-h-screen`}>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Total Certificates",
            value: stats.total,
            icon: FileText,
            color: "text-blue-500",
            desc: "All certificates on blockchain",
          },
          {
            title: "Valid Certificates",
            value: stats.valid,
            icon: Shield,
            color: "text-green-500",
            desc: "Verified and active",
          },
          {
            title: "This Month",
            value: stats.thisMonth,
            icon: Users,
            color: "text-purple-500",
            desc: "Certificates issued",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`border rounded-xl p-4 shadow-sm ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-sm font-medium">{card.title}</h3>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className={`flex border rounded-md overflow-hidden ${darkMode ? "dark:border-gray-700" : ""}`}>
        <button
          className={`flex-1 p-2 text-center font-medium transition ${
            activeTab === "issue"
              ? darkMode
                ? "bg-gray-700"
                : "bg-gray-200"
              : darkMode
              ? "hover:bg-gray-800"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("issue")}
        >
          <Plus className="inline h-4 w-4 mr-1" /> Issue Certificate
        </button>
        <button
          className={`flex-1 p-2 text-center font-medium transition ${
            activeTab === "manage"
              ? darkMode
                ? "bg-gray-700"
                : "bg-gray-200"
              : darkMode
              ? "hover:bg-gray-800"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          <FileText className="inline h-4 w-4 mr-1" /> Manage Certificates
        </button>
      </div>

      {/* Issue Tab */}
      {activeTab === "issue" && (
        <div className={`border rounded-md shadow-sm p-4 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <h3 className="text-lg font-semibold mb-2">Issue New Certificate</h3>
          <Cert_Veri darkMode={darkMode} />
        </div>
      )}

      {/* Manage Tab */}
      {activeTab === "manage" && (
        <div className="space-y-4">
          {/* Search + Refresh */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="relative flex-1 max-w-sm">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-400"}`} />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full border rounded-md pl-10 pr-2 py-1 ${darkMode ? "bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"}`}
              />
            </div>
            <button
              className={`flex items-center gap-1 px-3 py-1 border rounded-md transition ${darkMode ? "text-gray-200 border-gray-700 hover:bg-gray-800" : "text-gray-700 border-gray-200 hover:bg-gray-100"}`}
              onClick={fetchCertificates}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Certificates Table */}
          {isLoading ? (
            <div className="text-center py-8">Loading certificates...</div>
          ) : filteredCertificates.length === 0 ? (
            <div className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-center py-8`}>
              {searchTerm ? "No certificates match your search." : "No certificates found."}
            </div>
          ) : (
            <div className={`overflow-x-auto border rounded-md ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={`${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Course</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Issued</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className={`${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                  {filteredCertificates.map((cert) => (
                    <tr key={cert.certificateID} className={`${darkMode ? "hover:bg-gray-900" : "hover:bg-gray-50"}`}>
                      <td className="px-4 py-2">{cert.name}</td>
                      <td className="px-4 py-2">{cert.course}</td>
                      <td className="px-4 py-2">{formatDate(cert.dateIssued)}</td>
                      <td className="px-4 py-2 flex gap-3 items-center">
                        <Eye
                          className={`h-4 w-4 cursor-pointer transition ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                          onClick={() => setSelectedCertificate(cert)}
                        />
                        <Copy
                          className={`h-4 w-4 cursor-pointer transition ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                          onClick={() => copyToClipboard(cert.certificateID)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Animated Certificate Details Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`p-6 rounded-lg shadow-lg w-full max-w-md border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Certificate Details</h2>
                <X
                  className="h-5 w-5 cursor-pointer hover:text-red-500 transition"
                  onClick={() => setSelectedCertificate(null)}
                />
              </div>
              <div className="space-y-3">
                <p><span className="font-medium">Name:</span> {selectedCertificate.name}</p>
                <p><span className="font-medium">Course:</span> {selectedCertificate.course}</p>
                <p><span className="font-medium">Certificate ID:</span> {selectedCertificate.certificateID}</p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(selectedCertificate.dateIssued)}
                </p>
                <p>
                  <span className="font-medium">Tx Hash:</span>{" "}
                  <span
                    className="cursor-pointer text-blue-400"
                    onClick={() => copyToClipboard(selectedCertificate.txHash)}
                  >
                    {selectedCertificate.txHash.slice(0, 15)}...
                  </span>
                </p>
              </div>
              <div className="mt-4 text-right">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => setSelectedCertificate(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
