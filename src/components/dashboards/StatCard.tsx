
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
    <Card className={`shadow-sm hover:shadow-md transition-shadow ${className || ""}`}>
      <CardContent className="p-6 flex items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {trend && (
            <span className={`text-xs ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
              {trend.isPositive ? "+" : "-"}{trend.value}% from last month
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
