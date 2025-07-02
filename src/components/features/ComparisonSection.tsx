import React from 'react';

export const ComparisonSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose VizMind?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See how we compare to traditional analytics solutions
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
            <div className="p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traditional Tools</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>Complex setup process</li>
                <li>Limited visualization options</li>
                <li>Manual data analysis</li>
                <li>Expensive licensing</li>
                <li>Steep learning curve</li>
                <li>Data storage concerns</li>
              </ul>
            </div>
            
            <div className="p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">VizMind</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>✓ 5-minute setup</li>
                <li>✓ 50+ chart types</li>
                <li>✓ AI-powered insights</li>
                <li>✓ Transparent pricing</li>
                <li>✓ Intuitive interface</li>
                <li>✓ Zero data storage</li>
              </ul>
            </div>
            
            <div className="p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Spreadsheets</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>Manual chart creation</li>
                <li>No real-time updates</li>
                <li>Limited collaboration</li>
                <li>Error-prone formulas</li>
                <li>No predictive analytics</li>
                <li>Security vulnerabilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};