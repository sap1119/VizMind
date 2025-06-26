import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey || 
    supabaseUrl === 'https://your-project.supabase.co' || 
    supabaseAnonKey === 'your-anon-key-here' ||
    supabaseUrl === 'https://demo.supabase.co' ||
    supabaseAnonKey === 'demo-key') {
  console.error('❌ Supabase configuration error:');
  console.error('Please update your .env file with valid Supabase credentials.');
  console.error('1. Go to https://app.supabase.com');
  console.error('2. Select your project');
  console.error('3. Go to Settings > API');
  console.error('4. Copy your Project URL and anon key to .env file');
  console.error('5. Restart the development server');
  
  throw new Error('Supabase configuration is missing or invalid. Please check your .env file.');
}

// Create client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      datasets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          file_name: string;
          headers: string[];
          row_count: number;
          column_count: number;
          data: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          file_name: string;
          headers: string[];
          row_count: number;
          column_count: number;
          data: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          file_name?: string;
          headers?: string[];
          row_count?: number;
          column_count?: number;
          data?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      dashboards: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          layout: any;
          widgets: any[];
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          layout?: any;
          widgets?: any[];
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          layout?: any;
          widgets?: any[];
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      kpis: {
        Row: {
          id: string;
          user_id: string;
          dataset_id: string;
          name: string;
          description: string | null;
          formula: string;
          target_value: number | null;
          current_value: number;
          trend: 'up' | 'down' | 'stable';
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          dataset_id: string;
          name: string;
          description?: string | null;
          formula: string;
          target_value?: number | null;
          current_value: number;
          trend?: 'up' | 'down' | 'stable';
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          dataset_id?: string;
          name?: string;
          description?: string | null;
          formula?: string;
          target_value?: number | null;
          current_value?: number;
          trend?: 'up' | 'down' | 'stable';
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      portfolios: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          total_value: number;
          performance: number;
          risk_score: number;
          assets: any[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          total_value: number;
          performance: number;
          risk_score: number;
          assets: any[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          total_value?: number;
          performance?: number;
          risk_score?: number;
          assets?: any[];
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};