import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { ArrowRight, ArrowLeft, TrendingUp, AlertTriangle, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';

export const TrendAnalysisStep: React.FC = () => {
  const { 
    parsedData, 
    trendData, 
    generateTrends, 
    isLoading, 
    setCurrentStep,
    markStepComplete,
    completedSteps 
  } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (parsedData && !trendData) {
      generateTrends();
    }
    
    // Mark step as complete if we have trend data
    if (trendData) {
      markStepComplete(5);
    }
  }, [parsedData, trendData, generateTrends, markStepComplete]);

  const handleContinue = () => {
    setCurrentStep(6);
    navigate('/report');
  };

  const handleBack = () => {
    setCurrentStep(4);
    navigate('/portfolio');
  };

  if (!parsedData) {
    return (
      <div className="p-6">
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600 mb-6">Please upload data first to perform trend analysis</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Go to Data Upload
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
          <h1 className="text-2xl font-bold text-gray-900">Step 5: Trend Analysis & Predictions</h1>
          <p className="text-gray-600">Advanced analytics with anomaly detection and forecasting</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          {completedSteps.includes(5) && (
            <button
              onClick={handleContinue}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <span>Generate Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing trends and generating predictions...</p>
          </div>
        </div>
      ) : trendData ? (
        <div className="space-y-8">
          {/* Trend Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data Points</p>
                  <p className="text-xl font-bold text-gray-900">
                    {trendData.data.filter((d: any) => !d.predicted).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Predictions</p>
                  <p className="text-xl font-bold text-gray-900">
                    {trendData.data.filter((d: any) => d.predicted).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Anomalies</p>
                  <p className="text-xl font-bold text-gray-900">
                    {trendData.anomalies}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trend Direction</p>
                  <p className="text-xl font-bold text-gray-900">
                    {trendData.data[trendData.data.length - 6]?.value > trendData.data[0]?.value ? 'Upward' : 'Downward'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Trend Analysis with Predictions</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Historical Data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-600">Predictions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Anomalies</span>
                </div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={trendData.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="period" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="url(#trendGradient)"
                  strokeWidth={2}
                  dot={(props: any) => {
                    if (props.payload.anomaly) {
                      return <circle cx={props.cx} cy={props.cy} r={4} fill="#EF4444" stroke="#fff" strokeWidth={2} />;
                    }
                    if (props.payload.predicted) {
                      return <circle cx={props.cx} cy={props.cy} r={3} fill="#8B5CF6" stroke="#fff" strokeWidth={1} />;
                    }
                    return null;
                  }}
                />
                
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Analysis Summary</h4>
                <ul className="space-y-2">
                  {trendData.insights.map((insight: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 text-sm">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 text-sm">Monitor anomalies for potential data quality issues</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 text-sm">Use predictions for strategic planning and forecasting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 text-sm">Consider seasonal patterns in future analysis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 text-sm">Implement automated alerts for significant changes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Next Step CTA */}
          {completedSteps.includes(5) && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Trend Analysis Complete!</h3>
                  <p className="text-gray-600">
                    Predictions generated with {trendData.anomalies} anomalies detected. Ready to generate your comprehensive report.
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <span>Create Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Trend Analysis Failed</h3>
          <p className="text-gray-600 mb-6">Unable to generate trend analysis from current data</p>
          <button
            onClick={generateTrends}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};