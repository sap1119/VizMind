import React from 'react';
import { Shield, Lock, Eye, Database, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const privacyFeatures = [
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
    title: 'Local Processing',
    description: 'Data analysis happens locally in your browser when possible, keeping sensitive information on your devices.'
  }
];

export const PrivacySection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy & Security First
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            VizMind is designed with your privacy in mind. We follow industry best practices 
            to ensure your data remains secure and private.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {privacyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-green-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Our Privacy Commitment</h3>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-4xl mx-auto">
            VizMind doesn't store your private data. We process your information securely and follow 
            strict privacy standards to keep your business data safe. Your data is yours, always.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              GDPR Compliant
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              SOC 2 Type II Certified
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              ISO 27001 Compliant
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Zero Data Retention Policy
            </span>
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              End-to-End Encryption
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};