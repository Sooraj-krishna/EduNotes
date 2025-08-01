import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, Clock, Calendar, CheckCircle, Phone, Mail, User, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface TuitionPlan {
  id: string;
  name: string;
  price: number;
  subject_count: number | null;
  subjects_included: string;
  features: string[];
  is_active: boolean;
  display_order: number;
}

const TuitionEnrollment = () => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    whatsapp: "",
    email: "",
    subjects: [] as string[]
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tuitionPlans, setTuitionPlans] = useState<TuitionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTuitionPlans();
  }, []);

  const fetchTuitionPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('tuition_plans')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTuitionPlans(data || []);
    } catch (error) {
      console.error('Error fetching tuition plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjects = ["Mathematics", "Science", "English", "Social Studies", "Hindi"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleEnrollment = async (planId: string, planName: string, price: number) => {
    // Validate form
    if (!formData.name || !formData.class || !formData.whatsapp || !formData.email) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields before proceeding to payment.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.whatsapp.match(/^[6-9]\d{9}$/)) {
      toast({
        title: "Invalid WhatsApp Number",
        description: "Please enter a valid 10-digit WhatsApp number.",
        variant: "destructive"
      });
      return;
    }

    // Generate UPI payment link
    const upiLink = `upi://pay?pa=teacher@okaxis&pn=Teacher&am=${price}&cu=INR&tn=Tuition%20Enrollment%20-%20${encodeURIComponent(planName)}%20Class%20${formData.class}`;
    
    // Try to open UPI app
    const link = document.createElement('a');
    link.href = upiLink;
    link.click();
    
    // Show payment completion instructions
    alert(`Payment Instructions for ${planName}:

📱 Amount: ₹${price}
📚 Plan: ${planName} - Class ${formData.class}
👤 Student: ${formData.name}

Steps:
1. Complete the UPI payment of ₹${price}
2. Take a screenshot of payment confirmation
3. Send the screenshot to WhatsApp: +91-9876543210
4. Include this message: "Tuition enrollment - ${formData.name}, Class ${formData.class}, ${planName}"

✅ After payment verification:
- You'll receive WhatsApp group link within 2 hours
- Class schedule will be shared
- Study materials access will be provided
- First class within 24 hours!`);

    setIsSubmitted(true);
    toast({
      title: "Enrollment Initiated!",
      description: "Complete the payment to confirm your enrollment. Check WhatsApp for further instructions.",
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-success/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-card border-success/30 shadow-floating">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Enrollment Submitted Successfully!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Thank you {formData.name}! Complete your payment to start your learning journey.
              </p>
              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-foreground mb-3">Next Steps:</h3>
                <div className="text-left space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Complete UPI payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Send payment screenshot to WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <span>Receive group link within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>First class within 24 hours</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mt-4"
              >
                Enroll Another Student
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-accent/20 to-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Join Online Tuition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Personalized online classes for State Syllabus students. 
            Interactive sessions, doubt clearing, and regular assessments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enrollment Form */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Student Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter student's full name"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="class" className="text-foreground font-medium">
                  Class *
                </Label>
                <Select onValueChange={(value) => handleInputChange("class", value)}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8">Class 8th</SelectItem>
                    <SelectItem value="9">Class 9th</SelectItem>
                    <SelectItem value="10">Class 10th</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-foreground font-medium">
                  WhatsApp Number *
                </Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                  placeholder="Enter 10-digit WhatsApp number"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-foreground font-medium">
                  Preferred Subjects (Optional)
                </Label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant={formData.subjects.includes(subject) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 ${
                        formData.subjects.includes(subject)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => handleSubjectToggle(subject)}
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tuition Plans */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-6">
              <GraduationCap className="w-6 h-6 text-primary" />
              Choose Your Plan
            </h3>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : tuitionPlans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No tuition plans available at the moment.
              </div>
            ) : (
              tuitionPlans.map((plan) => (
                <Card key={plan.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-floating transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-foreground">{plan.name}</h4>
                        <p className="text-muted-foreground">
                          {plan.subject_count ? `${plan.subject_count} Subject${plan.subject_count > 1 ? 's' : ''}` : plan.subjects_included}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₹{plan.price}</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={() => handleEnrollment(plan.id, plan.name, plan.price)}
                      className="w-full bg-gradient-hero hover:opacity-90 text-white rounded-lg shadow-soft transition-all duration-300 hover:shadow-card hover:scale-105"
                    >
                      Enroll Now - ₹{plan.price}/month
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TuitionEnrollment;