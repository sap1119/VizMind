import React from 'react';
import { Users, Target, Award, Globe, Heart, Lightbulb, Calendar, Rocket, Zap, Brain, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutPage: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible in data analytics, leveraging cutting-edge AI and machine learning technologies.'
    },
    {
      icon: Users,
      title: 'Customer-Centric',
      description: 'Our customers are at the heart of everything we do. We build features based on real user needs and feedback.'
    },
    {
      icon: Heart,
      title: 'Privacy First',
      description: 'We believe in protecting user privacy with zero data storage policies and end-to-end encryption for all data processing.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'We make powerful analytics accessible to everyone, regardless of technical expertise or company size.'
    }
  ];

  const milestones = [
    {
      year: 'March 2025',
      title: 'Company Founded',
      description: 'VizMind was founded with a vision to democratize data analytics and make AI-powered insights accessible to businesses of all sizes.',
      status: 'completed',
      icon: Rocket
    },
    {
      year: 'June 2025',
      title: 'First Beta Product Launch',
      description: 'Successfully launched our first beta version with core analytics features, dashboard creation, and basic AI insights to early adopters.',
      status: 'completed',
      icon: Target
    },
    {
      year: 'Q4 2025',
      title: 'Advanced AI Integration',
      description: 'Planning to introduce revolutionary AI-powered features including natural language queries, automated anomaly detection, and predictive analytics that will transform how users interact with data.',
      status: 'planned',
      icon: Brain
    },
    {
      year: '2026',
      title: 'Enterprise Growth & Expansion',
      description: 'Scaling to serve enterprise customers with advanced security features, custom integrations, dedicated support teams, and white-label solutions for large organizations.',
      status: 'planned',
      icon: Shield
    },
    {
      year: '2027',
      title: 'Global Expansion',
      description: 'International expansion with localized features, multi-language support, regional data centers, and partnerships with global technology leaders.',
      status: 'planned',
      icon: Globe
    }
  ];

  const upcomingFeatures = [
    {
      icon: Brain,
      title: 'AI Assistant with Natural Language',
      description: 'Ask questions about your data in plain English and get instant, intelligent responses',
      timeline: 'Q4 2025',
      highlight: true
    },
    {
      icon: Zap,
      title: 'Real-time Collaboration Suite',
      description: 'Live dashboard editing, team workspaces, and instant sharing capabilities',
      timeline: 'Q1 2026',
      highlight: false
    },
    {
      icon: Shield,
      title: 'Enterprise Security Platform',
      description: 'Advanced security, compliance tools, and custom integrations for large organizations',
      timeline: 'Q2 2026',
      highlight: true
    },
    {
      icon: Globe,
      title: 'Mobile Analytics Apps',
      description: 'Native iOS and Android apps for analytics on the go with offline capabilities',
      timeline: 'Q3 2026',
      highlight: false
    },
    {
      icon: Sparkles,
      title: 'Automated Insight Engine',
      description: 'AI that automatically discovers patterns and generates actionable business insights',
      timeline: 'Q4 2026',
      highlight: true
    },
    {
      icon: Target,
      title: 'Industry-Specific Solutions',
      description: 'Specialized analytics packages for healthcare, finance, retail, and manufacturing',
      timeline: '2027',
      highlight: false
    }
  ];

  const stats = [
    { number: '500+', label: 'Beta Users' },
    { number: '10M+', label: 'Data Points Processed' },
    { number: '3', label: 'Countries' },
    { number: '99.9%', label: 'Uptime Target' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Building the Future of
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Data Analytics</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Founded in March 2025, VizMind is on a mission to make powerful data analytics 
              accessible to everyone while keeping your data private and secure. We're just getting started!
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We're building the next generation of analytics tools that combine the power of 
                artificial intelligence with intuitive design. Our platform helps organizations 
                make better, data-driven decisions without compromising on privacy or security.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Since launching our beta in June 2025, we've been working closely with early 
                adopters to refine our platform and prepare for exciting new features that will 
                revolutionize how businesses interact with their data.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Rocket className="w-5 h-5 mr-2 text-blue-600" />
                  What's Coming Next
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We're actively developing advanced AI features, enterprise-grade security, 
                  and global expansion capabilities. Our roadmap includes revolutionary features 
                  that will transform how businesses analyze and understand their data.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do at VizMind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey & Roadmap
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From founding to future - our path to revolutionizing data analytics
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
            
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${
                      index % 2 === 0 ? 'text-right' : 'text-left'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`text-lg font-bold ${
                          milestone.status === 'completed' 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-blue-600 dark:text-blue-400'
                        } ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                          {milestone.year}
                        </div>
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          milestone.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        } ${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                          {milestone.status === 'completed' ? '✓ Completed' : '🚀 Planned'}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center ${
                    milestone.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                  }`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Exciting Features Coming Soon
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Revolutionary capabilities we're building for the future of analytics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border text-center relative overflow-hidden ${
                    feature.highlight 
                      ? 'border-blue-300 dark:border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {feature.highlight && (
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                      PRIORITY
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {feature.timeline}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 mt-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
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

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Journey to the Future
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We're building something revolutionary and we're just getting started. Our vision is to create 
              a world where every business decision is backed by intelligent, accessible, and private 
              data insights. Be part of the analytics revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all text-lg font-medium"
              >
                Try Beta Version
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all text-lg font-medium"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};