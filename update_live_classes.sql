-- Update live_classes table to add missing fields
-- Run this in your Supabase SQL Editor

-- Add new columns
ALTER TABLE public.live_classes 
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS class TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed')),
ADD COLUMN IF NOT EXISTS meeting_link TEXT;

-- Update existing records to have default values
UPDATE public.live_classes 
SET title = subject || ' - Live Class',
    class = '10',
    status = 'scheduled'
WHERE title IS NULL;

-- Make title and class required after setting defaults
ALTER TABLE public.live_classes 
ALTER COLUMN title SET NOT NULL,
ALTER COLUMN class SET NOT NULL;

-- Add RLS policies for live_classes (if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_classes' 
        AND policyname = 'Everyone can view live classes'
    ) THEN
        CREATE POLICY "Everyone can view live classes" ON public.live_classes
            FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'live_classes' 
        AND policyname = 'Admins can manage live classes'
    ) THEN
        CREATE POLICY "Admins can manage live classes" ON public.live_classes
            FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
    END IF;
END $$; 