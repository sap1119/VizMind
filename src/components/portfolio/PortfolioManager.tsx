import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Asset {
  symbol: string;
  name: string;
  quantity: number;
  price: number;
  value: number;
  allocation: number;
  change: number;
  changePercent: number;
}

interface Portfolio {
  id: string;
  name: string;
  description: string;
  total_value: number;
  performance: number;
  risk_score: number;
  assets: Asset[];
  created_at: string;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

export const PortfolioManager: React.FC = () => {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadPortfolios();
    }
  }, [user]);

  const loadPortfolios = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading portfolios:', error);
        setError('Failed to load portfolios');
        toast.error('Failed to load portfolios');
      } else {
        setPortfolios(data || []);
        if (data && data.length > 0 && !selectedPortfolio) {
          setSelectedPortfolio(data[0]);
        }
      }
    } catch (err) {
      console.error('Unexpected error loading portfolios:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createSamplePortfolio = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const sampleAssets: Asset[] = [
        {
          symbol: 'AAPL',
          name: 'Apple Inc.',
          quantity: 50,
          price: 175.50,
          value: 8775,
          allocation: 35.1,
          change: 125.50,
          changePercent: 1.45
        },
        {
          symbol: 'GOOGL',
          name: 'Alphabet Inc.',
          quantity: 20,
          price: 142.80,
          value: 2856,
          allocation: 11.4,
          change: -45.20,
          changePercent: -1.55
        },
        {
          symbol: 'MSFT',
          name: 'Microsoft Corp.',
          quantity: 30,
          price: 378.85,
          value: 11365.50,
          allocation: 45.5,
          change: 234.15,
          changePercent: 2.10
        },
        {
          symbol: 'TSLA',
          name: 'Tesla Inc.',
          quantity: 10,
          price: 201.25,
          value: 2012.50,
          allocation: 8.0,
          change: -89.75,
          changePercent: -4.25
        }
      ];

      const totalValue = sampleAssets.reduce((sum, asset) => sum + asset.value, 0);
      const performance = sampleAssets.reduce((sum, asset) => sum + asset.change, 0);

      const portfolioData = {
        user_id: user.id,
        name: 'Tech Growth Portfolio',
        description: 'A diversified portfolio focused on technology growth stocks',
        total_value: totalValue,
        performance: (performance / totalValue) * 100,
        risk_score: 7.2,
        assets: sampleAssets,
      };

      const { data, error } = await supabase
        .from('portfolios')
        .insert(portfolioData)
        .select()
        .single();

      if (error) {
        console.error('Error creating portfolio:', error);
        toast.error('Failed to create portfolio');
      } else {
        toast.success('Sample portfolio created!');
        setPortfolios([data, ...portfolios]);
        setSelectedPortfolio(data);
      }
    } catch (err) {
      console.error('Unexpected error creating portfolio:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
    setShowCreateModal(false);
  };

  const deletePortfolio = async (portfolioId: string) => {
    if (!confirm('Are you sure you want to delete this portfolio?')) return;

    try {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', portfolioId);

      if (error) {
        toast.error('Failed to delete portfolio');
      } else {
        toast.success('Portfolio deleted successfully');
        const updatedPortfolios = portfolios.filter(p => p.id !== portfolioId);
        setPortfolios(updatedPortfolios);
        if (selectedPortfolio?.id === portfolioId) {
          setSelectedPortfolio(updatedPortfolios[0] || null);
        }
      }
    } catch (err) {
      console.error('Error deleting portfolio:', err);
      toast.error('Failed to delete portfolio');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolios...</p>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Portfolios</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={loadPortfolios}
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
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Management</h2>
          <p className="text-gray-600">Track and analyze your investment portfolios</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Portfolio</span>
        </button>
      </div>

      {portfolios.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Portfolios Yet</h3>
          <p className="text-gray-600 mb-6">Create your first portfolio to start tracking investments</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Create Your First Portfolio
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Portfolio List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Your Portfolios</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {portfolios.map((portfolio) => (
                  <motion.div
                    key={portfolio.id}
                    whileHover={{ backgroundColor: '#F9FAFB' }}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedPortfolio?.id === portfolio.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedPortfolio(portfolio)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{portfolio.name}</h4>
                        <p className="text-sm text-gray-600">${portfolio.total_value.toLocaleString()}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {portfolio.performance >= 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500" />
                          )}
                          <span className={`text-xs ${
                            portfolio.performance >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {portfolio.performance >= 0 ? '+' : ''}{portfolio.performance.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePortfolio(portfolio.id);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Details */}
          {selectedPortfolio && (
            <div className="lg:col-span-3 space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Value</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${selectedPortfolio.total_value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedPortfolio.performance >= 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {selectedPortfolio.performance >= 0 ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Performance</p>
                      <p className={`text-xl font-bold ${
                        selectedPortfolio.performance >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {selectedPortfolio.performance >= 0 ? '+' : ''}{selectedPortfolio.performance.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Target className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Risk Score</p>
                      <p className="text-xl font-bold text-gray-900">
                        {selectedPortfolio.risk_score}/10
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
                      <p className="text-sm text-gray-600">Assets</p>
                      <p className="text-xl font-bold text-gray-900">
                        {selectedPortfolio.assets.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Allocation Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={selectedPortfolio.assets}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="allocation"
                        label={({ symbol, allocation }) => `${symbol} ${allocation.toFixed(1)}%`}
                      >
                        {selectedPortfolio.assets.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Performance Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={selectedPortfolio.assets}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="symbol" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="changePercent" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Assets Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Holdings</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Asset
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Change
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Allocation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedPortfolio.assets.map((asset, index) => (
                        <tr key={asset.symbol} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{asset.symbol}</div>
                              <div className="text-sm text-gray-500">{asset.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {asset.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${asset.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${asset.value.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`flex items-center space-x-1 ${
                              asset.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {asset.changePercent >= 0 ? (
                                <TrendingUp className="w-4 h-4" />
                              ) : (
                                <TrendingDown className="w-4 h-4" />
                              )}
                              <span className="text-sm font-medium">
                                {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${asset.allocation}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-900">{asset.allocation.toFixed(1)}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Portfolio Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Portfolio</h3>
            <p className="text-gray-600 mb-6">
              For this demo, we'll create a sample tech portfolio with real-time data simulation.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createSamplePortfolio}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Sample Portfolio'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};