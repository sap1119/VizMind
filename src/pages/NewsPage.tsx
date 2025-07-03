import React, { useState } from 'react';
import { Calendar, ExternalLink, ArrowRight, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export const NewsPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const newsItems = [
    {
      id: 1,
      title: 'VizMind Launches Beta Version of AI-Powered Analytics Platform',
      summary: 'Our new platform combines powerful data visualization with AI-driven insights to help businesses make better decisions.',
      date: '2024-03-15',
      category: 'Product',
      source: 'VizMind Blog',
      link: '/blog/1',
      featured: true
    },
    {
      id: 2,
      title: 'VizMind Introduces Interactive Dashboard Builder',
      summary: 'New drag-and-drop interface allows users to create custom dashboards without coding knowledge.',
      date: '2024-02-20',
      category: 'Feature',
      source: 'VizMind Blog',
      link: '/blog/2',
      featured: false
    },
    {
      id: 3,
      title: 'VizMind Adds Advanced KPI Tracking Capabilities',
      summary: 'New KPI tracking features help businesses monitor performance metrics with automated targets and alerts.',
      date: '2024-01-25',
      category: 'Feature',
      source: 'VizMind Blog',
      link: '/blog/3',
      featured: false
    },
    {
      id: 4,
      title: 'VizMind Enhances Data Privacy with Zero-Storage Policy',
      summary: 'Our commitment to data privacy means your sensitive information is never stored on our servers.',
      date: '2024-01-10',
      category: 'Security',
      source: 'VizMind Blog',
      link: '/blog/4',
      featured: false
    }
  ];

  const categories = ['All', 'Product', 'Feature', 'Security'];
  const years = ['2024'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesYear = item.date.startsWith(selectedYear);
    return matchesCategory && matchesYear;
  });

  const featuredNews = filteredNews.find(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Product': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Feature': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Security': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

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
            VizMind
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> News</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Stay updated with the latest news, announcements, and features from VizMind.
          </motion.p>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </motion.div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured News
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredNews.category)}`}>
                  {featuredNews.category}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {featuredNews.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                {featuredNews.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(featuredNews.date).toLocaleDateString()}
                  </span>
                  <span>Source: {featuredNews.source}</span>
                </div>
                <a
                  href={featuredNews.link}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Read Full Article
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {item.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Source: {item.source}
                  </span>
                  <a
                    href={item.link}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No news items found for the selected filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Press & Media Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Looking for VizMind logos, executive photos, or company information? 
              Download our comprehensive press kit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Download Press Kit
              </a>
              <a
                href="mailto:sathyaedu119@gmail.com"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
              >
                Media Inquiries
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};