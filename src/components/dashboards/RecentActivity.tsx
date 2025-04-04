
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserFeedback } from "@/utils/database";
import { Check, Clock, X, AlertCircle } from "lucide-react";

interface RecentActivityProps {
  title: string;
  description?: string;
  activities: UserFeedback[];
  limit?: number;
}

export const RecentActivity = ({
  title,
  description,
  activities,
  limit = 5
}: RecentActivityProps) => {
  const displayActivities = activities.slice(0, limit);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return "Approved";
      case 'pending':
        return "Pending Review";
      case 'rejected':
        return "Rejected";
      default:
        return "Unknown Status";
    }
  };

  // Format date to "Jan 15, 2023"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {displayActivities.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground">No recent activity to display</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="mr-4">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.productName}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-sm text-muted-foreground">{activity.category}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(activity.date)}</p>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                    activity.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {getStatusText(activity.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
