
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Activity, Search, Video, Download, Filter, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getBrandProfile, 
  getBrandFeedback, 
  getBrandProducts, 
  getRatingDistribution,
  UserFeedback,
  BrandProfile,
  BrandProduct
} from "@/utils/database";
import downloadReport from "@/utils/downloadReport";

const BrandDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { userId, userName, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  
  // State for brand data
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [brandFeedback, setBrandFeedback] = useState<UserFeedback[]>([]);
  const [brandProducts, setBrandProducts] = useState<BrandProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch brand data on component mount
  useEffect(() => {
    if (isAuthenticated && userId && userRole === 'brand') {
      const profile = getBrandProfile(userId);
      const feedback = getBrandFeedback(userId);
      const products = getBrandProducts(userId);
      
      setBrandProfile(profile);
      setBrandFeedback(feedback);
      setBrandProducts(products);
      setIsLoading(false);
    }
  }, [isAuthenticated, userId, userRole]);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (userRole !== 'brand') {
    navigate("/dashboard");
    return null;
  }

  // Filter the feedback data based on search term and filters
  const filteredFeedback = brandFeedback.filter(feedback => {
    const matchesSearch = 
      (feedback.productName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (feedback.feedback?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesAge = ageFilter === "all";  // In a real app, we'd filter by age
    const matchesGender = genderFilter === "all";  // In a real app, we'd filter by gender
    const matchesLocation = locationFilter === "all";  // In a real app, we'd filter by location
    
    return matchesSearch && matchesAge && matchesGender && matchesLocation;
  });

  // Rating distribution data
  const ratingDistribution = getRatingDistribution(brandFeedback);

  // Rating percentage
  const totalRatings = brandFeedback.length;
  const averageRating = totalRatings > 0 
    ? brandFeedback.reduce((sum, item) => sum + item.rating, 0) / totalRatings
    : 0;
  const positiveRatings = brandFeedback.filter(item => item.rating >= 4).length;
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
              <h1 className="text-3xl font-bold">Brand Dashboard</h1>
              <p className="text-foreground/70">Welcome back, {userName || "Brand Partner"}!</p>
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
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Feedback</p>
                      <h3 className="text-2xl font-bold">{brandFeedback.length}</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                      <h3 className="text-2xl font-bold">{averageRating.toFixed(1)}/5.0</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Positive Feedback</p>
                      <h3 className="text-2xl font-bold">{positivePercentage}%</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Rating Distribution Card */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                  <CardDescription>Breakdown of feedback ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <span className="font-medium mr-2">{rating}</span>
                            {Array.from({ length: rating }).map((_, i) => (
                              <svg key={i} className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20">
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <span>{ratingDistribution[rating as keyof typeof ratingDistribution]} reviews</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${rating >= 4 ? 'bg-green-500' : rating === 3 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${totalRatings ? (ratingDistribution[rating as keyof typeof ratingDistribution] / totalRatings) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Feedback */}
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Feedback</CardTitle>
                    <CardDescription>Latest customer reviews</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="#" onClick={() => setActiveTab("feedback")}>
                      View All
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {brandFeedback.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No feedback received yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {brandFeedback.slice(0, 3).map((feedback) => (
                        <div key={feedback.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                          <div className="flex justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{feedback.productName}</h4>
                              <p className="text-sm text-muted-foreground">by Anonymous User</p>
                            </div>
                            <Badge 
                              className={`${
                                feedback.rating >= 4 ? 'bg-green-100 text-green-800 border-green-200' : 
                                feedback.rating === 3 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                                'bg-red-100 text-red-800 border-red-200'
                              }`}
                            >
                              {feedback.rating}/5
                            </Badge>
                          </div>
                          <p className="text-sm">{feedback.feedback}</p>
                          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                            <span>{feedback.date}</span>
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
                        {filteredFeedback.map((feedback) => (
                          <div key={feedback.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                              <div>
                                <h4 className="font-medium">{feedback.productName}</h4>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <span>Anonymous User</span>
                                  <span className="mx-2">•</span>
                                  <span>{feedback.date}</span>
                                </div>
                              </div>
                              <Badge 
                                className={`${
                                  feedback.rating >= 4 ? 'bg-green-100 text-green-800 border-green-200' : 
                                  feedback.rating === 3 ? 'bg-amber-100 text-amber-800 border-amber-200' : 
                                  'bg-red-100 text-red-800 border-red-200'
                                } w-fit`}
                              >
                                {feedback.rating}/5
                              </Badge>
                            </div>
                            <p className="mb-3">{feedback.feedback}</p>
                            {feedback.videoUrl && (
                              <div className="mb-3">
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                  <Video className="h-4 w-4" /> 
                                  Watch Video Review
                                </Button>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                                Age: Not specified
                              </Badge>
                              <Badge variant="outline" className="bg-purple-50 text-purple-800 border-purple-200">
                                Not specified
                              </Badge>
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                                Not specified
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center pt-4">
                      <p className="text-sm text-muted-foreground">
                        Showing {filteredFeedback.length} of {brandFeedback.length} feedback items
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
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>
                    Advanced analytics and insights coming soon
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <SlidersHorizontal className="h-16 w-16 text-primary/30 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                  <p className="text-center text-muted-foreground max-w-md mb-6">
                    Our enhanced analytics dashboard is being built. 
                    Soon you'll have access to detailed insights, trends, and comparative analysis.
                  </p>
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Request submitted",
                        description: "We'll notify you when advanced analytics are available.",
                      });
                    }}
                  >
                    Request Early Access
                  </Button>
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

export default BrandDashboard;
