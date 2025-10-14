import React from "react";
import { Link } from "react-router-dom";
import { Shield, Users, Globe, Lock, CheckCircle, ArrowRight } from "lucide-react";


export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <main className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">About CertValidator</h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              We're revolutionizing certificate verification through blockchain technology, ensuring authenticity,
              preventing fraud, and building trust in educational credentials worldwide.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-400 mb-6">
                  To create a secure, transparent, and immutable system for certificate verification that eliminates
                  fraud and builds trust in educational credentials. We believe that everyone deserves to have their
                  achievements recognized and verified with absolute certainty.
                </p>
                <p className="text-gray-400">
                  By leveraging blockchain technology, we ensure that once a certificate is issued and verified, it
                  cannot be tampered with or forged, providing a permanent record of authenticity.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                    <div className="text-sm text-gray-400">Secure</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                    <div className="text-sm text-gray-400">Available</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
                    <div className="text-sm text-gray-400">Fraud Cases</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
                    <div className="text-sm text-gray-400">Immutable</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-xl mb-2">Blockchain Security</h3>
                <p className="text-gray-400 text-sm">
                  Certificates are stored on a decentralized blockchain network, making them impossible to tamper with.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-xl mb-2">Global Access</h3>
                <p className="text-gray-400 text-sm">
                  Verify certificates from anywhere in the world, 24/7, without geographical restrictions.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-xl mb-2">Privacy Protected</h3>
                <p className="text-gray-400 text-sm">
                  Your personal information is encrypted and only accessible through secure verification processes.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <CheckCircle className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-xl mb-2">Instant Verification</h3>
                <p className="text-gray-400 text-sm">
                  Get instant results when verifying certificates, with detailed authenticity reports.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-xl mb-2">Trusted by Institutions</h3>
                <p className="text-gray-400 text-sm">
                  Universities and educational institutions worldwide trust our verification system.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
                <div className="px-2 py-1 border border-gray-500 rounded text-blue-400 mb-2 inline-block">Free</div>
                <h3 className="font-semibold text-xl mb-2">Free to Use</h3>
                <p className="text-gray-400 text-sm">
                  Certificate verification is completely free for students and employers.
                </p>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4">Powered by Advanced Technology</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our platform combines cutting-edge blockchain technology with user-friendly interfaces to provide
                the most secure and accessible certificate verification system available.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Blockchain Infrastructure */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-xl mb-2">Blockchain Infrastructure</h3>
                <p className="text-gray-400 mb-2">
                  Built on a robust blockchain network that ensures data integrity and immutability.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Decentralized storage</li>
                  <li>• Cryptographic security</li>
                  <li>• Immutable records</li>
                  <li>• Transparent verification</li>
                </ul>
              </div>

              {/* Modern Web Technologies */}
              <div className="bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="font-semibold text-xl mb-2">Modern Web Technologies</h3>
                <p className="text-gray-400 mb-2">
                  Built with React and modern web technologies for optimal performance and user experience.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• React & JavaScript</li>
                  <li>• Responsive design</li>
                  <li>• Fast loading times</li>
                  <li>• Cross-platform compatibility</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust our blockchain-powered certificate validation system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/verify"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
              >
                Verify Certificate <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-500 rounded-lg hover:bg-gray-800 transition"
              >
                Admin Access
              </Link>
            </div>
          </section>
        </div>
      </main>
    
    </div>
  );
}
