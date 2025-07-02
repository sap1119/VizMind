import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Brain, Shield, Zap, Users, Star, CheckCircle, Lock, Eye, Database, Sparkles, TrendingUp, Target, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Interactive Dashboards',
      description: 'Create stunning visualizations with our drag-and-drop dashboard builder',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations and automated pattern detection',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption and compliance',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Real-time Analytics',
      description: 'Process and analyze data in real-time with instant updates',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Data Director, TechCorp',
      content: 'VizMind transformed how we analyze data. The AI insights are incredibly accurate and the interface is intuitive.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Chen',
      role: 'CEO, StartupXYZ',
      content: 'The best analytics platform we\'ve used. Powerful features with zero learning curve. Our team adopted it instantly.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Analytics Manager, RetailCo',
      content: 'Cut our reporting time by 80%. The automated insights are game-changing for our business decisions.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '100M+', label: 'Data Points Processed', icon: Database },
    { number: '99.9%', label: 'Uptime', icon: TrendingUp },
    { number: '24/7', label: 'Support', icon: Shield }
  ];

  const privacyFeatures = [
    {
      icon: Shield,
      title: 'Zero Data Storage',
      description: 'VizMind doesn\'t store your private data. All processing happens in real-time without permanent storage.',
      color: 'emerald'
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'Your data is encrypted during transmission and processing, ensuring complete privacy and security.',
      color: 'blue'
    },
    {
      icon: Eye,
      title: 'Privacy by Design',
      description: 'Built with privacy as a core principle. We follow strict data protection standards and regulations.',
      color: 'purple'
    },
    {
      icon: Database,
      title: 'Local Processing',
      description: 'Data analysis happens locally in your browser when possible, keeping sensitive information secure.',
      color: 'orange'
    }
  ];

  const achievements = [
    { icon: Award, text: 'Gartner Leader 2024' },
    { icon: Star, text: '4.9/5 Customer Rating' },
    { icon: Globe, text: 'Available in 50+ Countries' },
    { icon: Target, text: 'SOC 2 Type II Certified' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Hero Section with Enhanced Graphics */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-aurora particles">
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full morphing-blob floating"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-blue-600/20 rounded-full morphing-blob floating-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-cyan-600/20 rounded-full morphing-blob floating"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full morphing-blob floating-delayed"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          {/* Beta Badge with Enhanced Design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 glass px-6 py-3 rounded-full border border-white/20 mb-8"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">
              🚀 Now in Beta - Experience the Future of Analytics
            </span>
            <span className="text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
              BETA
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
          >
            Transform Data Into
            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              Actionable Insights
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            VizMind's AI-powered analytics platform helps businesses make data-driven decisions with 
            interactive dashboards, predictive insights, and automated reporting. 
            <strong className="text-yellow-300">Your data stays private and secure.</strong>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link
              to="/auth"
              className="group px-10 py-5 bg-white text-gray-900 rounded-2xl hover:shadow-2xl transition-all text-lg font-bold transform hover:-translate-y-2 hover:scale-105"
            >
              <span className="flex items-center justify-center">
                Try Beta Version
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/features"
              className="group px-10 py-5 glass border border-white/30 text-white rounded-2xl hover:bg-white/10 transition-all text-lg font-bold transform hover:-translate-y-2"
            >
              View Features
            </Link>
          </motion.div>

          {/* Achievement Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="flex items-center space-x-2 glass px-4 py-2 rounded-full border border-white/20">
                  <Icon className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm font-medium">{achievement.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Privacy Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/10 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-green-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6"
            >
              Your Data, Your
              <span className="block text-gradient">Privacy</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              VizMind is built with privacy and security at its core. We don't store your private data, 
              and we follow the highest standards to keep your information safe.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {privacyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group card-hover"
                >
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 text-center h-full">
                    <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl border border-gray-200 dark:border-gray-700 max-w-5xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 dark:text-white">Privacy Guarantee</h3>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center leading-relaxed">
              We are committed to protecting your privacy. VizMind processes your data securely without storing 
              sensitive information. Your business data remains yours, always.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              {['GDPR Compliant', 'SOC 2 Certified', 'ISO 27001 Compliant', 'Zero Data Retention'].map((cert, index) => (
                <span key={index} className="flex items-center bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Powerful Features for
              <span className="block text-gradient">Modern Analytics</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              Everything you need to turn raw data into actionable business intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group card-hover"
                >
                  <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 h-full">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-pink-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
              Trusted by
              <span className="block text-gradient">Industry Leaders</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
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
                className="group card-hover"
              >
                <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-aurora relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            Ready to Transform
            <span className="block text-yellow-300">Your Data?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of companies using VizMind to make better data-driven decisions. 
            Your data stays private and secure with our zero-storage policy.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              to="/auth"
              className="group px-10 py-5 bg-white text-gray-900 rounded-2xl hover:shadow-2xl transition-all text-lg font-bold transform hover:-translate-y-2 hover:scale-105"
            >
              <span className="flex items-center justify-center">
                Try Beta Version
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/features"
              className="group px-10 py-5 glass border border-white/30 text-white rounded-2xl hover:bg-white/10 transition-all text-lg font-bold transform hover:-translate-y-2"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};