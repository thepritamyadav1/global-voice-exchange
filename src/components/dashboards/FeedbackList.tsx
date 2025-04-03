
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserFeedback } from "@/utils/database";
import { Plus } from "lucide-react";
import { FeedbackItem } from "./FeedbackItem";

interface FeedbackListProps {
  title: string;
  description?: string;
  feedbackList: UserFeedback[];
  emptyMessage?: string;
  onNewSubmission?: () => void;
  showUser?: boolean;
  limit?: number;
  showViewAllButton?: boolean;
  onViewAll?: () => void;
}

export const FeedbackList = ({ 
  title, 
  description,
  feedbackList,
  emptyMessage = "You haven't submitted any feedback yet.",
  onNewSubmission,
  showUser = false,
  limit,
  showViewAllButton = false,
  onViewAll
}: FeedbackListProps) => {
  const displayFeedback = limit ? feedbackList.slice(0, limit) : feedbackList;
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {onNewSubmission && (
          <Button variant="outline" size="sm" onClick={onNewSubmission} className="hidden sm:flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Submission
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {feedbackList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{emptyMessage}</p>
            {onNewSubmission && (
              <Button onClick={onNewSubmission} className="mt-4">
                Submit Your First Feedback
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {displayFeedback.map((feedback) => (
              <FeedbackItem 
                key={feedback.id} 
                feedback={feedback}
                showUser={showUser}
              />
            ))}
          </div>
        )}
        
        {showViewAllButton && feedbackList.length > 0 && (
          <div className="mt-6 text-center">
            <Button variant="outline" className="w-full sm:w-auto" onClick={onViewAll}>
              View All
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
