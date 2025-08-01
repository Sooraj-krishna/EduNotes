import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, User, Mail, GraduationCap, BookOpen, Video, ShoppingBag, Activity, Bell, Users, Clock, Edit2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface UserProgress {
  subject_name: string;
  progress_percentage: number;
  notes_count: number;
  videos_count: number;
}

interface Purchase {
  id: string;
  item_type: string;
  item_title: string;
  subject: string;
  price: number;
  purchased_at: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface LiveClass {
  id: string;
  subject: string;
  instructor: string;
  class_date: string;
  class_time: string;
}

export const UserProfile = () => {
  const { user, profile, isLoading } = useAuth();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [userClass, setUserClass] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Data states
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setUserClass(profile.class || '');
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoadingData(true);
    try {
      // Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select(`
          progress_percentage,
          notes_count,
          videos_count,
          subjects:subject_id (name)
        `)
        .eq('user_id', user.id);

      if (progressData) {
        const formattedProgress = progressData.map(item => ({
          subject_name: (item.subjects as any)?.name || 'Unknown',
          progress_percentage: item.progress_percentage,
          notes_count: item.notes_count,
          videos_count: item.videos_count
        }));
        setUserProgress(formattedProgress);
      }

      // Fetch purchases
      const { data: purchasesData } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .order('purchased_at', { ascending: false });
      
      if (purchasesData) {
        setPurchases(purchasesData);
      }

      // Fetch notifications
      const { data: notificationsData } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (notificationsData) {
        setNotifications(notificationsData);
      }

      // Fetch live classes
      const { data: liveClassesData } = await supabase
        .from('live_classes')
        .select('*')
        .order('class_date', { ascending: true });
      
      if (liveClassesData) {
        setLiveClasses(liveClassesData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          class: userClass
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (isLoading || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.avatar_url || ''} alt={profile.display_name || ''} />
                <AvatarFallback className="text-lg">
                  {profile.display_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{profile.display_name || 'User'}</h2>
                <p className="text-muted-foreground flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </p>
                {profile.class && (
                  <p className="text-muted-foreground flex items-center">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Class {profile.class}
                  </p>
                )}
                <p className="text-muted-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since {formatDate(profile.join_date)}
                </p>
              </div>
            </div>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your profile information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="class">Class</Label>
                    <Select value={userClass} onValueChange={setUserClass}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">Class 6</SelectItem>
                        <SelectItem value="7">Class 7</SelectItem>
                        <SelectItem value="8">Class 8</SelectItem>
                        <SelectItem value="9">Class 9</SelectItem>
                        <SelectItem value="10">Class 10</SelectItem>
                        <SelectItem value="11">Class 11</SelectItem>
                        <SelectItem value="12">Class 12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateProfile} disabled={isUpdating}>
                      {isUpdating ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="purchases">Purchases</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="live-classes">Live Classes</TabsTrigger>
        </TabsList>

        {/* Progress Tab */}
        <TabsContent value="progress">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Academic Progress
                </CardTitle>
                <CardDescription>Your learning progress across subjects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userProgress.length > 0 ? userProgress.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject_name}</span>
                      <span className="text-sm text-muted-foreground">
                        {subject.progress_percentage}%
                      </span>
                    </div>
                    <Progress value={subject.progress_percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{subject.notes_count} notes</span>
                      <span>{subject.videos_count} videos</span>
                    </div>
                  </div>
                )) : (
                  <p className="text-muted-foreground">No progress data available yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Purchases Tab */}
        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Purchase History
              </CardTitle>
              <CardDescription>Your past purchases and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {purchases.length > 0 ? (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{purchase.item_title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {purchase.item_type} • {purchase.subject}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(purchase.purchased_at)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${purchase.price}</p>
                        <Badge variant="secondary">Purchased</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No purchases yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your recent actions and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Activity tracking coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </CardTitle>
              <CardDescription>Stay updated with important information</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        notification.is_read ? 'bg-muted/50' : 'bg-background'
                      }`}
                      onClick={() => !notification.is_read && markNotificationAsRead(notification.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {formatDate(notification.created_at)}
                          </p>
                        </div>
                        {!notification.is_read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No notifications yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Classes Tab */}
        <TabsContent value="live-classes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Upcoming Live Classes
              </CardTitle>
              <CardDescription>Join live classes with your instructors</CardDescription>
            </CardHeader>
            <CardContent>
              {liveClasses.length > 0 ? (
                <div className="space-y-4">
                  {liveClasses.map((liveClass) => (
                    <div key={liveClass.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{liveClass.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          Instructor: {liveClass.instructor}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(liveClass.class_date)}
                          <Clock className="w-3 h-3 ml-3 mr-1" />
                          {formatTime(liveClass.class_time)}
                        </p>
                      </div>
                      <Button size="sm">
                        <Video className="w-4 h-4 mr-2" />
                        Join Class
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No upcoming live classes.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};