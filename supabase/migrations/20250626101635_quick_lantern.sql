/*
  # Create demo user for authentication

  1. New Data
    - Creates a demo user in the auth.users table
    - Creates corresponding profile in profiles table
    - Email: demo@vizmind.com
    - Password: demo123 (hashed)

  2. Security
    - User is email confirmed by default
    - Profile follows existing RLS policies

  3. Purpose
    - Provides working demo credentials for testing
    - Ensures authentication modal works out of the box
*/

-- Insert demo user into auth.users table
-- Note: This uses Supabase's internal auth schema
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
  'demo-user-0000-0000-0000-000000000001',
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
  '{"provider": "email", "providers": ["email"]}',
  '{"full_name": "Demo User"}',
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
  'demo-user-0000-0000-0000-000000000001',
  'demo@vizmind.com',
  'Demo User',
  NULL,
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  updated_at = NOW();

-- Create some sample data for the demo user
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
  'demo-user-0000-0000-0000-000000000001',
  'Sample Sales Data',
  'Demo dataset showing quarterly sales performance',
  'sales_data.csv',
  ARRAY['Quarter', 'Revenue', 'Units Sold', 'Region'],
  4,
  4,
  '[
    {"Quarter": "Q1 2024", "Revenue": 125000, "Units Sold": 450, "Region": "North"},
    {"Quarter": "Q2 2024", "Revenue": 142000, "Units Sold": 520, "Region": "North"},
    {"Quarter": "Q3 2024", "Revenue": 138000, "Units Sold": 495, "Region": "South"},
    {"Quarter": "Q4 2024", "Revenue": 156000, "Units Sold": 580, "Region": "West"}
  ]'::jsonb,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

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
  'demo-user-0000-0000-0000-000000000001',
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
) ON CONFLICT DO NOTHING;

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
  'demo-user-0000-0000-0000-000000000001',
  'Sales Performance Dashboard',
  'Overview of quarterly sales metrics and trends',
  '{}'::jsonb,
  ARRAY['{"type": "chart", "title": "Revenue Trend", "data": "sales_data"}'::jsonb],
  false,
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;