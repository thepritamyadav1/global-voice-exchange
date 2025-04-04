
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CategoryStat {
  category: string;
  count: number;
  average: string;
  brand?: string;
}

interface CategoryBreakdownProps {
  title: string;
  description?: string;
  data: CategoryStat[];
}

export const CategoryBreakdown = ({
  title,
  description,
  data
}: CategoryBreakdownProps) => {
  // Color generator based on index
  const getBarColor = (index: number) => {
    const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
    return colors[index % colors.length];
  };

  // If no data or empty data array, show placeholder
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No category data available</p>
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
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70,
              }}
            >
              <XAxis 
                dataKey="category" 
                angle={-45} 
                textAnchor="end" 
                height={70} 
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [value, name === "count" ? "Submissions" : name]}
                labelFormatter={(label) => `Category: ${label}`}
              />
              <Bar dataKey="count" name="Submissions">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.map((item, index) => (
            <div key={index} className="text-sm border rounded-md p-2">
              <div className="font-medium">{item.category}</div>
              <div className="text-muted-foreground flex justify-between">
                <span>Avg. Rating:</span>
                <span className="font-medium">{item.average} / 5</span>
              </div>
              {item.brand && (
                <div className="text-muted-foreground flex justify-between">
                  <span>Top Brand:</span>
                  <span>{item.brand}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
