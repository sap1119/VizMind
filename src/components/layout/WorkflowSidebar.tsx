import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Database, 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  FileText,
  CheckCircle,
  Circle,
  Lock,
  Settings
} from 'lucide-react';

const workflowSteps = [
  { 
    step: 1, 
    name: 'Data Upload', 
    href: '/', 
    icon: Database,
    description: 'Upload your CSV data'
  },
  { 
    step: 2, 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Create visualizations'
  },
  { 
    step: 3, 
    name: 'KPI Tracker', 
    href: '/kpi', 
    icon: Target,
    description: 'Define key metrics'
  },
  { 
    step: 4, 
    name: 'Portfolio', 
    href: '/portfolio', 
    icon: LayoutDashboard,
    description: 'Analyze components'
  },
  { 
    step: 5, 
    name: 'Trend Analysis', 
    href: '/trends', 
    icon: TrendingUp,
    description: 'Predict patterns'
  },
  { 
    step: 6, 
    name: 'Analytics Report', 
    href: '/report', 
    icon: FileText,
    description: 'Download insights'
  },
];

export const WorkflowSidebar: React.FC = () => {
  const { currentStep, completedSteps, parsedData } = useData();
  const { isDarkMode } = useTheme();

  const isStepAccessible = (step: number) => {
    if (step === 1) return true;
    if (step === 2) return parsedData !== null;
    return completedSteps.includes(step - 1);
  };

  const isStepCompleted = (step: number) => {
    return completedSteps.includes(step);
  };

  return (
    <div className="flex flex-col w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors">
      <div className="flex items-center h-16 px-6 border-b border-gray-200 dark:border-gray-700">
        <Link to="/home" className="flex items-center space-x-3">
          <img 
            src="/VizMind Logo - Flat Vector Style.png" 
            alt="VIZMINDS Logo" 
            className="w-8 h-8"
          />
          <div className="flex items-baseline space-x-1">
            <h1 className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
              VIZMINDS
            </h1>
            <span className="text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              BETA
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        {/* Analytics Workflow Section */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Analytics Workflow</h2>
          
          {workflowSteps.map((item) => {
            const Icon = item.icon;
            const isAccessible = isStepAccessible(item.step);
            const isCompleted = isStepCompleted(item.step);
            const isCurrent = currentStep === item.step;
            
            return (
              <div key={item.step} className="relative">
                {/* Connector line */}
                {item.step < workflowSteps.length && (
                  <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200 dark:bg-gray-600"></div>
                )}
                
                <NavLink
                  to={item.href}
                  className={({ isActive }) => {
                    if (!isAccessible) {
                      return 'flex items-center px-3 py-3 text-sm font-medium rounded-lg cursor-not-allowed opacity-50';
                    }
                    
                    return `flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive || isCurrent
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`;
                  }}
                  onClick={(e) => {
                    if (!isAccessible) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="relative">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : isAccessible ? (
                        <Circle className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full font-bold">
                    {item.step}
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>

        {/* Settings Link */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`
            }
          >
            <Settings className="w-5 h-5 mr-3" />
            <span className="font-semibold">Settings</span>
          </NavLink>
        </div>

        {/* Progress Summary */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Progress</h3>
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${(completedSteps.length / workflowSteps.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-bold">
              {completedSteps.length}/{workflowSteps.length}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            {completedSteps.length === 0 && 'Start by uploading your data'}
            {completedSteps.length > 0 && completedSteps.length < workflowSteps.length && 'Continue to next step'}
            {completedSteps.length === workflowSteps.length && 'Workflow complete! Download your report'}
          </p>
        </div>
      </nav>
    </div>
  );
};