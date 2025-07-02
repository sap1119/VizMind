import React from 'react';
import { BarChart3, Brain, Database, Target, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const mainFeatures = [
  {
    icon: BarChart3,
    title: 'Interactive Dashboards',
    description: 'Create stunning, interactive dashboards with our intuitive drag-and-drop builder. Customize layouts, add widgets, and share insights across your organization.',
    features: ['Drag & Drop Builder', 'Real-time Updates', 'Custom Widgets', 'Mobile Responsive']
  },
  {
    icon: Brain,
    title: 'AI-Powered Analytics',
    description: 'Leverage artificial intelligence to discover hidden patterns, predict trends, and get automated insights from your data without manual analysis.',
    features: ['Pattern Recognition', 'Predictive Analytics', 'Automated Insights', 'Natural Language Queries']
  },
  {
    icon: Database,
    title: 'Data Integration',
    description: 'Connect to multiple data sources seamlessly. Import from CSV, databases, APIs, and cloud services with automatic data synchronization.',
    features: ['Multiple Data Sources', 'Real-time Sync', 'Data Transformation', 'API Integrations']
  },
  {
    icon: Target,
    title: 'KPI Tracking',
    description: 'Monitor key performance indicators with automated tracking, goal setting, and performance alerts to stay on top of your metrics.',
    features: ['Custom KPIs', 'Goal Setting', 'Performance Alerts', 'Trend Analysis']
  },
  {
    icon: Briefcase,
    title: 'Portfolio Management',
    description: 'Analyze investment portfolios with advanced risk assessment, performance tracking, and asset allocation optimization.',
    features: ['Risk Analysis', 'Performance Tracking', 'Asset Allocation', 'ROI Calculation']
  },
  {
    icon: TrendingUp,
    title: 'Trend Analysis',
    description: 'Identify trends, detect anomalies, and forecast future patterns with advanced statistical analysis and machine learning.',
    features: ['Anomaly Detection', 'Forecasting', 'Statistical Analysis', 'Pattern Recognition']
  }
];

export const MainFeaturesSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};