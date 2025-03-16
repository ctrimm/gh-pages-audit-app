import { Card } from '../ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartTooltip, ChartTooltipContent } from '../ui/chart';

interface DepartmentMetrics {
  totalValue: number;
  earnedScore: number;
  maxPossibleScore: number;
  questionCount: number;
  answeredCount: number;
}

interface DepartmentBarChartProps {
  departmentMetrics: Record<string, DepartmentMetrics>;
}

export const DepartmentBarChart = ({ departmentMetrics }: DepartmentBarChartProps) => {
  const chartData = Object.entries(departmentMetrics).map(([department, metrics]) => ({
    department,
    score: Math.round((metrics.earnedScore / metrics.maxPossibleScore) * 100) || 0,
    value: metrics.totalValue,
  }));

  // const chartConfig = {
  //   score: {
  //     label: "Score %",
  //     color: "hsl(var(--chart-1))",
  //   },
  // } satisfies ChartConfig;

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Department Performance</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 120 }}>
              <YAxis
                dataKey="department"
                type="category"
                tick={{ fill: 'hsl(var(--foreground))' }}
                tickLine={false}
                axisLine={false}
              />
              <XAxis 
                type="number" 
                domain={[0, 100]}
                tick={{ fill: 'hsl(var(--foreground))' }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent />
                }
              />
              <Bar 
                dataKey="score" 
                fill="hsl(var(--chart-1))" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
