import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Globe, ArrowRight, Upload, UserCheck, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Immutable Security",
      desc: "Once stored on the blockchain, certificates cannot be altered or tampered with, ensuring permanent authenticity and preventing fraud."
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Global Accessibility",
      desc: "Verify certificates from anywhere in the world, 24/7. No need for intermediaries or complex verification processes."
    },
    {
      icon: <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Transparent Process",
      desc: "Every verification is recorded on the blockchain, creating a transparent and auditable trail of certificate authenticity."
    }
  ];

  const steps = [
    {
      step: "Step 1",
      icon: <Upload className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Upload Certificate",
      desc: "Upload your certificate file or enter the certificate ID/hash to begin the verification process.",
      extra: "Supports PDF, JPG, and PNG formats. Our system securely processes your certificate data."
    },
    {
      step: "Step 2",
      icon: <CheckCircle className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Blockchain Verification",
      desc: "Our system checks the blockchain network to verify the authenticity of your certificate.",
      extra: "Advanced cryptographic verification ensures your certificate's integrity and authenticity."
    },
    {
      step: "Step 3",
      icon: <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />,
      title: "Get Results",
      desc: "Receive instant verification results with detailed certificate information and QR code.",
      extra: "Download verification reports and share results with employers or institutions."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 dark:from-gray-900 to-gray-200/20 dark:to-gray-800/20 py-20 sm:py-32 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm font-medium rounded-full mb-4">
              Powered by Blockchain Technology
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold">
              Blockchain Certificate <span className="text-blue-600 dark:text-blue-400">Validator</span>
            </h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-400">
              Verify Certificates Securely on Blockchain. Ensure authenticity, prevent fraud, and build trust with immutable certificate validation powered by cutting-edge blockchain technology.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/verify"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
                >
                  Verify Certificate <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 overflow-hidden blur-3xl">
          <div className="relative left-[50%] w-[36rem] h-[20rem] -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-purple-500 opacity-20 rounded-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose Blockchain Validation?</h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the future of certificate verification with unparalleled security and transparency.
          </p>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-start text-left p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-xl transition"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center gap-3 mb-2 text-blue-600 dark:text-blue-400">
                  {feature.icon}
                  <span className="font-semibold text-lg text-gray-900 dark:text-white">{feature.title}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-200 dark:bg-gray-800 py-24 sm:py-32 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
            Simple, secure, and efficient certificate validation in three easy steps.
          </p>
          <div className="mt-16 grid gap-8 lg:grid-cols-3 text-left">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center justify-between mb-4">
                  {step.icon}
                  <span className="px-2 py-1 border border-gray-400 dark:border-gray-600 rounded">{step.step}</span>
                </div>
                <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-700 dark:text-gray-400 text-sm">{step.desc}</p>
                <p className="mt-2 text-gray-500 dark:text-gray-400 text-xs">{step.extra}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Verify Your Certificate?</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-8">
            Join thousands of users who trust our blockchain-powered certificate validation system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
              >
                Start Verification <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <UserCheck className="h-4 w-4" /> Admin Access
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
