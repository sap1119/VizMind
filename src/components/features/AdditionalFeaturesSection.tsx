import React from 'react';
import { Shield, Zap, Users, FileText, Settings, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const additionalFeatures = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with encryption, compliance, and access controls'
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Process millions of data points in real-time with instant updates'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share dashboards, collaborate on insights, and manage team access'
  },
  {
    icon: FileText,
    title: 'Automated Reporting',
    description: 'Generate comprehensive reports automatically with scheduled delivery'
  },
  {
    icon: Settings,
    title: 'Custom Integrations',
    description: 'Build custom integrations with our robust API and webhook system'
  },
  {
    icon: Globe,
    title: 'Global Deployment',
    description: 'Deploy globally with CDN support and multi-region availability'
  }
];

export const AdditionalFeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Additional features that make VizMind a complete analytics solution
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
  );
};