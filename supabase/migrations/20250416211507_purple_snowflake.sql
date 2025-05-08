/*
  # Create Daily Videos Table

  1. New Tables
    - `daily_videos`
      - `id` (uuid, primary key)
      - `video_url` (text, required)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `daily_videos` table
    - Add policies for:
      - All authenticated users can view videos
      - Only admin can insert/update videos
*/

-- Create the daily_videos table
CREATE TABLE IF NOT EXISTS daily_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE daily_videos ENABLE ROW LEVEL SECURITY;

-- Policy for viewing videos (all authenticated users)
CREATE POLICY "Allow authenticated users to view videos"
  ON daily_videos
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for inserting videos (admin only)
CREATE POLICY "Allow admin to insert videos"
  ON daily_videos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = 'fccmauro@gmail.com');

-- Policy for updating videos (admin only)
CREATE POLICY "Allow admin to update videos"
  ON daily_videos
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'fccmauro@gmail.com')
  WITH CHECK (auth.email() = 'fccmauro@gmail.com');