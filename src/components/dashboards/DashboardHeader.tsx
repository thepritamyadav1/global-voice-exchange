
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  userName?: string;
  profileName?: string;
  profileUpdated: Date | null;
  onRefresh: () => void;
}

export const DashboardHeader = ({ 
  userName, 
  profileName, 
  profileUpdated,
  onRefresh
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
  
  // Function to format date safely
  const formatLastUpdated = (date: Date | null) => {
    if (!date) return "Never";
    return date.toLocaleTimeString();
  };
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <p className="text-foreground/70">Welcome back, {userName || profileName || "User"}!</p>
        {profileUpdated && (
          <p className="text-xs text-muted-foreground">
            Last updated: {formatLastUpdated(profileUpdated)}
          </p>
        )}
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
          Refresh Data
        </Button>
      </div>
    </div>
  );
};
