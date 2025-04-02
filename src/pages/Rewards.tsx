
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Gift, DollarSign, Award, BadgeCheck, Clock, Info, Video } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Rewards = () => {
  const { isAuthenticated, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("cash");

  // Levels data
  const levels = [
    {
      name: "Bronze",
      points: "0 - 1,000",
      benefits: ["₹200 per approved feedback", "Basic feedback filters", "Monthly payouts"]
    },
    {
      name: "Silver",
      points: "1,001 - 3,000",
      benefits: ["₹300 per approved feedback", "Priority review queue", "Bi-weekly payouts", "Early access to new products"]
    },
    {
      name: "Gold",
      points: "3,001 - 6,000",
      benefits: ["₹500 per approved feedback", "Premium product opportunities", "Weekly payouts", "Exclusive events invitations"]
    },
    {
      name: "Platinum",
      points: "6,001+",
      benefits: ["₹750 per approved feedback", "VIP product testing", "On-demand payouts", "Profile featured to brands"]
    }
  ];

  // Rewards options
  const cashRewards = [
    {
      title: "Direct Bank Transfer",
      description: "Get paid directly to your bank account",
      minAmount: "₹500",
      icon: <DollarSign className="h-6 w-6 text-green-600" />
    },
    {
      title: "UPI Transfer",
      description: "Instant transfer to your UPI account",
      minAmount: "₹200",
      icon: <DollarSign className="h-6 w-6 text-green-600" />
    },
    {
      title: "PayTM Wallet",
      description: "Transfer to your PayTM wallet",
      minAmount: "₹100",
      icon: <DollarSign className="h-6 w-6 text-green-600" />
    }
  ];

  const giftCards = [
    {
      title: "Amazon Gift Card",
      description: "Redeem for Amazon purchases",
      points: 500,
      value: "₹500",
      icon: <Gift className="h-6 w-6 text-primary" />
    },
    {
      title: "Flipkart Gift Card",
      description: "Shop on Flipkart with your rewards",
      points: 500,
      value: "₹500",
      icon: <Gift className="h-6 w-6 text-primary" />
    },
    {
      title: "Swiggy Voucher",
      description: "Order food and get delivery discounts",
      points: 300,
      value: "₹300",
      icon: <Gift className="h-6 w-6 text-primary" />
    }
  ];

  const experiences = [
    {
      title: "Product Preview Access",
      description: "Early access to upcoming products",
      points: 1000,
      icon: <Star className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Brand Event Invitation",
      description: "Attend exclusive product launch events",
      points: 2000,
      icon: <Award className="h-6 w-6 text-amber-500" />
    },
    {
      title: "Featured Reviewer Status",
      description: "Get highlighted to brands for premium opportunities",
      points: 5000,
      icon: <BadgeCheck className="h-6 w-6 text-amber-500" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rewards Program</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Earn rewards for sharing your honest feedback on products and services
            </p>
            {!isAuthenticated && (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="font-semibold">Join Now</Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            )}
            {isAuthenticated && userRole === "user" && (
              <Link to="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Submit Feedback</h3>
                <p className="text-muted-foreground">
                  Record video reviews of products you've purchased and used
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Get Approved</h3>
                <p className="text-muted-foreground">
                  Our team reviews your submission for quality and authenticity
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Earn Rewards</h3>
                <p className="text-muted-foreground">
                  Cash out your earnings or choose from other reward options
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reward Levels */}
        <div className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Reward Levels</h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
              The more you participate, the more you earn
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {levels.map((level, index) => (
                <Card key={index} className={`border-t-4 ${
                  level.name === "Bronze" ? "border-t-orange-400" :
                  level.name === "Silver" ? "border-t-slate-300" :
                  level.name === "Gold" ? "border-t-amber-400" :
                  "border-t-slate-600"
                }`}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className={`h-5 w-5 mr-2 ${
                        level.name === "Bronze" ? "text-orange-400" :
                        level.name === "Silver" ? "text-slate-400" :
                        level.name === "Gold" ? "text-amber-400" :
                        "text-slate-700"
                      }`} />
                      {level.name} Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {level.points} points
                    </p>
                    <ul className="space-y-2 text-sm">
                      {level.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                            <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
                          </div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Available Rewards */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Available Rewards</h2>
            
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="cash" className="space-y-8" onValueChange={setActiveTab}>
                <div className="flex justify-center">
                  <TabsList>
                    <TabsTrigger value="cash">Cash Rewards</TabsTrigger>
                    <TabsTrigger value="gift">Gift Cards</TabsTrigger>
                    <TabsTrigger value="experience">Experiences</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="cash" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cashRewards.map((reward, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-center mb-4">
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              {reward.icon}
                            </div>
                            <h3 className="font-bold text-lg">{reward.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-3">{reward.description}</p>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>Minimum: {reward.minAmount}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-muted/10 pt-4">
                          <Button className="w-full" disabled={!isAuthenticated}>
                            {isAuthenticated ? "Redeem" : "Sign In to Redeem"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="gift" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {giftCards.map((card, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-center mb-4">
                            <div className="bg-primary/10 p-2 rounded-full mr-3">
                              {card.icon}
                            </div>
                            <h3 className="font-bold text-lg">{card.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-3">{card.description}</p>
                          <div className="flex items-center justify-between text-sm">
                            <Badge variant="outline">
                              {card.points} points
                            </Badge>
                            <span className="font-medium">Value: {card.value}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-muted/10 pt-4">
                          <Button className="w-full" disabled={!isAuthenticated}>
                            {isAuthenticated ? "Redeem" : "Sign In to Redeem"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="experience" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {experiences.map((exp, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-center mb-4">
                            <div className="bg-amber-100 p-2 rounded-full mr-3">
                              {exp.icon}
                            </div>
                            <h3 className="font-bold text-lg">{exp.title}</h3>
                          </div>
                          <p className="text-muted-foreground mb-3">{exp.description}</p>
                          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                            {exp.points} points required
                          </Badge>
                        </CardContent>
                        <CardFooter className="bg-muted/10 pt-4">
                          <Button className="w-full" disabled={!isAuthenticated}>
                            {isAuthenticated ? "Unlock" : "Sign In to Unlock"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-12 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Start Earning Today</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of consumers who are sharing their product experiences 
              and earning rewards. Your opinion matters!
            </p>
            {!isAuthenticated ? (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button>Create Account</Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            ) : userRole === "user" ? (
              <Link to="/submit-feedback">
                <Button>Submit Feedback</Button>
              </Link>
            ) : (
              <Link to="/brands">
                <Button>Brand Solutions</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Rewards;
