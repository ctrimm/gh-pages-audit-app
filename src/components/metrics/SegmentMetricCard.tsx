import { Card } from '../ui/card';
import { Progress } from '../ui/progress';

interface SegmentMetrics {
  totalValue: number;
  earnedScore: number;
  maxPossibleScore: number;
  questionCount: number;
  answeredCount: number;
}

interface SegmentMetricCardProps {
  name: string;
  metrics: SegmentMetrics;
}

export const SegmentMetricCard = ({ name, metrics }: SegmentMetricCardProps) => {
  const scorePercentage = Math.round((metrics.earnedScore / metrics.maxPossibleScore) * 100) || 0;
  const completionPercentage = Math.round((metrics.answeredCount / metrics.questionCount) * 100) || 0;

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">{name}</h4>
          <span className="text-sm text-muted-foreground">
            Value Weight: {metrics.totalValue} points
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Score</span>
            <span>{scorePercentage}%</span>
          </div>
          <Progress value={scorePercentage} className="h-2" />
          <div className="text-sm text-muted-foreground">
            {metrics.earnedScore} / {metrics.maxPossibleScore} Points
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Completion</span>
            <span>{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="text-sm text-muted-foreground">
            {metrics.answeredCount} / {metrics.questionCount} Questions
          </div>
        </div>
      </div>
    </Card>
  );
};
