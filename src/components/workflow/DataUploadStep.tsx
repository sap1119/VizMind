import React from 'react';
import { useData } from '../../contexts/DataContext';
import { FileUpload } from '../FileUpload';
import { DataVisualization } from '../DataVisualization';
import { DataTable } from '../DataTable';
import { AIQuestionInput } from '../AIQuestionInput';
import { ArrowRight, CheckCircle, Database, Sparkles, FileText, BarChart3, PieChart, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const DataUploadStep: React.FC = () => {
  const { parsedData, chartConfig, uploadData, isLoading, error, setCurrentStep, markStepComplete } = useData();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (parsedData) {
      markStepComplete(1);
      setCurrentStep(2);
      navigate('/dashboard/view');
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header with enhanced styling */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-1 h-8 rounded-full mr-3"></span>
            Step 1: Data Upload
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Upload your CSV file to begin the analytics workflow
          </p>
        </div>
        
        {parsedData && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {!parsedData ? (
        /* Enhanced Upload State */
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border border-blue-100 dark:border-blue-800"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Database className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Upload Your Data to Get Started
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              Upload a CSV file to begin your complete analytics journey. We'll automatically generate 
              dashboards, KPIs, portfolio analysis, trend predictions, and a comprehensive report.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { icon: BarChart3, text: 'Interactive Dashboards' },
                { icon: PieChart, text: 'Visual Analytics' },
                { icon: LineChart, text: 'Trend Analysis' },
                { icon: FileText, text: 'Comprehensive Reports' }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
                    <Icon className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FileUpload 
              onFileUpload={uploadData}
              isLoading={isLoading}
              error={error}
            />
          </motion.div>
        </div>
      ) : (
        /* Enhanced Data Loaded State */
        <div className="space-y-8">
          {/* Success Message with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200 dark:border-green-800 rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900 dark:text-green-300 mb-1">Data Successfully Uploaded!</h3>
                <p className="text-green-700 dark:text-green-400 font-medium">
                  {parsedData.summary.totalRows} rows and {parsedData.summary.totalColumns} columns loaded. 
                  Ready to proceed to dashboard creation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Data Overview Cards with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Rows</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{parsedData.summary.totalRows}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Columns</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{parsedData.summary.totalColumns}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-md">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Numeric Columns</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Object.values(parsedData.summary.columnTypes).filter(t => t === 'number').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-md">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Categories</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Object.values(parsedData.summary.columnTypes).filter(t => t === 'string').length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Data Analysis with enhanced styling */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="xl:col-span-2 space-y-8"
            >
              {chartConfig && (
                <div className="transform hover:scale-[1.01] transition-transform">
                  <DataVisualization 
                    data={parsedData} 
                    chartConfig={chartConfig}
                  />
                </div>
              )}
              
              <div className="transform hover:scale-[1.01] transition-transform">
                <DataTable data={parsedData} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="xl:col-span-1"
            >
              <div className="transform hover:scale-[1.01] transition-transform">
                <AIQuestionInput data={parsedData} />
              </div>
            </motion.div>
          </div>

          {/* Next Step CTA with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Sparkles className="w-5 h-5 text-blue-500 mr-2" />
                  Ready for Dashboard Creation?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Your data is loaded and analyzed. Continue to automatically generate interactive dashboards.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all text-lg font-bold"
              >
                <span>Create Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};