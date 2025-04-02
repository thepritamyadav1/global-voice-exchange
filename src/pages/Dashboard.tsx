
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, BarChart, DollarSign, Clock, User, Star, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, getUserFeedback, UserProfile, UserFeedback } from "@/utils/database";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { userId, userName, isAuthenticated, userRole } = useAuth();
  
  // State for user data
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userFeedback, setUserFeedback] = useState<UserFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    if (isAuthenticated && userId) {
      const profile = getUserProfile(userId);
      const feedback = getUserFeedback(userId);
      
      setUserProfile(profile);
      setUserFeedback(feedback);
      setIsLoading(false);
    }
  }, [isAuthenticated, userId]);

  // Function to handle navigation to submit feedback
  const handleSubmitFeedback = () => {
    navigate("/submit-feedback");
  };

  // Calculate points to next level
  const pointsToNextLevel = userProfile ? userProfile.nextLevelPoints - userProfile.points : 0;

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading your dashboard...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">User Dashboard</h1>
              <p className="text-foreground/70">Welcome back, {userName || "User"}!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full sm:w-auto">
              <Button 
                onClick={handleSubmitFeedback}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Submit New Feedback
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="submissions">My Submissions</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Submissions</p>
                      <h3 className="text-2xl font-bold">{userProfile?.totalSubmissions || 0}</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <h3 className="text-2xl font-bold">₹{userProfile?.totalEarnings || 0}</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Reviews</p>
                      <h3 className="text-2xl font-bold">{userProfile?.pendingReviews || 0}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* User Level Card */}
              {userProfile && (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Your Reviewer Status</CardTitle>
                    <CardDescription>Current level and progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center">
                          <div className="bg-yellow-100 p-2 rounded-full mr-3">
                            <Star className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium">{userProfile.level}</p>
                            <p className="text-sm text-muted-foreground">{userProfile.points} points</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-200 text-yellow-800 w-fit">
                          Gold Tier
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Next Level: Platinum Reviewer</span>
                          <span className="text-sm text-muted-foreground">{userProfile.points} of {userProfile.nextLevelPoints} points</span>
                        </div>
                        <Progress value={(userProfile.points / userProfile.nextLevelPoints) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Submit {Math.ceil(pointsToNextLevel / 150)} more reviews to reach Platinum level and unlock premium rewards!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Progress Card */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Feedback Activity</CardTitle>
                  <CardDescription>Your submission progress this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Monthly Goal</span>
                        <span className="text-sm text-muted-foreground">
                          {userFeedback.filter(f => {
                            const thisMonth = new Date().getMonth();
                            const feedbackMonth = new Date(f.date).getMonth();
                            return thisMonth === feedbackMonth;
                          }).length} of 10 submissions
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(
                          (userFeedback.filter(f => {
                            const thisMonth = new Date().getMonth();
                            const feedbackMonth = new Date(f.date).getMonth();
                            return thisMonth === feedbackMonth;
                          }).length / 10) * 100, 
                          100
                        )} 
                        className="h-2" 
                      />
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm">
                        Complete {Math.max(0, 10 - userFeedback.filter(f => {
                          const thisMonth = new Date().getMonth();
                          const feedbackMonth = new Date(f.date).getMonth();
                          return thisMonth === feedbackMonth;
                        }).length)} more submissions to reach your goal and unlock a bonus reward!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your most recent platform interactions</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userFeedback.slice(0, 3).map((feedback, index) => (
                      <div key={feedback.id} className="flex items-start space-x-3">
                        <div className={`bg-${feedback.status === 'approved' ? 'green' : feedback.status === 'pending' ? 'blue' : 'red'}-100 p-2 rounded-full`}>
                          <Video className={`h-4 w-4 text-${feedback.status === 'approved' ? 'green' : feedback.status === 'pending' ? 'blue' : 'red'}-600`} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {feedback.status === 'approved' 
                              ? 'Feedback Approved' 
                              : feedback.status === 'pending' 
                                ? 'Feedback Submitted'
                                : 'Feedback Rejected'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Your review for {feedback.productName} was {feedback.status}
                          </p>
                          <p className="text-xs text-muted-foreground">{feedback.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions" className="space-y-4">
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>My Submissions</CardTitle>
                    <CardDescription>Track all your feedback submissions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSubmitFeedback} className="hidden sm:flex items-center gap-2">
                    <Plus className="h-4 w-4" /> New Submission
                  </Button>
                </CardHeader>
                <CardContent>
                  {userFeedback.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">You haven't submitted any feedback yet.</p>
                      <Button onClick={handleSubmitFeedback} className="mt-4">
                        Submit Your First Feedback
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userFeedback.map((feedback) => (
                        <div 
                          key={feedback.id} 
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                            <div className="bg-background p-2 border rounded">
                              <Video className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{feedback.productName}</p>
                              <p className="text-sm text-muted-foreground">{feedback.category}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
                            <Badge 
                              className={
                                feedback.status === 'approved' 
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : feedback.status === 'pending'
                                    ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                                    : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-muted-foreground mt-1">
                              {feedback.status === 'approved' 
                                ? `₹${feedback.reward} earned` 
                                : feedback.status === 'pending' 
                                  ? 'Under review'
                                  : 'Rejected'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {userFeedback.length > 0 && (
                    <div className="mt-6 text-center">
                      <Button variant="outline" className="w-full sm:w-auto">View All Submissions</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Button 
                onClick={handleSubmitFeedback}
                className="w-full sm:hidden flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Submit New Feedback
              </Button>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card className="shadow-sm">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                      <h3 className="text-2xl font-bold">₹{
                        userFeedback
                          .filter(f => f.status === 'approved' && f.reward)
                          .reduce((sum, f) => sum + (f.reward || 0), 0) - 
                        (userProfile?.totalEarnings || 0)
                      }</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lifetime Earnings</p>
                      <h3 className="text-2xl font-bold">₹{userProfile?.totalEarnings || 0}</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reward Tier</p>
                      <h3 className="text-xl font-bold">{userProfile?.level || 'Bronze Reviewer'}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                  <CardDescription>Track all your earnings and payouts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-muted-foreground">July 15, 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">₹2,500</p>
                        <p className="text-sm text-muted-foreground">Processed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-medium">UPI Transfer</p>
                        <p className="text-sm text-muted-foreground">June 28, 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">₹1,800</p>
                        <p className="text-sm text-muted-foreground">Processed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-muted-foreground">May 12, 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">₹4,450</p>
                        <p className="text-sm text-muted-foreground">Processed</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button onClick={() => {
                      toast({
                        title: "Payout Requested",
                        description: "Your payout request has been submitted and is being processed.",
                      });
                    }}>Request Payout</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
