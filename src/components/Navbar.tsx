
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Video, BarChart, User, Users, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isAuthenticated, userRole, userName, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const closeMenu = () => {
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Standard navigation links
  const navLinks = [
    { name: "How It Works", path: "/how-it-works" },
    { name: "For Brands", path: "/brands" }
  ];
  
  // Role-specific links
  const userLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <BarChart className="h-4 w-4 mr-1" /> },
    { name: "Submit Feedback", path: "/submit-feedback", icon: <Video className="h-4 w-4 mr-1" /> }
  ];
  
  const brandLinks = [
    { name: "Brand Dashboard", path: "/brand-dashboard", icon: <BarChart className="h-4 w-4 mr-1" /> }
  ];

  // Get the first initial of the username for the avatar
  const getInitial = () => {
    if (userName && userName.length > 0) {
      return userName[0].toUpperCase();
    }
    return userRole === "user" ? "U" : "B";
  };

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
          
          {/* Display user-specific links if authenticated as user */}
          {isAuthenticated && userRole === "user" && userLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                ${isActive(link.path) 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          
          {/* Display brand-specific links if authenticated as brand */}
          {isAuthenticated && userRole === "brand" && brandLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center
                ${isActive(link.path) 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          
          {/* Login/Register or User Menu */}
          <div className="ml-2">
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="mr-2">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitial()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userRole === "user" ? "Consumer Account" : "Business Account"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userRole === "user" ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer">My Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/submit-feedback" className="cursor-pointer">Submit Feedback</Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link to="/brand-dashboard" className="cursor-pointer">Brand Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
          
          {/* User Specific Links */}
          {isAuthenticated && userRole === "user" && userLinks.map((link) => (
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
              {link.icon}
              <span className="ml-2">{link.name}</span>
            </Link>
          ))}
          
          {/* Brand Specific Links */}
          {isAuthenticated && userRole === "brand" && brandLinks.map((link) => (
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
              {link.icon}
              <span className="ml-2">{link.name}</span>
            </Link>
          ))}
          
          {/* Auth Buttons */}
          <div className={`flex ${isAuthenticated ? 'flex-row' : 'flex-col'} space-y-2 pt-2 border-t mt-2`}>
            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={closeMenu} className="w-full">
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link to="/register" onClick={closeMenu} className="w-full">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            ) : (
              <div className="flex flex-col w-full space-y-3">
                <div className="flex items-center space-x-3 p-2 bg-muted rounded-md">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitial()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {userRole === "user" ? "Consumer Account" : "Business Account"}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center space-x-2"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
