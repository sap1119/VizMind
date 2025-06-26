import React, { useState, useEffect } from 'react';
import { Plus, Save, Grid, BarChart3, PieChart, LineChart, Table, Target, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Widget {
  id: string;
  type: 'chart' | 'kpi' | 'table' | 'metric';
  title: string;
  datasetId?: string;
  config: any;
  position: { x: number; y: number; w: number; h: number };
}

interface DashboardBuilderProps {
  dashboardId?: string;
  onSave?: (dashboard: any) => void;
}

const WIDGET_TYPES = [
  { type: 'chart', icon: BarChart3, label: 'Chart', color: 'blue' },
  { type: 'kpi', icon: Target, label: 'KPI', color: 'green' },
  { type: 'table', icon: Table, label: 'Table', color: 'purple' },
  { type: 'metric', icon: TrendingUp, label: 'Metric', color: 'orange' },
];

export const DashboardBuilder: React.FC<DashboardBuilderProps> = ({ dashboardId, onSave }) => {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState<any>(null);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [datasets, setDatasets] = useState<any[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [showWidgetPanel, setShowWidgetPanel] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dashboardId) {
      loadDashboard();
    }
    loadDatasets();
  }, [dashboardId]);

  const loadDashboard = async () => {
    if (!dashboardId || !user) return;

    const { data, error } = await supabase
      .from('dashboards')
      .select('*')
      .eq('id', dashboardId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      toast.error('Failed to load dashboard');
      return;
    }

    setDashboard(data);
    setWidgets(data.widgets || []);
  };

  const loadDatasets = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('datasets')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading datasets:', error);
      return;
    }

    setDatasets(data || []);
  };

  const addWidget = (type: string) => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      type: type as any,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      config: {},
      position: { x: 0, y: 0, w: 4, h: 3 },
    };

    setWidgets([...widgets, newWidget]);
    setSelectedWidget(newWidget);
    setShowWidgetPanel(false);
  };

  const updateWidget = (widgetId: string, updates: Partial<Widget>) => {
    setWidgets(widgets.map(w => w.id === widgetId ? { ...w, ...updates } : w));
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
    if (selectedWidget?.id === widgetId) {
      setSelectedWidget(null);
    }
  };

  const saveDashboard = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const dashboardData = {
        user_id: user.id,
        name: dashboard?.name || 'New Dashboard',
        description: dashboard?.description || '',
        widgets,
        layout: { grid: true },
        updated_at: new Date().toISOString(),
      };

      if (dashboardId) {
        const { error } = await supabase
          .from('dashboards')
          .update(dashboardData)
          .eq('id', dashboardId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('dashboards')
          .insert(dashboardData)
          .select()
          .single();

        if (error) throw error;
        setDashboard(data);
      }

      toast.success('Dashboard saved successfully!');
      onSave?.(dashboard);
    } catch (error) {
      console.error('Error saving dashboard:', error);
      toast.error('Failed to save dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex">
      {/* Main Canvas */}
      <div className="flex-1 p-6 bg-gray-50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Builder</h2>
            <p className="text-gray-600">Create and customize your data dashboard</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowWidgetPanel(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Widget</span>
            </button>
            
            <button
              onClick={saveDashboard}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Grid Canvas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-96 p-6">
          <div className="grid grid-cols-12 gap-4 h-full">
            {widgets.map((widget) => (
              <motion.div
                key={widget.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`
                  col-span-${widget.position.w} 
                  bg-white border-2 rounded-lg p-4 cursor-pointer transition-all
                  ${selectedWidget?.id === widget.id 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => setSelectedWidget(widget)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{widget.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWidget(widget.id);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    {widget.type === 'chart' && <BarChart3 className="w-8 h-8 mx-auto mb-2" />}
                    {widget.type === 'kpi' && <Target className="w-8 h-8 mx-auto mb-2" />}
                    {widget.type === 'table' && <Table className="w-8 h-8 mx-auto mb-2" />}
                    {widget.type === 'metric' && <TrendingUp className="w-8 h-8 mx-auto mb-2" />}
                    <p className="text-sm">{widget.type.toUpperCase()} Widget</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {widgets.length === 0 && (
              <div className="col-span-12 flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <Grid className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Empty Dashboard</p>
                  <p>Add widgets to start building your dashboard</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Widget Panel */}
      {showWidgetPanel && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-white border-l border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Add Widget</h3>
            <button
              onClick={() => setShowWidgetPanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {WIDGET_TYPES.map((widgetType) => {
              const Icon = widgetType.icon;
              return (
                <button
                  key={widgetType.type}
                  onClick={() => addWidget(widgetType.type)}
                  className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                >
                  <div className={`p-2 bg-${widgetType.color}-100 rounded-lg`}>
                    <Icon className={`w-5 h-5 text-${widgetType.color}-600`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{widgetType.label}</p>
                    <p className="text-sm text-gray-500">Add a {widgetType.label.toLowerCase()} widget</p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Widget Configuration Panel */}
      {selectedWidget && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 bg-white border-l border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Configure Widget</h3>
            <button
              onClick={() => setSelectedWidget(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Title
              </label>
              <input
                type="text"
                value={selectedWidget.title}
                onChange={(e) => updateWidget(selectedWidget.id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Source
              </label>
              <select
                value={selectedWidget.datasetId || ''}
                onChange={(e) => updateWidget(selectedWidget.id, { datasetId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">Select dataset...</option>
                {datasets.map((dataset) => (
                  <option key={dataset.id} value={dataset.id}>
                    {dataset.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Width</label>
                  <select
                    value={selectedWidget.position.w}
                    onChange={(e) => updateWidget(selectedWidget.id, {
                      position: { ...selectedWidget.position, w: parseInt(e.target.value) }
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    {[3, 4, 6, 8, 12].map(w => (
                      <option key={w} value={w}>{w} cols</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Height</label>
                  <select
                    value={selectedWidget.position.h}
                    onChange={(e) => updateWidget(selectedWidget.id, {
                      position: { ...selectedWidget.position, h: parseInt(e.target.value) }
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    {[2, 3, 4, 6].map(h => (
                      <option key={h} value={h}>{h} rows</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};