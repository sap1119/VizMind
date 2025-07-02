import React from 'react';
import { motion } from 'framer-motion';
import { PrivacySection } from '../components/features/PrivacySection';
import { MainFeaturesSection } from '../components/features/MainFeaturesSection';
import { AdditionalFeaturesSection } from '../components/features/AdditionalFeaturesSection';
import { ComparisonSection } from '../components/features/ComparisonSection';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Analytics</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Discover all the tools and capabilities that make VizMind the most comprehensive 
            analytics platform for businesses of all sizes. <strong>Your data stays private and secure.</strong>
          </motion.p>
        </div>
      </section>

      <PrivacySection />
      <MainFeaturesSection />
      <AdditionalFeaturesSection />
      <ComparisonSection />
    </div>
  );
};