
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message sent!",
        description: "We've received your inquiry and will get back to you soon.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setCompany("");
      setInquiryType("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about GlobalVoice? Reach out to our team and we'll get back to you soon.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Our Office</h3>
                  <address className="not-italic text-muted-foreground">
                    123 Tech Park<br />
                    Bengaluru, Karnataka 560001<br />
                    India
                  </address>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Email</h3>
                  <a href="mailto:info@globalvoice.com" className="text-muted-foreground hover:text-primary">
                    info@globalvoice.com
                  </a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-lg mb-1">Phone</h3>
                  <a href="tel:+918123456789" className="text-muted-foreground hover:text-primary">
                    +91 81234 56789
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={inquiryType} onValueChange={setInquiryType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brand">Brand Partnership</SelectItem>
                          <SelectItem value="demo">Request Demo</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                          <SelectItem value="careers">Careers</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading} className="w-full">
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
