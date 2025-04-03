
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserFeedback } from "@/utils/database";
import { FileVideo, Video } from "lucide-react";
import { useState } from "react";

interface FeedbackItemProps {
  feedback: UserFeedback;
  showUser?: boolean;
  showActions?: boolean;
}

export const FeedbackItem = ({ feedback, showUser = false, showActions = false }: FeedbackItemProps) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
      <div className="flex items-center space-x-4 mb-3 sm:mb-0">
        <div className="bg-background p-2 border rounded">
          <Video className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="font-medium">{feedback.productName}</p>
          <p className="text-sm text-muted-foreground">{feedback.category}</p>
          {showUser && (
            <p className="text-xs text-muted-foreground mt-1">by Anonymous User • {feedback.date}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
        <Badge 
          className={
            feedback.status === 'approved' 
              ? "bg-green-100 text-green-800 border-green-200"
              : feedback.status === 'pending'
                ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                : "bg-red-100 text-red-800 border-red-200"
          }
        >
          {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
        </Badge>
        <span className="text-sm text-muted-foreground mt-1">
          {feedback.status === 'approved' 
            ? `₹${feedback.reward} earned` 
            : feedback.status === 'pending' 
              ? 'Under review'
              : 'Rejected'}
        </span>
        {feedback.videoUrl && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 flex items-center gap-1"
            onClick={() => setShowVideo(true)}
          >
            <FileVideo className="h-3.5 w-3.5" />
            <span className="text-xs">View Video</span>
          </Button>
        )}
      </div>
      
      {/* Video Dialog */}
      {feedback.videoUrl && (
        <Dialog open={showVideo} onOpenChange={setShowVideo}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Video Feedback for {feedback.productName}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video rounded-md overflow-hidden bg-black">
              <video 
                src={feedback.videoUrl} 
                controls 
                className="w-full h-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Rating: {feedback.rating}/5</p>
                  <p className="text-sm text-muted-foreground">{feedback.date}</p>
                </div>
                <Badge 
                  className={
                    feedback.status === 'approved' 
                      ? "bg-green-100 text-green-800 border-green-200"
                      : feedback.status === 'pending'
                        ? "bg-yellow-50 text-yellow-800 border-yellow-200"
                        : "bg-red-100 text-red-800 border-red-200"
                  }
                >
                  {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm">{feedback.feedback}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
