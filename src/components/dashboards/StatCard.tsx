
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard = ({
  icon: Icon,
  title,
  value,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={`shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] ${className || ""}`}>
      <CardContent className="p-6 flex items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center transform transition-transform duration-500 hover:rotate-12 hover:scale-110">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div className="transition-all duration-300">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold gradient-number">{value}</h3>
          {trend && (
            <span className={`text-xs font-medium flex items-center mt-1 ${trend.isPositive ? "text-success" : "text-destructive"}`}>
              {trend.isPositive ? "+" : "-"}{trend.value}% 
              <span className="ml-1 opacity-80">from last month</span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
