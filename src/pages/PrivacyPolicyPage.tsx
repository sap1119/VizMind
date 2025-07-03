import React from 'react';
import { Shield, Lock, Eye, Database, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Privacy
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Policy</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Last updated: March 15, 2025
          </motion.p>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              Privacy Highlights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Zero Data Storage:</strong> We don't store your private data. All processing happens in real-time.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>End-to-End Encryption:</strong> Your data is encrypted during transmission and processing.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>No Third-Party Sharing:</strong> We never share your data with third parties.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>GDPR & CCPA Compliant:</strong> We adhere to global privacy regulations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>1. Introduction</h2>
            <p>
              At VizMind ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and analytics platform (the "Service").
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
            </p>
            
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Account Information</h3>
            <p>
              When you create an account, we collect:
            </p>
            <ul>
              <li>Email address</li>
              <li>Name</li>
              <li>Password (stored in encrypted form)</li>
              <li>Optional profile information (such as profile picture, phone number)</li>
            </ul>
            
            <h3>2.2 Usage Information</h3>
            <p>
              We collect information about how you use our Service, including:
            </p>
            <ul>
              <li>Log data (IP address, browser type, pages visited, time spent)</li>
              <li>Device information (device type, operating system)</li>
              <li>Feature usage statistics</li>
            </ul>
            
            <h3>2.3 Your Data</h3>
            <p>
              <strong>Important:</strong> We do not store the data you upload or analyze using our Service. All data processing happens in real-time, and your data is not retained on our servers after processing. This is a core principle of our privacy-first approach.
            </p>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and manage your account</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Protect the security and integrity of our Service</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information, including:
            </p>
            <ul>
              <li>End-to-end encryption for data transmission</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security assessments and audits</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
            </p>
            
            <h2>5. Data Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your information to third parties. We may share information in the following limited circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with trusted third parties who assist us in operating our Service, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law or in response to valid requests by public authorities.</li>
              <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
              <li><strong>With Your Consent:</strong> We may share information with your consent or at your direction.</li>
            </ul>
            
            <h2>6. Your Rights and Choices</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul>
              <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> You can request that we correct inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> You can request that we delete your personal information.</li>
              <li><strong>Restriction:</strong> You can request that we restrict the processing of your information.</li>
              <li><strong>Data Portability:</strong> You can request a copy of your information in a structured, commonly used, and machine-readable format.</li>
              <li><strong>Objection:</strong> You can object to our processing of your information.</li>
            </ul>
            <p>
              To exercise these rights, please contact us at sathyaedu119@gmail.com.
            </p>
            
            <h2>7. Cookies and Similar Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            
            <h2>8. Children's Privacy</h2>
            <p>
              Our Service is not intended for use by children under the age of 16. We do not knowingly collect personally identifiable information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
            </p>
            
            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.
            </p>
            <p>
              If you are located outside India and choose to provide information to us, please note that we transfer the data to India and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.
            </p>
            
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>By email: sathyaedu119@gmail.com</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Privacy Commitment */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Privacy Commitment
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              At VizMind, privacy isn't just a policy—it's a core principle. We're committed to protecting your data 
              and providing transparent, ethical analytics services.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 mr-2" />
                GDPR Compliant
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Lock className="w-4 h-4 mr-2" />
                End-to-End Encryption
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Eye className="w-4 h-4 mr-2" />
                Zero Data Retention
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Database className="w-4 h-4 mr-2" />
                Local Processing
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};