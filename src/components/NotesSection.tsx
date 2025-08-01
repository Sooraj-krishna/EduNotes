import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Star, ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Note {
  id: string;
  title: string;
  preview: string | null;
  price: number;
  rating: number;
  pages: number;
  topics: string[];
  is_sample: boolean;
  class: string;
  subject: string;
  file_url: string | null;
}

const NotesSection = () => {
  const [activeClass, setActiveClass] = useState("8");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group notes by class and subject
  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.class]) {
      acc[note.class] = {};
    }
    if (!acc[note.class][note.subject]) {
      acc[note.class][note.subject] = [];
    }
    acc[note.class][note.subject].push(note);
    return acc;
  }, {} as Record<string, Record<string, Note[]>>);

  const handleBuyNow = (noteId: string, title: string, price: number) => {
    if (price === 0) {
      alert(`This is a free sample note! You can download it immediately.
Note: ${title}
Contact WhatsApp: +91-9876543210 for the download link.`);
      return;
    }

    // Generate UPI payment link
    const upiLink = `upi://pay?pa=teacher@okaxis&pn=Teacher&am=${price}&cu=INR&tn=Study%20Notes%20-%20${encodeURIComponent(title)}`;
    
    // Try to open UPI app
    const link = document.createElement('a');
    link.href = upiLink;
    link.click();
    
    // Show payment completion instructions
    alert(`Payment Instructions for Study Notes:

📱 Amount: ₹${price}
📚 Note: ${title}

Steps:
1. Complete the UPI payment of ₹${price}
2. Take a screenshot of payment confirmation
3. Send the screenshot to WhatsApp: +91-9876543210
4. Include this message: "Notes purchase - ${title}"

✅ After payment verification:
- You'll receive the note download link within 30 minutes
- Lifetime access to the purchased note
- Free updates when available`);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Study Notes Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive notes covering State Syllabus for Classes 8-10. 
            Prepared by experienced teachers with clear explanations and examples.
          </p>
        </div>

        <Tabs value={activeClass} onValueChange={setActiveClass} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-card shadow-soft rounded-xl p-2">
            <TabsTrigger value="8" className="text-lg py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Class 8th
            </TabsTrigger>
            <TabsTrigger value="9" className="text-lg py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Class 9th
            </TabsTrigger>
            <TabsTrigger value="10" className="text-lg py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Class 10th
            </TabsTrigger>
          </TabsList>

          {["8", "9", "10"].map((classNum) => (
            <TabsContent key={classNum} value={classNum}>
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedNotes[classNum] || {}).map(([subject, subjectNotes]) => (
                    <div key={subject} className="space-y-4">
                      <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-bold text-foreground">{subject}</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {subjectNotes.map((note) => (
                          <Card key={note.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-floating transition-all duration-300 group">
                            <CardHeader className="pb-4">
                              <div className="flex justify-between items-start mb-3">
                                <Badge variant="secondary" className={`${note.is_sample ? 'bg-green-100 text-green-700' : 'bg-primary/10 text-primary'}`}>
                                  {note.is_sample ? 'FREE SAMPLE' : 'PREMIUM'}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{note.rating.toFixed(1)}</span>
                                </div>
                              </div>
                              <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                                {note.title}
                              </CardTitle>
                            </CardHeader>
                            
                            <CardContent className="space-y-4">
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {note.preview || 'No preview available'}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <FileText className="w-4 h-4" />
                                  <span>{note.pages} pages</span>
                                </div>
                                <div className="text-lg font-bold text-primary">
                                  {note.price === 0 ? 'FREE' : `₹${note.price}`}
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {note.topics.map((topic, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                              
                              <Button
                                onClick={() => handleBuyNow(note.id, note.title, note.price)}
                                className="w-full bg-gradient-hero hover:opacity-90 text-white rounded-lg shadow-soft transition-all duration-300 hover:shadow-card hover:scale-105"
                              >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                {note.price === 0 ? 'Download Free' : `Buy Now - ₹${note.price}`}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {Object.keys(groupedNotes[classNum] || {}).length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2 text-foreground">No notes available</h3>
                      <p className="text-muted-foreground">Notes for Class {classNum} will be uploaded soon.</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default NotesSection;