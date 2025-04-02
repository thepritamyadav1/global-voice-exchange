
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Video, BarChart, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="py-4 border-b">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Video className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">GlobalVoice</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link to="/brands" className="text-foreground/80 hover:text-foreground transition-colors">
            For Brands
          </Link>
          <Link to="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/login">
            <Button variant="outline" className="mr-2">Log In</Button>
          </Link>
          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 space-y-4 bg-background border-b">
          <Link to="/how-it-works" className="block py-2 text-foreground/80 hover:text-foreground">
            How It Works
          </Link>
          <Link to="/brands" className="block py-2 text-foreground/80 hover:text-foreground">
            For Brands
          </Link>
          <Link to="/dashboard" className="block py-2 text-foreground/80 hover:text-foreground">
            Dashboard
          </Link>
          <div className="flex flex-col space-y-2 pt-2">
            <Link to="/login">
              <Button variant="outline" className="w-full">Log In</Button>
            </Link>
            <Link to="/register">
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
