import React from 'react';
import { BarChart3, Brain, Shield, Zap, Users, Database, TrendingUp, Target, Briefcase, FileText, Settings, Globe, Lock, Eye, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturesPage: React.FC = () => {
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

      {/* Privacy & Security Section */}
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

          {/* Privacy Guarantee */}
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

      {/* Main Features */}
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

      {/* Additional Features Grid */}
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

      {/* Feature Comparison */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose VizMind?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how we compare to traditional analytics solutions
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
              <div className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traditional Tools</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li>Complex setup process</li>
                  <li>Limited visualization options</li>
                  <li>Manual data analysis</li>
                  <li>Expensive licensing</li>
                  <li>Steep learning curve</li>
                  <li>Data storage concerns</li>
                </ul>
              </div>
              
              <div className="p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">VizMind</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li>✓ 5-minute setup</li>
                  <li>✓ 50+ chart types</li>
                  <li>✓ AI-powered insights</li>
                  <li>✓ Transparent pricing</li>
                  <li>✓ Intuitive interface</li>
                  <li>✓ Zero data storage</li>
                </ul>
              </div>
              
              <div className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Spreadsheets</h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                  <li>Manual chart creation</li>
                  <li>No real-time updates</li>
                  <li>Limited collaboration</li>
                  <li>Error-prone formulas</li>
                  <li>No predictive analytics</li>
                  <li>Security vulnerabilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};