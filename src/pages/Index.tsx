import { useState } from "react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import TeacherIntro from "@/components/TeacherIntro";
import TuitionEnrollment from "@/components/TuitionEnrollment";
import AIChatbot from "@/components/AIChatbot";
import NotesSection from "@/components/NotesSection";
import { User, MessageCircle, BookOpen, Users, LogOut, Settings, GraduationCap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, profile, signOut, isAdmin, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('notes');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        {/* Navigation Bar for Non-Authenticated Users */}
        <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">EduTech</span>
            </div>
            <Link to="/auth">
              <Button className="bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>
        
        <Hero />
        <TeacherIntro />
        <TuitionEnrollment />
        <AIChatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar for Authenticated Users */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">EduTech</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {profile?.display_name || user.email}
            </span>
            
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
              
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Learning Dashboard</h1>
          <p className="text-muted-foreground">Access your courses, notes, and learning materials</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          <Button
            variant={activeSection === 'notes' ? 'default' : 'ghost'}
            onClick={() => setActiveSection('notes')}
            className="rounded-b-none"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Notes & Materials
          </Button>
          <Button
            variant={activeSection === 'qna' ? 'default' : 'ghost'}
            onClick={() => setActiveSection('qna')}
            className="rounded-b-none"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Q&A Forum
          </Button>
          <Button
            variant={activeSection === 'community' ? 'default' : 'ghost'}
            onClick={() => setActiveSection('community')}
            className="rounded-b-none"
          >
            <Users className="w-4 h-4 mr-2" />
            Community
          </Button>
        </div>

        {/* Content Sections */}
        {activeSection === 'notes' && <NotesSection />}
        
        {activeSection === 'qna' && (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Q&A Forum</h3>
            <p className="text-muted-foreground mb-4">Ask questions and get help from instructors and peers</p>
            <Link to="/qna">
              <Button>
                <MessageCircle className="w-4 h-4 mr-2" />
                Go to Q&A Forum
              </Button>
            </Link>
          </div>
        )}
        
        {activeSection === 'community' && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground mb-4">Connect with fellow students and share knowledge</p>
            <Button disabled>
              <Users className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          </div>
        )}
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Index;
