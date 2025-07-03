import React, { useState } from 'react';
import { Search, HelpCircle, Book, FileText, MessageCircle, Mail, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const HelpCenterPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqs = [
    {
      question: 'How do I upload data to VizMind?',
      answer: 'You can upload data by navigating to the "Data Upload" step in the workflow sidebar. Click on the upload area or drag and drop your CSV file. VizMind will automatically process and analyze your data.'
    },
    {
      question: 'What file formats does VizMind support?',
      answer: 'Currently, VizMind supports CSV (Comma Separated Values) files. We\'re working on adding support for Excel, JSON, and other formats in future updates.'
    },
    {
      question: 'How does VizMind ensure my data privacy?',
      answer: 'VizMind processes your data in real-time without storing sensitive information. We use end-to-end encryption during transmission and follow a zero data retention policy for your private data.'
    },
    {
      question: 'Can I share my dashboards with others?',
      answer: 'Yes, you can share dashboards by making them public or by inviting specific users via email. You can control permissions to determine whether others can view or edit your dashboards.'
    },
    {
      question: 'How do I create custom KPIs?',
      answer: 'Navigate to the "KPI Tracker" step in the workflow, then click "Add KPI". You can define custom KPIs by specifying a name, description, formula, target value, and category.'
    },
    {
      question: 'Is there a limit to how much data I can upload?',
      answer: 'Free accounts can upload files up to 10MB. Premium accounts can upload files up to 100MB. Enterprise accounts have custom limits based on their needs.'
    },
    {
      question: 'How do I export my reports?',
      answer: 'In the "Analytics Report" step, click the "Download Report" button. You can export reports in Markdown format, which can be easily converted to PDF or other formats.'
    },
    {
      question: 'Can I connect VizMind to my database?',
      answer: 'Direct database connections are coming soon. Currently, you can export data from your database as CSV and upload it to VizMind.'
    }
  ];

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      articles: [
        'Creating your account',
        'Uploading your first dataset',
        'Navigating the workflow',
        'Understanding the dashboard'
      ]
    },
    {
      title: 'Data Management',
      icon: FileText,
      articles: [
        'Supported file formats',
        'Data preparation tips',
        'Managing multiple datasets',
        'Data privacy and security'
      ]
    },
    {
      title: 'Visualizations',
      icon: HelpCircle,
      articles: [
        'Creating charts and graphs',
        'Customizing visualizations',
        'Using the dashboard builder',
        'Sharing visualizations'
      ]
    },
    {
      title: 'Advanced Features',
      icon: MessageCircle,
      articles: [
        'Setting up KPIs',
        'Portfolio analysis',
        'Trend detection',
        'AI-powered insights'
      ]
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a server
    alert('Thank you for your message! We will get back to you soon.');
    setContactFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            How can we
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> help?</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Find answers to common questions or contact our support team for assistance.
          </motion.p>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Help Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Browse help articles by category
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {helpCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-2 mb-4">
                    {category.articles.map((article, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <a href="#" className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
            
            {searchTerm && filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No FAQs found matching "{searchTerm}". Please try another search term or contact us.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Contact our support team and we'll get back to you as soon as possible
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
          >
            <form onSubmit={handleContactFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactFormData.name}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleContactFormChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={contactFormData.subject}
                  onChange={handleContactFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a subject</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Account Issues">Account Issues</option>
                  <option value="Billing Questions">Billing Questions</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactFormData.message}
                  onChange={handleContactFormChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              You can also reach us directly at{' '}
              <a href="mailto:sathyaedu119@gmail.com" className="text-blue-600 dark:text-blue-400 font-medium">
                sathyaedu119@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* AI Chatbot Teaser */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Try Our AI Support Assistant
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Get instant answers to your questions with our AI-powered support assistant.
              Available 24/7 to help you with common issues and questions.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all text-lg font-medium"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with AI Assistant
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};