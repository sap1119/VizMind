import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, TrendingDown, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface KPI {
  id: string;
  name: string;
  description: string;
  current_value: number;
  target_value: number;
  formula: string;
  trend: 'up' | 'down' | 'stable';
  category: string;
  created_at: string;
}

const KPI_CATEGORIES = [
  'Revenue', 'Growth', 'Efficiency', 'Quality', 'Customer', 'Financial'
];

export const KPITracker: React.FC = () => {
  const { user } = useAuth();
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingKpi, setEditingKpi] = useState<KPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadKPIs();
    }
  }, [user]);

  const loadKPIs = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('kpis')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading KPIs:', error);
        setError('Failed to load KPIs');
        toast.error('Failed to load KPIs');
      } else {
        setKpis(data || []);
      }
    } catch (err) {
      console.error('Unexpected error loading KPIs:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createSampleKPIs = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const sampleKPIs = [
        {
          user_id: user.id,
          dataset_id: 'sample',
          name: 'Monthly Revenue',
          description: 'Total monthly recurring revenue',
          formula: 'SUM(revenue)',
          current_value: 125000,
          target_value: 150000,
          trend: 'up' as const,
          category: 'Revenue'
        },
        {
          user_id: user.id,
          dataset_id: 'sample',
          name: 'Customer Acquisition Cost',
          description: 'Average cost to acquire a new customer',
          formula: 'marketing_spend / new_customers',
          current_value: 85,
          target_value: 75,
          trend: 'down' as const,
          category: 'Customer'
        },
        {
          user_id: user.id,
          dataset_id: 'sample',
          name: 'Conversion Rate',
          description: 'Percentage of visitors who convert',
          formula: '(conversions / visitors) * 100',
          current_value: 3.2,
          target_value: 4.0,
          trend: 'up' as const,
          category: 'Growth'
        },
        {
          user_id: user.id,
          dataset_id: 'sample',
          name: 'Customer Satisfaction',
          description: 'Average customer satisfaction score',
          formula: 'AVG(satisfaction_score)',
          current_value: 4.6,
          target_value: 4.8,
          trend: 'stable' as const,
          category: 'Quality'
        }
      ];

      const { error } = await supabase
        .from('kpis')
        .insert(sampleKPIs);

      if (error) {
        console.error('Error creating sample KPIs:', error);
        toast.error('Failed to create sample KPIs');
      } else {
        toast.success('Sample KPIs created successfully!');
        await loadKPIs();
      }
    } catch (err) {
      console.error('Unexpected error creating KPIs:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
    setShowCreateModal(false);
  };

  const deleteKPI = async (kpiId: string) => {
    if (!confirm('Are you sure you want to delete this KPI?')) return;

    try {
      const { error } = await supabase
        .from('kpis')
        .delete()
        .eq('id', kpiId);

      if (error) {
        toast.error('Failed to delete KPI');
      } else {
        toast.success('KPI deleted successfully');
        setKpis(kpis.filter(k => k.id !== kpiId));
      }
    } catch (err) {
      console.error('Error deleting KPI:', err);
      toast.error('Failed to delete KPI');
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (current: number, target: number, trend: string) => {
    const progress = (current / target) * 100;
    if (progress >= 90) return 'green';
    if (progress >= 70) return 'yellow';
    return 'red';
  };

  const filteredKPIs = selectedCategory === 'All' 
    ? kpis 
    : kpis.filter(kpi => kpi.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading KPIs...</p>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading KPIs</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={loadKPIs}
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
          <h2 className="text-2xl font-bold text-gray-900">KPI Tracker</h2>
          <p className="text-gray-600">Monitor and track your key performance indicators</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add KPI</span>
        </button>
      </div>

      {kpis.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No KPIs Yet</h3>
          <p className="text-gray-600 mb-6">Create your first KPI to start tracking performance</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Create Your First KPI
          </button>
        </div>
      ) : (
        <>
          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({kpis.length})
            </button>
            {KPI_CATEGORIES.map(category => {
              const count = kpis.filter(kpi => kpi.category === category).length;
              if (count === 0) return null;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKPIs.map((kpi) => {
              const progress = getProgressPercentage(kpi.current_value, kpi.target_value || 1);
              const statusColor = getStatusColor(kpi.current_value, kpi.target_value || 1, kpi.trend);
              
              return (
                <motion.div
                  key={kpi.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
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
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded mt-2">
                        {kpi.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => setEditingKpi(kpi)}
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteKPI(kpi.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {kpi.current_value.toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-1">
                        {kpi.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {kpi.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                        {kpi.trend === 'stable' && <div className="w-4 h-0.5 bg-gray-400"></div>}
                      </div>
                    </div>

                    {kpi.target_value && (
                      <>
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
                      </>
                    )}

                    <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                      Formula: {kpi.formula}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {/* Create KPI Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create KPI Tracker</h3>
            <p className="text-gray-600 mb-6">
              For this demo, we'll create sample KPIs with realistic business metrics.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createSampleKPIs}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Sample KPIs'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};