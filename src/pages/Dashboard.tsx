
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, BarChart, DollarSign, Clock, Star, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, getUserFeedback, UserProfile, UserFeedback } from "@/utils/database";
import { StatCard } from "@/components/dashboards/StatCard";
import { FeedbackItem } from "@/components/dashboards/FeedbackItem";
import { FeedbackList } from "@/components/dashboards/FeedbackList";
import UserFAQ from "@/components/UserFAQ";
import { useRealTimeData } from "@/hooks/use-real-time-data";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { userId, userName, isAuthenticated, userRole, isLoading: authLoading } = useAuth();
  
  // Use real-time data hook for profile
  const { 
    data: userProfile,
    isLoading: profileLoading,
    lastUpdated: profileUpdated
  } = useRealTimeData<UserProfile>({
    fetchFn: () => userId ? getUserProfile(userId) : null,
    enabled: isAuthenticated && !!userId,
    interval: 5000, // Poll every 5 seconds
  });

  // Use real-time data hook for feedback
  const {
    data: userFeedback,
    isLoading: feedbackLoading,
    lastUpdated: feedbackUpdated,
    refresh: refreshFeedback
  } = useRealTimeData<UserFeedback[]>({
    fetchFn: () => userId ? getUserFeedback(userId) : [],
    initialData: [],
    enabled: isAuthenticated && !!userId,
    interval: 5000, // Poll every 5 seconds
  });
  
  const isLoading = authLoading || profileLoading || feedbackLoading;
  const feedback = userFeedback || [];

  // Function to handle navigation to submit feedback
  const handleSubmitFeedback = () => {
    navigate("/submit-feedback");
  };

  // Function to refresh data manually
  const handleRefreshData = () => {
    refreshFeedback();
    toast({
      title: "Dashboard refreshed",
      description: "Your data has been updated.",
    });
  };

  // Calculate points to next level
  const pointsToNextLevel = userProfile ? userProfile.nextLevelPoints - userProfile.points : 0;

  // Calculate monthly submissions
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthSubmissions = feedback.filter(f => {
    const feedbackDate = new Date(f.date);
    return feedbackDate.getMonth() === currentMonth && feedbackDate.getFullYear() === currentYear;
  }).length;

  // Calculate available balance
  const availableBalance = feedback
    .filter(f => f.status === 'approved' && f.reward)
    .reduce((sum, f) => sum + (f.reward || 0), 0) - 
    (userProfile?.totalEarnings || 0);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

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
              <p className="text-foreground/70">Welcome back, {userName || userProfile?.name || "User"}!</p>
              {lastUpdated && (
                <p className="text-xs text-muted-foreground">
                  Last updated: {profileUpdated?.toLocaleTimeString() || "Just now"}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full sm:w-auto">
              <Button 
                onClick={handleSubmitFeedback}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Submit New Feedback
              </Button>
              <Button 
                variant="outline"
                onClick={handleRefreshData}
                className="w-full sm:w-auto"
              >
                Refresh Data
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="submissions">My Submissions</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  icon={Video}
                  title="Total Submissions"
                  value={userProfile?.totalSubmissions || feedback.length || 0}
                />
                
                <StatCard
                  icon={DollarSign}
                  title="Total Earnings"
                  value={`₹${userProfile?.totalEarnings || 0}`}
                />
                
                <StatCard
                  icon={Clock}
                  title="Pending Reviews"
                  value={feedback.filter(f => f.status === 'pending').length}
                />
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
                          <div className={`${
                            userProfile.level === 'Bronze Reviewer' ? 'bg-amber-100' :
                            userProfile.level === 'Silver Reviewer' ? 'bg-gray-200' :
                            userProfile.level === 'Gold Reviewer' ? 'bg-yellow-100' :
                            'bg-purple-100'
                          } p-2 rounded-full mr-3`}>
                            <Star className={`h-5 w-5 ${
                              userProfile.level === 'Bronze Reviewer' ? 'text-amber-600' :
                              userProfile.level === 'Silver Reviewer' ? 'text-gray-600' :
                              userProfile.level === 'Gold Reviewer' ? 'text-yellow-600' :
                              'text-purple-600'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium">{userProfile.level}</p>
                            <p className="text-sm text-muted-foreground">{userProfile.points} points</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${
                          userProfile.level === 'Bronze Reviewer' ? 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 text-amber-800' :
                          userProfile.level === 'Silver Reviewer' ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 text-gray-800' :
                          userProfile.level === 'Gold Reviewer' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-200 text-yellow-800' :
                          'bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300 text-purple-800'
                        } w-fit`}>
                          {userProfile.level.split(' ')[0]} Tier
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Next Level: {
                              userProfile.level === 'Bronze Reviewer' ? 'Silver Reviewer' :
                              userProfile.level === 'Silver Reviewer' ? 'Gold Reviewer' :
                              userProfile.level === 'Gold Reviewer' ? 'Platinum Reviewer' :
                              'Max Level Reached'
                            }
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {userProfile.points} of {userProfile.nextLevelPoints} points
                          </span>
                        </div>
                        <Progress value={(userProfile.points / userProfile.nextLevelPoints) * 100} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {userProfile.level !== 'Platinum Reviewer' ? (
                            <>Submit {Math.ceil(pointsToNextLevel / 150)} more reviews to reach {
                              userProfile.level === 'Bronze Reviewer' ? 'Silver' :
                              userProfile.level === 'Silver Reviewer' ? 'Gold' :
                              'Platinum'
                            } level and unlock premium rewards!</>
                          ) : (
                            <>You've reached the highest reviewer level. Enjoy premium rewards!</>
                          )}
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
                          {thisMonthSubmissions} of 10 submissions
                        </span>
                      </div>
                      <Progress 
                        value={Math.min((thisMonthSubmissions / 10) * 100, 100)} 
                        className="h-2" 
                      />
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <div className="bg-primary/10 p-1.5 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm">
                        {thisMonthSubmissions >= 10 ? (
                          "You've reached your monthly goal! A bonus reward has been added."
                        ) : (
                          `Complete ${Math.max(0, 10 - thisMonthSubmissions)} more submissions to reach your goal and unlock a bonus reward!`
                        )}
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
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setActiveTab("submissions")}
                  >
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {feedback.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">
                        No activity recorded yet. Submit your first feedback!
                      </p>
                    ) : (
                      feedback.slice(0, 3).map((feedbackItem) => (
                        <div key={feedbackItem.id} className="flex items-start space-x-3">
                          <div className={`
                            ${feedbackItem.status === 'approved' ? 'bg-green-100' : 
                              feedbackItem.status === 'pending' ? 'bg-blue-100' : 'bg-red-100'} 
                            p-2 rounded-full
                          `}>
                            <Video className={`h-4 w-4 
                              ${feedbackItem.status === 'approved' ? 'text-green-600' : 
                                feedbackItem.status === 'pending' ? 'text-blue-600' : 'text-red-600'}
                            `} />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {feedbackItem.status === 'approved' 
                                ? 'Feedback Approved' 
                                : feedbackItem.status === 'pending' 
                                  ? 'Feedback Submitted'
                                  : 'Feedback Rejected'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Your review for {feedbackItem.productName} was {feedbackItem.status}
                            </p>
                            <p className="text-xs text-muted-foreground">{feedbackItem.date}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions" className="space-y-4">
              <FeedbackList
                title="My Submissions"
                description="Track all your feedback submissions"
                feedbackList={feedback}
                onNewSubmission={handleSubmitFeedback}
              />
              
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
                <StatCard
                  icon={DollarSign}
                  title="Available Balance"
                  value={`₹${availableBalance}`}
                />
                
                <StatCard
                  icon={BarChart}
                  title="Lifetime Earnings"
                  value={`₹${userProfile?.totalEarnings || 0}`}
                />
                
                <StatCard
                  icon={Star}
                  title="Reward Tier"
                  value={userProfile?.level || 'Bronze Reviewer'}
                />
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
                    <Button disabled={availableBalance < 500} onClick={() => {
                      toast({
                        title: "Payout Requested",
                        description: "Your payout request has been submitted and is being processed.",
                      });
                    }}>
                      {availableBalance < 500 
                        ? `Minimum ₹500 required (₹${500 - availableBalance} more needed)` 
                        : "Request Payout"
                      }
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <UserFAQ />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
