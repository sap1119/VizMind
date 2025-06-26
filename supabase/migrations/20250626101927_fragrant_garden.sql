/*
  # Create Demo User and Sample Data

  1. Demo User Setup
    - Create a demo profile that can be used for testing
    - Add sample datasets, KPIs, and dashboards
    - Note: The actual auth user will need to be created through Supabase Auth API

  2. Sample Data
    - Sales dataset with quarterly performance data
    - Revenue growth KPI
    - Sales performance dashboard

  3. Security
    - All data follows existing RLS policies
    - Demo data is properly scoped to demo user
*/

-- First, let's create a proper UUID for our demo user
DO $$
DECLARE
    demo_user_id uuid := '550e8400-e29b-41d4-a716-446655440000';
BEGIN
    -- Insert demo profile (the auth user needs to be created separately via Supabase Auth)
    INSERT INTO profiles (
        id,
        email,
        full_name,
        avatar_url,
        created_at,
        updated_at
    ) VALUES (
        demo_user_id,
        'demo@vizmind.com',
        'Demo User',
        NULL,
        NOW(),
        NOW()
    ) ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        updated_at = NOW();

    -- Create sample dataset
    INSERT INTO datasets (
        id,
        user_id,
        name,
        description,
        file_name,
        headers,
        row_count,
        column_count,
        data,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        demo_user_id,
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
        ]'::jsonb,
        NOW(),
        NOW()
    ) ON CONFLICT DO NOTHING;

    -- Create sample KPIs
    INSERT INTO kpis (
        id,
        user_id,
        dataset_id,
        name,
        description,
        formula,
        target_value,
        current_value,
        trend,
        category,
        created_at,
        updated_at
    ) VALUES 
    (
        gen_random_uuid(),
        demo_user_id,
        'sample-dataset',
        'Revenue Growth',
        'Quarterly revenue growth percentage',
        'SUM(Revenue)',
        150000,
        142000,
        'up',
        'Revenue'
    ),
    (
        gen_random_uuid(),
        demo_user_id,
        'sample-dataset',
        'Customer Acquisition Cost',
        'Average cost to acquire a new customer',
        'marketing_spend / new_customers',
        75,
        85,
        'down',
        'Customer'
    ),
    (
        gen_random_uuid(),
        demo_user_id,
        'sample-dataset',
        'Conversion Rate',
        'Percentage of visitors who convert',
        '(conversions / visitors) * 100',
        4.0,
        3.2,
        'up',
        'Growth'
    ) ON CONFLICT DO NOTHING;

    -- Create sample dashboard
    INSERT INTO dashboards (
        id,
        user_id,
        name,
        description,
        layout,
        widgets,
        is_public,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        demo_user_id,
        'Sales Performance Dashboard',
        'Overview of quarterly sales metrics and trends',
        '{"grid": true}'::jsonb,
        ARRAY[
            '{"id": "widget-1", "type": "chart", "title": "Revenue Trend", "datasetId": "sample-dataset", "config": {"chartType": "line"}, "position": {"x": 0, "y": 0, "w": 6, "h": 4}}'::jsonb,
            '{"id": "widget-2", "type": "kpi", "title": "Total Revenue", "datasetId": "sample-dataset", "config": {"metric": "revenue"}, "position": {"x": 6, "y": 0, "w": 3, "h": 2}}'::jsonb
        ],
        false,
        NOW(),
        NOW()
    ) ON CONFLICT DO NOTHING;

    -- Create sample portfolio
    INSERT INTO portfolios (
        id,
        user_id,
        name,
        description,
        total_value,
        performance,
        risk_score,
        assets,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        demo_user_id,
        'Demo Tech Portfolio',
        'Sample technology-focused investment portfolio',
        25000,
        8.5,
        6.2,
        ARRAY[
            '{"symbol": "AAPL", "name": "Apple Inc.", "quantity": 50, "price": 175.50, "value": 8775, "allocation": 35.1, "change": 125.50, "changePercent": 1.45}'::jsonb,
            '{"symbol": "GOOGL", "name": "Alphabet Inc.", "quantity": 20, "price": 142.80, "value": 2856, "allocation": 11.4, "change": -45.20, "changePercent": -1.55}'::jsonb,
            '{"symbol": "MSFT", "name": "Microsoft Corp.", "quantity": 30, "price": 378.85, "value": 11365, "allocation": 45.5, "change": 234.15, "changePercent": 2.10}'::jsonb
        ],
        NOW(),
        NOW()
    ) ON CONFLICT DO NOTHING;

END $$;