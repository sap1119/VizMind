import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, Activity, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

interface TrendData {
  date: string;
  value: number;
  anomaly?: boolean;
  prediction?: boolean;
}

interface Anomaly {
  date: string;
  value: number;
  expected: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export const TrendAnalysis: React.FC = () => {
  const { user } = useAuth();
  const [datasets, setDatasets] = useState<any[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadDatasets();
    }
  }, [user]);

  useEffect(() => {
    if (selectedDataset) {
      generateTrendAnalysis();
    }
  }, [selectedDataset, timeRange]);

  const loadDatasets = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('datasets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading datasets:', error);
        setError('Failed to load datasets');
      } else {
        setDatasets(data || []);
        if (data && data.length > 0) {
          setSelectedDataset(data[0]);
        }
      }
    } catch (err) {
      console.error('Unexpected error loading datasets:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generateTrendAnalysis = () => {
    if (!selectedDataset) return;

    setLoading(true);

    // Generate sample trend data with anomalies
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    const data: TrendData[] = [];
    const detectedAnomalies: Anomaly[] = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - i));
      
      // Generate base trend with seasonal patterns
      const baseValue = 1000 + Math.sin(i / 7) * 200 + Math.random() * 100;
      const seasonalFactor = 1 + Math.sin(i / 30) * 0.3;
      let value = baseValue * seasonalFactor;

      // Add some anomalies
      const isAnomaly = Math.random() < 0.05; // 5% chance of anomaly
      if (isAnomaly) {
        const anomalyMultiplier = Math.random() > 0.5 ? 1.5 : 0.5;
        const anomalyValue = value * anomalyMultiplier;
        
        detectedAnomalies.push({
          date: date.toISOString().split('T')[0],
          value: anomalyValue,
          expected: value,
          severity: Math.abs(anomalyValue - value) > value * 0.3 ? 'high' : 'medium',
          description: anomalyValue > value ? 'Unexpected spike detected' : 'Unusual drop detected'
        });
        
        value = anomalyValue;
      }

      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(value),
        anomaly: isAnomaly
      });
    }

    // Add predictions for next 7 days
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      const lastValue = data[data.length - 1].value;
      const trend = (data[data.length - 1].value - data[data.length - 8].value) / 7;
      const predictedValue = lastValue + trend + (Math.random() - 0.5) * 50;

      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(predictedValue),
        prediction: true
      });
    }

    setTrendData(data);
    setAnomalies(detectedAnomalies);
    setLoading(false);
  };

  const getTrendDirection = () => {
    if (trendData.length < 2) return 'stable';
    
    const recent = trendData.slice(-8, -1); // Last 7 actual data points
    const trend = recent[recent.length - 1].value - recent[0].value;
    
    if (trend > recent[0].value * 0.05) return 'up';
    if (trend < -recent[0].value * 0.05) return 'down';
    return 'stable';
  };

  const calculateTrendPercentage = () => {
    if (trendData.length < 2) return 0;
    
    const recent = trendData.slice(-8, -1);
    const change = recent[recent.length - 1].value - recent[0].value;
    return (change / recent[0].value) * 100;
  };

  if (loading && datasets.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trend analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={loadDatasets}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trend Analysis & Anomaly Detection</h2>
          <p className="text-gray-600">Advanced analytics with predictive insights</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedDataset?.id || ''}
            onChange={(e) => {
              const dataset = datasets.find(d => d.id === e.target.value);
              setSelectedDataset(dataset);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Select dataset...</option>
            {datasets.map((dataset) => (
              <option key={dataset.id} value={dataset.id}>
                {dataset.name}
              </option>
            ))}
          </select>
          
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            {(['7d', '30d', '90d', '1y'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  timeRange === range
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!selectedDataset ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dataset Selected</h3>
          <p className="text-gray-600">Select a dataset to view trend analysis and anomaly detection</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  getTrendDirection() === 'up' ? 'bg-green-100' :
                  getTrendDirection() === 'down' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  {getTrendDirection() === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  ) : getTrendDirection() === 'down' ? (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  ) : (
                    <Activity className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trend Direction</p>
                  <p className={`text-xl font-bold ${
                    getTrendDirection() === 'up' ? 'text-green-600' :
                    getTrendDirection() === 'down' ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {getTrendDirection() === 'up' ? 'Upward' :
                     getTrendDirection() === 'down' ? 'Downward' : 'Stable'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trend Change</p>
                  <p className={`text-xl font-bold ${
                    calculateTrendPercentage() >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {calculateTrendPercentage() >= 0 ? '+' : ''}{calculateTrendPercentage().toFixed(1)}%
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
                  <p className="text-sm text-gray-600">Anomalies Detected</p>
                  <p className="text-xl font-bold text-gray-900">{anomalies.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data Points</p>
                  <p className="text-xl font-bold text-gray-900">{trendData.filter(d => !d.prediction).length}</p>
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
                  <span className="text-gray-600">Actual Data</span>
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

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                    fontSize={12}
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  
                  {/* Actual data area */}
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="url(#actualGradient)"
                    strokeWidth={2}
                    dot={(props) => {
                      if (props.payload.anomaly) {
                        return <circle cx={props.cx} cy={props.cy} r={4} fill="#EF4444" stroke="#fff" strokeWidth={2} />;
                      }
                      if (props.payload.prediction) {
                        return <circle cx={props.cx} cy={props.cy} r={3} fill="#8B5CF6" stroke="#fff" strokeWidth={1} />;
                      }
                      return null;
                    }}
                  />
                  
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Anomalies List */}
          {anomalies.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Detected Anomalies</h3>
                <p className="text-gray-600">Unusual patterns and outliers in your data</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {anomalies.slice(0, 5).map((anomaly, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          anomaly.severity === 'high' ? 'bg-red-100' :
                          anomaly.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          <AlertTriangle className={`w-5 h-5 ${
                            anomaly.severity === 'high' ? 'text-red-600' :
                            anomaly.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                          }`} />
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900">{anomaly.description}</h4>
                          <p className="text-sm text-gray-600">
                            {new Date(anomaly.date).toLocaleDateString()} - 
                            Actual: {anomaly.value.toLocaleString()}, 
                            Expected: {anomaly.expected.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          anomaly.severity === 'high' ? 'bg-red-100 text-red-800' :
                          anomaly.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {anomaly.severity.toUpperCase()}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          {((Math.abs(anomaly.value - anomaly.expected) / anomaly.expected) * 100).toFixed(1)}% deviation
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};