
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, BarChart2, LineChart, PieChart, Users, Briefcase, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const Enterprise = () => {
  const { toast } = useToast();
  
  const features = [
    {
      icon: <BarChart2 className="h-6 w-6 text-primary" />,
      title: "Advanced Analytics",
      description: "Get deeper insights with custom dashboards and comprehensive reports"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Unlimited Users",
      description: "Add your entire team to collaborate and analyze feedback"
    },
    {
      icon: <LineChart className="h-6 w-6 text-primary" />,
      title: "Trend Analysis",
      description: "Track feedback trends over time with advanced visualization tools"
    },
    {
      icon: <PieChart className="h-6 w-6 text-primary" />,
      title: "Demographic Insights",
      description: "Filter feedback by detailed demographic segments"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Competitor Benchmarking",
      description: "Compare your products against competitors in the market"
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Global Reach",
      description: "Access feedback from consumers across multiple regions and languages"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Enterprise Solutions</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Powerful feedback management and analytics for large organizations with custom needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="font-semibold">Book a Demo</Button>
              </Link>
              <Button size="lg" variant="outline" asChild>
                <Link to="/brands">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Enterprise Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 bg-primary/10 p-3 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose Enterprise?</h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
              Our enterprise solution delivers exceptional value for large organizations
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg">Dedicated Account Manager</h3>
                    <p className="text-muted-foreground">Get personalized support from your dedicated account representative</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg">Custom Integration</h3>
                    <p className="text-muted-foreground">Integrate with your existing tools and workflows</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg">Data Security</h3>
                    <p className="text-muted-foreground">Enterprise-grade security with data compliance guarantees</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg">Advanced Reporting</h3>
                    <p className="text-muted-foreground">Generate custom reports with detailed insights</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg">Priority Support</h3>
                    <p className="text-muted-foreground">Get priority technical assistance whenever you need it</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-lg">Custom Branding</h3>
                    <p className="text-muted-foreground">Maintain your brand identity throughout the feedback collection process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 bg-gradient-to-r from-primary/20 to-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform customer feedback into action?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Schedule a personalized demo with our team to discover how our Enterprise solution can work for your organization
            </p>
            <Link to="/contact">
              <Button size="lg" className="font-semibold px-8">Book a Demo</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Enterprise;
