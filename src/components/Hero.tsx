import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/components/assets/hero-education.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Students studying together in a modern environment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-floating border border-border/50">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
            Unlock Your Academic Potential
          </h1>
          
          <blockquote className="text-xl md:text-2xl text-muted-foreground mb-8 italic font-medium">
            "Education is the most powerful weapon which you can use to change the world."
            <footer className="text-base mt-2 text-foreground/70">— Nelson Mandela</footer>
          </blockquote>
          
          <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed">
            Master State Syllabus subjects for Classes 8-10 with comprehensive notes and personalized online tuition. 
            Your academic success starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/notes">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-soft transition-all duration-300 hover:shadow-card hover:scale-105"
              >
                Explore Notes
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-lg font-semibold rounded-xl shadow-soft transition-all duration-300 hover:shadow-card hover:scale-105"
            >
              Join Tuition
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/30 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-success/30 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Hero;