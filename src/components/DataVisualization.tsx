import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, Legend } from 'recharts';
import { ParsedData, ChartConfig } from '../types';
import { TrendingUp, BarChart2, PieChart as PieChartIcon, LineChart as LineChartIcon, Settings, Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface DataVisualizationProps {
  data: ParsedData;
  chartConfig: ChartConfig;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899', '#14B8A6'];

export const DataVisualization: React.FC<DataVisualizationProps> = ({ data, chartConfig: initialConfig }) => {
  const [chartConfig, setChartConfig] = useState(initialConfig);
  const [showSettings, setShowSettings] = useState(false);
  const { rows, headers } = data;
  const { type, xAxis, yAxis, title } = chartConfig;

  // Get available columns by type
  const numericColumns = headers.filter(h => data.summary.columnTypes[h] === 'number');
  const categoricalColumns = headers.filter(h => data.summary.columnTypes[h] === 'string' || data.summary.columnTypes[h] === 'date');

  // Prepare chart data
  const chartData = React.useMemo(() => {
    if (!xAxis || !yAxis) return [];

    // Group and aggregate data
    const grouped = rows.reduce((acc, row) => {
      const key = String(row[xAxis] || 'Unknown');
      const value = Number(row[yAxis]) || 0;
      
      if (!acc[key]) {
        acc[key] = { name: key, value: 0, count: 0 };
      }
      acc[key].value += value;
      acc[key].count += 1;
      
      return acc;
    }, {} as Record<string, { name: string; value: number; count: number }>);

    return Object.values(grouped)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10); // Show top 10 items
  }, [rows, xAxis, yAxis]);

  const handleChartTypeChange = (newType: 'bar' | 'line' | 'pie' | 'area') => {
    setChartConfig({
      ...chartConfig,
      type: newType
    });
  };

  const handleAxisChange = (axis: 'xAxis' | 'yAxis', value: string) => {
    setChartConfig({
      ...chartConfig,
      [axis]: value
    });
  };

  // Export chart as image
  const exportChart = () => {
    const svgElement = document.querySelector('.recharts-wrapper svg');
    if (!svgElement) return;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `${title.replace(/\s+/g, '_')}_chart.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="url(#barGradient)"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2563EB' }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="name" 
                stroke="#6B7280" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280" 
                fontSize={12}
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
                fill="url(#areaGradient)"
                strokeWidth={2}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData.slice(0, 8)}
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={true}
                animationDuration={1500}
              >
                {chartData.slice(0, 8).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Chart type not supported</div>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Showing {chartData.length} data points
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => handleChartTypeChange('bar')}
                className={`p-2 rounded-lg transition-colors ${
                  type === 'bar' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Bar Chart"
              >
                <BarChart2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleChartTypeChange('line')}
                className={`p-2 rounded-lg transition-colors ${
                  type === 'line' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Line Chart"
              >
                <LineChartIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleChartTypeChange('area')}
                className={`p-2 rounded-lg transition-colors ${
                  type === 'area' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Area Chart"
              >
                <TrendingUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleChartTypeChange('pie')}
                className={`p-2 rounded-lg transition-colors ${
                  type === 'pie' 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Pie Chart"
              >
                <PieChartIcon className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Chart Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <button
              onClick={exportChart}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Export Chart"
            >
              <Download className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setChartConfig(initialConfig)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Reset Chart"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Chart Settings Panel */}
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  X-Axis (Category)
                </label>
                <select
                  value={xAxis || ''}
                  onChange={(e) => handleAxisChange('xAxis', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select column</option>
                  {categoricalColumns.map(column => (
                    <option key={column} value={column}>{column}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Y-Axis (Value)
                </label>
                <select
                  value={yAxis || ''}
                  onChange={(e) => handleAxisChange('yAxis', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select column</option>
                  {numericColumns.map(column => (
                    <option key={column} value={column}>{column}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="p-6">
        {chartData.length > 0 ? (
          <div className="chart-container">
            {renderChart()}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <RefreshCw className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">No data available for visualization</p>
            <p className="text-sm">Try selecting different columns or adjusting your filters</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};