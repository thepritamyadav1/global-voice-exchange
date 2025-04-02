
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Video, BarChart, User, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // Mock state for user type - in a real app this would come from authentication
  const [userType] = useState("user"); // "user" or "brand"
  const isMobile = useIsMobile();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "How It Works", path: "/how-it-works" },
    { name: "For Brands", path: "/brands" }
  ];
  
  const userLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <BarChart className="h-4 w-4 mr-1" /> },
    { name: "Submit Feedback", path: "/submit-feedback", icon: <Video className="h-4 w-4 mr-1" /> }
  ];
  
  const brandLinks = [
    { name: "Brand Dashboard", path: "/brand-dashboard", icon: <BarChart className="h-4 w-4 mr-1" /> }
  ];

  const dashboardLink = userType === "user" ? "/dashboard" : "/brand-dashboard";
  const dashboardText = userType === "user" ? "Dashboard" : "Brand Dashboard";
  const dashboardIcon = userType === "user" ? <BarChart className="h-5 w-5" /> : <Users className="h-5 w-5" />;

  return (
    <nav className="py-4 border-b sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Video className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">GlobalVoice</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors 
                ${isActive(link.path) 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }`}
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            to={dashboardLink}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors 
              ${isActive(dashboardLink) 
                ? 'bg-primary/10 text-primary' 
                : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              }`}
          >
            {dashboardText}
          </Link>
          
          {userType === "user" && (
            <Link 
              to="/submit-feedback"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors 
                ${isActive('/submit-feedback') 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }`}
            >
              Submit Feedback
            </Link>
          )}
          
          <div className="ml-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="mr-2">Log In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 space-y-1 animate-in slide-in-from-top duration-300 bg-background border-b shadow-sm">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium 
                ${isActive(link.path) 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          
          <Link 
            to={dashboardLink}
            className={`flex items-center rounded-md px-3 py-2 text-sm font-medium 
              ${isActive(dashboardLink) 
                ? 'bg-primary/10 text-primary' 
                : 'text-foreground/80 hover:bg-muted hover:text-foreground'
              }`}
            onClick={closeMenu}
          >
            {dashboardIcon}
            <span className="ml-2">{dashboardText}</span>
          </Link>
          
          {userType === "user" && (
            <Link 
              to="/submit-feedback"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium 
                ${isActive('/submit-feedback') 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }`}
              onClick={closeMenu}
            >
              <Video className="h-5 w-5" />
              <span className="ml-2">Submit Feedback</span>
            </Link>
          )}
          
          <div className="flex flex-col space-y-2 pt-2 border-t mt-2">
            <Link to="/login" onClick={closeMenu}>
              <Button variant="outline" className="w-full">Log In</Button>
            </Link>
            <Link to="/register" onClick={closeMenu}>
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
