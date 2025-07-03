import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { ArrowLeft, FileText, Download, CheckCircle, BarChart3, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AnalyticsReportStep: React.FC = () => {
  const { 
    parsedData, 
    reportData, 
    generateReport, 
    downloadReport,
    isLoading, 
    setCurrentStep,
    markStepComplete,
    completedSteps,
    dashboardData,
    kpiData,
    portfolioData,
    trendData
  } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (parsedData && !reportData) {
      generateReport();
    }
    
    // Mark step as complete if we have report data
    if (reportData) {
      markStepComplete(6);
    }
  }, [parsedData, reportData, generateReport, markStepComplete]);

  const handleBack = () => {
    setCurrentStep(5);
    navigate('/trends');
  };

  const handleDownload = () => {
    downloadReport();
  };

  if (!parsedData) {
    return (
      <div className="p-6">
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600 mb-6">Please complete the workflow to generate a report</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Start Workflow
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Step 6: Complete Analytics Report</h1>
          <p className="text-gray-600">Comprehensive insights and downloadable report</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          {reportData && (
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Generating comprehensive report...</p>
          </div>
        </div>
      ) : reportData ? (
        <div className="space-y-8">
          {/* Workflow Completion Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h2 className="text-lg font-semibold text-green-900">Analytics Workflow Complete!</h2>
            </div>
            <p className="text-green-700 mb-4">
              All {completedSteps.length} steps completed successfully. Your comprehensive analytics report is ready.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[
                { step: 1, name: 'Data Upload', completed: completedSteps.includes(1) },
                { step: 2, name: 'Dashboard', completed: completedSteps.includes(2) },
                { step: 3, name: 'KPIs', completed: completedSteps.includes(3) },
                { step: 4, name: 'Portfolio', completed: completedSteps.includes(4) },
                { step: 5, name: 'Trends', completed: completedSteps.includes(5) },
                { step: 6, name: 'Report', completed: completedSteps.includes(6) },
              ].map((item) => (
                <div key={item.step} className="flex items-center space-x-2">
                  <CheckCircle className={`w-4 h-4 ${item.completed ? 'text-green-500' : 'text-gray-300'}`} />
                  <span className={`text-sm ${item.completed ? 'text-green-700' : 'text-gray-500'}`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Report Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{reportData.title}</h2>
                <p className="text-gray-600">Generated on {new Date(reportData.generatedAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Data Points</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{reportData.summary.dataPoints}</p>
                <p className="text-sm text-blue-700">Records analyzed</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-900">KPIs</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">{kpiData.length}</p>
                <p className="text-sm text-purple-700">Performance indicators</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-900">Portfolio</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{portfolioData?.assets?.length || 0}</p>
                <p className="text-sm text-green-700">Components</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-900">Predictions</span>
                </div>
                <p className="text-2xl font-bold text-orange-900">{trendData?.data?.filter((d: any) => d.predicted)?.length || 0}</p>
                <p className="text-sm text-orange-700">Future points</p>
              </div>
            </div>

            {/* Report Sections */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Report Sections</h3>
              
              {reportData.sections.map((section: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-medium text-gray-900 mb-2">{section.title}</h4>
                  <p className="text-gray-600 text-sm">{section.content}</p>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportData.recommendations.map((recommendation: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Download Complete Report</h3>
                <p className="text-gray-600">
                  Get your comprehensive analytics report in Markdown format with all insights, recommendations, and data summaries.
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>

          {/* Workflow Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Data Upload & Analysis</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Dashboard Creation</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">KPI Tracking Setup</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Portfolio Analysis</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Trend Analysis & Predictions</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">Comprehensive Report</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Generation Failed</h3>
          <p className="text-gray-600 mb-6">Unable to generate report from current data</p>
          <button
            onClick={generateReport}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};