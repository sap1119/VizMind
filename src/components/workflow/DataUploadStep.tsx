import React from 'react';
import { useData } from '../../contexts/DataContext';
import { FileUpload } from '../FileUpload';
import { DataVisualization } from '../DataVisualization';
import { DataTable } from '../DataTable';
import { AIQuestionInput } from '../AIQuestionInput';
import { ArrowRight, CheckCircle, Database, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DataUploadStep: React.FC = () => {
  const { parsedData, chartConfig, uploadData, isLoading, error, setCurrentStep } = useData();
  const navigate = useNavigate();

  const handleContinue = () => {
    setCurrentStep(2);
    navigate('/dashboard');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Step 1: Data Upload</h1>
          <p className="text-gray-600">Upload your CSV file to begin the analytics workflow</p>
        </div>
        
        {parsedData && (
          <button
            onClick={handleContinue}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {!parsedData ? (
        /* Upload State */
        <div className="space-y-8">
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <Database className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Your Data to Get Started
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Upload a CSV file to begin your complete analytics journey. We'll automatically generate 
              dashboards, KPIs, portfolio analysis, trend predictions, and a comprehensive report.
            </p>
          </div>

          <FileUpload 
            onFileUpload={uploadData}
            isLoading={isLoading}
            error={error}
          />
        </div>
      ) : (
        /* Data Loaded State */
        <div className="space-y-8">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-semibold text-green-900">Data Successfully Uploaded!</h3>
                <p className="text-green-700">
                  {parsedData.summary.totalRows} rows and {parsedData.summary.totalColumns} columns loaded. 
                  Ready to proceed to dashboard creation.
                </p>
              </div>
            </div>
          </div>

          {/* Data Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Rows</p>
                  <p className="text-xl font-bold text-gray-900">{parsedData.summary.totalRows}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Columns</p>
                  <p className="text-xl font-bold text-gray-900">{parsedData.summary.totalColumns}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Numeric Columns</p>
                  <p className="text-xl font-bold text-gray-900">
                    {Object.values(parsedData.summary.columnTypes).filter(t => t === 'number').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-xl font-bold text-gray-900">
                    {Object.values(parsedData.summary.columnTypes).filter(t => t === 'string').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              {chartConfig && (
                <DataVisualization 
                  data={parsedData} 
                  chartConfig={chartConfig}
                />
              )}
              
              <DataTable data={parsedData} />
            </div>

            <div className="xl:col-span-1">
              <AIQuestionInput data={parsedData} />
            </div>
          </div>

          {/* Next Step CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Ready for Dashboard Creation?</h3>
                <p className="text-gray-600">
                  Your data is loaded and analyzed. Continue to automatically generate interactive dashboards.
                </p>
              </div>
              <button
                onClick={handleContinue}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <span>Create Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};