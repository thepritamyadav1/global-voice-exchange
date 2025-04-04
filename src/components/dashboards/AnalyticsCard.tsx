
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface AnalyticsCardProps {
  title: string;
  description?: string;
  data: Array<{
    name: string;
    value: number;
  }>;
  color?: string;
  dataKey?: string;
  yAxisFormatter?: (value: number) => string;
}

export const AnalyticsCard = ({
  title,
  description,
  data,
  color = "#8884d8",
  dataKey = "value",
  yAxisFormatter = (value) => `${value}`
}: AnalyticsCardProps) => {
  // If no data or empty data array, show placeholder
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No analytics data available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={yAxisFormatter} />
              <Tooltip 
                formatter={(value) => [yAxisFormatter(value as number), 'Value']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                fill={color} 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
