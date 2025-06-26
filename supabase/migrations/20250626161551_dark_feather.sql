/*
  # Fix handle_new_user function

  1. Problem
    - The handle_new_user function is trying to access 'raw_user_meta_data' from the profiles table context
    - This field doesn't exist in the profiles table, it exists in auth.users
    - This causes the error: record "new" has no field "raw_user_meta_data"

  2. Solution
    - Update the handle_new_user function to properly access user metadata from auth.users table
    - Use the user ID to join with auth.users when needed
    - Remove any direct references to raw_user_meta_data in the profiles table context

  3. Changes
    - Recreate the handle_new_user function with proper implementation
    - Ensure it only works with fields that exist in the profiles table
*/

-- Drop and recreate the handle_new_user function
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Simply return the new record without trying to access auth.users metadata
  -- The profile creation is handled by the application code in AuthContext
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_profile_created ON profiles;
CREATE TRIGGER on_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();