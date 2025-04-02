
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Briefcase, MapPin, Code, BarChart, HeadsetIcon, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Careers = () => {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Mumbai, India (Remote)",
      type: "Full-Time",
      description: "We're looking for a senior frontend developer with expertise in React, TypeScript and modern web technologies to help build our customer-facing interfaces.",
      icon: <Code className="h-5 w-5" />
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Bangalore, India (Hybrid)",
      type: "Full-Time",
      description: "Join our analytics team to help brands extract meaningful insights from consumer feedback and improve their products.",
      icon: <BarChart className="h-5 w-5" />
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Delhi, India (On-site)",
      type: "Full-Time",
      description: "Help our brand partners maximize value from our platform and ensure they achieve their feedback goals.",
      icon: <HeadsetIcon className="h-5 w-5" />
    },
    {
      title: "Community Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-Time",
      description: "Build and nurture our community of consumers who provide product feedback and drive engagement on our platform.",
      icon: <Users className="h-5 w-5" />
    }
  ];

  const values = [
    {
      title: "Consumer-First",
      description: "We believe in putting consumers at the center of product decisions"
    },
    {
      title: "Transparency",
      description: "We value honest feedback and open communication"
    },
    {
      title: "Innovation",
      description: "We're constantly evolving our platform and approach"
    },
    {
      title: "Inclusivity",
      description: "We ensure diverse voices are heard and represented"
    }
  ];

  const benefits = [
    "Competitive salary and equity options",
    "Health, dental and vision insurance",
    "Flexible work arrangements",
    "Professional development budget",
    "Wellness programs",
    "Team retreats and events",
    "Paid parental leave",
    "Home office stipend"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Help us build the bridge between consumers and brands for better products
            </p>
            <Button size="lg">View Open Positions</Button>
          </div>
        </div>

        {/* About Us */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg mb-8">
                At GlobalVoice, we're transforming how brands and consumers interact. We believe that meaningful product feedback leads to better products that genuinely meet consumer needs. Our platform connects brands with authentic consumer voices to drive innovation and improvement.
              </p>
              
              <h2 className="text-3xl font-bold mb-6">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="border p-5 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors">
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Benefits & Perks</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-primary/10 p-2 rounded-full mr-3">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
              Join our team and help shape the future of product feedback
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {jobs.map((job, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          {job.icon}
                        </div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                      </div>
                      <Badge variant="outline" className="bg-primary/5 text-primary">
                        {job.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>{job.department}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <p className="text-muted-foreground mb-4">
                      {job.description}
                    </p>
                  </CardContent>
                  <CardFooter className="bg-muted/10 p-4">
                    <Button className="w-full">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-12 bg-primary/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6">Don't see a position that fits?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented individuals to join our team.
              Send us your resume and let us know how you can contribute.
            </p>
            <Link to="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
