/*
  # Create sample data for demo purposes

  1. Sample Data Creation
    - Create sample datasets with realistic business data
    - Create sample KPIs with performance metrics
    - Create sample dashboards with widget configurations
    - Create sample portfolios with asset allocations
    
  2. Notes
    - This migration creates template data that can be copied for new users
    - No user-specific data is created (avoiding foreign key constraints)
    - Data will be created when users actually sign up and use the application
*/

-- Create sample dataset templates (not tied to specific users)
CREATE TABLE IF NOT EXISTS sample_datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  file_name text NOT NULL,
  headers text[] NOT NULL DEFAULT '{}',
  row_count integer NOT NULL DEFAULT 0,
  column_count integer NOT NULL DEFAULT 0,
  data jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Insert sample dataset templates
INSERT INTO sample_datasets (
  name,
  description,
  file_name,
  headers,
  row_count,
  column_count,
  data
) VALUES 
(
  'Sample Sales Data',
  'Demo dataset showing quarterly sales performance',
  'sales_data.csv',
  ARRAY['Quarter', 'Revenue', 'Units_Sold', 'Region'],
  4,
  4,
  '[
    {"Quarter": "Q1 2024", "Revenue": 125000, "Units_Sold": 450, "Region": "North"},
    {"Quarter": "Q2 2024", "Revenue": 142000, "Units_Sold": 520, "Region": "North"},
    {"Quarter": "Q3 2024", "Revenue": 138000, "Units_Sold": 495, "Region": "South"},
    {"Quarter": "Q4 2024", "Revenue": 156000, "Units_Sold": 580, "Region": "West"}
  ]'::jsonb
),
(
  'Customer Analytics',
  'Customer behavior and engagement metrics',
  'customer_data.csv',
  ARRAY['Customer_ID', 'Age', 'Spend', 'Category', 'Satisfaction'],
  6,
  5,
  '[
    {"Customer_ID": "C001", "Age": 28, "Spend": 1250, "Category": "Premium", "Satisfaction": 4.5},
    {"Customer_ID": "C002", "Age": 34, "Spend": 890, "Category": "Standard", "Satisfaction": 4.2},
    {"Customer_ID": "C003", "Age": 45, "Spend": 2100, "Category": "Premium", "Satisfaction": 4.8},
    {"Customer_ID": "C004", "Age": 29, "Spend": 650, "Category": "Basic", "Satisfaction": 3.9},
    {"Customer_ID": "C005", "Age": 52, "Spend": 1800, "Category": "Premium", "Satisfaction": 4.6},
    {"Customer_ID": "C006", "Age": 31, "Spend": 720, "Category": "Standard", "Satisfaction": 4.1}
  ]'::jsonb
),
(
  'Product Performance',
  'Product sales and inventory metrics',
  'product_data.csv',
  ARRAY['Product', 'Sales', 'Inventory', 'Price', 'Rating'],
  5,
  5,
  '[
    {"Product": "Widget A", "Sales": 1200, "Inventory": 450, "Price": 29.99, "Rating": 4.3},
    {"Product": "Widget B", "Sales": 890, "Inventory": 320, "Price": 39.99, "Rating": 4.1},
    {"Product": "Widget C", "Sales": 1450, "Inventory": 180, "Price": 49.99, "Rating": 4.7},
    {"Product": "Widget D", "Sales": 670, "Inventory": 520, "Price": 19.99, "Rating": 3.9},
    {"Product": "Widget E", "Sales": 1100, "Inventory": 290, "Price": 34.99, "Rating": 4.4}
  ]'::jsonb
);

-- Create sample KPI templates
CREATE TABLE IF NOT EXISTS sample_kpis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  formula text NOT NULL,
  target_value numeric,
  current_value numeric NOT NULL DEFAULT 0,
  trend text DEFAULT 'stable' CHECK (trend IN ('up', 'down', 'stable')),
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Insert sample KPI templates
INSERT INTO sample_kpis (
  name,
  description,
  formula,
  target_value,
  current_value,
  trend,
  category
) VALUES 
(
  'Monthly Revenue',
  'Total monthly recurring revenue',
  'SUM(revenue)',
  150000,
  125000,
  'up',
  'Revenue'
),
(
  'Customer Acquisition Cost',
  'Average cost to acquire a new customer',
  'marketing_spend / new_customers',
  75,
  85,
  'down',
  'Customer'
),
(
  'Conversion Rate',
  'Percentage of visitors who convert',
  '(conversions / visitors) * 100',
  4.0,
  3.2,
  'up',
  'Growth'
),
(
  'Customer Satisfaction',
  'Average customer satisfaction score',
  'AVG(satisfaction_score)',
  4.8,
  4.6,
  'stable',
  'Quality'
),
(
  'Inventory Turnover',
  'Rate at which inventory is sold and replaced',
  'cost_of_goods_sold / average_inventory',
  12,
  8.5,
  'up',
  'Efficiency'
);

