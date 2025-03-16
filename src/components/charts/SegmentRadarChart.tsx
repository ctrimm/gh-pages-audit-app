import { Card } from '../ui/card';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { type Segment } from '../../data/requirements';

interface SegmentMetrics {
  totalValue: number;
  earnedScore: number;
  maxPossibleScore: number;
  questionCount: number;
  answeredCount: number;
}

interface SegmentRadarChartProps {
  segments: Segment[];
  segmentMetrics: Record<number, SegmentMetrics>;
}

export const SegmentRadarChart = ({ segments, segmentMetrics }: SegmentRadarChartProps) => {
  const chartData = segments.map((segment) => {
    const metrics = segmentMetrics[segment.id];
    const weightedScore = (metrics.earnedScore / metrics.maxPossibleScore) * 100;
    const completionRate = (metrics.answeredCount / metrics.questionCount) * 100;
    
    return {
      segment: segment.name,
      score: Math.round(weightedScore) || 0,
      completion: Math.round(completionRate) || 0,
      value: metrics.totalValue,
    };
  });

  // const chartConfig = {
  //   score: {
  //     label: "Score %",
  //     color: "hsl(var(--chart-1))",
  //   },
  //   completion: {
  //     label: "Completion %",
  //     color: "hsl(var(--chart-2))",
  //   },
  // } satisfies ChartConfig;

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Segment Analysis</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid stroke="hsl(var(--muted-foreground))" />
              <PolarAngleAxis
                dataKey="segment"
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.3}
              />
              <Radar
                name="Completion"
                dataKey="completion"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.3}
              />
              <Legend 
                wrapperStyle={{
                  color: 'hsl(var(--foreground))'
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
