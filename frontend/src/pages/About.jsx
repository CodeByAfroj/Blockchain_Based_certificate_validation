import React from "react";
import { Link } from "react-router-dom";
import { Shield, Users, Globe, Lock, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />,
      title: "Blockchain Security",
      desc: "Certificates are stored on a decentralized blockchain network, making them impossible to tamper with.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />,
      title: "Global Access",
      desc: "Verify certificates from anywhere in the world, 24/7, without geographical restrictions.",
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />,
      title: "Privacy Protected",
      desc: "Your personal information is encrypted and only accessible through secure verification processes.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />,
      title: "Instant Verification",
      desc: "Get instant results when verifying certificates, with detailed authenticity reports.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />,
      title: "Trusted by Institutions",
      desc: "Universities and educational institutions worldwide trust our verification system.",
    },
    {
      icon: <div className="px-2 py-1 border border-gray-400 dark:border-gray-600 rounded text-blue-600 dark:text-blue-400 mb-2 inline-block">Free</div>,
      title: "Free to Use",
      desc: "Certificate verification is completely free for students and employers.",
    },
  ];

  const techSections = [
    {
      title: "Blockchain Infrastructure",
      desc: "Built on a robust blockchain network that ensures data integrity and immutability.",
      points: ["Decentralized storage", "Cryptographic security", "Immutable records", "Transparent verification"],
    },
    {
      title: "Modern Web Technologies",
      desc: "Built with React and modern web technologies for optimal performance and user experience.",
      points: ["React & JavaScript", "Responsive design", "Fast loading times", "Cross-platform compatibility"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">About CertValidator</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're revolutionizing certificate verification through blockchain technology, ensuring authenticity,
            preventing fraud, and building trust in educational credentials worldwide.
          </p>
        </motion.div>

        {/* Mission Section */}
        <section className="mb-16 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              To create a secure, transparent, and immutable system for certificate verification that eliminates
              fraud and builds trust in educational credentials. We believe that everyone deserves to have their
              achievements recognized and verified with absolute certainty.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              By leveraging blockchain technology, we ensure that once a certificate is issued and verified, it
              cannot be tampered with or forged, providing a permanent record of authenticity.
            </p>
          </motion.div>
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="bg-gray-200 dark:bg-gray-800 rounded-lg p-8">
            <div className="grid grid-cols-2 gap-6 text-center">
              {[
                { value: "100%", label: "Secure" },
                { value: "24/7", label: "Available" },
                { value: "0", label: "Fraud Cases" },
                { value: "∞", label: "Immutable" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {feature.icon}
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge blockchain technology with user-friendly interfaces to provide
              the most secure and accessible certificate verification system available.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techSections.map((tech, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="font-semibold text-xl mb-2">{tech.title}</h3>
                <p className="text-gray-700 dark:text-gray-400 mb-2">{tech.desc}</p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400">
                  {tech.points.map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our blockchain-powered certificate validation system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                Verify Certificate <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Admin Access
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}