-- Create sample dashboard templates
CREATE TABLE IF NOT EXISTS sample_dashboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  layout jsonb DEFAULT '{}',
  widgets jsonb[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Insert sample dashboard templates
INSERT INTO sample_dashboards (
  name,
  description,
  layout,
  widgets
) VALUES 
(
  'Sales Performance Dashboard',
  'Overview of quarterly sales metrics and trends',
  '{"grid": true, "columns": 12}'::jsonb,
  ARRAY[
    '{"id": "widget-1", "type": "chart", "title": "Revenue Trend", "chartType": "line", "position": {"x": 0, "y": 0, "w": 8, "h": 4}}'::jsonb,
    '{"id": "widget-2", "type": "kpi", "title": "Total Revenue", "metric": "revenue", "position": {"x": 8, "y": 0, "w": 4, "h": 2}}'::jsonb,
    '{"id": "widget-3", "type": "chart", "title": "Sales by Region", "chartType": "pie", "position": {"x": 8, "y": 2, "w": 4, "h": 2}}'::jsonb,
    '{"id": "widget-4", "type": "table", "title": "Top Products", "position": {"x": 0, "y": 4, "w": 12, "h": 3}}'::jsonb
  ]
),
(
  'Customer Analytics Dashboard',
  'Customer behavior and satisfaction metrics',
  '{"grid": true, "columns": 12}'::jsonb,
  ARRAY[
    '{"id": "widget-1", "type": "chart", "title": "Customer Satisfaction", "chartType": "bar", "position": {"x": 0, "y": 0, "w": 6, "h": 3}}'::jsonb,
    '{"id": "widget-2", "type": "kpi", "title": "Avg Satisfaction", "metric": "satisfaction", "position": {"x": 6, "y": 0, "w": 3, "h": 3}}'::jsonb,
    '{"id": "widget-3", "type": "kpi", "title": "Total Customers", "metric": "customers", "position": {"x": 9, "y": 0, "w": 3, "h": 3}}'::jsonb
  ]
);

-- Create sample portfolio templates
CREATE TABLE IF NOT EXISTS sample_portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  total_value numeric NOT NULL DEFAULT 0,
  performance numeric NOT NULL DEFAULT 0,
  risk_score numeric NOT NULL DEFAULT 0,
  assets jsonb[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Insert sample portfolio templates
INSERT INTO sample_portfolios (
  name,
  description,
  total_value,
  performance,
  risk_score,
  assets
) VALUES 
(
  'Tech Growth Portfolio',
  'A diversified portfolio focused on technology growth stocks',
  25000,
  8.5,
  7.2,
  ARRAY[
    '{"symbol": "AAPL", "name": "Apple Inc.", "quantity": 50, "price": 175.50, "value": 8775, "allocation": 35.1, "change": 125.50, "changePercent": 1.45}'::jsonb,
    '{"symbol": "GOOGL", "name": "Alphabet Inc.", "quantity": 20, "price": 142.80, "value": 2856, "allocation": 11.4, "change": -45.20, "changePercent": -1.55}'::jsonb,
    '{"symbol": "MSFT", "name": "Microsoft Corp.", "quantity": 30, "price": 378.85, "value": 11365, "allocation": 45.5, "change": 234.15, "changePercent": 2.10}'::jsonb,
    '{"symbol": "TSLA", "name": "Tesla Inc.", "quantity": 10, "price": 201.25, "value": 2012, "allocation": 8.0, "change": -89.75, "changePercent": -4.25}'::jsonb
  ]
),
(
  'Balanced Investment Portfolio',
  'Conservative portfolio with mixed asset allocation',
  50000,
  5.2,
  4.8,
  ARRAY[
    '{"symbol": "SPY", "name": "SPDR S&P 500 ETF", "quantity": 100, "price": 420.50, "value": 42050, "allocation": 84.1, "change": 1250.00, "changePercent": 3.06}'::jsonb,
    '{"symbol": "BND", "name": "Vanguard Total Bond Market", "quantity": 95, "price": 82.15, "value": 7804, "allocation": 15.6, "change": -156.00, "changePercent": -1.96}'::jsonb,
    '{"symbol": "GLD", "name": "SPDR Gold Shares", "quantity": 1, "price": 185.30, "value": 185, "allocation": 0.4, "change": 5.30, "changePercent": 2.94}'::jsonb
  ]
);

-- Create function to copy sample data for new users
CREATE OR REPLACE FUNCTION create_sample_data_for_user(user_id uuid)
RETURNS void AS $$
BEGIN
  -- Copy sample datasets for the user
  INSERT INTO datasets (user_id, name, description, file_name, headers, row_count, column_count, data)
  SELECT user_id, name, description, file_name, headers, row_count, column_count, data
  FROM sample_datasets
  LIMIT 1; -- Just copy the first sample dataset

  -- Copy sample KPIs for the user
  INSERT INTO kpis (user_id, dataset_id, name, description, formula, target_value, current_value, trend, category)
  SELECT user_id, 'sample', name, description, formula, target_value, current_value, trend, category
  FROM sample_kpis
  LIMIT 3; -- Copy first 3 KPIs

  -- Copy sample portfolio for the user
  INSERT INTO portfolios (user_id, name, description, total_value, performance, risk_score, assets)
  SELECT user_id, name, description, total_value, performance, risk_score, assets
  FROM sample_portfolios
  LIMIT 1; -- Copy first portfolio

  -- Copy sample dashboard for the user
  INSERT INTO dashboards (user_id, name, description, layout, widgets, is_public)
  SELECT user_id, name, description, layout, widgets, false
  FROM sample_dashboards
  LIMIT 1; -- Copy first dashboard
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION create_sample_data_for_user(uuid) TO authenticated;