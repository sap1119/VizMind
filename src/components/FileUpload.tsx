import React, { useCallback } from 'react';
import { Upload, FileText, AlertCircle, FileUp, Database } from 'lucide-react';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading, error }) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      onFileUpload(csvFile);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  }, [onFileUpload]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`
          relative border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-105 shadow-xl' 
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md'
          }
          ${isLoading ? 'opacity-80 pointer-events-none' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
      >
        {isLoading ? (
          <div className="space-y-6">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
              <div className="absolute inset-3 rounded-full border-4 border-purple-500 border-b-transparent animate-spin animation-delay-500"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-semibold text-xl">Processing your data...</p>
            <p className="text-gray-500 dark:text-gray-400">This may take a moment depending on file size</p>
          </div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex justify-center">
                <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl">
                  <Upload className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Upload Your Data
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Drag and drop your CSV file here, or click to browse
                </p>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-full">
                  <FileText className="w-4 h-4" />
                  <span>Supports CSV files up to 10MB</span>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {['sales_data.csv', 'customer_data.csv', 'marketing_data.csv'].map((example, index) => (
                    <div key={index} className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                      <Database className="w-3 h-3" />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold mx-auto">
                  <FileUp className="w-5 h-5" />
                  <span>Select CSV File</span>
                </button>
              </motion.div>
            </motion.div>

            <input
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </>
        )}
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-3 shadow-md"
        >
          <div className="p-2 bg-red-100 dark:bg-red-800 rounded-full">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
        </motion.div>
      )}
    </div>
  );
};