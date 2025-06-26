/*
  # Create sample data templates and functions

  This migration creates:
  1. A function to generate sample data for new users
  2. Sample data templates that can be used when users sign up
  3. Public sample datasets that don't require authentication

  Note: The actual user profile will be created when someone signs up through the auth system.
*/

-- Create a function to generate sample data for a user
CREATE OR REPLACE FUNCTION create_sample_data_for_user(user_id uuid)
RETURNS void AS $$
BEGIN
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
        user_id,
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
    );

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
        user_id,
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
        user_id,
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
        user_id,
        'sample-dataset',
        'Conversion Rate',
        'Percentage of visitors who convert',
        '(conversions / visitors) * 100',
        4.0,
        3.2,
        'up',
        'Growth'
    );

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
        user_id,
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
    );

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
        user_id,
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
    );

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create sample data for new users
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
    -- Only create sample data if this is the first time we're seeing this user
    IF NOT EXISTS (SELECT 1 FROM datasets WHERE user_id = NEW.id) THEN
        PERFORM create_sample_data_for_user(NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on profiles table to auto-generate sample data
DROP TRIGGER IF EXISTS on_profile_created ON profiles;
CREATE TRIGGER on_profile_created
    AFTER INSERT ON profiles
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION create_sample_data_for_user(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION handle_new_user() TO authenticated;