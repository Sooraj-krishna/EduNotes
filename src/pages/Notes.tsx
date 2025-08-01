import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, FileText, Star, ShoppingCart, Play, Download, Users, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Hierarchical data structure: Classes → Subjects → Chapters → Notes/Lectures
const educationData = {
  "8": {
    "Mathematics": {
      "Chapter 1: Algebraic Expressions": {
        notes: [
          {
            id: 1,
            title: "Introduction to Variables",
            preview: "Learn about variables, constants, and basic algebraic operations.",
            price: 0,
            rating: 4.8,
            pages: 15,
            topics: ["Variables", "Constants", "Basic Operations"],
            isFree: true
          },
          {
            id: 2,
            title: "Advanced Algebraic Operations", 
            preview: "Master complex algebraic manipulations and problem solving.",
            price: 99,
            rating: 4.9,
            pages: 25,
            topics: ["Like Terms", "Operations", "Factorization"],
            isFree: false
          }
        ],
        lectures: [
          {
            id: 1,
            title: "Variables & Constants - Live Class",
            duration: "45 mins",
            instructor: "Dr. Amit Kumar",
            price: 0,
            recorded: true,
            isFree: true
          },
          {
            id: 2,
            title: "Algebraic Expressions Mastery",
            duration: "60 mins", 
            instructor: "Dr. Amit Kumar",
            price: 149,
            recorded: true,
            isFree: false
          }
        ]
      },
      "Chapter 2: Linear Equations": {
        notes: [
          {
            id: 3,
            title: "Linear Equations - Basics",
            preview: "Understanding simple linear equations and their solutions.",
            price: 129,
            rating: 4.7,
            pages: 20,
            topics: ["Simple Equations", "Solution Methods"],
            isFree: false
          }
        ],
        lectures: [
          {
            id: 3,
            title: "Solving Linear Equations",
            duration: "50 mins",
            instructor: "Dr. Amit Kumar", 
            price: 179,
            recorded: true,
            isFree: false
          }
        ]
      }
    },
    "Science": {
      "Chapter 1: Light and Shadows": {
        notes: [
          {
            id: 4,
            title: "Properties of Light",
            preview: "Basic properties of light, reflection and shadow formation.",
            price: 0,
            rating: 4.9,
            pages: 12,
            topics: ["Light Properties", "Reflection", "Shadows"],
            isFree: true
          },
          {
            id: 5,
            title: "Advanced Light Concepts",
            preview: "Detailed study of refraction, dispersion and optical phenomena.",
            price: 119,
            rating: 4.8,
            pages: 28,
            topics: ["Refraction", "Dispersion", "Lenses"],
            isFree: false
          }
        ],
        lectures: [
          {
            id: 4,
            title: "Light Basics - Introduction",
            duration: "40 mins",
            instructor: "Prof. Priya Sharma",
            price: 0,
            recorded: true,
            isFree: true
          }
        ]
      },
      "Chapter 2: Sound": {
        notes: [
          {
            id: 6,
            title: "Sound Waves and Properties",
            preview: "Complete study of sound waves, their properties and applications.",
            price: 109,
            rating: 4.6,
            pages: 22,
            topics: ["Sound Waves", "Frequency", "Amplitude"],
            isFree: false
          }
        ],
        lectures: [
          {
            id: 5,
            title: "Understanding Sound Waves",
            duration: "55 mins",
            instructor: "Prof. Priya Sharma",
            price: 159,
            recorded: true,
            isFree: false
          }
        ]
      }
    }
  },
  "9": {
    "Mathematics": {
      "Chapter 1: Number Systems": {
        notes: [
          {
            id: 7,
            title: "Real Numbers Introduction",
            preview: "Free introduction to real numbers, rational and irrational numbers.",
            price: 0,
            rating: 4.8,
            pages: 16,
            topics: ["Real Numbers", "Rational Numbers"],
            isFree: true
          }
        ],
        lectures: [
          {
            id: 6,
            title: "Number Systems Overview",
            duration: "45 mins",
            instructor: "Dr. Rajesh Gupta",
            price: 0,
            recorded: true,
            isFree: true
          }
        ]
      }
    },
    "Science": {
      "Chapter 1: Matter Around Us": {
        notes: [
          {
            id: 8,
            title: "States of Matter - Basics",
            preview: "Free introduction to solid, liquid and gas states.",
            price: 0,
            rating: 4.9,
            pages: 14,
            topics: ["States of Matter", "Properties"],
            isFree: true
          }
        ],
        lectures: [
          {
            id: 7,
            title: "Matter and Its States",
            duration: "50 mins",
            instructor: "Dr. Meera Patel",
            price: 0,
            recorded: true,
            isFree: true
          }
        ]
      }
    }
  },
  "10": {
    "Mathematics": {
      "Chapter 1: Real Numbers": {
        notes: [
          {
            id: 9,
            title: "Euclid's Division Lemma",
            preview: "Free introduction to Euclid's division algorithm and its applications.",
            price: 0,
            rating: 4.9,
            pages: 18,
            topics: ["Euclid's Lemma", "HCF", "LCM"],
            isFree: true
          }
        ],
        lectures: [
          {
            id: 8,
            title: "Real Numbers Fundamentals",
            duration: "60 mins",
            instructor: "Dr. Suresh Modi",
            price: 0,
            recorded: true,
            isFree: true
          }
        ]
      }
    },
    "Science": {
      "Chapter 1: Life Processes": {
        notes: [
          {
            id: 10,
            title: "Life Processes - Introduction",
            preview: "Free introduction to basic life processes in living organisms.",
            price: 0,
            rating: 4.8,
            pages: 20,
            topics: ["Life Processes", "Nutrition", "Respiration"],
            isFree: true
          }
        ],
        lectures: [
          {
            id: 9,
            title: "Understanding Life Processes",
            duration: "55 mins",
            instructor: "Dr. Kavita Singh",
            price: 0,
            recorded: true,
            isFree: true
          }
        ]
      }
    }
  }
};

