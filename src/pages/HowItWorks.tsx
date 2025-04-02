
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ChevronRight, Video, User, Play, DollarSign, BarChart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const HowItWorks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        {/* Hero section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                How GlobalVoice Works
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Share your authentic product experiences through video feedback and earn rewards while helping brands improve their products.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link to="/submit-feedback">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Submit Feedback
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process steps section */}
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple 3-Step Process</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start earning rewards for your honest product feedback in just three easy steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="absolute top-0 right-0 -mr-4 mt-8 hidden md:block">
                  <ArrowRight className="h-8 w-8 text-muted stroke-[1.5px]" />
                </div>
                <Card className="h-full border-none shadow-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-12 h-12 bg-primary text-primary-foreground rounded-br-xl flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <CardHeader className="pt-16">
                    <CardTitle className="text-xl">Create an Account</CardTitle>
                    <CardDescription>Sign up and complete your profile</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg flex items-center space-x-4">
                      <User className="h-10 w-10 text-primary" />
                      <div>
                        <p className="font-medium">Register in seconds</p>
                        <p className="text-sm text-muted-foreground">Create your account with email or mobile number</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>Quick signup process</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>Complete your profile details</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>Set up payment preferences</span>
                      </li>
                    </ul>
                    <div className="pt-4">
                      <Link to="/register">
                        <Button variant="secondary" className="w-full">
                          Sign Up Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="relative">
                <div className="absolute top-0 right-0 -mr-4 mt-8 hidden md:block">
                  <ArrowRight className="h-8 w-8 text-muted stroke-[1.5px]" />
                </div>
                <Card className="h-full border-none shadow-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-12 h-12 bg-primary text-primary-foreground rounded-br-xl flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <CardHeader className="pt-16">
                    <CardTitle className="text-xl">Record Video Feedback</CardTitle>
                    <CardDescription>Share your honest product experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg flex items-center space-x-4">
                      <Video className="h-10 w-10 text-primary" />
                      <div>
                        <p className="font-medium">Create authentic reviews</p>
                        <p className="text-sm text-muted-foreground">Record 1-3 minute video about products you've used</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>Select product categories</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>Record directly in-app or upload</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>Add written notes with your video</span>
                      </li>
                    </ul>
                    <div className="pt-4">
                      <Link to="/submit-feedback">
                        <Button variant="secondary" className="w-full">
                          Start Giving Feedback
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="h-full border-none shadow-md relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-12 h-12 bg-primary text-primary-foreground rounded-br-xl flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <CardHeader className="pt-16">
                    <CardTitle className="text-xl">Earn Rewards</CardTitle>
                    <CardDescription>Get paid for your valuable insights</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg flex items-center space-x-4">
                      <DollarSign className="h-10 w-10 text-primary" />
                      <div>
                        <p className="font-medium">Receive payments</p>
                        <p className="text-sm text-muted-foreground">Earn ₹150-₹1,500 per approved feedback</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>Feedback reviewed within 48 hours</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>Cash out via bank transfer or UPI</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                        <span>Earn bonus points for quality reviews</span>
                      </li>
                    </ul>
                    <div className="pt-4">
                      <Link to="/dashboard">
                        <Button variant="secondary" className="w-full">
                          Track Your Earnings
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Video demo section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">See GlobalVoice in Action</h2>
                <p className="text-lg text-muted-foreground">
                  Watch how easy it is to create and submit video feedback on our platform.
                </p>
              </div>
              
              <div className="relative rounded-xl overflow-hidden shadow-xl bg-background aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <div className="rounded-full bg-primary/90 p-4 cursor-pointer hover:bg-primary transition-colors shadow-lg">
                    <Play className="h-8 w-8 text-white" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    How to use GlobalVoice
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefits of Using GlobalVoice</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Why thousands of users choose our platform for sharing their product experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <DollarSign className="h-10 w-10 text-primary" />,
                  title: "Earn Real Money",
                  description: "Get paid for sharing your honest opinions about products you already use."
                },
                {
                  icon: <Video className="h-10 w-10 text-primary" />,
                  title: "Simple Video Creation",
                  description: "Our user-friendly interface makes recording and uploading videos quick and easy."
                },
                {
                  icon: <BarChart className="h-10 w-10 text-primary" />,
                  title: "Impact Product Development",
                  description: "Your feedback directly influences how brands improve their products."
                },
                {
                  icon: <User className="h-10 w-10 text-primary" />,
                  title: "Build Your Profile",
                  description: "Become a trusted reviewer and unlock higher-paying feedback opportunities."
                }
              ].map((benefit, i) => (
                <Card key={i} className="border-none shadow-md h-full">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="bg-primary/10 p-4 rounded-full inline-flex mx-auto">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real experiences from people who use GlobalVoice to share feedback and earn rewards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Amit Patel",
                  role: "Tech Enthusiast",
                  photo: "AP",
                  quote: "I've earned over ₹45,000 in the past year just by sharing my honest opinions about gadgets I was already buying. The process is incredibly simple!"
                },
                {
                  name: "Priya Sharma",
                  role: "Lifestyle Blogger",
                  photo: "PS",
                  quote: "GlobalVoice has become part of my routine when I try new products. Not only do I earn good money, but it's satisfying to know brands actually listen to my feedback."
                },
                {
                  name: "Rajesh Kumar",
                  role: "Working Professional",
                  photo: "RK",
                  quote: "As someone who's always researching before buying, being on the other side now is amazing. I've received multiple bonuses for detailed feedback that helped improve products."
                }
              ].map((testimonial, i) => (
                <Card key={i} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <div className="flex mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                          ))}
                        </div>
                        <p className="italic text-muted-foreground mb-4">
                          "{testimonial.quote}"
                        </p>
                      </div>
                      <div className="flex items-center mt-4 pt-4 border-t">
                        <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center font-bold text-primary">
                          {testimonial.photo}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-lg text-muted-foreground">
                  Common questions about using GlobalVoice
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "How much can I earn with GlobalVoice?",
                    a: "Earnings vary based on the product category, the quality and depth of your feedback, and your reviewer status. On average, users earn between ₹150-₹1,500 per approved feedback submission. Top reviewers can earn ₹20,000+ monthly."
                  },
                  {
                    q: "What kinds of products can I review?",
                    a: "You can review a wide range of consumer products including electronics, home appliances, cosmetics, fashion items, food products, and more. The platform regularly updates with new product categories based on brand demand."
                  },
                  {
                    q: "How do I get paid for my feedback?",
                    a: "Once your feedback is approved, the payment is added to your GlobalVoice account balance. You can request a payout when your balance reaches ₹500. We support bank transfers and all major UPI payment methods."
                  },
                  {
                    q: "What makes a good video review?",
                    a: "A good video review is honest, detailed, and provides both pros and cons of the product. We recommend covering aspects like build quality, performance, user experience, and value for money. Videos should be 1-3 minutes long with good lighting and clear audio."
                  },
                  {
                    q: "Is my personal information shared with brands?",
                    a: "No, we take your privacy seriously. Brands only see demographic information (age range, location, etc.) but never your personal contact details unless you explicitly opt-in to being contacted for follow-up research."
                  }
                ].map((item, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Still have questions about how GlobalVoice works?
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-primary/10">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users who are already sharing feedback and getting rewarded.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Sign Up Now <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
