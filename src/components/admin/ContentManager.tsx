import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Book, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ContentManager = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [contentType, setContentType] = useState("");
  const [instructor, setInstructor] = useState("");
  const [accessType, setAccessType] = useState("");
  const [formData, setFormData] = useState({
    chapter: "",
    title: "",
    description: "",
    price: 0,
    duration: 60,
    file: null as File | null
  });
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const { data, error } = await supabase
        .from('professors')
        .select('id, name')
        .eq('status', 'active');

      if (error) throw error;
      setProfessors(data || []);
    } catch (error) {
      console.error('Error fetching professors:', error);
    }
  };

  const handleUploadContent = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClass || !selectedSubject || !contentType || !instructor || !formData.title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Upload file if provided
      let fileUrl = null;
      if (formData.file) {
        const fileName = `${Date.now()}-${formData.file.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, formData.file);

        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(fileName);
        
        fileUrl = urlData.publicUrl;
      }

      // Save content to database
      const { error } = await supabase
        .from('notes')
        .insert({
          title: formData.title,
          subject: selectedSubject,
          class: selectedClass,
          preview: formData.description,
          file_url: fileUrl,
          price: formData.price,
          topics: [formData.chapter],
          is_sample: accessType === 'free'
        });

      if (error) throw error;

      toast({
        title: "Content uploaded successfully!",
        description: "Students will be notified about the new content.",
      });

      // Reset form
      setSelectedClass("");
      setSelectedSubject("");
      setContentType("");
      setInstructor("");
      setAccessType("");
      setFormData({
        chapter: "",
        title: "",
        description: "",
        price: 0,
        duration: 60,
        file: null
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Content Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUploadContent} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">Class 8</SelectItem>
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="social">Social Studies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chapter">Chapter</Label>
            <Input 
              id="chapter" 
              placeholder="e.g., Chapter 1: Algebraic Expressions"
              value={formData.chapter}
              onChange={(e) => setFormData(prev => ({ ...prev, chapter: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="note">Study Notes</SelectItem>
                <SelectItem value="lecture">Recorded Lecture</SelectItem>
                <SelectItem value="live">Live Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., Introduction to Variables"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Select value={instructor} onValueChange={setInstructor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {professors.map((prof: any) => (
                    <SelectItem key={prof.id} value={prof.id}>
                      {prof.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Brief description of the content..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input 
                id="price" 
                type="number" 
                placeholder="0 for free"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="isFree">Access Type</Label>
              <Select value={accessType} onValueChange={setAccessType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select access" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free (First Chapter)</SelectItem>
                  <SelectItem value="paid">Paid Content</SelectItem>
                  <SelectItem value="premium">Premium Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (mins)</Label>
              <Input 
                id="duration" 
                type="number" 
                placeholder="60"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <Input 
              id="file" 
              type="file" 
              accept=".pdf,.mp4,.mov,.avi"
              onChange={handleFileChange}
            />
            <p className="text-sm text-muted-foreground">PDF for notes, MP4/MOV/AVI for videos</p>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            <Upload className="w-4 h-4 mr-2" />
            {loading ? "Uploading..." : "Upload Content"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};