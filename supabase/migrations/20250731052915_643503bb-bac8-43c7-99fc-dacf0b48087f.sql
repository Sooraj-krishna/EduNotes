-- Create professors table
CREATE TABLE public.professors (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    phone text,
    subjects text[] NOT NULL DEFAULT '{}',
    experience text,
    bio text,
    qualification text,
    rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    student_count integer DEFAULT 0,
    status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    avatar_url text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    email text,
    phone text,
    class text NOT NULL,
    subjects text[] DEFAULT '{}',
    enrollment_status text DEFAULT 'pending' CHECK (enrollment_status IN ('pending', 'enrolled', 'inactive')),
    enrollment_date timestamp with time zone,
    last_active timestamp with time zone DEFAULT now(),
    whatsapp text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create notes table
CREATE TABLE public.notes (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    preview text,
    price numeric DEFAULT 0 CHECK (price >= 0),
    rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    pages integer DEFAULT 0,
    topics text[] DEFAULT '{}',
    is_sample boolean DEFAULT false,
    class text NOT NULL,
    subject text NOT NULL,
    file_url text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create tuition_plans table
CREATE TABLE public.tuition_plans (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    price numeric NOT NULL CHECK (price >= 0),
    subject_count integer,
    subjects_included text DEFAULT 'All',
    features text[] DEFAULT '{}',
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.professors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tuition_plans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for professors
CREATE POLICY "Everyone can view professors" ON public.professors
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage professors" ON public.professors
    FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for students
CREATE POLICY "Students can view their own data" ON public.students
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Students can update their own data" ON public.students
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Students can insert their own data" ON public.students
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all students" ON public.students
    FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for notes
CREATE POLICY "Everyone can view notes" ON public.notes
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage notes" ON public.notes
    FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for tuition_plans
CREATE POLICY "Everyone can view active tuition plans" ON public.tuition_plans
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage tuition plans" ON public.tuition_plans
    FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_professors_updated_at
    BEFORE UPDATE ON public.professors
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON public.students
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
    BEFORE UPDATE ON public.notes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tuition_plans_updated_at
    BEFORE UPDATE ON public.tuition_plans
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();