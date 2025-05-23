/*
  # Create chat system tables

  1. New Tables
    - `chats`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, references auth.users)
      - `doctor_id` (uuid, references auth.users)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `chat_id` (uuid, references chats)
      - `content` (text)
      - `is_doctor` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for chat access and message creation
*/

-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES auth.users(id) NOT NULL,
  doctor_id uuid REFERENCES auth.users(id) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid REFERENCES chats(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  is_doctor boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies for chats
CREATE POLICY "Users can view their own chats"
  ON chats
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = patient_id OR 
    auth.uid() = doctor_id
  );

CREATE POLICY "Patients can create chats"
  ON chats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = patient_id);

-- Policies for chat_messages
CREATE POLICY "Users can view messages from their chats"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chats
      WHERE chats.id = chat_messages.chat_id
      AND (chats.patient_id = auth.uid() OR chats.doctor_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages to their chats"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chats
      WHERE chats.id = chat_messages.chat_id
      AND (
        (chats.patient_id = auth.uid() AND NOT is_doctor) OR
        (chats.doctor_id = auth.uid() AND is_doctor)
      )
    )
  );