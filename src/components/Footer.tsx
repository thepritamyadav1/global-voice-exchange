
import { Link } from "react-router-dom";
import { Video, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Video className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">GlobalVoice</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Connecting consumers and brands through authentic video feedback.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Consumers</h3>
            <ul className="space-y-2">
              <li><Link to="/how-it-works" className="text-foreground/70 hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link to="/rewards" className="text-foreground/70 hover:text-primary transition-colors">Rewards</Link></li>
              <li><Link to="/dashboard" className="text-foreground/70 hover:text-primary transition-colors">My Dashboard</Link></li>
              <li><Link to="/faqs" className="text-foreground/70 hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">For Businesses</h3>
            <ul className="space-y-2">
              <li><Link to="/brands" className="text-foreground/70 hover:text-primary transition-colors">Brand Solutions</Link></li>
              <li><Link to="/analytics" className="text-foreground/70 hover:text-primary transition-colors">Analytics</Link></li>
              <li><Link to="/enterprise" className="text-foreground/70 hover:text-primary transition-colors">Enterprise</Link></li>
              <li><Link to="/case-studies" className="text-foreground/70 hover:text-primary transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-foreground/70 hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-foreground/10 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GlobalVoice. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
