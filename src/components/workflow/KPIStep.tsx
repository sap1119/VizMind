import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { ArrowRight, ArrowLeft, Target, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const KPIStep: React.FC = () => {
  const { 
    parsedData, 
    kpiData, 
    generateKPIs, 
    isLoading, 
    setCurrentStep,
    completedSteps 
  } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (parsedData && kpiData.length === 0) {
      generateKPIs();
    }
  }, [parsedData, kpiData, generateKPIs]);

  const handleContinue = () => {
    setCurrentStep(4);
    navigate('/portfolio');
  };

  const handleBack = () => {
    setCurrentStep(2);
    navigate('/dashboard');
  };

  if (!parsedData) {
    return (
      <div className="p-6">
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600 mb-6">Please upload data first to create KPIs</p>
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

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (current: number, target: number) => {
    const progress = (current / target) * 100;
    if (progress >= 90) return 'green';
    if (progress >= 70) return 'yellow';
    return 'red';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Step 3: KPI Tracker</h1>
          <p className="text-gray-600">Auto-generated key performance indicators from your data</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          {completedSteps.includes(3) && (
            <button
              onClick={handleContinue}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <span>Continue to Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Generating KPIs...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* KPI Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Performance Indicators</h2>
                <p className="text-gray-600">Key metrics automatically derived from your data</p>
              </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kpiData.map((kpi, index) => {
                const progress = getProgressPercentage(kpi.current_value, kpi.target_value);
                const statusColor = getStatusColor(kpi.current_value, kpi.target_value);
                
                return (
                  <div key={kpi.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{kpi.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            statusColor === 'green' ? 'bg-green-100 text-green-800' :
                            statusColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {statusColor === 'green' ? 'On Track' :
                             statusColor === 'yellow' ? 'At Risk' : 'Behind'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{kpi.description}</p>
                        <span className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded mt-2">
                          {kpi.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {kpi.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {kpi.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                        {kpi.trend === 'stable' && <div className="w-4 h-0.5 bg-gray-400"></div>}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          {kpi.current_value.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Target: {kpi.target_value.toLocaleString()}</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            statusColor === 'green' ? 'bg-green-500' :
                            statusColor === 'yellow' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>

                      <div className="text-xs text-gray-500 bg-gray-200 p-2 rounded">
                        Formula: {kpi.formula}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KPI Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance Tracking</h3>
              <p className="text-gray-600 text-sm">
                {kpiData.filter(kpi => getStatusColor(kpi.current_value, kpi.target_value) === 'green').length} of {kpiData.length} KPIs are on track to meet their targets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Trend Analysis</h3>
              <p className="text-gray-600 text-sm">
                {kpiData.filter(kpi => kpi.trend === 'up').length} metrics showing positive trends, {kpiData.filter(kpi => kpi.trend === 'down').length} declining.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Auto-Generated</h3>
              <p className="text-gray-600 text-sm">
                KPIs automatically created from your data's numeric columns with intelligent target setting.
              </p>
            </div>
          </div>

          {/* Next Step CTA */}
          {completedSteps.includes(3) && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">KPIs Created Successfully!</h3>
                  <p className="text-gray-600">
                    Your performance indicators are tracking key metrics. Continue to portfolio analysis.
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <span>Analyze Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};