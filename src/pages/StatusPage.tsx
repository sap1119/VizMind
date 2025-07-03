import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Calendar, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const StatusPage: React.FC = () => {
  // Current date for the status page
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Current time
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  // System components with their status
  const systemComponents = [
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.98%',
      lastIncident: 'None'
    },
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.95%',
      lastIncident: 'None'
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.99%',
      lastIncident: 'None'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.97%',
      lastIncident: 'None'
    },
    {
      name: 'Analytics Engine',
      status: 'operational',
      uptime: '99.93%',
      lastIncident: 'None'
    },
    {
      name: 'File Storage',
      status: 'operational',
      uptime: '99.99%',
      lastIncident: 'None'
    }
  ];

  // Past incidents (empty for now as we're a new service)
  const pastIncidents: any[] = [];

  // Function to get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'operational':
        return { 
          icon: CheckCircle, 
          color: 'text-green-500', 
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          label: 'Operational'
        };
      case 'maintenance':
        return { 
          icon: Clock, 
          color: 'text-blue-500', 
          bgColor: 'bg-blue-100 dark:bg-blue-900/20',
          label: 'Maintenance'
        };
      case 'degraded':
        return { 
          icon: AlertTriangle, 
          color: 'text-yellow-500', 
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          label: 'Degraded'
        };
      case 'outage':
        return { 
          icon: AlertTriangle, 
          color: 'text-red-500', 
          bgColor: 'bg-red-100 dark:bg-red-900/20',
          label: 'Outage'
        };
      default:
        return { 
          icon: CheckCircle, 
          color: 'text-green-500', 
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          label: 'Operational'
        };
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            VizMind
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Status</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center space-x-2 mb-8"
          >
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <p className="text-xl font-medium text-gray-900 dark:text-white">
              All Systems Operational
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-400"
          >
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {currentDate}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {currentTime}
            </span>
            <button className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </button>
          </motion.div>
        </div>
      </section>

      {/* System Components */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            System Status
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
              <div className="col-span-4 font-medium text-gray-700 dark:text-gray-300">Component</div>
              <div className="col-span-3 font-medium text-gray-700 dark:text-gray-300">Status</div>
              <div className="col-span-2 font-medium text-gray-700 dark:text-gray-300">Uptime</div>
              <div className="col-span-3 font-medium text-gray-700 dark:text-gray-300">Last Incident</div>
            </div>
            
            {systemComponents.map((component, index) => {
              const { icon: Icon, color, bgColor, label } = getStatusInfo(component.status);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid grid-cols-12 p-4 border-b border-gray-200 dark:border-gray-700 items-center"
                >
                  <div className="col-span-4 font-medium text-gray-900 dark:text-white">
                    {component.name}
                  </div>
                  <div className="col-span-3">
                    <div className="flex items-center">
                      <div className={`p-1 ${bgColor} rounded-full mr-2`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    </div>
                  </div>
                  <div className="col-span-2 text-gray-700 dark:text-gray-300">
                    {component.uptime}
                  </div>
                  <div className="col-span-3 text-gray-700 dark:text-gray-300">
                    {component.lastIncident}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Uptime */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Uptime Last 90 Days
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  99.98%
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Overall uptime
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Operational</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Degraded</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Outage</span>
                </div>
              </div>
            </div>
            
            <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              {/* This would be a real uptime chart in production */}
              <div className="h-full bg-green-500" style={{ width: '99.98%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Incidents */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Past Incidents
          </h2>
          
          {pastIncidents.length > 0 ? (
            <div className="space-y-4">
              {pastIncidents.map((incident, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  {/* Incident details would go here */}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No Incidents Reported
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                There have been no incidents reported in the last 90 days.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Subscribe to Status Updates
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get notified when there are service disruptions or maintenance.
                </p>
              </div>
              
              <form className="flex gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};