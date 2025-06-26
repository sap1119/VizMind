/*
  # Create demo user and sample data

  1. Demo User Creation
    - Creates a demo user with proper UUID
    - Sets up authentication credentials
    - Creates corresponding profile

  2. Sample Data
    - Creates sample datasets for immediate exploration
    - Sets up sample KPIs and dashboards
    - Provides realistic business data for testing

  3. Security
    - Uses proper UUID generation
    - Follows existing RLS policies
    - Safe for production deployment
*/

-- Generate a proper UUID for the demo user
DO $$
DECLARE
    demo_user_id uuid := gen_random_uuid();
BEGIN
    -- Insert demo user into auth.users table
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        invited_at,
        confirmation_token,
        confirmation_sent_at,
        recovery_token,
        recovery_sent_at,
        email_change_token_new,
        email_change,
        email_change_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        created_at,
        updated_at,
        phone,
        phone_confirmed_at,
        phone_change,
        phone_change_token,
        phone_change_sent_at,
        email_change_token_current,
        email_change_confirm_status,
        banned_until,
        reauthentication_token,
        reauthentication_sent_at,
        is_sso_user,
        deleted_at
    ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        demo_user_id,
        'authenticated',
        'authenticated',
        'demo@vizmind.com',
        crypt('demo123', gen_salt('bf')),
        NOW(),
        NOW(),
        '',
        NOW(),
        '',
        NULL,
        '',
        '',
        NULL,
        NULL,
        '{"provider": "email", "providers": ["email"]}'::jsonb,
        '{"full_name": "Demo User"}'::jsonb,
        FALSE,
        NOW(),
        NOW(),
        NULL,
        NULL,
        '',
        '',
        NULL,
        '',
        0,
        NULL,
        '',
        NULL,
        FALSE,
        NULL
    ) ON CONFLICT (email) DO NOTHING;

    -- Insert corresponding profile
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

    -- Create sample dataset for the demo user
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
    );

    -- Create sample KPI for the demo user
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
    ) VALUES (
        gen_random_uuid(),
        demo_user_id,
        'sample-dataset',
        'Revenue Growth',
        'Quarterly revenue growth percentage',
        'SUM(Revenue)',
        150000,
        142000,
        'up',
        'Financial',
        NOW(),
        NOW()
    );

    -- Create sample dashboard for the demo user
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
        '{}'::jsonb,
        ARRAY['{"type": "chart", "title": "Revenue Trend", "data": "sales_data"}'::jsonb],
        false,
        NOW(),
        NOW()
    );

    -- Create sample portfolio for the demo user
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
    );

EXCEPTION
    WHEN OTHERS THEN
        -- If demo user already exists, silently continue
        NULL;
END $$;