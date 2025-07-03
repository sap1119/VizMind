import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Mail, Users, Star, Heart, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export const CareersPage: React.FC = () => {
  const openPositions = [
    {
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'We\'re looking for an experienced frontend engineer to help build our next-generation analytics platform. You\'ll work with React, TypeScript, and modern web technologies to create intuitive, responsive interfaces.',
      requirements: [
        'Minimum 3+ years of experience with React and TypeScript',
        'Experience with state management (Context API, Redux, etc.)',
        'Strong understanding of responsive design and accessibility',
        'Experience with data visualization libraries (Recharts, D3, etc.)',
        'Excellent problem-solving skills and attention to detail'
      ]
    },
    {
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our backend team to build scalable, secure APIs and services that power our analytics platform. You\'ll work with Node.js, PostgreSQL, and cloud technologies to create robust backend solutions.',
      requirements: [
        'Minimum 3+ years of experience with Node.js and RESTful APIs',
        'Experience with PostgreSQL or similar relational databases',
        'Knowledge of authentication and security best practices',
        'Experience with cloud services (AWS, Azure, or GCP)',
        'Understanding of microservices architecture'
      ]
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'We\'re seeking a talented UI/UX designer to create beautiful, intuitive interfaces for our analytics platform. You\'ll work closely with product and engineering teams to design user-centered experiences.',
      requirements: [
        'Minimum 3+ years of experience in UI/UX design',
        'Proficiency with design tools (Figma, Sketch, etc.)',
        'Experience designing data visualization interfaces',
        'Strong portfolio demonstrating user-centered design process',
        'Excellent communication and collaboration skills'
      ]
    },
    {
      title: 'Data Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our data team to build and maintain the data pipelines that power our analytics platform. You\'ll work with large datasets and implement efficient data processing solutions.',
      requirements: [
        'Minimum 3+ years of experience in data engineering',
        'Experience with data processing frameworks (Spark, Kafka, etc.)',
        'Strong SQL skills and experience with PostgreSQL',
        'Knowledge of data modeling and ETL processes',
        'Experience with cloud-based data solutions'
      ]
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'We\'re looking for a DevOps engineer to help build and maintain our infrastructure. You\'ll work on CI/CD pipelines, cloud infrastructure, and ensure the reliability and security of our platform.',
      requirements: [
        'Minimum 3+ years of experience in DevOps or SRE roles',
        'Experience with CI/CD tools (GitHub Actions, Jenkins, etc.)',
        'Knowledge of infrastructure as code (Terraform, CloudFormation)',
        'Experience with containerization (Docker, Kubernetes)',
        'Understanding of cloud services and security best practices'
      ]
    },
    {
      title: 'Product Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our marketing team to help position and promote our analytics platform. You\'ll develop messaging, create content, and work with sales to drive adoption.',
      requirements: [
        'Minimum 3+ years of experience in product marketing',
        'Experience marketing B2B SaaS products',
        'Excellent writing and communication skills',
        'Understanding of data analytics market and competitive landscape',
        'Ability to translate technical features into customer benefits'
      ]
    },
    {
      title: 'Senior Data Scientist',
      department: 'Data Science',
      location: 'Remote',
      type: 'Full-time',
      description: 'We\'re seeking an experienced data scientist to develop advanced analytics and machine learning models for our platform. You\'ll work on predictive analytics, anomaly detection, and other AI-powered features.',
      requirements: [
        'Minimum 4+ years of experience in data science or machine learning',
        'Strong background in statistics and machine learning algorithms',
        'Experience with Python and data science libraries (pandas, scikit-learn, etc.)',
        'Knowledge of time series analysis and predictive modeling',
        'Experience deploying ML models to production'
      ]
    }
  ];

  const benefits = [
    {
      icon: MapPin,
      title: 'Remote-First',
      description: 'Work from anywhere in the world. We believe in hiring the best talent, regardless of location.'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'We focus on results, not hours. Work when you\'re most productive.'
    },
    {
      icon: Star,
      title: 'Competitive Compensation',
      description: 'We offer competitive salaries, equity options, and performance bonuses.'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness stipend to keep you at your best.'
    },
    {
      icon: Coffee,
      title: 'Learning Budget',
      description: 'Annual budget for courses, books, conferences, and other learning opportunities.'
    },
    {
      icon: Users,
      title: 'Inclusive Culture',
      description: 'We're building a diverse team where everyone feels welcome and valued.'
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
            Join Our
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Team</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Help us build the future of data analytics. We're looking for passionate, talented 
            individuals to join our growing team.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="#open-positions"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all text-lg font-bold"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </section>

      {/* Our Culture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Culture
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              At VizMind, we're building a culture based on innovation, collaboration, and impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What We Value
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Innovation</h4>
                    <p className="text-gray-600 dark:text-gray-400">We're constantly pushing the boundaries of what's possible in data analytics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">User-Centric</h4>
                    <p className="text-gray-600 dark:text-gray-400">We build for our users, focusing on making complex analytics simple and accessible.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Privacy-First</h4>
                    <p className="text-gray-600 dark:text-gray-400">We believe in protecting user data and privacy in everything we build.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Collaboration</h4>
                    <p className="text-gray-600 dark:text-gray-400">We work together across disciplines to solve complex problems.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How We Work
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Remote-First</h4>
                    <p className="text-gray-600 dark:text-gray-400">We're a fully distributed team working across different time zones.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Agile & Flexible</h4>
                    <p className="text-gray-600 dark:text-gray-400">We use agile methodologies but adapt them to fit our team's needs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Autonomous & Accountable</h4>
                    <p className="text-gray-600 dark:text-gray-400">We trust our team members to make decisions and own their work.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mt-1 mr-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Continuous Learning</h4>
                    <p className="text-gray-600 dark:text-gray-400">We encourage growth and provide resources for professional development.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Benefits & Perks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We believe in taking care of our team and providing the support you need to do your best work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
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
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join our team and help build the future of data analytics. We're looking for talented 
              individuals who are passionate about what they do.
            </p>
          </div>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                          <Briefcase className="w-3 h-3 mr-1" />
                          {position.department}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                          <MapPin className="w-3 h-3 mr-1" />
                          {position.location}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                          <Clock className="w-3 h-3 mr-1" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`mailto:sathyaedu119@gmail.com?subject=Job Application: ${position.title}`}
                      className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {position.description}
                  </p>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Requirements:</h4>
                    <ul className="space-y-2">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></div>
                          <span className="text-gray-600 dark:text-gray-400">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Application Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We've designed a straightforward process to help us find the right candidates while respecting your time.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
              
              {[
                { step: 1, title: 'Application', description: 'Send your resume and a brief cover letter to sathyaedu119@gmail.com with the position title in the subject line.' },
                { step: 2, title: 'Initial Review', description: 'Our team will review your application and get back to you within 1 week.' },
                { step: 3, title: 'First Interview', description: 'A 30-45 minute video call to discuss your experience and the role.' },
                { step: 4, title: 'Technical Assessment', description: 'A take-home assignment or technical interview relevant to the position.' },
                { step: 5, title: 'Final Interview', description: 'A more in-depth conversation with the team you\'ll be working with.' },
                { step: 6, title: 'Offer', description: 'If there\'s a good fit, we\'ll extend an offer and welcome you to the team!' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start mb-12"
                >
                  <div className="absolute left-8 top-0 -ml-8 mt-1.5 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="ml-24">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We're looking for passionate individuals who want to make an impact. 
              If you don't see a position that matches your skills, feel free to send us your resume anyway!
            </p>
            <a
              href="mailto:sathyaedu119@gmail.com?subject=General Application"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all text-lg font-medium"
            >
              <Mail className="w-5 h-5 mr-2" />
              Send Your Application
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};