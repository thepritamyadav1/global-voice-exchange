
import { ArrowRight, BarChart, CheckCircle, DollarSign, Search, ShieldCheck, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Brands = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-16">
          <div className="container px-4 mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Transform Customer Feedback into Business Growth</h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Get authentic video reviews from real customers and turn their insights into actionable business strategies.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button size="lg" className="gap-2">
                      Request Demo <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" size="lg">
                      Create Brand Account
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex justify-end">
                <div className="bg-primary/10 rounded-lg p-8 w-full max-w-md">
                  <BarChart className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Real-time Analytics</h3>
                  <p className="text-muted-foreground">
                    Track customer sentiment, spot trends, and measure product performance with our powerful dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Solutions for Modern Brands</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-primary/10 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <Video className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Authentic Video Feedback</h3>
                <p className="text-muted-foreground">
                  Access unfiltered customer opinions through video reviews, capturing nuances that text feedback misses.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="border-primary/10 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <BarChart className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Powerful Analytics</h3>
                <p className="text-muted-foreground">
                  Transform feedback into actionable insights with our AI-powered analytics dashboard.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="border-primary/10 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <Search className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Targeted Research</h3>
                <p className="text-muted-foreground">
                  Run focused feedback campaigns for specific products, features, or audience segments.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* How It Works for Brands */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works for Brands</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="bg-background rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0 border border-primary">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Create Your Brand Profile</h3>
                    <p className="text-muted-foreground">
                      Set up your brand account, add your products, and customize your feedback requirements.
                    </p>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="bg-background rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0 border border-primary">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Launch Feedback Campaigns</h3>
                    <p className="text-muted-foreground">
                      Create feedback campaigns for specific products, targeting the right audience demographics.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="bg-background rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0 border border-primary">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Receive Video Reviews</h3>
                    <p className="text-muted-foreground">
                      Get high-quality video feedback from real customers who've used your products.
                    </p>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="bg-background rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0 border border-primary">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Analyze & Take Action</h3>
                    <p className="text-muted-foreground">
                      Use our powerful analytics dashboard to extract insights and make data-driven decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Flexible Pricing Plans</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Choose a plan that fits your business needs, from startups to enterprise organizations.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="border-primary/10">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$299</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">Perfect for small businesses and startups.</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Up to 50 video reviews per month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
                
                <Link to="/contact">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border-primary relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$799</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">Ideal for growing companies.</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Up to 200 video reviews per month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Advanced analytics with sentiment analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Custom branding options</span>
                  </li>
                </ul>
                
                <Link to="/contact">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="border-primary/10">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <p className="text-muted-foreground mb-6">For large organizations with specific needs.</p>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Unlimited video reviews</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Full analytics suite with API access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>SLA & premium support</span>
                  </li>
                </ul>
                
                <Link to="/contact">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Testimonials/Brands Using */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Trusted by Leading Brands</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70">
              <div className="h-12 w-32 bg-foreground/20 rounded"></div>
              <div className="h-12 w-32 bg-foreground/20 rounded"></div>
              <div className="h-12 w-32 bg-foreground/20 rounded"></div>
              <div className="h-12 w-32 bg-foreground/20 rounded"></div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform customer feedback into growth?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join leading brands already using GlobalVoice to make data-driven decisions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="gap-2">
                  Request Demo <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Create Brand Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Brands;
