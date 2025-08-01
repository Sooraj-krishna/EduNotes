import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Edit, Trash2, Mail, Phone, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Professor {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subjects: string[];
  experience: string | null;
  rating: number;
  student_count: number;
  status: string;
  bio: string | null;
  qualification: string | null;
}

export const ProfessorManager = () => {
  const { toast } = useToast();
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subjects: "",
    experience: "",
    bio: "",
    qualification: "",
    status: "active"
  });

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const { data, error } = await supabase
        .from('professors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProfessors(data || []);
    } catch (error) {
      console.error('Error fetching professors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch professors",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProfessor = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('professors')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subjects: formData.subjects ? formData.subjects.split(',').map(s => s.trim()) : [],
          experience: formData.experience || null,
          bio: formData.bio || null,
          qualification: formData.qualification || null,
          status: formData.status
        });

      if (error) throw error;

      toast({
        title: "Professor added successfully!",
        description: "New professor profile has been created.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subjects: "",
        experience: "",
        bio: "",
        qualification: "",
        status: "active"
      });

      // Refresh list
      fetchProfessors();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add professor",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProfessor = async (id: string) => {
    if (!confirm("Are you sure you want to delete this professor?")) return;

    try {
      const { error } = await supabase
        .from('professors')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Professor deleted",
        description: "Professor has been removed successfully.",
      });

      fetchProfessors();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete professor",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Professor Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add New Professor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProfessor} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profName">Full Name</Label>
                <Input 
                  id="profName" 
                  placeholder="Dr. John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profEmail">Email</Label>
                <Input 
                  id="profEmail" 
                  type="email" 
                  placeholder="john.doe@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profPhone">Phone</Label>
                <Input 
                  id="profPhone" 
                  placeholder="+91-9876543210" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profExperience">Experience</Label>
                <Input 
                  id="profExperience" 
                  placeholder="e.g., 10 years" 
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profSubjects">Subjects (comma separated)</Label>
              <Input 
                id="profSubjects" 
                placeholder="Mathematics, Physics, Chemistry" 
                value={formData.subjects}
                onChange={(e) => setFormData(prev => ({ ...prev, subjects: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profBio">Bio</Label>
              <Textarea 
                id="profBio" 
                placeholder="Brief description about the professor..." 
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="profQualification">Qualification</Label>
                <Input 
                  id="profQualification" 
                  placeholder="Ph.D in Mathematics" 
                  value={formData.qualification}
                  onChange={(e) => setFormData(prev => ({ ...prev, qualification: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profStatus">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Professor
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Professors List */}
      <Card>
        <CardHeader>
          <CardTitle>All Professors</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Subjects</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {professors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No professors found. Add your first professor above.
                    </TableCell>
                  </TableRow>
                ) : (
                  professors.map((professor) => (
                    <TableRow key={professor.id}>
                      <TableCell className="font-medium">{professor.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3" />
                            {professor.email}
                          </div>
                          {professor.phone && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="w-3 h-3" />
                              {professor.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {professor.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{professor.experience || 'Not specified'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {professor.rating.toFixed(1)}
                        </div>
                      </TableCell>
                      <TableCell>{professor.student_count}</TableCell>
                      <TableCell>
                        <Badge variant={professor.status === "active" ? "default" : "secondary"}>
                          {professor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteProfessor(professor.id)}
                          >
                            <Trash2 className="w-4 h-4" />
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