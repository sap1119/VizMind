import React from 'react';
import { Linkedin, Mail, Users, Code, Database, Server, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const TeamPage: React.FC = () => {
  const leadership = [
    {
      name: 'Pawar Sathyanarayana',
      role: 'Founder & CEO',
      bio: 'Experienced entrepreneur with a passion for data analytics and AI. Founded VIZMINDS with a vision to make powerful analytics accessible to everyone while maintaining data privacy.',
      social: {
        linkedin: 'https://www.linkedin.com/in/pawar-sathyanarayana-714bb5201',
        email: 'vizminds.help@gmail.com'
      }
    }
  ];

  const aiTeam = [
    {
      name: 'Gemini',
      role: 'AI Technical Lead',
      department: 'Engineering',
      description: 'Advanced AI system that helps develop and optimize VIZMINDS\'s analytics algorithms and data processing capabilities. Gemini has contributed to coding, marketing, execution, and various other aspects of the platform.'
    }
  ];

  const openPositions = [
    {
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      icon: Code
    },
    {
      title: 'Backend Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      icon: Server
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'Remote',
      icon: PenTool
    },
    {
      title: 'Data Engineer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      icon: Database
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      icon: Server
    },
    {
      title: 'Product Marketing Manager',
      department: 'Marketing',
      type: 'Full-time',
      location: 'Remote',
      icon: Users
    },
    {
      title: 'Senior Data Scientist',
      department: 'Data Science',
      type: 'Full-time',
      location: 'Remote',
      icon: Database
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
            Meet the
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> VIZMINDS Team</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            We're building the future of data analytics with a focus on privacy, 
            accessibility, and powerful insights.
          </motion.p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Leadership
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The visionary behind VIZMINDS
            </p>
          </div>
          
          <div className="flex justify-center">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden max-w-2xl"
              >
                <div className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                      {leader.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {leader.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                        {leader.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {leader.bio}
                      </p>
                      <div className="flex justify-center space-x-3">
                        {leader.social.linkedin && (
                          <a href={leader.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {leader.social.email && (
                          <a href={`mailto:${leader.social.email}`} className="text-gray-400 hover:text-green-600 transition-colors">
                            <Mail className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Team */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Cutting-edge AI powering our analytics platform
            </p>
          </div>
          
          <div className="flex justify-center">
            {aiTeam.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center max-w-lg"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Code className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Join Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're looking for talented individuals who are passionate about data analytics, 
              AI, and creating exceptional user experiences. Join us in our mission to make 
              powerful analytics accessible to everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openPositions.map((position, index) => {
              const Icon = position.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                          {position.department}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-xs">
                          {position.type}
                        </span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded text-xs">
                          {position.location}
                        </span>
                      </div>
                      <a
                        href="mailto:vizminds.help@gmail.com?subject=Job Application: Position Name"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        Apply Now
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Have questions about our team or interested in joining VIZMINDS? 
              We'd love to hear from you!
            </p>
            <a
              href="mailto:vizminds.help@gmail.com"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all text-lg font-medium inline-flex items-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};