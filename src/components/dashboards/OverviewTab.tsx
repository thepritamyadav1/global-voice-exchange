
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboards/StatCard";
import { Video, DollarSign, Clock, Star } from "lucide-react";
import { UserFeedback, UserProfile } from "@/utils/database";

interface OverviewTabProps {
  userProfile: UserProfile | null;
  feedback: UserFeedback[];
  onSubmitFeedback: () => void;
  onViewAll: () => void;
}

export const OverviewTab = ({
  userProfile,
  feedback,
  onSubmitFeedback,
  onViewAll
}: OverviewTabProps) => {
  // Calculate points to next level
  const pointsToNextLevel = userProfile ? userProfile.nextLevelPoints - userProfile.points : 0;

  // Calculate monthly submissions
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthSubmissions = feedback.filter(f => {
    const feedbackDate = new Date(f.date);
    return feedbackDate.getMonth() === currentMonth && feedbackDate.getFullYear() === currentYear;
  }).length;
  
  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={Video}
          title="Total Submissions"
          value={userProfile?.totalSubmissions || feedback.length || 0}
        />
        
        <StatCard
          icon={DollarSign}
          title="Total Earnings"
          value={`₹${userProfile?.totalEarnings || 0}`}
        />
        
        <StatCard
          icon={Clock}
          title="Pending Reviews"
          value={feedback.filter(f => f.status === 'pending').length}
        />
      </div>

      {/* User Level Card */}
      {userProfile && (
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Your Reviewer Status</CardTitle>
            <CardDescription>Current level and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center">
                  <div className={`${
                    userProfile.level === 'Bronze Reviewer' ? 'bg-amber-100' :
                    userProfile.level === 'Silver Reviewer' ? 'bg-gray-200' :
                    userProfile.level === 'Gold Reviewer' ? 'bg-yellow-100' :
                    'bg-purple-100'
                  } p-2 rounded-full mr-3`}>
                    <Star className={`h-5 w-5 ${
                      userProfile.level === 'Bronze Reviewer' ? 'text-amber-600' :
                      userProfile.level === 'Silver Reviewer' ? 'text-gray-600' :
                      userProfile.level === 'Gold Reviewer' ? 'text-yellow-600' :
                      'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{userProfile.level}</p>
                    <p className="text-sm text-muted-foreground">{userProfile.points} points</p>
                  </div>
                </div>
                <Badge variant="outline" className={`${
                  userProfile.level === 'Bronze Reviewer' ? 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 text-amber-800' :
                  userProfile.level === 'Silver Reviewer' ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300 text-gray-800' :
                  userProfile.level === 'Gold Reviewer' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-200 text-yellow-800' :
                  'bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300 text-purple-800'
                } w-fit`}>
                  {userProfile.level.split(' ')[0]} Tier
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Next Level: {
                      userProfile.level === 'Bronze Reviewer' ? 'Silver Reviewer' :
                      userProfile.level === 'Silver Reviewer' ? 'Gold Reviewer' :
                      userProfile.level === 'Gold Reviewer' ? 'Platinum Reviewer' :
                      'Max Level Reached'
                    }
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {userProfile.points} of {userProfile.nextLevelPoints} points
                  </span>
                </div>
                <Progress value={(userProfile.points / userProfile.nextLevelPoints) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {userProfile.level !== 'Platinum Reviewer' ? (
                    <>Submit {Math.ceil(pointsToNextLevel / 150)} more reviews to reach {
                      userProfile.level === 'Bronze Reviewer' ? 'Silver' :
                      userProfile.level === 'Silver Reviewer' ? 'Gold' :
                      'Platinum'
                    } level and unlock premium rewards!</>
                  ) : (
                    <>You've reached the highest reviewer level. Enjoy premium rewards!</>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Feedback Activity</CardTitle>
          <CardDescription>Your submission progress this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Monthly Goal</span>
                <span className="text-sm text-muted-foreground">
                  {thisMonthSubmissions} of 10 submissions
                </span>
              </div>
              <Progress 
                value={Math.min((thisMonthSubmissions / 10) * 100, 100)} 
                className="h-2" 
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm">
                {thisMonthSubmissions >= 10 ? (
                  "You've reached your monthly goal! A bonus reward has been added."
                ) : (
                  `Complete ${Math.max(0, 10 - thisMonthSubmissions)} more submissions to reach your goal and unlock a bonus reward!`
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your most recent platform interactions</CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={onViewAll}
          >
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedback.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No activity recorded yet. Submit your first feedback!
              </p>
            ) : (
              feedback.slice(0, 3).map((feedbackItem) => (
                <div key={feedbackItem.id} className="flex items-start space-x-3">
                  <div className={`
                    ${feedbackItem.status === 'approved' ? 'bg-green-100' : 
                      feedbackItem.status === 'pending' ? 'bg-blue-100' : 'bg-red-100'} 
                    p-2 rounded-full
                  `}>
                    <Video className={`h-4 w-4 
                      ${feedbackItem.status === 'approved' ? 'text-green-600' : 
                        feedbackItem.status === 'pending' ? 'text-blue-600' : 'text-red-600'}
                    `} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {feedbackItem.status === 'approved' 
                        ? 'Feedback Approved' 
                        : feedbackItem.status === 'pending' 
                          ? 'Feedback Submitted'
                          : 'Feedback Rejected'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your review for {feedbackItem.productName} was {feedbackItem.status}
                    </p>
                    <p className="text-xs text-muted-foreground">{feedbackItem.date}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
