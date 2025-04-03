
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from "lucide-react";
import BookDemo from "@/components/BookDemo";
import BrandFAQ from "@/components/BrandFAQ";

const Brands = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4">For Brands</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover What Customers <span className="text-primary">Really</span> Think
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Harness authentic video feedback from real customers to improve your products and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookDemo buttonSize="lg" />
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect Your Products</h3>
                <p className="text-muted-foreground">
                  Easily add your products to our platform and define what type of feedback you're looking for.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Receive Real Feedback</h3>
                <p className="text-muted-foreground">
                  Get authentic video and text reviews from our diverse network of engaged users.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Gain Actionable Insights</h3>
                <p className="text-muted-foreground">
                  Our analytics dashboard gives you a clear view of what customers love and what can be improved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Why Brands Choose Us</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              More than just reviews, we provide a complete feedback ecosystem that helps brands make better decisions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex gap-3">
                  <div className="text-primary shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Authentic Video Feedback</h3>
                    <p className="text-muted-foreground">
                      Get real, unscripted video reviews from customers showing genuine reactions to your products.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="text-primary shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Targeted Demographics</h3>
                    <p className="text-muted-foreground">
                      Receive feedback from specific customer segments that matter most to your business.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="text-primary shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Comprehensive Analytics</h3>
                    <p className="text-muted-foreground">
                      Track trends, sentiment analysis, and detailed breakdowns of customer opinions.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="text-primary shrink-0">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Competitive Insights</h3>
                    <p className="text-muted-foreground">
                      Understand how your products compare to competitors in the market.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-lg border">
                <img 
                  src="/placeholder.svg" 
                  alt="Brand Dashboard Preview" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Custom pricing plans tailored to your brand's specific needs
            </p>
            
            <div className="max-w-xl mx-auto bg-background rounded-xl shadow-lg border">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4">Enterprise Plan</h3>
                <p className="text-muted-foreground mb-6">
                  Customized solution for businesses of all sizes
                </p>
                
                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Unlimited feedback collection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Advanced analytics dashboard</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Custom integration options</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-3" />
                    <span>Priority support</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="font-medium mb-4">Contact our sales team for pricing details</p>
                  <BookDemo buttonVariant="default" fullWidth={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <BrandFAQ />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to discover what customers really think?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join leading brands already gathering valuable insights on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookDemo buttonVariant="secondary" buttonSize="lg" />
              <Button variant="outline" size="lg" className="bg-transparent border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Brands;