const Notes = () => {
  const [currentView, setCurrentView] = useState("classes"); // classes, subjects, chapters, content
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [breadcrumb, setBreadcrumb] = useState([]);

  const handleClassSelect = (classNum) => {
    setSelectedClass(classNum);
    setCurrentView("subjects");
    setBreadcrumb([`Class ${classNum}`]);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentView("chapters");
    setBreadcrumb([`Class ${selectedClass}`, subject]);
  };

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setCurrentView("content");
    setBreadcrumb([`Class ${selectedClass}`, selectedSubject, chapter]);
  };

  const handleBack = () => {
    if (currentView === "content") {
      setCurrentView("chapters");
      setSelectedChapter("");
      setBreadcrumb([`Class ${selectedClass}`, selectedSubject]);
    } else if (currentView === "chapters") {
      setCurrentView("subjects");
      setSelectedSubject("");
      setBreadcrumb([`Class ${selectedClass}`]);
    } else if (currentView === "subjects") {
      setCurrentView("classes");
      setSelectedClass("");
      setBreadcrumb([]);
    }
  };

  const handleBuyNow = (itemId, title, price, type = "note") => {
    if (price === 0) {
      alert(`This is a free ${type}! You can access it immediately.
${type}: ${title}
Contact WhatsApp: +91-9876543210 for the download link.`);
      return;
    }

    // Generate UPI payment link
    const upiLink = `upi://pay?pa=teacher@okaxis&pn=Teacher&am=${price}&cu=INR&tn=Purchase%20${encodeURIComponent(title)}`;
    
    // Try to open UPI app, fallback to alert with instructions
    const link = document.createElement('a');
    link.href = upiLink;
    link.click();
    
    // Show payment instructions
    alert(`Payment Instructions:
1. Click the UPI link to open your payment app
2. Verify amount: ₹${price}
3. Complete the payment
4. Screenshot the payment confirmation
5. Send it to WhatsApp: +91-9876543210 with ${type} ID: ${itemId}
6. You'll receive the ${type} within 2 hours!`);
  };

  const renderBreadcrumb = () => (
    <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
      <Link to="/" className="hover:text-primary">Home</Link>
      <ChevronRight className="w-4 h-4" />
      <span className="hover:text-primary cursor-pointer" onClick={() => setCurrentView("classes")}>Notes</span>
      {breadcrumb.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{item}</span>
        </div>
      ))}
    </div>
  );

  const renderClasses = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
          Select Your Class
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your class to access comprehensive study materials and recorded lectures.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {Object.keys(educationData).map((classNum) => (
          <Card 
            key={classNum} 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group bg-gradient-card"
            onClick={() => handleClassSelect(classNum)}
          >
            <CardContent className="text-center py-12">
              <div className="text-4xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform">
                {classNum}
              </div>
              <h3 className="text-xl font-semibold mb-2">Class {classNum}th</h3>
              <p className="text-muted-foreground">
                {Object.keys(educationData[classNum]).length} Subjects Available
              </p>
              <ChevronRight className="w-6 h-6 mx-auto mt-4 text-primary" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSubjects = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
          Class {selectedClass} - Select Subject
        </h2>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(educationData[selectedClass]).map((subject) => (
          <Card 
            key={subject} 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => handleSubjectSelect(subject)}
          >
            <CardContent className="text-center py-8">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{subject}</h3>
              <p className="text-muted-foreground">
                {Object.keys(educationData[selectedClass][subject]).length} Chapters
              </p>
              <ChevronRight className="w-5 h-5 mx-auto mt-3 text-primary" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderChapters = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
          {selectedSubject} - Select Chapter
        </h2>
      </div>
      
      <div className="grid gap-6">
        {Object.keys(educationData[selectedClass][selectedSubject]).map((chapter, index) => {
          const chapterData = educationData[selectedClass][selectedSubject][chapter];
          const isFirstChapter = index === 0;
          
          return (
            <Card 
              key={chapter} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
              onClick={() => handleChapterSelect(chapter)}
            >
              <CardContent className="py-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{chapter}</h3>
                      {isFirstChapter && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          FREE ACCESS
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {chapterData.notes?.length || 0} Notes
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="w-4 h-4" />
                        {chapterData.lectures?.length || 0} Lectures
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    const chapterData = educationData[selectedClass][selectedSubject][selectedChapter];
    const isFirstChapter = Object.keys(educationData[selectedClass][selectedSubject])[0] === selectedChapter;
    
    return (
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            {selectedChapter}
          </h2>
          {isFirstChapter && (
            <Badge className="bg-green-100 text-green-700 border-green-200 mb-4">
              First Chapter - FREE ACCESS
            </Badge>
          )}
        </div>

        {/* Notes Section */}
        {chapterData.notes && chapterData.notes.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Study Notes
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapterData.notes.map((note) => {
                const accessAllowed = isFirstChapter || note.isFree;
                
                return (
                  <Card key={note.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-floating transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="secondary" className={`${note.isFree || accessAllowed ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>
                          {note.isFree || accessAllowed ? 'FREE' : 'PREMIUM'}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-muted-foreground">{note.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {note.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {note.preview}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{note.pages} pages</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{note.topics.length} topics</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {note.topics.slice(0, 3).map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {note.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{note.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-2xl font-bold text-primary">
                          {accessAllowed ? 'FREE' : `₹${note.price}`}
                        </div>
                        <Button 
                          onClick={() => handleBuyNow(note.id, note.title, accessAllowed ? 0 : note.price, "note")}
                          className={`${accessAllowed ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-hero hover:opacity-90'} text-white px-6 py-2 rounded-lg shadow-soft transition-all duration-300 hover:shadow-card hover:scale-105`}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {accessAllowed ? 'Download Free' : 'Buy Now'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Lectures Section */}
        {chapterData.lectures && chapterData.lectures.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Play className="w-6 h-6" />
              Recorded Lectures
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {chapterData.lectures.map((lecture) => {
                const accessAllowed = isFirstChapter || lecture.isFree;
                
                return (
                  <Card key={lecture.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-floating transition-all duration-300 group">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="secondary" className={`${lecture.isFree || accessAllowed ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>
                          {lecture.isFree || accessAllowed ? 'FREE' : 'PREMIUM'}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {lecture.duration}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {lecture.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>Instructor: {lecture.instructor}</span>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-2xl font-bold text-primary">
                          {accessAllowed ? 'FREE' : `₹${lecture.price}`}
                        </div>
                        <Button 
                          onClick={() => handleBuyNow(lecture.id, lecture.title, accessAllowed ? 0 : lecture.price, "lecture")}
                          className={`${accessAllowed ? 'bg-green-600 hover:bg-green-700' : 'bg-gradient-hero hover:opacity-90'} text-white px-6 py-2 rounded-lg shadow-soft transition-all duration-300 hover:shadow-card hover:scale-105`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {accessAllowed ? 'Watch Free' : 'Buy Access'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            {currentView !== "classes" ? (
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            )}
            <h1 className="text-2xl font-bold text-foreground">Study Notes</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {currentView !== "classes" && renderBreadcrumb()}
          
          {currentView === "classes" && renderClasses()}
          {currentView === "subjects" && renderSubjects()}
          {currentView === "chapters" && renderChapters()}
          {currentView === "content" && renderContent()}
        </div>
      </section>
    </div>
  );
};

export default Notes;