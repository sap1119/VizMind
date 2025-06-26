/*
  # Sample Data Population Migration

  1. Sample Data Tables
    - Populates sample_datasets with realistic business data
    - Populates sample_kpis with performance indicators
    - Populates sample_dashboards with pre-configured layouts
    - Populates sample_portfolios with investment data

  2. Helper Functions
    - copy_sample_data_for_user: Copies sample data to user tables
    - handle_new_user: Updated to include sample data for new users

  3. Data Quality
    - All timestamps properly included
    - Proper JSON formatting for complex data
    - Conflict handling for data integrity
*/

-- Insert sample datasets
INSERT INTO sample_datasets (
    id,
    name,
    description,
    file_name,
    headers,
    row_count,
    column_count,
    data,
    created_at
) VALUES 
(
    gen_random_uuid(),
    'Quarterly Sales Performance',
    'Sample dataset showing quarterly sales performance across regions',
    'sales_data.csv',
    ARRAY['Quarter', 'Revenue', 'Units_Sold', 'Region', 'Growth_Rate'],
    8,
    5,
    '[
        {"Quarter": "Q1 2023", "Revenue": 125000, "Units_Sold": 450, "Region": "North", "Growth_Rate": 12.5},
        {"Quarter": "Q2 2023", "Revenue": 142000, "Units_Sold": 520, "Region": "North", "Growth_Rate": 13.6},
        {"Quarter": "Q3 2023", "Revenue": 138000, "Units_Sold": 495, "Region": "South", "Growth_Rate": -2.8},
        {"Quarter": "Q4 2023", "Revenue": 156000, "Units_Sold": 580, "Region": "West", "Growth_Rate": 13.0},
        {"Quarter": "Q1 2024", "Revenue": 165000, "Units_Sold": 610, "Region": "North", "Growth_Rate": 32.0},
        {"Quarter": "Q2 2024", "Revenue": 178000, "Units_Sold": 645, "Region": "South", "Growth_Rate": 25.4},
        {"Quarter": "Q3 2024", "Revenue": 172000, "Units_Sold": 625, "Region": "West", "Growth_Rate": 24.6},
        {"Quarter": "Q4 2024", "Revenue": 189000, "Units_Sold": 695, "Region": "East", "Growth_Rate": 21.2}
    ]'::jsonb,
    NOW()
),
(
    gen_random_uuid(),
    'Customer Analytics',
    'Customer behavior and engagement metrics',
    'customer_data.csv',
    ARRAY['Customer_ID', 'Age', 'Spend_Amount', 'Category', 'Satisfaction'],
    12,
    5,
    '[
        {"Customer_ID": "C001", "Age": 28, "Spend_Amount": 1250, "Category": "Premium", "Satisfaction": 4.5},
        {"Customer_ID": "C002", "Age": 34, "Spend_Amount": 890, "Category": "Standard", "Satisfaction": 4.2},
        {"Customer_ID": "C003", "Age": 45, "Spend_Amount": 2100, "Category": "Premium", "Satisfaction": 4.8},
        {"Customer_ID": "C004", "Age": 29, "Spend_Amount": 650, "Category": "Basic", "Satisfaction": 3.9},
        {"Customer_ID": "C005", "Age": 52, "Spend_Amount": 1800, "Category": "Premium", "Satisfaction": 4.6},
        {"Customer_ID": "C006", "Age": 31, "Spend_Amount": 720, "Category": "Standard", "Satisfaction": 4.1},
        {"Customer_ID": "C007", "Age": 38, "Spend_Amount": 1450, "Category": "Premium", "Satisfaction": 4.7},
        {"Customer_ID": "C008", "Age": 26, "Spend_Amount": 580, "Category": "Basic", "Satisfaction": 3.8},
        {"Customer_ID": "C009", "Age": 41, "Spend_Amount": 1320, "Category": "Standard", "Satisfaction": 4.3},
        {"Customer_ID": "C010", "Age": 35, "Spend_Amount": 950, "Category": "Standard", "Satisfaction": 4.0},
        {"Customer_ID": "C011", "Age": 48, "Spend_Amount": 2250, "Category": "Premium", "Satisfaction": 4.9},
        {"Customer_ID": "C012", "Age": 33, "Spend_Amount": 1100, "Category": "Standard", "Satisfaction": 4.4}
    ]'::jsonb,
    NOW()
),
(
    gen_random_uuid(),
    'Marketing Campaign Performance',
    'Digital marketing campaign metrics and ROI analysis',
    'marketing_data.csv',
    ARRAY['Campaign_ID', 'Channel', 'Spend', 'Impressions', 'Clicks', 'Conversions', 'ROI'],
    10,
    7,
    '[
        {"Campaign_ID": "CAM001", "Channel": "Google Ads", "Spend": 5000, "Impressions": 125000, "Clicks": 2500, "Conversions": 125, "ROI": 2.5},
        {"Campaign_ID": "CAM002", "Channel": "Facebook", "Spend": 3500, "Impressions": 98000, "Clicks": 1960, "Conversions": 98, "ROI": 2.8},
        {"Campaign_ID": "CAM003", "Channel": "LinkedIn", "Spend": 2000, "Impressions": 45000, "Clicks": 900, "Conversions": 54, "ROI": 2.7},
        {"Campaign_ID": "CAM004", "Channel": "Twitter", "Spend": 1500, "Impressions": 35000, "Clicks": 700, "Conversions": 35, "ROI": 2.3},
        {"Campaign_ID": "CAM005", "Channel": "Instagram", "Spend": 4000, "Impressions": 110000, "Clicks": 2200, "Conversions": 132, "ROI": 3.3},
        {"Campaign_ID": "CAM006", "Channel": "YouTube", "Spend": 6000, "Impressions": 150000, "Clicks": 3000, "Conversions": 180, "ROI": 3.0},
        {"Campaign_ID": "CAM007", "Channel": "Email", "Spend": 800, "Impressions": 25000, "Clicks": 1250, "Conversions": 100, "ROI": 12.5},
        {"Campaign_ID": "CAM008", "Channel": "SEO", "Spend": 2500, "Impressions": 75000, "Clicks": 2250, "Conversions": 158, "ROI": 6.3},
        {"Campaign_ID": "CAM009", "Channel": "Display", "Spend": 3000, "Impressions": 200000, "Clicks": 2000, "Conversions": 80, "ROI": 2.7},
        {"Campaign_ID": "CAM010", "Channel": "Affiliate", "Spend": 1200, "Impressions": 30000, "Clicks": 900, "Conversions": 72, "ROI": 6.0}
    ]'::jsonb,
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert sample KPIs
INSERT INTO sample_kpis (
    id,
    name,
    description,
    formula,
    target_value,
    current_value,
    trend,
    category,
    created_at
) VALUES 
(
    gen_random_uuid(),
    'Monthly Revenue Growth',
    'Month-over-month revenue growth percentage',
    '((current_month_revenue - previous_month_revenue) / previous_month_revenue) * 100',
    15.0,
    12.8,
    'up',
    'Revenue',
    NOW()
),
(
    gen_random_uuid(),
    'Customer Acquisition Cost',
    'Average cost to acquire a new customer',
    'total_marketing_spend / new_customers_acquired',
    75.00,
    68.50,
    'down',
    'Customer',
    NOW()
),
(
    gen_random_uuid(),
    'Customer Lifetime Value',
    'Average revenue generated per customer over their lifetime',
    'average_order_value * purchase_frequency * customer_lifespan',
    2500.00,
    2750.00,
    'up',
    'Customer',
    NOW()
),
(
    gen_random_uuid(),
    'Conversion Rate',
    'Percentage of website visitors who make a purchase',
    '(total_conversions / total_visitors) * 100',
    4.5,
    3.8,
    'stable',
    'Growth',
    NOW()
),
(
    gen_random_uuid(),
    'Average Order Value',
    'Average amount spent per transaction',
    'total_revenue / total_orders',
    125.00,
    142.50,
    'up',
    'Revenue',
    NOW()
),
(
    gen_random_uuid(),
    'Customer Satisfaction Score',
    'Average customer satisfaction rating',
    'sum_of_satisfaction_scores / total_responses',
    4.5,
    4.3,
    'stable',
    'Quality',
    NOW()
),
(
    gen_random_uuid(),
    'Marketing ROI',
    'Return on investment for marketing campaigns',
    '(revenue_from_marketing - marketing_spend) / marketing_spend * 100',
    300.0,
    285.0,
    'up',
    'Marketing',
    NOW()
),
(
    gen_random_uuid(),
    'Churn Rate',
    'Percentage of customers who stop using the service',
    '(customers_lost / total_customers_start_period) * 100',
    5.0,
    4.2,
    'down',
    'Customer',
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert sample dashboards
INSERT INTO sample_dashboards (
    id,
    name,
    description,
    layout,
    widgets,
    created_at
) VALUES 
(
    gen_random_uuid(),
    'Executive Sales Dashboard',
    'High-level overview of sales performance and key metrics',
    '{"grid": true, "columns": 12, "rows": 8}'::jsonb,
    ARRAY[
        '{"id": "revenue-chart", "type": "chart", "title": "Revenue Trend", "chartType": "line", "position": {"x": 0, "y": 0, "w": 8, "h": 4}, "config": {"dataSource": "sales", "xAxis": "Quarter", "yAxis": "Revenue"}}'::jsonb,
        '{"id": "kpi-revenue", "type": "kpi", "title": "Total Revenue", "position": {"x": 8, "y": 0, "w": 4, "h": 2}, "config": {"metric": "revenue", "format": "currency"}}'::jsonb,
        '{"id": "kpi-growth", "type": "kpi", "title": "Growth Rate", "position": {"x": 8, "y": 2, "w": 4, "h": 2}, "config": {"metric": "growth", "format": "percentage"}}'::jsonb,
        '{"id": "region-chart", "type": "chart", "title": "Sales by Region", "chartType": "pie", "position": {"x": 0, "y": 4, "w": 6, "h": 4}, "config": {"dataSource": "sales", "groupBy": "Region", "value": "Revenue"}}'::jsonb,
        '{"id": "units-chart", "type": "chart", "title": "Units Sold", "chartType": "bar", "position": {"x": 6, "y": 4, "w": 6, "h": 4}, "config": {"dataSource": "sales", "xAxis": "Quarter", "yAxis": "Units_Sold"}}'::jsonb
    ],
    NOW()
),
(
    gen_random_uuid(),
    'Customer Analytics Dashboard',
    'Customer behavior, satisfaction, and engagement metrics',
    '{"grid": true, "columns": 12, "rows": 6}'::jsonb,
    ARRAY[
        '{"id": "customer-satisfaction", "type": "chart", "title": "Customer Satisfaction by Category", "chartType": "bar", "position": {"x": 0, "y": 0, "w": 6, "h": 3}, "config": {"dataSource": "customers", "xAxis": "Category", "yAxis": "Satisfaction"}}'::jsonb,
        '{"id": "spend-distribution", "type": "chart", "title": "Spend Distribution", "chartType": "histogram", "position": {"x": 6, "y": 0, "w": 6, "h": 3}, "config": {"dataSource": "customers", "field": "Spend_Amount"}}'::jsonb,
        '{"id": "age-spend", "type": "chart", "title": "Age vs Spend Correlation", "chartType": "scatter", "position": {"x": 0, "y": 3, "w": 8, "h": 3}, "config": {"dataSource": "customers", "xAxis": "Age", "yAxis": "Spend_Amount"}}'::jsonb,
        '{"id": "avg-satisfaction", "type": "kpi", "title": "Avg Satisfaction", "position": {"x": 8, "y": 3, "w": 4, "h": 3}, "config": {"metric": "satisfaction", "format": "decimal"}}'::jsonb
    ],
    NOW()
),
(
    gen_random_uuid(),
    'Marketing Performance Dashboard',
    'Digital marketing campaign performance and ROI tracking',
    '{"grid": true, "columns": 12, "rows": 8}'::jsonb,
    ARRAY[
        '{"id": "campaign-roi", "type": "chart", "title": "Campaign ROI by Channel", "chartType": "bar", "position": {"x": 0, "y": 0, "w": 8, "h": 4}, "config": {"dataSource": "marketing", "xAxis": "Channel", "yAxis": "ROI"}}'::jsonb,
        '{"id": "total-spend", "type": "kpi", "title": "Total Marketing Spend", "position": {"x": 8, "y": 0, "w": 4, "h": 2}, "config": {"metric": "spend", "format": "currency"}}'::jsonb,
        '{"id": "avg-roi", "type": "kpi", "title": "Average ROI", "position": {"x": 8, "y": 2, "w": 4, "h": 2}, "config": {"metric": "roi", "format": "percentage"}}'::jsonb,
        '{"id": "conversion-funnel", "type": "chart", "title": "Conversion Funnel", "chartType": "funnel", "position": {"x": 0, "y": 4, "w": 6, "h": 4}, "config": {"dataSource": "marketing", "stages": ["Impressions", "Clicks", "Conversions"]}}'::jsonb,
        '{"id": "channel-performance", "type": "chart", "title": "Channel Performance", "chartType": "radar", "position": {"x": 6, "y": 4, "w": 6, "h": 4}, "config": {"dataSource": "marketing", "metrics": ["ROI", "Conversions", "Clicks"]}}'::jsonb
    ],
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Insert sample portfolios
INSERT INTO sample_portfolios (
    id,
    name,
    description,
    total_value,
    performance,
    risk_score,
    assets,
    created_at
) VALUES 
(
    gen_random_uuid(),
    'Technology Growth Portfolio',
    'Diversified portfolio focused on technology sector growth stocks',
    125000.00,
    8.5,
    7.2,
    ARRAY[
        '{"symbol": "AAPL", "name": "Apple Inc.", "quantity": 100, "price": 175.50, "value": 17550, "allocation": 14.04, "change": 250.00, "changePercent": 1.45}'::jsonb,
        '{"symbol": "MSFT", "name": "Microsoft Corporation", "quantity": 80, "price": 378.85, "value": 30308, "allocation": 24.25, "change": 1200.00, "changePercent": 4.12}'::jsonb,
        '{"symbol": "GOOGL", "name": "Alphabet Inc.", "quantity": 60, "price": 142.80, "value": 8568, "allocation": 6.85, "change": -180.00, "changePercent": -2.06}'::jsonb,
        '{"symbol": "AMZN", "name": "Amazon.com Inc.", "quantity": 45, "price": 145.20, "value": 6534, "allocation": 5.23, "change": 95.00, "changePercent": 1.47}'::jsonb,
        '{"symbol": "TSLA", "name": "Tesla Inc.", "quantity": 35, "price": 201.25, "value": 7044, "allocation": 5.64, "change": -320.00, "changePercent": -4.34}'::jsonb,
        '{"symbol": "NVDA", "name": "NVIDIA Corporation", "quantity": 25, "price": 875.30, "value": 21883, "allocation": 17.51, "change": 1850.00, "changePercent": 9.24}'::jsonb,
        '{"symbol": "META", "name": "Meta Platforms Inc.", "quantity": 55, "price": 485.60, "value": 26708, "allocation": 21.37, "change": 980.00, "changePercent": 3.81}'::jsonb,
        '{"symbol": "NFLX", "name": "Netflix Inc.", "quantity": 15, "price": 425.80, "value": 6387, "allocation": 5.11, "change": 125.00, "changePercent": 1.99}'::jsonb
    ],
    NOW()
),
(
    gen_random_uuid(),
    'Balanced Investment Portfolio',
    'Conservative balanced portfolio with mixed asset allocation',
    85000.00,
    5.2,
    4.8,
    ARRAY[
        '{"symbol": "SPY", "name": "SPDR S&P 500 ETF", "quantity": 150, "price": 425.30, "value": 63795, "allocation": 75.05, "change": 315.00, "changePercent": 0.50}'::jsonb,
        '{"symbol": "BND", "name": "Vanguard Total Bond Market ETF", "quantity": 200, "price": 78.50, "value": 15700, "allocation": 18.47, "change": -78.00, "changePercent": -0.49}'::jsonb,
        '{"symbol": "VTI", "name": "Vanguard Total Stock Market ETF", "quantity": 25, "price": 220.20, "value": 5505, "allocation": 6.48, "change": 55.00, "changePercent": 1.01}'::jsonb
    ],
    NOW()
),
(
    gen_random_uuid(),
    'Dividend Income Portfolio',
    'Income-focused portfolio emphasizing dividend-paying stocks',
    95000.00,
    4.8,
    3.5,
    ARRAY[
        '{"symbol": "JNJ", "name": "Johnson & Johnson", "quantity": 120, "price": 165.40, "value": 19848, "allocation": 20.89, "change": 180.00, "changePercent": 0.91}'::jsonb,
        '{"symbol": "PG", "name": "Procter & Gamble", "quantity": 100, "price": 158.20, "value": 15820, "allocation": 16.65, "change": 95.00, "changePercent": 0.60}'::jsonb,
        '{"symbol": "KO", "name": "The Coca-Cola Company", "quantity": 250, "price": 62.15, "value": 15538, "allocation": 16.36, "change": 125.00, "changePercent": 0.81}'::jsonb,
        '{"symbol": "VZ", "name": "Verizon Communications", "quantity": 300, "price": 41.85, "value": 12555, "allocation": 13.22, "change": -45.00, "changePercent": -0.36}'::jsonb,
        '{"symbol": "T", "name": "AT&T Inc.", "quantity": 400, "price": 19.75, "value": 7900, "allocation": 8.32, "change": -80.00, "changePercent": -1.00}'::jsonb,
        '{"symbol": "XOM", "name": "Exxon Mobil Corporation", "quantity": 180, "price": 118.50, "value": 21330, "allocation": 22.45, "change": 360.00, "changePercent": 1.72}'::jsonb,
        '{"symbol": "CVX", "name": "Chevron Corporation", "quantity": 85, "price": 155.80, "value": 13243, "allocation": 13.94, "change": 170.00, "changePercent": 1.30}'::jsonb
    ],
    NOW()
),
(
    gen_random_uuid(),
    'ESG Sustainable Portfolio',
    'Environmentally and socially responsible investment portfolio',
    75000.00,
    6.8,
    5.5,
    ARRAY[
        '{"symbol": "TSLA", "name": "Tesla Inc.", "quantity": 80, "price": 201.25, "value": 16100, "allocation": 21.47, "change": -640.00, "changePercent": -3.83}'::jsonb,
        '{"symbol": "MSFT", "name": "Microsoft Corporation", "quantity": 40, "price": 378.85, "value": 15154, "allocation": 20.21, "change": 600.00, "changePercent": 4.12}'::jsonb,
        '{"symbol": "NFLX", "name": "Netflix Inc.", "quantity": 25, "price": 425.80, "value": 10645, "allocation": 14.19, "change": 210.00, "changePercent": 2.01}'::jsonb,
        '{"symbol": "ADBE", "name": "Adobe Inc.", "quantity": 30, "price": 485.20, "value": 14556, "allocation": 19.41, "change": 435.00, "changePercent": 3.08}'::jsonb,
        '{"symbol": "CRM", "name": "Salesforce Inc.", "quantity": 50, "price": 245.60, "value": 12280, "allocation": 16.37, "change": 245.00, "changePercent": 2.03}'::jsonb,
        '{"symbol": "SHOP", "name": "Shopify Inc.", "quantity": 85, "price": 78.90, "value": 6707, "allocation": 8.94, "change": -158.00, "changePercent": -2.30}'::jsonb
    ],
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create a function to copy sample data to user tables when they sign up
CREATE OR REPLACE FUNCTION copy_sample_data_for_user(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Copy sample datasets (limit to 2 most relevant ones)
    INSERT INTO datasets (user_id, name, description, file_name, headers, row_count, column_count, data, created_at, updated_at)
    SELECT 
        user_id, 
        name, 
        description, 
        file_name, 
        headers, 
        row_count, 
        column_count, 
        data, 
        NOW(), 
        NOW()
    FROM sample_datasets
    WHERE name IN ('Quarterly Sales Performance', 'Customer Analytics')
    ON CONFLICT DO NOTHING;

    -- Copy sample KPIs (limit to 4 most important ones)
    INSERT INTO kpis (user_id, dataset_id, name, description, formula, target_value, current_value, trend, category, created_at, updated_at)
    SELECT 
        user_id, 
        'sample-dataset', 
        name, 
        description, 
        formula, 
        target_value, 
        current_value, 
        trend, 
        category, 
        NOW(), 
        NOW()
    FROM sample_kpis
    WHERE name IN ('Monthly Revenue Growth', 'Customer Acquisition Cost', 'Conversion Rate', 'Customer Satisfaction Score')
    ON CONFLICT DO NOTHING;

    -- Copy sample dashboards (limit to 1 executive dashboard)
    INSERT INTO dashboards (user_id, name, description, layout, widgets, is_public, created_at, updated_at)
    SELECT 
        user_id, 
        name, 
        description, 
        layout, 
        widgets, 
        false, 
        NOW(), 
        NOW()
    FROM sample_dashboards
    WHERE name = 'Executive Sales Dashboard'
    ON CONFLICT DO NOTHING;

    -- Copy sample portfolios (limit to 1 balanced portfolio)
    INSERT INTO portfolios (user_id, name, description, total_value, performance, risk_score, assets, created_at, updated_at)
    SELECT 
        user_id, 
        name, 
        description, 
        total_value, 
        performance, 
        risk_score, 
        assets, 
        NOW(), 
        NOW()
    FROM sample_portfolios
    WHERE name = 'Technology Growth Portfolio'
    ON CONFLICT DO NOTHING;

EXCEPTION
    WHEN OTHERS THEN
        -- Log error but don't fail the user creation process
        RAISE NOTICE 'Error copying sample data for user %: %', user_id, SQLERRM;
END;
$$;

-- Update the handle_new_user function to include sample data
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Insert profile with proper error handling
    INSERT INTO profiles (id, email, full_name, avatar_url, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
        avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
        updated_at = NOW();

    -- Copy sample data for new user (with error handling)
    BEGIN
        PERFORM copy_sample_data_for_user(NEW.id);
    EXCEPTION
        WHEN OTHERS THEN
            -- Log the error but don't prevent user creation
            RAISE NOTICE 'Failed to copy sample data for user %: %', NEW.id, SQLERRM;
    END;

    RETURN NEW;
END;
$$;

-- Create a function to manually populate sample data for existing users
CREATE OR REPLACE FUNCTION populate_sample_data_for_existing_users()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_record RECORD;
BEGIN
    -- Loop through all existing users who don't have any datasets
    FOR user_record IN 
        SELECT p.id 
        FROM profiles p 
        LEFT JOIN datasets d ON p.id = d.user_id 
        WHERE d.id IS NULL
    LOOP
        -- Copy sample data for each user
        PERFORM copy_sample_data_for_user(user_record.id);
    END LOOP;
END;
$$;

-- Optionally run this to populate existing users with sample data
-- SELECT populate_sample_data_for_existing_users();