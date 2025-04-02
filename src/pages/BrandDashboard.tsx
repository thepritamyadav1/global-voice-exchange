
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, DollarSign, Filter, Search, Upload, User, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const BrandDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Mock feedback data
  const feedbackData = [
    {
      id: 1,
      user: "Priya Sharma",
      age: 28,
      gender: "Female",
      location: "Mumbai",
      product: "Premium Wireless Headphones",
      rating: 4.5,
      sentiment: "Positive",
      date: "2023-07-15",
      videoUrl: "#",
      feedback: "Great sound quality and comfortable fit. Battery life could be better."
    },
    {
      id: 2,
      user: "Rahul Verma",
      age: 34,
      gender: "Male",
      location: "Delhi",
      product: "Bluetooth Speaker",
      rating: 3.5,
      sentiment: "Neutral",
      date: "2023-07-10",
      videoUrl: "#",
      feedback: "Good sound but connectivity issues sometimes."
    },
    {
      id: 3,
      user: "Ananya Patel",
      age: 22,
      gender: "Female",
      location: "Bangalore",
      product: "Fitness Tracker",
      rating: 5.0,
      sentiment: "Positive",
      date: "2023-07-05",
      videoUrl: "#",
      feedback: "Love all the features and the battery lasts for days!"
    },
    {
      id: 4,
      user: "Vikram Singh",
      age: 42,
      gender: "Male",
      location: "Chennai",
      product: "Smart Home Speaker",
      rating: 2.5,
      sentiment: "Negative",
      date: "2023-06-28",
      videoUrl: "#",
      feedback: "Voice recognition is poor and setup was complicated."
    },
  ];

  // Filter feedback data based on search and filters
  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch = searchTerm === "" || 
      feedback.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAge = ageFilter === "" || 
      (ageFilter === "18-24" && feedback.age >= 18 && feedback.age <= 24) ||
      (ageFilter === "25-34" && feedback.age >= 25 && feedback.age <= 34) ||
      (ageFilter === "35-44" && feedback.age >= 35 && feedback.age <= 44) ||
      (ageFilter === "45+" && feedback.age >= 45);
    
    const matchesGender = genderFilter === "" || feedback.gender.toLowerCase() === genderFilter.toLowerCase();
    
    const matchesLocation = locationFilter === "" || feedback.location.toLowerCase() === locationFilter.toLowerCase();
    
    return matchesSearch && matchesAge && matchesGender && matchesLocation;
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      case 'neutral': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Brand Dashboard</h1>
              <p className="text-foreground/70">Welcome back, Nike Team!</p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="feedback">All Feedback</TabsTrigger>
              <TabsTrigger value="insights">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Feedback</p>
                      <h3 className="text-2xl font-bold">142</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Unique Contributors</p>
                      <h3 className="text-2xl font-bold">86</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                      <h3 className="text-2xl font-bold">4.2/5.0</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sentiment Analysis Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Sentiment</CardTitle>
                  <CardDescription>Overall sentiment analysis of product reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Positive</span>
                        <span className="text-sm text-muted-foreground">68%</span>
                      </div>
                      <Progress value={68} className="bg-muted h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Neutral</span>
                        <span className="text-sm text-muted-foreground">22%</span>
                      </div>
                      <Progress value={22} className="bg-muted h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Negative</span>
                        <span className="text-sm text-muted-foreground">10%</span>
                      </div>
                      <Progress value={10} className="bg-muted h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Feedback Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Feedback</CardTitle>
                  <CardDescription>Latest customer reviews for your products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {feedbackData.slice(0, 3).map((feedback) => (
                      <div key={feedback.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{feedback.user}</p>
                            <span className={`text-xs px-2 py-1 rounded ${getSentimentColor(feedback.sentiment)}`}>
                              {feedback.sentiment}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {feedback.product} - {feedback.rating}/5.0
                          </p>
                          <p className="text-sm">{feedback.feedback}</p>
                          <p className="text-xs text-muted-foreground">{feedback.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View All Feedback
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Feedback</CardTitle>
                  <CardDescription>Filter and analyze customer reviews</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter Controls */}
                  <div className="grid gap-4 mb-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                    <div className="col-span-1 md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search feedback..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Select value={ageFilter} onValueChange={setAgeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Age" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Ages</SelectItem>
                          <SelectItem value="18-24">18-24</SelectItem>
                          <SelectItem value="25-34">25-34</SelectItem>
                          <SelectItem value="35-44">35-44</SelectItem>
                          <SelectItem value="45+">45+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Select value={genderFilter} onValueChange={setGenderFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Genders</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Locations</SelectItem>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="chennai">Chennai</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Feedback Table */}
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead className="hidden md:table-cell">Demographics</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead className="hidden md:table-cell">Sentiment</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFeedback.length > 0 ? (
                          filteredFeedback.map((feedback) => (
                            <TableRow key={feedback.id}>
                              <TableCell className="font-medium">{feedback.user}</TableCell>
                              <TableCell>{feedback.product}</TableCell>
                              <TableCell className="hidden md:table-cell">
                                {feedback.age}, {feedback.gender}, {feedback.location}
                              </TableCell>
                              <TableCell>{feedback.rating}/5.0</TableCell>
                              <TableCell className="hidden md:table-cell">
                                <Badge className={getSentimentColor(feedback.sentiment)}>
                                  {feedback.sentiment}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">{feedback.date}</TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" variant="outline">View</Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No feedback found matching your filters.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Demographic Insights</CardTitle>
                    <CardDescription>Breakdown of feedback by demographics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Age Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs">18-24</span>
                            <span className="text-xs text-muted-foreground">24%</span>
                          </div>
                          <Progress value={24} className="bg-muted h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs">25-34</span>
                            <span className="text-xs text-muted-foreground">38%</span>
                          </div>
                          <Progress value={38} className="bg-muted h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs">35-44</span>
                            <span className="text-xs text-muted-foreground">28%</span>
                          </div>
                          <Progress value={28} className="bg-muted h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs">45+</span>
                            <span className="text-xs text-muted-foreground">10%</span>
                          </div>
                          <Progress value={10} className="bg-muted h-1.5" />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Gender Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Male</span>
                            <span className="text-xs text-muted-foreground">46%</span>
                          </div>
                          <Progress value={46} className="bg-muted h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Female</span>
                            <span className="text-xs text-muted-foreground">52%</span>
                          </div>
                          <Progress value={52} className="bg-muted h-1.5" />
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs">Other</span>
                            <span className="text-xs text-muted-foreground">2%</span>
                          </div>
                          <Progress value={2} className="bg-muted h-1.5" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Products</CardTitle>
                    <CardDescription>Most reviewed products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <Video className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Premium Wireless Headphones</p>
                            <p className="text-sm text-muted-foreground">42 reviews</p>
                          </div>
                        </div>
                        <Badge>4.4/5.0</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <Video className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Smart Home Speaker</p>
                            <p className="text-sm text-muted-foreground">36 reviews</p>
                          </div>
                        </div>
                        <Badge>3.8/5.0</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <Video className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Bluetooth Speaker</p>
                            <p className="text-sm text-muted-foreground">29 reviews</p>
                          </div>
                        </div>
                        <Badge>4.1/5.0</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary/10 p-2 rounded">
                            <Video className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Fitness Tracker</p>
                            <p className="text-sm text-muted-foreground">24 reviews</p>
                          </div>
                        </div>
                        <Badge>4.7/5.0</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Common Feedback Themes</CardTitle>
                  <CardDescription>Key points mentioned across user feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 text-green-600">Positive Themes</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="bg-green-100 p-1 rounded-full mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span>Sound quality praised in 78% of audio product reviews</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-green-100 p-1 rounded-full mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span>Battery life mentioned positively in 65% of wearable reviews</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-green-100 p-1 rounded-full mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span>Design and aesthetics highlighted in 59% of all feedback</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2 text-red-600">Areas for Improvement</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="bg-red-100 p-1 rounded-full mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </div>
                          <span>Connectivity issues mentioned in 34% of bluetooth device reviews</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-red-100 p-1 rounded-full mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </div>
                          <span>App usability concerns in 28% of smart device feedback</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-red-100 p-1 rounded-full mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </div>
                          <span>Price point mentioned as concern in 22% of premium product reviews</span>
                        </li>
                      </ul>
                    </div>
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

export default BrandDashboard;
