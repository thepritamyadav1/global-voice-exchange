
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboards/StatCard";
import { UserProfile, UserFeedback } from "@/utils/database";
import { DollarSign, BarChart, Star } from "lucide-react";

interface RewardsTabProps {
  userProfile: UserProfile | null;
  feedback: UserFeedback[];
  onRequestPayout: () => void;
}

export const RewardsTab = ({ userProfile, feedback, onRequestPayout }: RewardsTabProps) => {
  // Calculate available balance
  const availableBalance = feedback
    .filter(f => f.status === 'approved' && f.reward)
    .reduce((sum, f) => sum + (f.reward || 0), 0) - 
    (userProfile?.totalEarnings || 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatCard
          icon={DollarSign}
          title="Available Balance"
          value={`₹${availableBalance}`}
        />
        
        <StatCard
          icon={BarChart}
          title="Lifetime Earnings"
          value={`₹${userProfile?.totalEarnings || 0}`}
        />
        
        <StatCard
          icon={Star}
          title="Reward Tier"
          value={userProfile?.level || 'Bronze Reviewer'}
        />
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>Track all your earnings and payouts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-medium">Bank Transfer</p>
                <p className="text-sm text-muted-foreground">July 15, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">₹2,500</p>
                <p className="text-sm text-muted-foreground">Processed</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-medium">UPI Transfer</p>
                <p className="text-sm text-muted-foreground">June 28, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">₹1,800</p>
                <p className="text-sm text-muted-foreground">Processed</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div>
                <p className="font-medium">Bank Transfer</p>
                <p className="text-sm text-muted-foreground">May 12, 2023</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">₹4,450</p>
                <p className="text-sm text-muted-foreground">Processed</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button 
              disabled={availableBalance < 500} 
              onClick={onRequestPayout}
            >
              {availableBalance < 500 
                ? `Minimum ₹500 required (₹${500 - availableBalance} more needed)` 
                : "Request Payout"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
