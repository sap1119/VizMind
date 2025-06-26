import React, { useState, useEffect } from 'react';
import { Plus, Grid, Edit, Trash2, Eye, Share, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { DashboardBuilder } from '../components/dashboard/DashboardBuilder';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Dashboard {
  id: string;
  name: string;
  description: string;
  widgets: any[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export const DashboardsPage: React.FC = () => {
  const { user } = useAuth();
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingDashboard, setEditingDashboard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadDashboards();
    }
  }, [user]);

  const loadDashboards = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('dashboards')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error loading dashboards:', error);
        setError('Failed to load dashboards');
        toast.error('Failed to load dashboards');
      } else {
        setDashboards(data || []);
      }
    } catch (err) {
      console.error('Unexpected error loading dashboards:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const deleteDashboard = async (dashboardId: string) => {
    if (!confirm('Are you sure you want to delete this dashboard?')) return;

    try {
      const { error } = await supabase
        .from('dashboards')
        .delete()
        .eq('id', dashboardId);

      if (error) {
        toast.error('Failed to delete dashboard');
      } else {
        toast.success('Dashboard deleted successfully');
        setDashboards(dashboards.filter(d => d.id !== dashboardId));
      }
    } catch (err) {
      console.error('Error deleting dashboard:', err);
      toast.error('Failed to delete dashboard');
    }
  };

  const togglePublic = async (dashboardId: string, isPublic: boolean) => {
    try {
      const { error } = await supabase
        .from('dashboards')
        .update({ is_public: !isPublic })
        .eq('id', dashboardId);

      if (error) {
        toast.error('Failed to update dashboard visibility');
      } else {
        toast.success(`Dashboard ${!isPublic ? 'made public' : 'made private'}`);
        setDashboards(dashboards.map(d => 
          d.id === dashboardId ? { ...d, is_public: !isPublic } : d
        ));
      }
    } catch (err) {
      console.error('Error updating dashboard visibility:', err);
      toast.error('Failed to update dashboard visibility');
    }
  };

  if (showBuilder) {
    return (
      <div className="h-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {editingDashboard ? 'Edit Dashboard' : 'Create Dashboard'}
          </h1>
          <button
            onClick={() => {
              setShowBuilder(false);
              setEditingDashboard(null);
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back to Dashboards
          </button>
        </div>
        <DashboardBuilder
          dashboardId={editingDashboard || undefined}
          onSave={() => {
            setShowBuilder(false);
            setEditingDashboard(null);
            loadDashboards();
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboards</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadDashboards}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Try Again
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboards</h1>
          <p className="text-gray-600">Create and manage your custom dashboards</p>
        </div>
        
        <button
          onClick={() => setShowBuilder(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create Dashboard</span>
        </button>
      </div>

      {dashboards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Dashboards Yet</h3>
          <p className="text-gray-600 mb-6">Create your first dashboard to visualize your data</p>
          <button
            onClick={() => setShowBuilder(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Create Your First Dashboard
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboards.map((dashboard) => (
            <motion.div
              key={dashboard.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {dashboard.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {dashboard.description || 'No description'}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{dashboard.widgets?.length || 0} widgets</span>
                      <span>•</span>
                      <span>
                        {dashboard.is_public ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingDashboard(dashboard.id);
                        setShowBuilder(true);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => togglePublic(dashboard.id, dashboard.is_public)}
                      className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                      title={dashboard.is_public ? 'Make Private' : 'Make Public'}
                    >
                      {dashboard.is_public ? <Eye className="w-4 h-4" /> : <Share className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => deleteDashboard(dashboard.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <span className="text-xs text-gray-500">
                    {new Date(dashboard.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};