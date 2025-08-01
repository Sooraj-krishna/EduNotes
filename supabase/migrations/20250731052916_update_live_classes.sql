-- Update live_classes table to add missing fields
ALTER TABLE public.live_classes 
ADD COLUMN title TEXT,
ADD COLUMN class TEXT,
ADD COLUMN status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed')),
ADD COLUMN meeting_link TEXT;

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

-- Add RLS policies for live_classes
CREATE POLICY "Everyone can view live classes" ON public.live_classes
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage live classes" ON public.live_classes
    FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)); 