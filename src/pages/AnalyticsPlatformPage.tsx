import React from 'react';
import { BarChart3, Brain, Database, Target, TrendingUp, FileText, Zap, Shield, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AnalyticsPlatformPage: React.FC = () => {
  const workflowSteps = [
    {
      icon: Database,
      title: 'Data Upload',
      description: 'Upload your CSV data with smart parsing and automatic data type detection. Our platform handles your data securely without storing sensitive information.'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Creation',
      description: 'Automatically generate interactive dashboards with visualizations tailored to your data structure. Customize layouts and chart types with our intuitive interface.'
    },
    {
      icon: Target,
      title: 'KPI Tracking',
      description: 'Define and monitor key performance indicators with automated target setting and performance tracking. Get alerts when metrics deviate from expected values.'
    },
    {
      icon: BarChart3,
      title: 'Portfolio Analysis',
      description: 'Analyze components and their relationships with advanced portfolio management tools. Track performance, allocation, and risk metrics in real-time.'
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Identify patterns and predict future trends with AI-powered analytics. Detect anomalies and get insights into what's driving changes in your data.'
    },
    {
      icon: FileText,
      title: 'Analytics Report',
      description: 'Generate comprehensive reports with key findings, visualizations, and actionable recommendations. Download and share insights with your team.'
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Our platform uses advanced AI to automatically detect patterns, anomalies, and insights in your data. Ask questions in natural language and get instant answers.'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Process millions of data points in real-time with instant updates and visualizations. Our platform is optimized for performance even with large datasets.'
    },
    {
      icon: Shield,
      title: 'Privacy-First Approach',
      description: 'Your data security is our priority. We process your data without storing sensitive information, using end-to-end encryption and zero data retention policies.'
    },
    {
      icon: Users,
      title: 'Collaboration Tools',
      description: 'Share dashboards, reports, and insights with your team. Control access permissions and collaborate in real-time on analytics projects.'
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
            VIZMINDS Analytics
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Platform</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            A complete end-to-end analytics solution that transforms your raw data into actionable insights through a guided 6-step workflow.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/auth"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all text-lg font-bold"
            >
              Try It Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Analytics Workflow
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our guided 6-step workflow takes you from raw data to comprehensive insights
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 hidden md:block"></div>
            
            <div className="space-y-12 relative">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                  >
                    <div className="md:w-1/2 relative">
                      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                              Step {index + 1}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                              {step.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>
                      </div>
                      
                      {/* Connector for desktop */}
                      <div className="absolute top-1/2 hidden md:block">
                        {index % 2 === 0 ? (
                          <div className="right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        ) : (
                          <div className="left-0 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
                        )}
                      </div>
                    </div>
                    
                    {/* Center dot for desktop */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful capabilities that make VIZMINDS the leading analytics solution
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with modern technologies for performance, security, and scalability
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Frontend Technologies
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">React 18</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Modern React with hooks and context for state management</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">TypeScript</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Type-safe development with enhanced developer experience</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Tailwind CSS</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Utility-first CSS framework for responsive design</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Recharts</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Composable charting library for data visualization</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Framer Motion</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Production-ready animations and transitions</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Backend & Infrastructure
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Supabase</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Open source Firebase alternative with PostgreSQL database</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">PostgreSQL</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Advanced open source database with JSON support</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Row Level Security</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Database-level security policies for data protection</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Edge Functions</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Serverless functions for API endpoints and data processing</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Vercel</span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Global deployment with edge caching and CDN</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Data?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Start using VIZMINDS today and discover insights that drive business growth.
              No credit card required to get started.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all text-lg font-medium"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};