
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Video } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "brand">("user");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    if (!agreeTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      register(name, email, password, role);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-grow py-12 hero-gradient">
        <div className="container max-w-md mx-auto px-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create an account</h1>
            <p className="text-muted-foreground">
              {role === "user" 
                ? "Start sharing feedback and earning rewards" 
                : "Access valuable customer insights"}
            </p>
          </div>
          
          <Card>
            <form onSubmit={handleRegister}>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Enter your information to create an account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as "user" | "brand")}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="user" id="r-user" />
                      <Label htmlFor="r-user" className="cursor-pointer">Consumer Account</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="brand" id="r-brand" />
                      <Label htmlFor="r-brand" className="cursor-pointer">Business Account</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    {role === "user" ? "Full Name" : "Company Name"}
                  </Label>
                  <Input 
                    id="name"
                    placeholder={role === "user" ? "John Doe" : "Acme Corporation"}
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
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword"
                    type="password" 
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeTerms" 
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      privacy policy
                    </Link>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register;
