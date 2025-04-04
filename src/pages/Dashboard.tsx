import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, getUserFeedback, UserProfile, UserFeedback } from "@/utils/database";
import { FeedbackList } from "@/components/dashboards/FeedbackList";
import UserFAQ from "@/components/UserFAQ";
import { useRealTimeData } from "@/hooks/use-real-time-data";
import { DashboardHeader } from "@/components/dashboards/DashboardHeader";
import { OverviewTab } from "@/components/dashboards/OverviewTab";
import { RewardsTab } from "@/components/dashboards/RewardsTab";
import { LoadingDashboard } from "@/components/dashboards/LoadingDashboard";
import { DemographicInsights } from "@/components/dashboards/DemographicInsights";
import { AnalyticsCard } from "@/components/dashboards/AnalyticsCard";
import { CategoryBreakdown } from "@/components/dashboards/CategoryBreakdown";
import { RecentActivity } from "@/components/dashboards/RecentActivity";
import { VerificationStatusCard } from "@/components/dashboards/VerificationStatusCard";
import { 
  generateDemographicData, 
  generateTimeSeriesData,
  generateSubmissionStats
} from "@/utils/mockDataGenerators";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userId, userName, isAuthenticated, userRole, isLoading: authLoading } = useAuth();
  
  // Use real-time data hook for profile
  const { 
    data: userProfile,
    isLoading: profileLoading,
    lastUpdated: profileUpdated,
    refresh: refreshProfile
  } = useRealTimeData<UserProfile>({
    fetchFn: () => userId ? getUserProfile(userId) : null,
    enabled: isAuthenticated && !!userId,
    interval: 5000, // Poll every 5 seconds
  });

  // Use real-time data hook for feedback
  const {
    data: userFeedback,
    isLoading: feedbackLoading,
    refresh: refreshFeedback
  } = useRealTimeData<UserFeedback[]>({
    fetchFn: () => userId ? getUserFeedback(userId) : [],
    initialData: [],
    enabled: isAuthenticated && !!userId,
    interval: 5000, // Poll every 5 seconds
  });
  
  // Additional states for verification
  const [verificationStatus, setVerificationStatus] = useState<"verified" | "pending" | "unverified">("unverified");
  const [completedVerificationSteps, setCompletedVerificationSteps] = useState(0);
  const totalVerificationSteps = 4;
  
  const isLoading = authLoading || profileLoading || feedbackLoading;
  const feedback = userFeedback || [];

  // Function to handle navigation to submit feedback
  const handleSubmitFeedback = () => {
    navigate("/submit-feedback");
  };

  // Function to refresh data manually
  const handleRefreshData = () => {
    refreshProfile();
    refreshFeedback();
  };

  // Function to request payout
  const handleRequestPayout = () => {
    toast({
      title: "Payout Requested",
      description: "Your payout request has been submitted and is being processed.",
    });
  };

  // Mock handlers for verification
  const handleStartVerification = () => {
    toast({
      title: "Verification Started",
      description: "Follow the steps to complete your account verification.",
    });
    // In a real implementation, navigate to verification flow
    setVerificationStatus("pending");
    setCompletedVerificationSteps(1);
  };

  const handleContinueVerification = () => {
    if (completedVerificationSteps < totalVerificationSteps) {
      setCompletedVerificationSteps(prev => Math.min(prev + 1, totalVerificationSteps));
      toast({
        title: "Verification Step Completed",
        description: `Step ${completedVerificationSteps + 1} of ${totalVerificationSteps} completed.`,
      });
    } else {
      setVerificationStatus("verified");
      toast({
        title: "Verification Complete",
        description: "Your account is now fully verified!",
      });
    }
  };

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
        <div className="flex-grow py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <LoadingDashboard />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate mock data for the analytics
  const demographicData = generateDemographicData();
  const submissionTrendData = generateTimeSeriesData();
  const categoryStats = generateSubmissionStats();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <DashboardHeader 
            userName={userName} 
            profileName={userProfile?.name}
            profileUpdated={profileUpdated}
            onRefresh={handleRefreshData}
            verificationStatus={verificationStatus}
            userLevel={userProfile?.level}
            userPoints={userProfile?.points}
          />

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="submissions">My Submissions</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <OverviewTab 
                userProfile={userProfile}
                feedback={feedback}
                onSubmitFeedback={handleSubmitFeedback}
                onViewAll={() => setActiveTab("submissions")}
              />
              
              {/* New Analytics Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <AnalyticsCard 
                    title="Submission Trend" 
                    description="Your feedback submissions over time"
                    data={submissionTrendData}
                    color="#8884d8"
                  />
                </div>
                <div className="md:col-span-1">
                  <VerificationStatusCard 
                    status={verificationStatus}
                    completedSteps={completedVerificationSteps}
                    totalSteps={totalVerificationSteps}
                    onStartVerification={handleStartVerification}
                    onContinueVerification={handleContinueVerification}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryBreakdown 
                  title="Category Breakdown" 
                  description="Your feedback by product category"
                  data={categoryStats}
                />
                <DemographicInsights 
                  title="Age Demographics" 
                  description="Insights from your feedback audience"
                  data={demographicData}
                />
              </div>
              
              <RecentActivity 
                title="Recent Activity" 
                description="Your latest feedback submissions and their status"
                activities={feedback}
                limit={3}
              />
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

            <TabsContent value="rewards">
              <RewardsTab 
                userProfile={userProfile}
                feedback={feedback}
                onRequestPayout={handleRequestPayout}
              />
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
