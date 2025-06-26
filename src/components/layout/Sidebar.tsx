import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Database, 
  LayoutDashboard, 
  Target, 
  TrendingUp, 
  Activity,
  Briefcase,
  Settings,
  User
} from 'lucide-react';

const navigation = [
  { name: 'Data Upload', href: '/', icon: Database },
  { name: 'Dashboards', href: '/dashboards', icon: LayoutDashboard },
  { name: 'KPI Tracker', href: '/kpis', icon: Target },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Trend Analysis', href: '/trends', icon: Activity },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
];

const secondaryNavigation = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VizMind
            </h1>
            <p className="text-xs text-gray-600">Enterprise</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};