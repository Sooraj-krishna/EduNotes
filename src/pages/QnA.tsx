import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Filter,
  Search,
  ArrowLeft,
  Clock,
  CheckCircle,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const QnA = () => {
  const [questions] = useState([
    {
      id: 1,
      title: "How to solve quadratic equations with complex roots?",
      content: "I'm having trouble understanding how to find complex roots in quadratic equations. Can someone explain the discriminant method?",
      author: "Rahul Kumar",
      class: "10",
      subject: "Mathematics",
      timestamp: "2 hours ago",
      likes: 12,
      answers: 3,
      tags: ["quadratic", "complex-numbers", "discriminant"],
      solved: false
    },
    {
      id: 2,
      title: "Difference between DNA and RNA structure",
      content: "What are the main structural differences between DNA and RNA? I understand the basic concept but need clarification on the sugar component.",
      author: "Priya Singh",
      class: "9",
      subject: "Science",
      timestamp: "4 hours ago",
      likes: 8,
      answers: 5,
      tags: ["dna", "rna", "genetics"],
      solved: true
    },
    {
      id: 3,
      title: "Shakespeare's writing style in Hamlet",
      content: "Can someone help me understand the literary devices used by Shakespeare in Hamlet? Specifically looking for examples of metaphors and symbolism.",
      author: "Amit Sharma",
      class: "10",
      subject: "English",
      timestamp: "1 day ago",
      likes: 15,
      answers: 7,
      tags: ["shakespeare", "hamlet", "literary-devices"],
      solved: true
    }
  ]);

  const [answers] = useState([
    {
      id: 1,
      questionId: 1,
      content: "For quadratic equations with complex roots, you need to use the discriminant (b²-4ac). When the discriminant is negative, you get complex roots. The formula becomes x = (-b ± √(discriminant))/2a, where √(negative) gives you imaginary numbers.",
      author: "Sarah Teacher",
      timestamp: "1 hour ago",
      likes: 8,
      isTeacher: true,
      helpful: true
    },
    {
      id: 2,
      questionId: 1,
      content: "I found this helpful: DNA has deoxyribose sugar while RNA has ribose sugar. Also, DNA is double-stranded and RNA is single-stranded. DNA uses A,T,G,C bases while RNA uses A,U,G,C.",
      author: "Student Helper",
      timestamp: "30 mins ago",
      likes: 5,
      isTeacher: false,
      helpful: false
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    subject: "",
    class: ""
  });

  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [newAnswer, setNewAnswer] = useState("");

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Question submitted successfully! It will be visible to all students and teachers.");
    setNewQuestion({ title: "", content: "", subject: "", class: "" });
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Answer submitted successfully!");
    setNewAnswer("");
    setSelectedQuestion(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Student Q&A Platform</h1>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {questions.length} Active Questions
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="browse" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Browse Questions
            </TabsTrigger>
            <TabsTrigger value="ask" className="gap-2">
              <Send className="w-4 h-4" />
              Ask Question
            </TabsTrigger>
          </TabsList>

          {/* Browse Questions Tab */}
          <TabsContent value="browse">
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                        <Input placeholder="Search questions..." className="pl-10" />
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="social">Social Studies</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Classes</SelectItem>
                        <SelectItem value="8">Class 8</SelectItem>
                        <SelectItem value="9">Class 9</SelectItem>
                        <SelectItem value="10">Class 10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Questions List */}
              <div className="space-y-4">
                {questions.map((question) => (
                  <Card key={question.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {question.solved && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
                              {question.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground mb-3 line-clamp-2">
                            {question.content}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {question.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-2">
                            Class {question.class} • {question.subject}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {question.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>{question.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{question.timestamp}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{question.likes}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {question.answers} answers
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedQuestion(question.id)}
                          >
                            Answer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Ask Question Tab */}
          <TabsContent value="ask">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Ask a New Question
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuestionSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="questionClass">Your Class</label>
                      <Select value={newQuestion.class} onValueChange={(value) => setNewQuestion({...newQuestion, class: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">Class 8</SelectItem>
                          <SelectItem value="9">Class 9</SelectItem>
                          <SelectItem value="10">Class 10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="questionSubject">Subject</label>
                      <Select value={newQuestion.subject} onValueChange={(value) => setNewQuestion({...newQuestion, subject: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mathematics">Mathematics</SelectItem>
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="social">Social Studies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="questionTitle">Question Title</label>
                    <Input 
                      id="questionTitle"
                      value={newQuestion.title}
                      onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                      placeholder="e.g., How to solve quadratic equations?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="questionContent">Question Details</label>
                    <Textarea 
                      id="questionContent"
                      value={newQuestion.content}
                      onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
                      placeholder="Describe your question in detail. Include any specific concepts you're struggling with..."
                      rows={6}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Post Question
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Answer Modal/Form */}
        {selectedQuestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Answer Question</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedQuestion(null)}>
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAnswerSubmit} className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold mb-2">
                      {questions.find(q => q.id === selectedQuestion)?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {questions.find(q => q.id === selectedQuestion)?.content}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="answer">Your Answer</label>
                    <Textarea 
                      id="answer"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      placeholder="Provide a helpful answer to this question..."
                      rows={6}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Answer
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setSelectedQuestion(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default QnA;