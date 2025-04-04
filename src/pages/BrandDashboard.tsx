
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Activity, Search, Video, Download, Filter, SlidersHorizontal, RefreshCw, PieChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getBrandProfile, 
  getBrandFeedback, 
  getBrandProducts,
  UserFeedback,
  BrandProfile,
  BrandProduct
} from "@/utils/database";
import downloadReport from "@/utils/downloadReport";
import { StatCard } from "@/components/dashboards/StatCard";
import { RatingDistribution } from "@/components/dashboards/RatingDistribution";
import { FeedbackItem } from "@/components/dashboards/FeedbackItem";
import { DemographicInsights } from "@/components/dashboards/DemographicInsights";
import { LoadingDashboard } from "@/components/dashboards/LoadingDashboard";
import BrandFAQ from "@/components/BrandFAQ";
import { useRealTimeData } from "@/hooks/use-real-time-data";

const BrandDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { userId, userName, isAuthenticated, userRole, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  // Use real-time data hook for brand profile
  const { 
    data: brandProfile,
    isLoading: profileLoading,
    lastUpdated: profileUpdated,
    refresh: refreshProfile
  } = useRealTimeData<BrandProfile>({
    fetchFn: () => userId ? getBrandProfile(userId) : null,
    enabled: isAuthenticated && !!userId && userRole === 'brand',
    interval: 5000, // Poll every 5 seconds
  });

  // Use real-time data hook for brand feedback
  const {
    data: brandFeedback,
    isLoading: feedbackLoading,
    lastUpdated: feedbackUpdated,
    refresh: refreshFeedback
  } = useRealTimeData<UserFeedback[]>({
    fetchFn: () => userId ? getBrandFeedback(userId) : [],
    initialData: [],
    enabled: isAuthenticated && !!userId && userRole === 'brand',
    interval: 5000, // Poll every 5 seconds
  });

  // Use real-time data hook for brand products
  const {
    data: brandProducts,
    isLoading: productsLoading,
  } = useRealTimeData<BrandProduct[]>({
    fetchFn: () => userId ? getBrandProducts(userId) : [],
    initialData: [],
    enabled: isAuthenticated && !!userId && userRole === 'brand',
    interval: 15000, // Poll every 15 seconds
  });
  
  const isLoading = authLoading || profileLoading || feedbackLoading || productsLoading;
  const feedback = brandFeedback || [];
  const products = brandProducts || [];

  // Demographic data for visualization (this would come from your API in a real application)
  const ageData = [
    { name: "18-24", value: 25, color: "#8884d8" },
    { name: "25-34", value: 40, color: "#83a6ed" },
    { name: "35-44", value: 20, color: "#8dd1e1" },
    { name: "45+", value: 15, color: "#82ca9d" },
  ];
  
  const genderData = [
    { name: "Male", value: 55, color: "#0088FE" },
    { name: "Female", value: 42, color: "#FF8042" },
    { name: "Other", value: 3, color: "#00C49F" },
  ];
  
  const locationData = [
    { name: "Mumbai", value: 32, color: "#FFBB28" },
    { name: "Delhi", value: 28, color: "#FF8042" },
    { name: "Bangalore", value: 22, color: "#0088FE" },
    { name: "Chennai", value: 10, color: "#00C49F" },
    { name: "Others", value: 8, color: "#8884d8" },
  ];

  // Function to refresh data manually
  const handleRefresh = () => {
    refreshProfile();
    refreshFeedback();
    toast({
      title: "Dashboard refreshed",
      description: "Your data has been updated.",
    });
  };

  // Redirect if not authenticated or not a brand
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate("/login");
      } else if (userRole !== 'brand') {
        navigate("/dashboard");
      }
    }
  }, [authLoading, isAuthenticated, userRole, navigate]);

  // Filter the feedback data based on search term and filters
  const filteredFeedback = feedback.filter(feedback => {
    const matchesSearch = 
      (feedback.productName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (feedback.feedback?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesAge = ageFilter === "all";  // In a real app, we'd filter by age
    const matchesGender = genderFilter === "all";  // In a real app, we'd filter by gender
    const matchesLocation = locationFilter === "all";  // In a real app, we'd filter by location
    
    return matchesSearch && matchesAge && matchesGender && matchesLocation;
  });

  // Rating percentage
  const totalRatings = feedback.length;
  const averageRating = totalRatings > 0 
    ? feedback.reduce((sum, item) => sum + item.rating, 0) / totalRatings
    : 0;
  const positiveRatings = feedback.filter(item => item.rating >= 4).length;
  const positivePercentage = totalRatings > 0 ? Math.round((positiveRatings / totalRatings) * 100) : 0;

  // Handle download report
  const handleDownloadReport = () => {
    const reportData = filteredFeedback.map(item => ({
      product: item.productName,
      user: "Anonymous User",  // In a real app, we'd include user data (respecting privacy)
      age: 25,  // Placeholder
      gender: "Not specified",  // Placeholder
      location: "Not specified",  // Placeholder
      rating: item.rating,
      date: item.date,
      feedback: item.feedback
    }));
    
    downloadReport(reportData, userName || "YourBrand");
    toast({
      title: "Report downloaded",
      description: "Your feedback report has been downloaded successfully.",
    });
  };

  // Show loading dashboard while loading
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Brand Dashboard</h1>
              <p className="text-foreground/70">Welcome back, {brandProfile?.name || userName || "Brand Partner"}!</p>
              {feedbackUpdated && (
                <p className="text-xs text-muted-foreground">
                  Last updated: {feedbackUpdated.toLocaleTimeString() || "Just now"}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full sm:w-auto">
              <Button 
                onClick={handleDownloadReport}
                className="w-full sm:w-auto flex items-center gap-2"
                disabled={filteredFeedback.length === 0}
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Button 
                variant="outline"
                onClick={handleRefresh}
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-3 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  icon={Video}
                  title="Total Feedback"
                  value={feedback.length}
                />
                
                <StatCard
                  icon={Activity}
                  title="Average Rating"
                  value={`${averageRating.toFixed(1)}/5.0`}
                />
                
                <StatCard
                  icon={BarChart3}
                  title="Positive Feedback"
                  value={`${positivePercentage}%`}
                />
              </div>

              {/* Rating Distribution Card */}
              <RatingDistribution feedbackList={feedback} />

              {/* Recent Feedback */}
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Feedback</CardTitle>
                    <CardDescription>Latest customer reviews</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("feedback")}>
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  {feedback.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No feedback received yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {feedback.slice(0, 3).map((feedbackItem) => (
                        <div key={feedbackItem.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{feedbackItem.productName}</h4>
                              <p className="text-sm text-muted-foreground">by Anonymous User</p>
                            </div>
                            <Badge 
                              className={`${
                                feedbackItem.rating >= 4 ? 'bg-green-100 text-green-800 border-green-200' : 
                                feedbackItem.rating === 3 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                                'bg-red-100 text-red-800 border-red-200'
                              }`}
                            >
                              {feedbackItem.rating}/5
                            </Badge>
                          </div>
                          <p className="text-sm">{feedbackItem.feedback}</p>
                          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                            <span>{feedbackItem.date}</span>
                            {feedbackItem.videoUrl && (
                              <Button variant="ghost" size="sm" className="h-auto p-1 flex items-center gap-1"
                                onClick={() => {
                                  // In a real implementation, this would play the video
                                  toast({
                                    title: "Video Available",
                                    description: "Click 'View All' and find this feedback to watch the video review.",
                                  });
                                }}
                              >
                                <Video className="h-3 w-3" />
                                <span className="text-xs">Video</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle>All Feedback</CardTitle>
                      <CardDescription>
                        Browse and filter all customer feedback
                      </CardDescription>
                    </div>
                    <div className="w-full md:w-auto">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search feedback..."
                          className="pl-8 md:w-[300px]"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="bg-muted rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <h3 className="font-medium text-sm">Filters</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <Select 
                              value={ageFilter} 
                              onValueChange={setAgeFilter}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Age" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Ages</SelectItem>
                                <SelectItem value="18-24">18-24</SelectItem>
                                <SelectItem value="25-34">25-34</SelectItem>
                                <SelectItem value="35-44">35-44</SelectItem>
                                <SelectItem value="45+">45+</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Select 
                              value={genderFilter} 
                              onValueChange={setGenderFilter}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Genders</SelectItem>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Select 
                              value={locationFilter} 
                              onValueChange={setLocationFilter}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Locations</SelectItem>
                                <SelectItem value="mumbai">Mumbai</SelectItem>
                                <SelectItem value="delhi">Delhi</SelectItem>
                                <SelectItem value="bangalore">Bangalore</SelectItem>
                                <SelectItem value="chennai">Chennai</SelectItem>
                                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {filteredFeedback.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No feedback found matching your filters.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredFeedback.map((feedbackItem) => (
                          <FeedbackItem 
                            key={feedbackItem.id} 
                            feedback={feedbackItem}
                            showUser={true}
                            showActions={true}
                          />
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-4">
                      <p className="text-sm text-muted-foreground">
                        Showing {filteredFeedback.length} of {feedback.length} feedback items
                      </p>
                      <Button 
                        onClick={handleDownloadReport} 
                        size="sm" 
                        className="flex items-center gap-2"
                        disabled={filteredFeedback.length === 0}
                      >
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DemographicInsights 
                  title="Age Distribution" 
                  description="Breakdown of feedback by age groups"
                  data={ageData}
                />
                
                <DemographicInsights 
                  title="Gender Distribution" 
                  description="Breakdown of feedback by gender"
                  data={genderData}
                />
                
                <DemographicInsights 
                  title="Location Insights" 
                  description="Geographic distribution of feedback"
                  data={locationData}
                />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Product Performance</CardTitle>
                    <CardDescription>Compare feedback across products</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      {products.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">No product data available</p>
                        </div>
                      ) : (
                        products.map(product => (
                          <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-sm font-medium">{product.totalFeedback} reviews</p>
                                <div className="flex items-center justify-end gap-1">
                                  <span className={`text-sm ${
                                    product.averageRating >= 4 ? 'text-green-600' : 
                                    product.averageRating >= 3 ? 'text-amber-600' : 'text-red-600'
                                  }`}>
                                    {product.averageRating.toFixed(1)}
                                  </span>
                                  <span className="text-xs text-muted-foreground">/5</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12">
            <BrandFAQ />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrandDashboard;
