import React, { useState } from 'react';
import { Code, Copy, Check, Server, Database, Shield, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const ApiDocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, snippetId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const endpoints = [
    {
      id: 'authentication',
      name: 'Authentication',
      description: 'Authenticate users and manage sessions',
      methods: [
        {
          method: 'POST',
          endpoint: '/auth/sign-in',
          description: 'Sign in a user with email and password',
          parameters: [
            { name: 'email', type: 'string', required: true, description: 'User email address' },
            { name: 'password', type: 'string', required: true, description: 'User password' }
          ],
          response: `{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "created_at": "2025-03-15T12:00:00Z"
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "aBcDeFgHiJkLmNoPqRsTuVwXyZ...",
    "expires_at": 1680000000
  }
}`
        },
        {
          method: 'POST',
          endpoint: '/auth/sign-up',
          description: 'Register a new user',
          parameters: [
            { name: 'email', type: 'string', required: true, description: 'User email address' },
            { name: 'password', type: 'string', required: true, description: 'User password' },
            { name: 'full_name', type: 'string', required: false, description: 'User full name' }
          ],
          response: `{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "created_at": "2025-03-15T12:00:00Z"
  },
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "aBcDeFgHiJkLmNoPqRsTuVwXyZ...",
    "expires_at": 1680000000
  }
}`
        },
        {
          method: 'POST',
          endpoint: '/auth/sign-out',
          description: 'Sign out a user',
          parameters: [],
          response: `{
  "success": true
}`
        }
      ]
    },
    {
      id: 'datasets',
      name: 'Datasets',
      description: 'Manage user datasets',
      methods: [
        {
          method: 'GET',
          endpoint: '/datasets',
          description: 'List all datasets for the authenticated user',
          parameters: [],
          response: `[
  {
    "id": "dataset-uuid",
    "name": "Sales Data",
    "description": "Quarterly sales performance",
    "file_name": "sales_data.csv",
    "row_count": 120,
    "column_count": 8,
    "created_at": "2025-03-15T12:00:00Z"
  },
  {
    "id": "dataset-uuid-2",
    "name": "Customer Data",
    "description": "Customer demographics and behavior",
    "file_name": "customer_data.csv",
    "row_count": 500,
    "column_count": 12,
    "created_at": "2025-03-10T09:30:00Z"
  }
]`
        },
        {
          method: 'GET',
          endpoint: '/datasets/:id',
          description: 'Get a specific dataset by ID',
          parameters: [
            { name: 'id', type: 'string', required: true, description: 'Dataset UUID' }
          ],
          response: `{
  "id": "dataset-uuid",
  "name": "Sales Data",
  "description": "Quarterly sales performance",
  "file_name": "sales_data.csv",
  "headers": ["Quarter", "Revenue", "Units_Sold", "Region", "Growth_Rate"],
  "row_count": 120,
  "column_count": 8,
  "data": [
    {
      "Quarter": "Q1 2024",
      "Revenue": 125000,
      "Units_Sold": 450,
      "Region": "North",
      "Growth_Rate": 12.5
    },
    // Additional rows...
  ],
  "created_at": "2025-03-15T12:00:00Z"
}`
        },
        {
          method: 'POST',
          endpoint: '/datasets',
          description: 'Create a new dataset',
          parameters: [
            { name: 'name', type: 'string', required: true, description: 'Dataset name' },
            { name: 'description', type: 'string', required: false, description: 'Dataset description' },
            { name: 'file_name', type: 'string', required: true, description: 'Original file name' },
            { name: 'headers', type: 'array', required: true, description: 'Array of column headers' },
            { name: 'data', type: 'array', required: true, description: 'Array of data rows' }
          ],
          response: `{
  "id": "dataset-uuid",
  "name": "Sales Data",
  "description": "Quarterly sales performance",
  "file_name": "sales_data.csv",
  "headers": ["Quarter", "Revenue", "Units_Sold", "Region", "Growth_Rate"],
  "row_count": 120,
  "column_count": 8,
  "created_at": "2025-03-15T12:00:00Z"
}`
        },
        {
          method: 'DELETE',
          endpoint: '/datasets/:id',
          description: 'Delete a dataset',
          parameters: [
            { name: 'id', type: 'string', required: true, description: 'Dataset UUID' }
          ],
          response: `{
  "success": true
}`
        }
      ]
    },
    {
      id: 'dashboards',
      name: 'Dashboards',
      description: 'Create and manage dashboards',
      methods: [
        {
          method: 'GET',
          endpoint: '/dashboards',
          description: 'List all dashboards for the authenticated user',
          parameters: [],
          response: `[
  {
    "id": "dashboard-uuid",
    "name": "Sales Dashboard",
    "description": "Overview of quarterly sales",
    "is_public": false,
    "created_at": "2025-03-15T12:00:00Z"
  },
  {
    "id": "dashboard-uuid-2",
    "name": "Marketing Performance",
    "description": "Marketing campaign metrics",
    "is_public": true,
    "created_at": "2025-03-10T09:30:00Z"
  }
]`
        },
        {
          method: 'POST',
          endpoint: '/dashboards',
          description: 'Create a new dashboard',
          parameters: [
            { name: 'name', type: 'string', required: true, description: 'Dashboard name' },
            { name: 'description', type: 'string', required: false, description: 'Dashboard description' },
            { name: 'layout', type: 'object', required: false, description: 'Dashboard layout configuration' },
            { name: 'widgets', type: 'array', required: false, description: 'Array of dashboard widgets' },
            { name: 'is_public', type: 'boolean', required: false, description: 'Whether the dashboard is publicly accessible' }
          ],
          response: `{
  "id": "dashboard-uuid",
  "name": "Sales Dashboard",
  "description": "Overview of quarterly sales",
  "layout": { "grid": true, "columns": 12 },
  "widgets": [
    {
      "id": "widget-1",
      "type": "chart",
      "title": "Revenue Trend",
      "position": { "x": 0, "y": 0, "w": 6, "h": 4 }
    }
  ],
  "is_public": false,
  "created_at": "2025-03-15T12:00:00Z"
}`
        }
      ]
    },
    {
      id: 'kpis',
      name: 'KPIs',
      description: 'Manage key performance indicators',
      methods: [
        {
          method: 'GET',
          endpoint: '/kpis',
          description: 'List all KPIs for the authenticated user',
          parameters: [],
          response: `[
  {
    "id": "kpi-uuid",
    "name": "Monthly Revenue",
    "description": "Monthly recurring revenue",
    "formula": "SUM(revenue)",
    "current_value": 125000,
    "target_value": 150000,
    "trend": "up",
    "category": "Revenue",
    "created_at": "2025-03-15T12:00:00Z"
  },
  {
    "id": "kpi-uuid-2",
    "name": "Customer Acquisition Cost",
    "description": "Average cost to acquire a new customer",
    "formula": "marketing_spend / new_customers",
    "current_value": 85,
    "target_value": 75,
    "trend": "down",
    "category": "Customer",
    "created_at": "2025-03-10T09:30:00Z"
  }
]`
        },
        {
          method: 'POST',
          endpoint: '/kpis',
          description: 'Create a new KPI',
          parameters: [
            { name: 'name', type: 'string', required: true, description: 'KPI name' },
            { name: 'description', type: 'string', required: false, description: 'KPI description' },
            { name: 'formula', type: 'string', required: true, description: 'Formula for calculating the KPI' },
            { name: 'target_value', type: 'number', required: false, description: 'Target value for the KPI' },
            { name: 'current_value', type: 'number', required: true, description: 'Current value of the KPI' },
            { name: 'trend', type: 'string', required: false, description: 'Trend direction (up, down, stable)' },
            { name: 'category', type: 'string', required: true, description: 'KPI category' }
          ],
          response: `{
  "id": "kpi-uuid",
  "name": "Monthly Revenue",
  "description": "Monthly recurring revenue",
  "formula": "SUM(revenue)",
  "current_value": 125000,
  "target_value": 150000,
  "trend": "up",
  "category": "Revenue",
  "created_at": "2025-03-15T12:00:00Z"
}`
        }
      ]
    }
  ];

  const codeSnippets = {
    authentication: `// Sign in a user
const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

// Sign up a new user
const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  
  if (error) throw error;
  return data;
};`,
    datasets: `// List all datasets
const getDatasets = async () => {
  const { data, error } = await supabase
    .from('datasets')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

// Get a specific dataset
const getDataset = async (id) => {
  const { data, error } = await supabase
    .from('datasets')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};

// Create a new dataset
const createDataset = async (datasetData) => {
  const { data, error } = await supabase
    .from('datasets')
    .insert(datasetData)
    .select();
    
  if (error) throw error;
  return data;
};`,
    dashboards: `// List all dashboards
const getDashboards = async () => {
  const { data, error } = await supabase
    .from('dashboards')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

// Create a new dashboard
const createDashboard = async (dashboardData) => {
  const { data, error } = await supabase
    .from('dashboards')
    .insert(dashboardData)
    .select();
    
  if (error) throw error;
  return data;
};

// Update a dashboard
const updateDashboard = async (id, updates) => {
  const { data, error } = await supabase
    .from('dashboards')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data;
};`,
    kpis: `// List all KPIs
const getKPIs = async () => {
  const { data, error } = await supabase
    .from('kpis')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

// Create a new KPI
const createKPI = async (kpiData) => {
  const { data, error } = await supabase
    .from('kpis')
    .insert(kpiData)
    .select();
    
  if (error) throw error;
  return data;
};

// Update a KPI
const updateKPI = async (id, updates) => {
  const { data, error } = await supabase
    .from('kpis')
    .update(updates)
    .eq('id', id)
    .select();
    
  if (error) throw error;
  return data;
};`
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            VIZMINDS
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> API Documentation</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Comprehensive documentation for integrating with the VIZMINDS Analytics Platform
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Documentation</h3>
                  </div>
                  <nav className="p-2">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'overview'
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('authentication')}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'authentication'
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      Authentication
                    </button>
                    <button
                      onClick={() => setActiveTab('endpoints')}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'endpoints'
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      API Endpoints
                    </button>
                    <button
                      onClick={() => setActiveTab('examples')}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'examples'
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      Code Examples
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === 'security'
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      Security
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">API Overview</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      The VIZMINDS API allows you to programmatically access and manage your analytics data, dashboards, and insights. This documentation provides information about the available endpoints, authentication methods, and code examples.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Base URL</h3>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-6 flex items-center justify-between">
                      <code className="text-blue-600 dark:text-blue-400">https://api.vizminds.com/v1</code>
                      <button
                        onClick={() => copyToClipboard('https://api.vizminds.com/v1', 'base-url')}
                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {copiedSnippet === 'base-url' ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">API Key</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      All API requests require authentication using an API key. You can generate an API key in your account settings.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Rate Limits</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      The API has the following rate limits:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>Free tier: 100 requests per minute</li>
                      <li>Professional tier: 500 requests per minute</li>
                      <li>Enterprise tier: Custom limits</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Response Format</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      All API responses are returned in JSON format. Successful requests will return a 2xx status code, while errors will return an appropriate 4xx or 5xx status code along with an error message.
                    </p>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Example Error Response</h4>
                      <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
{`{
  "error": {
    "code": "unauthorized",
    "message": "Invalid API key provided"
  }
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Getting Started</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Follow these steps to start using the VIZMINDS API:
                    </p>
                    
                    <ol className="space-y-4 mb-6">
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium mr-3 flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Create an account</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Sign up for a VIZMINDS account at <a href="/auth" className="text-blue-600 dark:text-blue-400 hover:underline">vizminds.com</a>
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium mr-3 flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Generate an API key</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Go to Settings → API Keys and generate a new API key
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium mr-3 flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Make your first API request</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Use your API key to authenticate and make requests to the API
                          </p>
                        </div>
                      </li>
                    </ol>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Example Request</h4>
                      <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
{`curl -X GET "https://api.vizminds.com/v1/datasets" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'authentication' && (
                <div className="space-y-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      The VIZMINDS API uses API keys for authentication. You can generate an API key in your account settings.
                    </p>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">API Key Authentication</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Include your API key in the Authorization header of all requests:
                    </p>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                      <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
{`Authorization: Bearer YOUR_API_KEY`}
                      </pre>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">JWT Authentication</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      For user-specific operations, you can also use JWT authentication. First, sign in to get a JWT token:
                    </p>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-6">
                      <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
{`POST /auth/sign-in
{
  "email": "user@example.com",
  "password": "your-password"
}`}
                      </pre>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Then use the returned access token in the Authorization header:
                    </p>
                    
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
{`Authorization: Bearer YOUR_JWT_TOKEN`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">API Key Management</h2>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Generating API Keys</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      To generate an API key:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
                      <li>Sign in to your VIZMINDS account</li>
                      <li>Go to Settings → API Keys</li>
                      <li>Click "Generate New API Key"</li>
                      <li>Give your key a name and select the appropriate permissions</li>
                      <li>Click "Create API Key"</li>
                    </ol>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Important</h3>
                          <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                            <p>
                              Your API key will only be displayed once. Make sure to copy it and store it securely. If you lose your API key, you'll need to generate a new one.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Revoking API Keys</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      To revoke an API key:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                      <li>Sign in to your VIZMINDS account</li>
                      <li>Go to Settings → API Keys</li>
                      <li>Find the API key you want to revoke</li>
                      <li>Click "Revoke"</li>
                      <li>Confirm the action</li>
                    </ol>
                  </div>
                </div>
              )}

              {activeTab === 'endpoints' && (
                <div className="space-y-8">
                  {endpoints.map((endpoint) => (
                    <div key={endpoint.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{endpoint.name}</h2>
                        <p className="text-gray-600 dark:text-gray-400">{endpoint.description}</p>
                      </div>
                      
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {endpoint.methods.map((method, index) => (
                          <div key={index} className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center space-x-3">
                                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                                    method.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                    method.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                                    method.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                                    'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                  }`}>
                                    {method.method}
                                  </span>
                                  <code className="text-gray-900 dark:text-white font-mono">{method.endpoint}</code>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">{method.description}</p>
                              </div>
                            </div>
                            
                            {method.parameters.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Parameters</h4>
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden">
                                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                      <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Required</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
                                      {method.parameters.map((param, i) => (
                                        <tr key={i}>
                                          <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-white">{param.name}</td>
                                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{param.type}</td>
                                          <td className="px-4 py-3 text-sm">
                                            {param.required ? (
                                              <span className="text-green-600 dark:text-green-400">Yes</span>
                                            ) : (
                                              <span className="text-gray-500 dark:text-gray-400">No</span>
                                            )}
                                          </td>
                                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{param.description}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                            
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Response</h4>
                              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg relative">
                                <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
                                  {method.response}
                                </pre>
                                <button
                                  onClick={() => copyToClipboard(method.response, `${endpoint.id}-${index}`)}
                                  className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                  {copiedSnippet === `${endpoint.id}-${index}` ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                  ) : (
                                    <Copy className="w-5 h-5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'examples' && (
                <div className="space-y-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Code Examples</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      These examples demonstrate how to use the VIZMINDS API with JavaScript and the Supabase client library.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Authentication</h3>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg relative">
                          <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
                            {codeSnippets.authentication}
                          </pre>
                          <button
                            onClick={() => copyToClipboard(codeSnippets.authentication, 'auth-snippet')}
                            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            {copiedSnippet === 'auth-snippet' ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Datasets</h3>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg relative">
                          <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
                            {codeSnippets.datasets}
                          </pre>
                          <button
                            onClick={() => copyToClipboard(codeSnippets.datasets, 'datasets-snippet')}
                            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            {copiedSnippet === 'datasets-snippet' ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Dashboards</h3>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg relative">
                          <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
                            {codeSnippets.dashboards}
                          </pre>
                          <button
                            onClick={() => copyToClipboard(codeSnippets.dashboards, 'dashboards-snippet')}
                            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            {copiedSnippet === 'dashboards-snippet' ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">KPIs</h3>
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg relative">
                          <pre className="text-sm text-blue-600 dark:text-blue-400 overflow-x-auto">
                            {codeSnippets.kpis}
                          </pre>
                          <button
                            onClick={() => copyToClipboard(codeSnippets.kpis, 'kpis-snippet')}
                            className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            {copiedSnippet === 'kpis-snippet' ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">SDK Libraries</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      We provide official SDK libraries for several programming languages to make it easier to integrate with the VIZMINDS API.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                            <svg className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">JavaScript</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Our JavaScript SDK provides a convenient way to interact with the VIZMINDS API from both browser and Node.js environments.
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
                          <code className="text-blue-600 dark:text-blue-400">npm install @vizminds/sdk</code>
                        </div>
                        <a
                          href="#"
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        >
                          View Documentation
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07l.01-.13.05-.19.07-.16.1-.14.12-.12.15-.09.15-.07.16-.04.18-.02.2-.01zm-13.16 7.36l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Python</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Our Python SDK makes it easy to integrate VIZMINDS analytics into your Python applications and data science workflows.
                        </p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
                          <code className="text-blue-600 dark:text-blue-400">pip install vizminds-sdk</code>
                        </div>
                        <a
                          href="#"
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        >
                          View Documentation
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Security</h2>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Security is a top priority at VIZMINDS. We implement multiple layers of security to protect your data and API access.
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Transport Security</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          All API requests must use HTTPS (TLS 1.2+) to ensure data is encrypted in transit. Requests using insecure HTTP will be rejected.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Authentication</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          API keys and JWT tokens are used to authenticate requests. API keys should be kept secure and never exposed in client-side code.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Authorization</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Row-level security (RLS) policies ensure users can only access their own data. API keys can be scoped to specific permissions.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Rate Limiting</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Rate limits are enforced to prevent abuse and ensure fair usage of the API. Exceeding rate limits will result in 429 Too Many Requests responses.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Best Practices</h2>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Secure API Key Storage</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Store API keys securely in environment variables or a secure key management system. Never hardcode API keys in your source code or commit them to version control.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Implement Proper Error Handling</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Always handle API errors gracefully in your application. Check for error responses and implement appropriate retry logic for transient failures.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Use Minimal Permissions</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Create API keys with the minimum permissions required for your use case. This follows the principle of least privilege and reduces risk if a key is compromised.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Implement Request Timeouts</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Set appropriate timeouts for API requests to handle network issues or service disruptions gracefully.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Monitor API Usage</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Regularly monitor your API usage to detect unusual patterns that might indicate a security issue or inefficient implementation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Integrate with VIZMINDS?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Sign up for a VIZMINDS account to get your API key and start building powerful analytics integrations.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all text-lg font-medium"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};