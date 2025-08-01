import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your study assistant. I can help you with questions related to classes 8-10 State Syllabus. Ask me about Mathematics, Science, English, or Social Studies!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI responses for demonstration
  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('quadratic') || lowerQuestion.includes('equation')) {
      return "A quadratic equation is a polynomial equation of degree 2. The standard form is ax² + bx + c = 0. You can solve it using:\n\n1. Factorization method\n2. Quadratic formula: x = [-b ± √(b²-4ac)] / 2a\n3. Completing the square\n\nWould you like me to explain any specific method?";
    }
    
    if (lowerQuestion.includes('photosynthesis')) {
      return "Photosynthesis is the process by which plants make their own food using:\n\n• Sunlight (energy source)\n• Carbon dioxide (from air)\n• Water (from roots)\n• Chlorophyll (green pigment)\n\nEquation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂\n\nThis process occurs in chloroplasts and produces glucose and oxygen.";
    }
    
    if (lowerQuestion.includes('democracy') || lowerQuestion.includes('government')) {
      return "Democracy is a form of government where power is held by the people. Key features include:\n\n• Free and fair elections\n• Universal adult franchise\n• Rule of law\n• Fundamental rights\n• Independent judiciary\n\nIndia is the world's largest democracy with a parliamentary system of government.";
    }
    
    if (lowerQuestion.includes('tense') || lowerQuestion.includes('grammar')) {
      return "English tenses indicate the time of action:\n\n**Present Tense:**\n• Simple: I write\n• Continuous: I am writing\n• Perfect: I have written\n\n**Past Tense:**\n• Simple: I wrote\n• Continuous: I was writing\n• Perfect: I had written\n\n**Future Tense:**\n• Simple: I will write\n• Continuous: I will be writing\n• Perfect: I will have written";
    }
    
    if (lowerQuestion.includes('help') || lowerQuestion.includes('study')) {
      return "I can help you with:\n\n📚 **Mathematics:** Algebra, Geometry, Trigonometry\n🔬 **Science:** Physics, Chemistry, Biology\n📖 **English:** Grammar, Literature, Writing\n🏛️ **Social Studies:** History, Geography, Civics\n\nJust ask me specific questions about any topic! For example:\n• 'Explain quadratic equations'\n• 'What is photosynthesis?'\n• 'Help with English tenses'";
    }
    
    return "That's a great question! While I can help with basic concepts, for detailed explanations and personalized guidance, I recommend:\n\n1. Check our comprehensive notes section\n2. Join our online tuition for 1-on-1 help\n3. Ask more specific questions about the topic\n\nCould you rephrase your question or be more specific about what you'd like to learn?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getAIResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What is quadratic equation?",
    "Explain photosynthesis",
    "Types of democracy",
    "English tenses help"
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-primary/10 to-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-primary" />
            AI Study Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant help with your studies! Ask questions about any subject and get clear explanations.
          </p>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-floating">
          <CardHeader className="bg-gradient-hero text-white rounded-t-2xl">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              Chat with Study Bot
            </CardTitle>
            <p className="text-primary-foreground/80 text-sm">
              Free AI assistant for Classes 8-10 State Syllabus
            </p>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Quick Questions */}
            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-3">Quick Questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => setInputText(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <ScrollArea className="h-96 mb-6 border rounded-lg p-4 bg-muted/20">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[70%] p-3 rounded-lg whitespace-pre-wrap ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-card border border-border/50'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-2 opacity-70 ${
                        message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="bg-card border border-border/50 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your studies..."
                className="flex-1 rounded-lg"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-6 rounded-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3 text-center">
              💡 For complex problems and detailed explanations, consider joining our online tuition!
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AIChatbot;