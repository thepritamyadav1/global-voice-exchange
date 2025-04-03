
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserFeedback } from "@/utils/database";

interface RatingDistributionProps {
  feedbackList: UserFeedback[];
}

export const RatingDistribution = ({ feedbackList }: RatingDistributionProps) => {
  // Calculate rating distribution
  const distribution = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  
  feedbackList.forEach(item => {
    if (item.rating >= 1 && item.rating <= 5) {
      distribution[item.rating as keyof typeof distribution] += 1;
    }
  });

  const totalRatings = feedbackList.length;
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Rating Distribution</CardTitle>
        <CardDescription>Breakdown of feedback ratings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="font-medium mr-2">{rating}</span>
                  {Array.from({ length: rating }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-amber-400" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span>{distribution[rating as keyof typeof distribution]} reviews</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${rating >= 4 ? 'bg-green-500' : rating === 3 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${totalRatings ? (distribution[rating as keyof typeof distribution] / totalRatings) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
