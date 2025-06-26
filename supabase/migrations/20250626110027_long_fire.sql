/*
  # Add phone field to profiles table

  1. Changes
    - Add `phone` column to `profiles` table
    - Column is optional (nullable)
    - No default value required

  2. Security
    - No changes to existing RLS policies
    - Phone field follows same access patterns as other profile fields
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'phone'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone text;
  END IF;
END $$;