
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Video, BarChart, DollarSign, ShieldCheck, ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-gradient py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in">
              Share Your Feedback, <span className="gradient-text">Earn Rewards</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-8 fade-in-delay-1">
              Record video reviews about products you use, help brands improve, and get rewarded for your honest opinion.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in-delay-2">
              <Link to="/register">
                <Button size="lg" className="px-8 text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="px-8 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Recording and submitting feedback is simple and rewarding
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-background rounded-lg p-6 shadow-md text-center">
                <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Record Your Review</h3>
                <p className="text-foreground/70">
                  Choose a product category and record your authentic video feedback using our platform.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-md text-center">
                <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Submit & Verify</h3>
                <p className="text-foreground/70">
                  Submit your review, which is then verified by our system to ensure authenticity and quality.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-md text-center">
                <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Get Rewarded</h3>
                <p className="text-foreground/70">
                  Once your feedback is approved, receive rewards directly into your account.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/how-it-works">
                <Button variant="outline">
                  Learn More About The Process
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* For Brands Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">For Brands</h2>
                <p className="text-xl text-foreground/70 mb-6">
                  Access real-time, authentic consumer feedback through video testimonials. Understand your customers like never before.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-3">
                    <BarChart className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>Real-time analytics and insights dashboard</span>
                  </li>
                  <li className="flex gap-3">
                    <Video className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>Authentic video testimonials from real users</span>
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>Verified feedback with quality control</span>
                  </li>
                </ul>
                <Link to="/brands">
                  <Button>
                    Brand Solutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 bg-secondary rounded-lg p-6">
                <div className="aspect-video bg-background rounded-md flex items-center justify-center border">
                  <div className="text-center p-4">
                    <BarChart className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                    <p className="text-foreground/50 font-medium">Analytics Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Join thousands of satisfied users already sharing their feedback
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4 text-yellow-500">
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                  </div>
                  <p className="mb-4">
                    "I've earned over ₹10,000 in the past three months just by sharing my honest feedback on products I already use. It's amazing!"
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">PR</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Priya R.</p>
                      <p className="text-sm text-foreground/70">Delhi, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4 text-yellow-500">
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                  </div>
                  <p className="mb-4">
                    "As a student, this platform has been a game-changer for me. The reward system is transparent, and payments are always on time."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">AK</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Akshay K.</p>
                      <p className="text-sm text-foreground/70">Mumbai, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex mb-4 text-yellow-500">
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="fill-yellow-500 h-5 w-5" />
                    <Star className="h-5 w-5" />
                  </div>
                  <p className="mb-4">
                    "The platform is incredibly easy to use. I enjoy sharing my thoughts on products, and the fact that I get paid for it is just a bonus!"
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-medium">SM</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Sunita M.</p>
                      <p className="text-sm text-foreground/70">Bangalore, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to share your feedback?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-primary-foreground/90">
              Join thousands of users who are already earning rewards for their honest opinions.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
