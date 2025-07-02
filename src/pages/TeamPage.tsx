import React from 'react';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const TeamPage: React.FC = () => {
  const leadership = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former VP of Analytics at Google. 15+ years in data science and product leadership. PhD in Computer Science from Stanford.',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@vizmind.com'
      }
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Principal Engineer at Microsoft Azure. Expert in distributed systems and machine learning infrastructure. MS from MIT.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      social: {
        linkedin: '#',
        github: '#',
        email: 'michael@vizmind.com'
      }
    },
    {
      name: 'Emily Johnson',
      role: 'VP of Product',
      bio: 'Former Product Lead at Tableau. Passionate about making complex data accessible to everyone. MBA from Wharton.',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emily@vizmind.com'
      }
    },
    {
      name: 'David Kim',
      role: 'VP of Engineering',
      bio: 'Previously Senior Engineering Manager at Airbnb. Specializes in scalable data platforms and real-time analytics.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      social: {
        linkedin: '#',
        github: '#',
        email: 'david@vizmind.com'
      }
    }
  ];

  const team = [
    {
      name: 'Alex Thompson',
      role: 'Senior Data Scientist',
      department: 'Engineering',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Lisa Wang',
      role: 'Lead UX Designer',
      department: 'Design',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'James Wilson',
      role: 'Senior Frontend Engineer',
      department: 'Engineering',
      image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Maria Garcia',
      role: 'Product Marketing Manager',
      department: 'Marketing',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Ryan Park',
      role: 'DevOps Engineer',
      department: 'Engineering',
      image: 'https://images.pexels.com/photos/2379003/pexels-photo-2379003.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Sophie Brown',
      role: 'Customer Success Manager',
      department: 'Customer Success',
      image: 'https://images.pexels.com/photos/3756680/pexels-photo-3756680.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Carlos Martinez',
      role: 'Backend Engineer',
      department: 'Engineering',
      image: 'https://images.pexels.com/photos/2182972/pexels-photo-2182972.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Anna Kowalski',
      role: 'Data Engineer',
      department: 'Engineering',
      image: 'https://images.pexels.com/photos/3785078/pexels-photo-3785078.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const departments = [
    {
      name: 'Engineering',
      description: 'Building the future of data analytics',
      count: 15,
      color: 'blue'
    },
    {
      name: 'Product',
      description: 'Designing user-centric experiences',
      count: 8,
      color: 'purple'
    },
    {
      name: 'Design',
      description: 'Creating beautiful, intuitive interfaces',
      count: 5,
      color: 'green'
    },
    {
      name: 'Marketing',
      description: 'Spreading the word about VizMind',
      count: 6,
      color: 'orange'
    },
    {
      name: 'Customer Success',
      description: 'Ensuring customer satisfaction and growth',
      count: 4,
      color: 'red'
    },
    {
      name: 'Operations',
      description: 'Keeping everything running smoothly',
      count: 3,
      color: 'indigo'
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
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> VizMind Team</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            We're a diverse team of engineers, designers, and data scientists passionate about 
            making data analytics accessible to everyone.
          </motion.p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The visionaries leading VizMind's mission
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start space-x-6">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {leader.name}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                        {leader.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {leader.bio}
                      </p>
                      <div className="flex space-x-3">
                        {leader.social.linkedin && (
                          <a href={leader.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                        {leader.social.twitter && (
                          <a href={leader.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Twitter className="w-5 h-5" />
                          </a>
                        )}
                        {leader.social.github && (
                          <a href={leader.social.github} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
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

      {/* Departments */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Departments
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Diverse teams working together to build the future of analytics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-12 h-12 bg-${dept.color}-100 dark:bg-${dept.color}-900/20 rounded-lg flex items-center justify-center mb-4`}>
                  <span className={`text-${dept.color}-600 dark:text-${dept.color}-400 font-bold text-lg`}>
                    {dept.count}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {dept.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {dept.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Amazing Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The talented individuals making VizMind possible
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {member.department}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for 
              making data analytics accessible to everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/careers"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all text-lg font-medium"
              >
                View Open Positions
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