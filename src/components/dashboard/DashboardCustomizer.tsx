import React, { useState, useRef } from 'react';
import { LayoutDashboard, Plus, Save, Edit, Trash2, Move, Settings, BarChart2, PieChart, LineChart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { ParsedData } from '../../types';
import toast from 'react-hot-toast';

interface DashboardCustomizerProps {
  dashboard: any;
  data: ParsedData;
  onSave: (dashboard: any) => void;
}

interface Widget {
  id: string;
  type: 'chart' | 'kpi' | 'table' | 'metric';
  title: string;
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  position: { x: number; y: number; w: number; h: number };
  config?: any;
}

export const DashboardCustomizer: React.FC<DashboardCustomizerProps> = ({ dashboard, data, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>(dashboard.widgets || []);
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const [dashboardName, setDashboardName] = useState(dashboard.name || 'My Dashboard');
  const [dashboardDescription, setDashboardDescription] = useState(dashboard.description || '');
  const [draggedWidget, setDraggedWidget] = useState<Widget | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const chartTypes = [
    { type: 'bar', icon: BarChart2, label: 'Bar Chart' },
    { type: 'line', icon: LineChart, label: 'Line Chart' },
    { type: 'pie', icon: PieChart, label: 'Pie Chart' },
    { type: 'area', icon: TrendingUp, label: 'Area Chart' }
  ];

  const addWidget = (type: 'chart' | 'kpi' | 'table' | 'metric') => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      position: { x: 0, y: 0, w: 6, h: 4 },
      config: {}
    };

    if (type === 'chart') {
      newWidget.chartType = 'bar';
    }

    setWidgets([...widgets, newWidget]);
    setEditingWidget(newWidget);
  };

  const updateWidget = (id: string, updates: Partial<Widget>) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, ...updates } : w));
    
    if (editingWidget && editingWidget.id === id) {
      setEditingWidget({ ...editingWidget, ...updates });
    }
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
    
    if (editingWidget && editingWidget.id === id) {
      setEditingWidget(null);
    }
  };

  const handleDragStart = (widget: Widget) => {
    setDraggedWidget(widget);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedWidget) return;
    
    const updatedWidgets = [...widgets];
    const draggedIndex = widgets.findIndex(w => w.id === draggedWidget.id);
    
    if (draggedIndex !== -1) {
      // Remove the dragged widget
      const [removed] = updatedWidgets.splice(draggedIndex, 1);
      // Insert it at the target position
      updatedWidgets.splice(targetIndex, 0, removed);
      
      setWidgets(updatedWidgets);
    }
    
    setDraggedWidget(null);
    setDragOverIndex(null);
  };

  const saveDashboard = () => {
    const updatedDashboard = {
      ...dashboard,
      name: dashboardName,
      description: dashboardDescription,
      widgets,
      layout: dashboard.layout || { grid: true, columns: 12 }
    };
    
    onSave(updatedDashboard);
    setEditMode(false);
    toast.success('Dashboard customization saved!');
  };

  const getNumericColumns = () => {
    return data.headers.filter(h => data.summary.columnTypes[h] === 'number');
  };

  const getCategoricalColumns = () => {
    return data.headers.filter(h => data.summary.columnTypes[h] === 'string' || data.summary.columnTypes[h] === 'date');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            
            {editMode ? (
              <div>
                <input
                  type="text"
                  value={dashboardName}
                  onChange={(e) => setDashboardName(e.target.value)}
                  className="block w-full text-xl font-bold text-gray-900 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  placeholder="Dashboard Name"
                />
                <input
                  type="text"
                  value={dashboardDescription}
                  onChange={(e) => setDashboardDescription(e.target.value)}
                  className="block w-full text-sm text-gray-600 bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none mt-1"
                  placeholder="Dashboard Description"
                />
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-900">{dashboardName}</h3>
                <p className="text-sm text-gray-600">{dashboardDescription || 'Interactive dashboard based on your data'}</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveDashboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Edit className="w-4 h-4" />
                <span>Customize Dashboard</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Editor */}
      {editMode && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={() => addWidget('chart')}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Add Chart</span>
            </button>
            <button
              onClick={() => addWidget('kpi')}
              className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Add KPI</span>
            </button>
            <button
              onClick={() => addWidget('table')}
              className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Add Table</span>
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">Drag and drop widgets to rearrange them</p>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div ref={gridRef} className="grid grid-cols-12 gap-4 min-h-[200px]">
              {widgets.length === 0 ? (
                <div className="col-span-12 flex items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Add widgets to your dashboard</p>
                  </div>
                </div>
              ) : (
                widgets.map((widget, index) => (
                  <div
                    key={widget.id}
                    className={`col-span-${widget.position.w} row-span-${widget.position.h} border-2 rounded-lg p-4 cursor-move transition-all ${
                      dragOverIndex === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    draggable
                    onDragStart={() => handleDragStart(widget)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Move className="w-4 h-4 text-gray-400" />
                        <h4 className="font-medium text-gray-900">{widget.title}</h4>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setEditingWidget(widget)}
                          className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeWidget(widget.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      {widget.type === 'chart' && (
                        <>
                          {widget.chartType === 'bar' && <BarChart2 className="w-8 h-8 text-gray-400" />}
                          {widget.chartType === 'line' && <LineChart className="w-8 h-8 text-gray-400" />}
                          {widget.chartType === 'pie' && <PieChart className="w-8 h-8 text-gray-400" />}
                          {widget.chartType === 'area' && <TrendingUp className="w-8 h-8 text-gray-400" />}
                        </>
                      )}
                      {widget.type === 'kpi' && <TrendingUp className="w-8 h-8 text-gray-400" />}
                      {widget.type === 'table' && <Settings className="w-8 h-8 text-gray-400" />}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Widget Editor */}
      {editMode && editingWidget && (
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Widget</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Title
              </label>
              <input
                type="text"
                value={editingWidget.title}
                onChange={(e) => updateWidget(editingWidget.id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            {editingWidget.type === 'chart' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chart Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {chartTypes.map((chart) => {
                    const Icon = chart.icon;
                    return (
                      <button
                        key={chart.type}
                        onClick={() => updateWidget(editingWidget.id, { chartType: chart.type })}
                        className={`flex items-center space-x-2 p-2 rounded-lg border ${
                          editingWidget.chartType === chart.type
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{chart.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {editingWidget.type === 'chart' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    X-Axis (Category)
                  </label>
                  <select
                    value={editingWidget.config?.xAxis || ''}
                    onChange={(e) => updateWidget(editingWidget.id, { 
                      config: { ...editingWidget.config, xAxis: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select column</option>
                    {getCategoricalColumns().map(column => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Y-Axis (Value)
                  </label>
                  <select
                    value={editingWidget.config?.yAxis || ''}
                    onChange={(e) => updateWidget(editingWidget.id, { 
                      config: { ...editingWidget.config, yAxis: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select column</option>
                    {getNumericColumns().map(column => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Size (Width)
              </label>
              <select
                value={editingWidget.position.w}
                onChange={(e) => updateWidget(editingWidget.id, { 
                  position: { ...editingWidget.position, w: parseInt(e.target.value) } 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {[3, 4, 6, 8, 12].map(size => (
                  <option key={size} value={size}>{size} columns</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Size (Height)
              </label>
              <select
                value={editingWidget.position.h}
                onChange={(e) => updateWidget(editingWidget.id, { 
                  position: { ...editingWidget.position, h: parseInt(e.target.value) } 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {[2, 3, 4, 6].map(size => (
                  <option key={size} value={size}>{size} rows</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Preview */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Preview</h3>
        
        <div className="grid grid-cols-12 gap-4">
          {widgets.map((widget) => (
            <div
              key={widget.id}
              className={`col-span-${widget.position.w} row-span-${widget.position.h} bg-gray-50 rounded-lg p-4 border border-gray-200`}
              style={{ minHeight: `${widget.position.h * 80}px` }}
            >
              <h4 className="font-medium text-gray-900 mb-3">{widget.title}</h4>
              
              <div className="h-full flex items-center justify-center">
                {widget.type === 'chart' && (
                  <>
                    {widget.chartType === 'bar' && <BarChart2 className="w-12 h-12 text-gray-400" />}
                    {widget.chartType === 'line' && <LineChart className="w-12 h-12 text-gray-400" />}
                    {widget.chartType === 'pie' && <PieChart className="w-12 h-12 text-gray-400" />}
                    {widget.chartType === 'area' && <TrendingUp className="w-12 h-12 text-gray-400" />}
                  </>
                )}
                {widget.type === 'kpi' && <TrendingUp className="w-12 h-12 text-gray-400" />}
                {widget.type === 'table' && <Settings className="w-12 h-12 text-gray-400" />}
              </div>
            </div>
          ))}
          
          {widgets.length === 0 && (
            <div className="col-span-12 flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <LayoutDashboard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No widgets added yet</p>
                {editMode && (
                  <button
                    onClick={() => addWidget('chart')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Your First Widget
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};