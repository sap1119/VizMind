import React, { useEffect } from 'react';
import { useData } from '../../contexts/DataContext';
import { ArrowRight, ArrowLeft, LayoutDashboard, BarChart3, PieChart, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Pie, Cell, LineChart as RechartsLineChart, Line } from 'recharts';


const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

export const DashboardStep: React.FC = () => {
  const { 
    parsedData, 
    dashboardData, 
    generateDashboard, 
    isLoading, 
    setCurrentStep,
    markStepComplete,
    completedSteps,
    updateDashboard
  } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (parsedData && !dashboardData) {
      generateDashboard();
    }
  }, [parsedData, dashboardData, generateDashboard]);

  const handleContinue = () => {
    markStepComplete(2);
    setCurrentStep(3);
    navigate('/kpi');
  };

  const handleBack = () => {
    setCurrentStep(1);
    navigate('/');
  };

  const handleDashboardUpdate = (updatedDashboard: any) => {
    updateDashboard(updatedDashboard);
  };

  if (!parsedData) {
    return (
      <div className="p-6">
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <LayoutDashboard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600 mb-6">Please upload data first to create dashboards</p>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Go to Data Upload
          </button>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = React.useMemo(() => {
    if (!parsedData) return [];
    
    const numericColumns = parsedData.headers.filter(h => 
      parsedData.summary.columnTypes[h] === 'number'
    );
    const stringColumns = parsedData.headers.filter(h => 
      parsedData.summary.columnTypes[h] === 'string'
    );
    
    if (stringColumns.length > 0 && numericColumns.length > 0) {
      const categoryCol = stringColumns[0];
      const valueCol = numericColumns[0];
      
      const grouped = parsedData.rows.reduce((acc, row) => {
        const key = String(row[categoryCol] || 'Unknown');
        const value = Number(row[valueCol]) || 0;
        
        if (!acc[key]) {
          acc[key] = { name: key, value: 0, count: 0 };
        }
        acc[key].value += value;
        acc[key].count += 1;
        
        return acc;
      }, {} as Record<string, any>);
      
      return Object.values(grouped).slice(0, 8);
    }
    
    return [];
  }, [parsedData]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Step 2: Dashboard Creation</h1>
          <p className="text-gray-600">Auto-generated interactive dashboards from your data</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          {dashboardData && (
            <button
              onClick={handleContinue}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <span>Continue to KPIs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Generating dashboard...</p>
          </div>
        </div>
      ) : dashboardData ? (
        <div className="space-y-8">
          {/* Dashboard Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Auto-Generated Dashboard</h2>
                <p className="text-gray-600">Interactive visualizations based on your data structure</p>
              </div>
            </div>

            {/* Dashboard Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart Widget */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium text-gray-900">Data Distribution</h3>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#8B5CF6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart Widget */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  <h3 className="font-medium text-gray-900">Composition Analysis</h3>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={chartData.slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {chartData.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              {/* Line Chart Widget */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <LineChart className="w-5 h-5 text-green-600" />
                  <h3 className="font-medium text-gray-900">Trend Overview</h3>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsLineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>

              {/* Summary Widget */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-orange-600" />
                  <h3 className="font-medium text-gray-900">Data Summary</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Records</span>
                    <span className="font-semibold text-gray-900">{parsedData.summary.totalRows}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Data Columns</span>
                    <span className="font-semibold text-gray-900">{parsedData.summary.totalColumns}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Numeric Fields</span>
                    <span className="font-semibold text-gray-900">
                      {Object.values(parsedData.summary.columnTypes).filter(t => t === 'number').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Categories</span>
                    <span className="font-semibold text-gray-900">
                      {Object.values(parsedData.summary.columnTypes).filter(t => t === 'string').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interactive Charts</h3>
              <p className="text-gray-600 text-sm">
                Multiple chart types automatically selected based on your data structure and relationships.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <LayoutDashboard className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Layout</h3>
              <p className="text-gray-600 text-sm">
                Responsive dashboard layout optimized for data exploration and insights discovery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data Insights</h3>
              <p className="text-gray-600 text-sm">
                Automatic pattern detection and statistical summaries to highlight key findings.
              </p>
            </div>
          </div>

          {/* Next Step CTA */}
          {dashboardData && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dashboard Created Successfully!</h3>
                  <p className="text-gray-600">
                    Your interactive dashboard is ready. Continue to define KPIs and performance metrics.
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <span>Create KPIs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <LayoutDashboard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Dashboard Generation Failed</h3>
          <p className="text-gray-600 mb-6">Unable to generate dashboard from current data</p>
          <button
            onClick={generateDashboard}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
