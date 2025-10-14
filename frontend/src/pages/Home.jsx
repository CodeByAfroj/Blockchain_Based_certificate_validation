import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Globe, ArrowRight, Upload, UserCheck, FileText, CheckCircle } from "lucide-react";
import NavBar from "../components/Nav";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">


      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800/20 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-3 py-1 bg-gray-700 text-sm font-medium rounded-full mb-4">
            Powered by Blockchain Technology
          </div>
          <h1 className="text-4xl font-bold sm:text-6xl">
            Blockchain Certificate <span className="text-blue-400">Validator</span>
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-400">
            Verify Certificates Securely on Blockchain. Ensure authenticity, prevent fraud, and build trust with
            immutable certificate validation powered by cutting-edge blockchain technology.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/verify"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Verify Certificate <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-800 transition"
            >
              Learn More
            </Link>
          </div>
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the future of certificate verification with unparalleled security and transparency.
          </p>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <Shield className="h-5 w-5" />
                <span className="font-semibold text-lg text-white">Immutable Security</span>
              </div>
              <p className="text-gray-400">
                Once stored on the blockchain, certificates cannot be altered or tampered with, ensuring permanent
                authenticity and preventing fraud.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <Globe className="h-5 w-5" />
                <span className="font-semibold text-lg text-white">Global Accessibility</span>
              </div>
              <p className="text-gray-400">
                Verify certificates from anywhere in the world, 24/7. No need for intermediaries or complex verification
                processes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-2 mb-2 text-blue-400">
                <Lock className="h-5 w-5" />
                <span className="font-semibold text-lg text-white">Transparent Process</span>
              </div>
              <p className="text-gray-400">
                Every verification is recorded on the blockchain, creating a transparent and auditable trail of
                certificate authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-800 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Simple, secure, and efficient certificate validation in three easy steps.
          </p>

          <div className="mt-16 grid gap-8 lg:grid-cols-3 text-left">
            {/* Step 1 */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <Upload className="h-8 w-8 text-blue-400" />
                <span className="px-2 py-1 border border-gray-500 rounded">Step 1</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Upload Certificate</h3>
              <p className="text-gray-400 text-sm">
                Upload your certificate file or enter the certificate ID/hash to begin the verification process.
              </p>
              <p className="mt-2 text-gray-500 text-xs">
                Supports PDF, JPG, and PNG formats. Our system securely processes your certificate data.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="h-8 w-8 text-blue-400" />
                <span className="px-2 py-1 border border-gray-500 rounded">Step 2</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Blockchain Verification</h3>
              <p className="text-gray-400 text-sm">
                Our system checks the blockchain network to verify the authenticity of your certificate.
              </p>
              <p className="mt-2 text-gray-500 text-xs">
                Advanced cryptographic verification ensures your certificate's integrity and authenticity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-900 p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <FileText className="h-8 w-8 text-blue-400" />
                <span className="px-2 py-1 border border-gray-500 rounded">Step 3</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Get Results</h3>
              <p className="text-gray-400 text-sm">
                Receive instant verification results with detailed certificate information and QR code.
              </p>
              <p className="mt-2 text-gray-500 text-xs">
                Download verification reports and share results with employers or institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Verify Your Certificate?</h2>
          <p className="text-gray-400 mb-8">
            Join thousands of users who trust our blockchain-powered certificate validation system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/verify"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Start Verification <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-800 transition"
            >
              <UserCheck className="h-4 w-4" /> Admin Access
            </Link>
          </div>
        </div>
      </section>

     
    </div>
  );
}
