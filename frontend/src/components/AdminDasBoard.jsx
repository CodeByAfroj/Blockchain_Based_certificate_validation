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

export default function AdminDashBoard() {
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
    <div className="space-y-8 p-4 text-gray-900 dark:text-gray-100">
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
            className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-sm font-medium">{card.title}</h3>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border rounded-md overflow-hidden dark:border-gray-700">
        <button
          className={`flex-1 p-2 text-center font-medium transition ${
            activeTab === "issue"
              ? "bg-gray-200 dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("issue")}
        >
          <Plus className="inline h-4 w-4 mr-1" /> Issue Certificate
        </button>
        <button
          className={`flex-1 p-2 text-center font-medium transition ${
            activeTab === "manage"
              ? "bg-gray-200 dark:bg-gray-700"
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("manage")}
        >
          <FileText className="inline h-4 w-4 mr-1" /> Manage Certificates
        </button>
      </div>

      {/* Issue Tab */}
      {activeTab === "issue" && (
        <div className="border rounded-md shadow-sm p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Issue New Certificate</h3>
          <Cert_Veri />
        </div>
      )}

      {/* Manage Tab */}
      {activeTab === "manage" && (
        <div className="space-y-4">
          {/* Search + Refresh */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search certificates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-md pl-10 pr-2 py-1 bg-transparent dark:bg-gray-900 dark:border-gray-700"
              />
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1 border rounded-md text-gray-700 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
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
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {searchTerm
                ? "No certificates match your search."
                : "No certificates found."}
            </div>
          ) : (
            <div className="overflow-x-auto border rounded-md dark:border-gray-700 bg-white dark:bg-gray-800">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Course</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Issued</th>
                    <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredCertificates.map((cert) => (
                    <tr key={cert.certificateID} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="px-4 py-2">{cert.name}</td>
                      <td className="px-4 py-2">{cert.course}</td>
                      <td className="px-4 py-2">{formatDate(cert.dateIssued)}</td>
                      <td className="px-4 py-2 flex gap-3 items-center">
                        <Eye
                          className="h-4 w-4 cursor-pointer text-blue-600 hover:scale-110 transition"
                          onClick={() => setSelectedCertificate(cert)}
                        />
                        <Copy
                          className="h-4 w-4 cursor-pointer text-gray-600 hover:scale-110 transition"
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
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-200 dark:border-gray-700"
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
                    className="text-gray-200 cursor-pointer"
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
