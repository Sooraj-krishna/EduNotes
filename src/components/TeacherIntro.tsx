import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Professor {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  qualification: string | null;
  experience: string | null;
  subjects: string[];
  rating: number;
  student_count: number;
  status: string;
}

const TeacherIntro = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const { data, error } = await supabase
        .from('professors')
        .select('*')
        .eq('status', 'active')
        .order('rating', { ascending: false })
        .limit(3);

      if (error) throw error;
      setProfessors(data || []);
    } catch (error) {
      console.error('Error fetching professors:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/30 to-accent/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (professors.length === 0) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-secondary/30 to-accent/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Meet Your Educators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team of qualified educators is dedicated to making learning accessible, engaging, and effective for every student
          </p>
          <div className="mt-8 p-8 bg-card rounded-lg">
            <p className="text-muted-foreground">No professors available at the moment. Check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-secondary/30 to-accent/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Meet Your Educators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our team of qualified educators is dedicated to making learning accessible, engaging, and effective for every student
          </p>
        </div>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Featured Teacher Info */}
          <div className="space-y-6">
            <Card className="bg-gradient-card border-border/50 shadow-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{professors[0]?.name || 'Featured Educator'}</h3>
                    <p className="text-muted-foreground">
                      {professors[0]?.qualification || 'M.Ed, State Syllabus Specialist'}
                    </p>
                  </div>
                </div>
                
                <p className="text-foreground/80 leading-relaxed mb-6">
                  {professors[0]?.bio || 
                    "With years of teaching experience in State Syllabus curriculum, our educators are passionate about helping students in classes 8-12 achieve their academic goals. Our teaching methodology focuses on conceptual clarity and practical application."
                  }
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {professors[0]?.subjects?.slice(0, 3).map((subject, index) => (
                    <Badge key={index} variant="secondary" className="bg-success/20 text-success-foreground">
                      {subject} Expert
                    </Badge>
                  ))}
                  <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">
                    State Board Certified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Stats & Features */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-floating transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">
                  {professors.reduce((total, prof) => total + (prof.student_count || 0), 0)}+
                </h4>
                <p className="text-muted-foreground">Students Taught</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-floating transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-success" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">
                  {professors.reduce((total, prof) => total + prof.subjects.length, 0)}+
                </h4>
                <p className="text-muted-foreground">Subjects Covered</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-floating transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">
                  {Math.round(professors.reduce((total, prof) => total + (prof.rating || 0), 0) / Math.max(professors.length, 1))}%
                </h4>
                <p className="text-muted-foreground">Success Rate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-border/50 shadow-card hover:shadow-floating transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-warning-foreground" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-2">
                  {professors.length}+
                </h4>
                <p className="text-muted-foreground">Expert Educators</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Professors */}
        {professors.length > 1 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Our Expert Team</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professors.slice(1).map((professor) => (
                <Card key={professor.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-floating transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{professor.name}</h4>
                        <p className="text-sm text-muted-foreground">{professor.qualification}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 mb-4 line-clamp-3">
                      {professor.bio || "Experienced educator dedicated to student success."}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {professor.subjects.slice(0, 2).map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeacherIntro;