import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
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