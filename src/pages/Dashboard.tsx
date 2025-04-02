
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, BarChart, DollarSign, Clock, User, Star, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-foreground/70">Welcome back, Priya!</p>
            </div>
            <Link to="/submit-feedback">
              <Button className="mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" />
                Submit New Feedback
              </Button>
            </Link>
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
                <Card>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Submissions</p>
                      <h3 className="text-2xl font-bold">24</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <h3 className="text-2xl font-bold">₹12,500</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Reviews</p>
                      <h3 className="text-2xl font-bold">3</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Feedback Activity</CardTitle>
                  <CardDescription>Your submission progress this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Monthly Goal</span>
                        <span className="text-sm text-muted-foreground">8 of 10 submissions</span>
                      </div>
                      <Progress value={80} />
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Complete 2 more submissions to reach your goal and unlock a bonus reward!
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your most recent platform interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Payment Processed</p>
                        <p className="text-xs text-muted-foreground">₹2,500 transferred to your bank account</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Video className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Feedback Approved</p>
                        <p className="text-xs text-muted-foreground">Your review for Samsung Galaxy S23 was approved</p>
                        <p className="text-xs text-muted-foreground">4 days ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Star className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Achievement Unlocked</p>
                        <p className="text-xs text-muted-foreground">You've reached the "Experienced Reviewer" milestone!</p>
                        <p className="text-xs text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="submissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Submissions</CardTitle>
                  <CardDescription>Track all your feedback submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-background p-2 border rounded">
                          <Video className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Samsung Galaxy S23</p>
                          <p className="text-sm text-muted-foreground">Smartphones</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Approved</span>
                        <span className="text-sm text-muted-foreground mt-1">₹500 earned</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-background p-2 border rounded">
                          <Video className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Sony WH-1000XM4</p>
                          <p className="text-sm text-muted-foreground">Audio Equipment</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>
                        <span className="text-sm text-muted-foreground mt-1">Under review</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-background p-2 border rounded">
                          <Video className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Dyson V11 Vacuum</p>
                          <p className="text-sm text-muted-foreground">Home Appliances</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Approved</span>
                        <span className="text-sm text-muted-foreground mt-1">₹750 earned</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline">View All Submissions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                      <h3 className="text-2xl font-bold">₹3,750</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lifetime Earnings</p>
                      <h3 className="text-2xl font-bold">₹12,500</h3>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Reward Tier</p>
                      <h3 className="text-xl font-bold">Gold Reviewer</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                  <CardDescription>Track all your earnings and payouts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-muted-foreground">July 15, 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">₹2,500</p>
                        <p className="text-sm text-muted-foreground">Processed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">UPI Transfer</p>
                        <p className="text-sm text-muted-foreground">June 28, 2023</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">₹1,800</p>
                        <p className="text-sm text-muted-foreground">Processed</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
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
                    <Button>Request Payout</Button>
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
