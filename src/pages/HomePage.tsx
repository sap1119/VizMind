import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Brain, Shield, Zap, Users, Star, CheckCircle, Lock, Eye, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Interactive Dashboards',
      description: 'Create stunning visualizations with our drag-and-drop dashboard builder'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations and automated pattern detection'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and compliance'
    },
    {
      icon: Zap,
      title: 'Real-time Analytics',
      description: 'Process and analyze data in real-time with instant updates'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Data Director, TechCorp',
      content: 'VizMind transformed how we analyze data. The AI insights are incredibly accurate.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CEO, StartupXYZ',
      content: 'The best analytics platform we\'ve used. Intuitive, powerful, and reliable.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Analytics Manager, RetailCo',
      content: 'Cut our reporting time by 80%. The automated insights are game-changing.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50M+', label: 'Data Points Processed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const privacyFeatures = [
    {
      icon: Shield,
      title: 'Zero Data Storage',
      description: 'VizMind doesn\'t store your private data. All processing happens in real-time without permanent storage.'
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'Your data is encrypted during transmission and processing, ensuring complete privacy and security.'
    },
    {
      icon: Eye,
      title: 'Privacy by Design',
      description: 'Built with privacy as a core principle. We follow strict data protection standards and regulations.'
    },
    {
      icon: Database,
      title: 'Local Processing',
      description: 'Data analysis happens locally in your browser when possible, keeping sensitive information secure.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Beta Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 mb-6"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                🚀 Now in Beta - Experience the Future of Analytics
              </span>
              <span className="text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
                BETA
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Transform Data Into
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Actionable Insights</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              VizMind's AI-powered analytics platform helps businesses make data-driven decisions with 
              interactive dashboards, predictive insights, and automated reporting. <strong>Your data stays private and secure.</strong>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/auth"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-lg font-medium"
              >
                Try Beta Version
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link
                to="/features"
                className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-lg font-medium"
              >
                View Features
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy & Security Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Your Data, Your Privacy
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            >
              VizMind is built with privacy and security at its core. We don't store your private data, 
              and we follow the highest standards to keep your information safe.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            className="mt-12 text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-green-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Privacy Guarantee</h3>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We are committed to protecting your privacy. VizMind processes your data securely without storing 
                sensitive information. Your business data remains yours, always.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  GDPR Compliant
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  SOC 2 Certified
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  ISO 27001 Compliant
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  Zero Data Retention
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Modern Analytics
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to turn raw data into actionable business intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our customers say about VizMind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Data?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies using VizMind to make better data-driven decisions. 
            Your data stays private and secure with our zero-storage policy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all text-lg font-medium"
            >
              Try Beta Version
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              to="/features"
              className="inline-flex items-center px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all text-lg font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};