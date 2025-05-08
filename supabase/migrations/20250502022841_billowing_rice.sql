/*
  # Create Admin Access Codes Table

  1. New Tables
    - `admin_access_codes`
      - `id` (uuid, primary key)
      - `code` (text, required)
      - `created_by` (text, required)
      - `created_at` (timestamp with time zone)
      - `active` (boolean)

  2. Security
    - Enable RLS on `admin_access_codes` table
    - Add policies for:
      - Only admin can create/manage access codes
      - Authenticated users can verify codes
*/

CREATE TABLE IF NOT EXISTS admin_access_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL,
  created_by text NOT NULL,
  created_at timestamptz DEFAULT now(),
  active boolean DEFAULT true
);

ALTER TABLE admin_access_codes ENABLE ROW LEVEL SECURITY;

-- Policy for admin to manage codes
CREATE POLICY "Allow admin to manage access codes"
  ON admin_access_codes
  FOR ALL
  TO authenticated
  USING (auth.email() = 'fccmauro@gmail.com')
  WITH CHECK (auth.email() = 'fccmauro@gmail.com');

-- Policy for users to verify codes
CREATE POLICY "Allow users to verify codes"
  ON admin_access_codes
  FOR SELECT
  TO authenticated
  USING (active = true);