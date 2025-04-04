
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, RefreshCw, Shield, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  userName?: string;
  profileName?: string;
  profileUpdated: Date | null;
  onRefresh: () => void;
  verificationStatus?: "verified" | "pending" | "unverified";
  userLevel?: string;
  userPoints?: number;
}

export const DashboardHeader = ({ 
  userName, 
  profileName, 
  profileUpdated,
  onRefresh,
  verificationStatus = "unverified",
  userLevel = "Bronze Reviewer",
  userPoints = 0
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmitFeedback = () => {
    navigate("/submit-feedback");
  };

  const handleRefreshData = () => {
    onRefresh();
    toast({
      title: "Dashboard refreshed",
      description: "Your data has been updated.",
    });
  };
  
  const handleVerifyAccount = () => {
    if (verificationStatus === "unverified") {
      toast({
        title: "Verification needed",
        description: "Complete your profile to start the verification process.",
      });
      // In a real implementation, navigate to verification page
      // navigate("/verify-account");
    }
  };
  
  // Function to format date safely
  const formatLastUpdated = (date: Date | null) => {
    if (!date) return "Never";
    return date.toLocaleTimeString();
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          {verificationStatus === "verified" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Verified
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your account is fully verified</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {verificationStatus === "pending" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Pending
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verification in progress</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <p className="text-foreground/70">Welcome back, {userName || profileName || "User"}!</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          {profileUpdated && (
            <p className="text-muted-foreground">
              Last updated: {formatLastUpdated(profileUpdated)}
            </p>
          )}
          {userLevel && (
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Level:</span>
              <Badge variant="secondary" className="font-normal">{userLevel}</Badge>
            </div>
          )}
          {userPoints !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Points:</span>
              <span className="font-medium">{userPoints.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full sm:w-auto">
        <Button 
          onClick={handleSubmitFeedback}
          className="w-full sm:w-auto flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Submit New Feedback
        </Button>
        <Button 
          variant="outline"
          onClick={handleRefreshData}
          className="w-full sm:w-auto"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
        {verificationStatus === "unverified" && (
          <Button
            variant="outline"
            onClick={handleVerifyAccount}
            className="w-full sm:w-auto bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
          >
            <Shield className="h-4 w-4 mr-2" />
            Verify Account
          </Button>
        )}
      </div>
    </div>
  );
};
