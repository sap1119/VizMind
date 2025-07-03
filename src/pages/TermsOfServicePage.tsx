import React from 'react';
import { FileText, Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const TermsOfServicePage: React.FC = () => {
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
            Terms of
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Service</span>
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

      {/* Terms Content */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
              Important Points
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Privacy-First Approach:</strong> We do not store your private data. All processing happens in real-time.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Account Responsibility:</strong> You are responsible for maintaining the security of your account credentials.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Acceptable Use:</strong> The Service may not be used for illegal activities or to violate others' rights.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Service Modifications:</strong> We may modify or discontinue the Service at any time with reasonable notice.
                </p>
              </div>
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using VizMind's website and analytics platform (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the Terms, you may not access the Service.
            </p>
            
            <h2>2. Description of Service</h2>
            <p>
              VizMind provides an AI-powered data analytics platform that allows users to upload, analyze, and visualize data. The Service includes features such as dashboard creation, KPI tracking, portfolio analysis, trend detection, and report generation.
            </p>
            
            <h2>3. User Accounts</h2>
            <h3>3.1 Registration</h3>
            <p>
              To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            
            <h3>3.2 Account Security</h3>
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.
            </p>
            
            <h3>3.3 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate your account if you violate these Terms or if your account has been inactive for an extended period. You may also delete your account at any time.
            </p>
            
            <h2>4. User Content</h2>
            <h3>4.1 Data Ownership</h3>
            <p>
              You retain all rights to the data you upload to the Service. We do not claim ownership of your data.
            </p>
            
            <h3>4.2 Data Privacy</h3>
            <p>
              We do not store your private data. All data processing happens in real-time, and your data is not retained on our servers after processing. For more information, please see our Privacy Policy.
            </p>
            
            <h3>4.3 Prohibited Content</h3>
            <p>
              You agree not to upload, transmit, or share data that:
            </p>
            <ul>
              <li>Violates any applicable law or regulation</li>
              <li>Infringes on the intellectual property rights of others</li>
              <li>Contains malware, viruses, or other harmful code</li>
              <li>Contains personal data of individuals without proper consent</li>
              <li>Is defamatory, obscene, or otherwise objectionable</li>
            </ul>
            
            <h2>5. Acceptable Use</h2>
            <p>
              You agree not to use the Service to:
            </p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Attempt to gain unauthorized access to any portion of the Service or any other systems or networks</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Collect or store personal data about other users without their consent</li>
            </ul>
            
            <h2>6. Intellectual Property</h2>
            <h3>6.1 Our Intellectual Property</h3>
            <p>
              The Service and its original content (excluding your uploaded data), features, and functionality are and will remain the exclusive property of VizMind and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
            
            <h3>6.2 Feedback</h3>
            <p>
              If you provide us with any feedback or suggestions regarding the Service, you hereby assign to us all rights in such feedback and agree that we have the right to use such feedback and related information in any manner we deem appropriate.
            </p>
            
            <h2>7. Subscription and Payments</h2>
            <h3>7.1 Fees</h3>
            <p>
              Some aspects of the Service may be provided for a fee. You will be required to select a payment plan and provide accurate payment information. You agree to pay all fees specified at the time of purchase.
            </p>
            
            <h3>7.2 Billing</h3>
            <p>
              For subscription-based services, you will be billed in advance on a recurring basis, depending on the subscription plan you select. Subscription fees are non-refundable except as required by law or as explicitly stated in these Terms.
            </p>
            
            <h3>7.3 Changes to Fees</h3>
            <p>
              We reserve the right to change our subscription fees at any time. If we change our fees, we will provide notice of the change on the website or by email, at our discretion, at least 30 days before the change takes effect.
            </p>
            
            <h2>8. Limitation of Liability</h2>
            <p>
              In no event shall VizMind, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            
            <h2>9. Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
            
            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us:
            </p>
            <ul>
              <li>By email: sathyaedu119@gmail.com</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-start">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg mr-4 flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Important Notice
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  By using VizMind, you acknowledge that you have read and understood these Terms of Service and agree to be bound by them. If you do not agree to these Terms, please do not use our Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};