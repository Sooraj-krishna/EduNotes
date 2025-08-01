import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Users, Video, Edit, Trash2, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LiveClass {
  id: string;
  instructor: string;
  subject: string;
  class_date: string;
  class_time: string;
  created_at: string;
  title?: string;
  class?: string;
  status?: string;
}

export const LiveClassManager = () => {
  const { toast } = useToast();
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    subject: "",
    class: "",
    class_date: "",
    class_time: "",
    meeting_link: ""
  });

  useEffect(() => {
    fetchLiveClasses();
    fetchProfessors();
  }, []);

  const fetchLiveClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('live_classes')
        .select('*')
        .order('class_date', { ascending: true });

      if (error) throw error;
      setLiveClasses(data || []);
    } catch (error) {
      console.error('Error fetching live classes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch live classes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleScheduleClass = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.instructor || !formData.subject || !formData.class || !formData.class_date || !formData.class_time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('live_classes')
        .insert({
          title: formData.title,
          instructor: formData.instructor,
          subject: formData.subject,
          class: formData.class,
          class_date: formData.class_date,
          class_time: formData.class_time
        });

      if (error) throw error;

      toast({
        title: "Live class scheduled successfully!",
        description: "Students will be notified about the upcoming class.",
      });

      // Reset form
      setFormData({
        title: "",
        instructor: "",
        subject: "",
        class: "",
        class_date: "",
        class_time: "",
        meeting_link: ""
      });

      // Refresh list
      fetchLiveClasses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to schedule live class",
        variant: "destructive"
      });
    }
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm("Are you sure you want to delete this live class?")) return;

    try {
      const { error } = await supabase
        .from('live_classes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Live class deleted",
        description: "Live class has been removed successfully.",
      });

      fetchLiveClasses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete live class",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="secondary">Scheduled</Badge>;
      case 'live':
        return <Badge variant="default" className="bg-green-500">Live</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Schedule Live Class Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule Live Class
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleScheduleClass} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="classTitle">Class Title</Label>
                <Input 
                  id="classTitle" 
                  placeholder="Mathematics - Quadratic Equations"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Select value={formData.instructor} onValueChange={(value) => setFormData(prev => ({ ...prev, instructor: value }))}>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select value={formData.class} onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}>
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
                <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
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
              <div className="space-y-2">
                <Label htmlFor="classDate">Date</Label>
                <Input 
                  id="classDate" 
                  type="date"
                  value={formData.class_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, class_date: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="classTime">Time</Label>
                <Input 
                  id="classTime" 
                  type="time"
                  value={formData.class_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, class_time: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meetingLink">Meeting Link (Optional)</Label>
                <Input 
                  id="meetingLink" 
                  placeholder="https://meet.google.com/..."
                  value={formData.meeting_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, meeting_link: e.target.value }))}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Live Class
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Live Classes List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Scheduled Live Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveClasses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No live classes scheduled. Schedule your first class above.
                    </TableCell>
                  </TableRow>
                ) : (
                  liveClasses.map((liveClass) => (
                    <TableRow key={liveClass.id}>
                      <TableCell className="font-medium">{liveClass.title}</TableCell>
                      <TableCell>{liveClass.instructor}</TableCell>
                      <TableCell>{liveClass.subject}</TableCell>
                      <TableCell>Class {liveClass.class}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="w-3 h-3" />
                            {new Date(liveClass.class_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-3 h-3" />
                            {liveClass.class_time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(liveClass.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteClass(liveClass.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};