
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Check, ChevronRight, Play, Video, Users, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const BrandBenefitCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="transition-all duration-300 hover:shadow-md hover:-translate-y-1">
    <CardContent className="p-6 flex flex-col space-y-3">
      <div className="bg-primary/10 p-3 rounded-lg inline-flex self-start">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Brands = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted with:", { email, message });
    // Reset form
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2">
                  <span>For Enterprise</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Real Customer <span className="text-primary">Insights</span> to Drive Your Business Forward
                </h1>
                <p className="text-xl text-muted-foreground">
                  Access authentic video feedback from real customers to inform your product development and marketing strategies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link to="/brand-dashboard">
                    <Button size="lg" className="w-full sm:w-auto">
                      Access Brand Dashboard
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Schedule a Demo
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>No credit card required to start</span>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-primary to-accent">
                  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-accent/80"></div>
                  <div className="relative p-8 text-white">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <Video className="h-6 w-6" />
                        <span className="font-bold text-xl">GlobalVoice</span>
                      </div>
                      <div className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                        Enterprise Dashboard
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">Customer Sentiment</h3>
                          <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex gap-2">
                          <div className="h-2 flex-grow bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white/80 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <span className="text-xs">75%</span>
                        </div>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <div className="bg-white/10 rounded-lg p-3 flex-1">
                          <div className="font-medium mb-1">Total Reviews</div>
                          <div className="text-2xl font-bold">523</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 flex-1">
                          <div className="font-medium mb-1">Avg. Rating</div>
                          <div className="text-2xl font-bold">4.7/5</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Brands Choose GlobalVoice</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The most comprehensive platform for gathering authentic customer feedback and insights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BrandBenefitCard 
                icon={<Video className="h-6 w-6 text-primary" />}
                title="Authentic Video Feedback"
                description="Access real video testimonials from actual customers who have used your products."
              />
              <BrandBenefitCard 
                icon={<BarChart className="h-6 w-6 text-primary" />}
                title="Actionable Insights"
                description="Convert raw feedback into actionable insights with our advanced analytics tools."
              />
              <BrandBenefitCard 
                icon={<Users className="h-6 w-6 text-primary" />}
                title="Targeted Demographics"
                description="Filter feedback by specific customer demographics to understand different market segments."
              />
              <BrandBenefitCard 
                icon={<Zap className="h-6 w-6 text-primary" />}
                title="Rapid Implementation"
                description="Get set up in minutes and start receiving customer feedback immediately."
              />
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How GlobalVoice Works For Brands</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple process to gather valuable customer insights and improve your products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="relative border-none shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 bg-primary text-primary-foreground rounded-br-lg flex items-center justify-center font-bold">
                  1
                </div>
                <CardHeader className="pt-12">
                  <CardTitle>Sign Up</CardTitle>
                  <CardDescription>Create a brand account and configure your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Complete verification process</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Set up your brand profile</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Define product categories</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative border-none shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 bg-primary text-primary-foreground rounded-br-lg flex items-center justify-center font-bold">
                  2
                </div>
                <CardHeader className="pt-12">
                  <CardTitle>Receive Feedback</CardTitle>
                  <CardDescription>Access customer video reviews and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>View authentic video testimonials</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Read detailed written feedback</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Filter by demographics and metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative border-none shadow-md overflow-hidden">
                <div className="absolute top-0 left-0 w-8 h-8 bg-primary text-primary-foreground rounded-br-lg flex items-center justify-center font-bold">
                  3
                </div>
                <CardHeader className="pt-12">
                  <CardTitle>Analyze & Act</CardTitle>
                  <CardDescription>Turn feedback into actionable insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Generate detailed analytics reports</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Identify trends and opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>Implement product improvements</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-10">
              <Link to="/brand-dashboard">
                <Button size="lg" className="gap-2">
                  Try Brand Dashboard <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted by Leading Brands</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See what other companies are saying about GlobalVoice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        ))}
                      </div>
                      <p className="italic text-muted-foreground mb-4">
                        "GlobalVoice has transformed how we gather and analyze customer feedback. The video testimonials provide much deeper insights than traditional surveys ever could."
                      </p>
                    </div>
                    <div className="flex items-center mt-4 pt-4 border-t">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center font-bold text-primary">
                        SA
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Sarah Anderson</p>
                        <p className="text-sm text-muted-foreground">Product Manager, TechCorp</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        ))}
                      </div>
                      <p className="italic text-muted-foreground mb-4">
                        "The demographic filtering capabilities are a game-changer. We're now able to precisely target our product improvements based on specific customer segments."
                      </p>
                    </div>
                    <div className="flex items-center mt-4 pt-4 border-t">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center font-bold text-primary">
                        RJ
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Raj Patel</p>
                        <p className="text-sm text-muted-foreground">Marketing Director, StyleHub</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <div className="flex mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        ))}
                      </div>
                      <p className="italic text-muted-foreground mb-4">
                        "Within three months of using GlobalVoice, we implemented customer-suggested improvements that led to a 27% increase in customer satisfaction scores."
                      </p>
                    </div>
                    <div className="flex items-center mt-4 pt-4 border-t">
                      <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center font-bold text-primary">
                        EL
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">Elena Lopez</p>
                        <p className="text-sm text-muted-foreground">CEO, HomeGoods Inc.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Flexible Pricing for Every Brand</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that best fits your company's needs.
              </p>
            </div>

            <Tabs defaultValue="monthly" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-[400px] max-w-full grid-cols-2 mx-auto mb-8">
                <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                <TabsTrigger value="annual">Annual Billing (20% off)</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Startup</CardTitle>
                      <CardDescription>For small businesses just getting started</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">₹9,999</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Up to 50 feedback reviews/month</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Basic demographic filtering</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Standard analytics dashboard</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6">Get Started</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary shadow-lg relative">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                      POPULAR
                    </div>
                    <CardHeader>
                      <CardTitle>Growth</CardTitle>
                      <CardDescription>For growing companies with expanding needs</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">₹24,999</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Up to 200 feedback reviews/month</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Advanced demographic filtering</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Enhanced analytics & reports</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Dedicated account manager</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6">Get Started</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <CardDescription>For large organizations with complex needs</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">Custom</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Unlimited feedback reviews</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Custom demographic targeting</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Advanced AI-powered insights</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>API access & custom integrations</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="annual">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Startup</CardTitle>
                      <CardDescription>For small businesses just getting started</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">₹7,999</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Up to 50 feedback reviews/month</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Basic demographic filtering</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Standard analytics dashboard</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6">Get Started</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-primary shadow-lg relative">
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                      POPULAR
                    </div>
                    <CardHeader>
                      <CardTitle>Growth</CardTitle>
                      <CardDescription>For growing companies with expanding needs</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">₹19,999</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Up to 200 feedback reviews/month</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Advanced demographic filtering</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Enhanced analytics & reports</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Dedicated account manager</span>
                        </li>
                      </ul>
                      <Button className="w-full mt-6">Get Started</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Enterprise</CardTitle>
                      <CardDescription>For large organizations with complex needs</CardDescription>
                      <div className="mt-4">
                        <span className="text-3xl font-bold">Custom</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Unlimited feedback reviews</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Custom demographic targeting</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>Advanced AI-powered insights</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span>API access & custom integrations</span>
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full mt-6">Contact Sales</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact section */}
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg text-muted-foreground">
                  Have questions about how GlobalVoice can help your brand? Our team is ready to assist.
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input id="company" placeholder="Your company" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your needs..."
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Brands;
