
import { ArrowRight, CheckCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HowItWorks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How GlobalVoice Works</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Share your honest feedback through video reviews, help brands improve their products, and earn rewards for your opinions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/brands">
                <Button variant="outline" size="lg">
                  For Brands
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Step by Step Process */}
        <section className="py-16 container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works in 4 Simple Steps</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className="border-primary/10 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Sign Up</h3>
                <p className="text-muted-foreground mb-4">
                  Create your free account in seconds. Provide some basic information about yourself and your interests.
                </p>
              </CardContent>
            </Card>
            
            {/* Step 2 */}
            <Card className="border-primary/10 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Select Products</h3>
                <p className="text-muted-foreground mb-4">
                  Browse available products and choose the ones you've used and want to review.
                </p>
              </CardContent>
            </Card>
            
            {/* Step 3 */}
            <Card className="border-primary/10 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Record Feedback</h3>
                <p className="text-muted-foreground mb-4">
                  Use our easy recording tool to share your honest opinion through a short video review.
                </p>
              </CardContent>
            </Card>
            
            {/* Step 4 */}
            <Card className="border-primary/10 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Rewarded</h3>
                <p className="text-muted-foreground mb-4">
                  Receive credits, gift cards, or direct payments for your valuable insights once your review is approved.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Using GlobalVoice</h2>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* For Consumers */}
              <div>
                <h3 className="text-2xl font-bold mb-6">For Consumers</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Earn Rewards</p>
                      <p className="text-muted-foreground">Get paid for sharing your honest opinion about products you already use.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Influence Brands</p>
                      <p className="text-muted-foreground">Have your voice heard directly by companies that value customer input.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Flexible & Convenient</p>
                      <p className="text-muted-foreground">Record feedback whenever and wherever is convenient for you.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* For Brands */}
              <div>
                <h3 className="text-2xl font-bold mb-6">For Brands</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Authentic Insights</p>
                      <p className="text-muted-foreground">Get real, unfiltered video feedback from your actual customers.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Data-Driven Decisions</p>
                      <p className="text-muted-foreground">Access powerful analytics to identify trends and opportunities.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium">Rapid Feedback Loop</p>
                      <p className="text-muted-foreground">Receive insights quickly to adapt products and marketing strategies.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link to="/brands">
                    <Button>Learn More About Brand Solutions</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Video className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start sharing your feedback?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who are already earning rewards for their honest opinions.
            </p>
            <Link to="/register">
              <Button size="lg">Sign Up Now</Button>
            </Link>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
