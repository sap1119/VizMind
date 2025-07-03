import React from 'react';
import { Shield, Lock, Eye, Database, Server, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const SecurityPage: React.FC = () => {
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
            Security at
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> VizMind</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            How we protect your data and ensure the security of our platform
          </motion.p>
        </div>
      </section>

      {/* Security Overview */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Security Approach
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Security is built into every aspect of VizMind's platform. We employ industry-leading 
              practices to protect your data and ensure the integrity of our service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Zero Data Storage',
                description: 'We don\'t store your private data. All processing happens in real-time without permanent storage of sensitive information.'
              },
              {
                icon: Lock,
                title: 'End-to-End Encryption',
                description: 'Your data is encrypted during transmission and processing using industry-standard AES-256 encryption.'
              },
              {
                icon: Eye,
                title: 'Privacy by Design',
                description: 'Built with privacy as a core principle. We follow GDPR, CCPA, and other data protection regulations.'
              },
              {
                icon: Database,
                title: 'Secure Infrastructure',
                description: 'Our infrastructure is hosted on secure cloud providers with multiple layers of security controls.'
              },
              {
                icon: Server,
                title: 'Regular Security Audits',
                description: 'We conduct regular security assessments and penetration testing to identify and address vulnerabilities.'
              },
              {
                icon: CheckCircle,
                title: 'Compliance',
                description: 'We maintain compliance with industry standards and regulations to ensure the highest level of security.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Security Measures
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Detailed information about how we protect your data and our platform
            </p>
          </div>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Data Protection
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Zero Data Storage:</strong> We process your data in real-time and do not store it on our servers. This minimizes the risk of data breaches and ensures your sensitive information remains private.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Encryption:</strong> All data transmitted to and from our service is encrypted using TLS 1.3. Any temporary data processing uses AES-256 encryption.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Data Minimization:</strong> We only collect the minimum amount of information necessary to provide our service.
                  </p>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Authentication & Access Control
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Secure Authentication:</strong> We use industry-standard authentication mechanisms with password hashing using bcrypt with salt.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Multi-factor Authentication:</strong> We support MFA to add an extra layer of security to your account.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Role-Based Access Control:</strong> We implement fine-grained access controls to ensure users can only access data they're authorized to see.
                  </p>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Infrastructure Security
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Secure Cloud Infrastructure:</strong> Our platform is hosted on secure cloud providers with SOC 2, ISO 27001, and other security certifications.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Network Security:</strong> We implement firewalls, intrusion detection systems, and regular network scanning to protect against threats.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>DDoS Protection:</strong> Our infrastructure includes protection against distributed denial-of-service attacks.
                  </p>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Application Security
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Secure Development:</strong> We follow secure coding practices and conduct regular code reviews.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Vulnerability Management:</strong> Regular security testing, including static code analysis and penetration testing.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Dependency Scanning:</strong> We regularly scan and update dependencies to address known vulnerabilities.
                  </p>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Compliance & Certifications
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>GDPR Compliance:</strong> Our practices are aligned with the General Data Protection Regulation requirements.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>CCPA Compliance:</strong> We adhere to the California Consumer Privacy Act requirements.
                  </p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>SOC 2 Compliance:</strong> We're working toward SOC 2 certification to demonstrate our commitment to security.
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Reporting */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-start">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg mr-4 flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Reporting Security Issues
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We take security issues seriously. If you believe you've found a security vulnerability in our service, please report it to us immediately.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Please email security concerns to: <a href="mailto:sathyaedu119@gmail.com" className="text-blue-600 dark:text-blue-400 font-medium">sathyaedu119@gmail.com</a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We appreciate your help in keeping VizMind secure and will investigate all legitimate reports. We request that you do not publicly disclose the issue until we've had a chance to address it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Commitment */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Security Commitment
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Security is not a one-time effort but an ongoing commitment. We continuously work to 
              improve our security measures and protect your data. Your trust is our top priority.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white">
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 mr-2" />
                Continuous Monitoring
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Lock className="w-4 h-4 mr-2" />
                Regular Security Updates
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Eye className="w-4 h-4 mr-2" />
                Transparent Practices
              </span>
              <span className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <Database className="w-4 h-4 mr-2" />
                Data Protection
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};