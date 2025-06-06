import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { requirements } from '../data/requirements';
import { useAudit } from '../context/AuditContext';
import { DepartmentBarChart } from './charts/DepartmentBarChart';
import { SegmentRadarChart } from './charts/SegmentRadarChart';
import { DepartmentMetricCard } from './metrics/DepartmentMetricCard';
import { SegmentMetricCard } from './metrics/SegmentMetricCard';

interface ReportDashboardProps {
  isRandomData?: boolean;
}

const ReportDashboard = ({ isRandomData = false }: ReportDashboardProps) => {
  const navigate = useNavigate();
  const segments = [...requirements.sample_data.segments];
  const { answers } = useAudit();

  // Generate seeded random number between 0 and 1
  const seededRandom = (seed: string) => {
    const numericSeed = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return Math.abs(Math.sin(numericSeed)) % 1;
  };

  // Generate random metrics based on seed
  const generateRandomMetrics = (seed: string, min: number, max: number) => {
    return Math.floor(seededRandom(seed) * (max - min + 1) + min);
  };

  // Calculate department scores and metrics
  const departmentMetrics = segments.reduce((acc, segment) => {
    segment.questions.forEach((question) => {
      if (!acc[question.department]) {
        acc[question.department] = {
          totalValue: 0,
          earnedScore: 0,
          questionCount: 0,
          answeredCount: 0,
          maxPossibleScore: 0,
        };
      }

      acc[question.department].totalValue += question.value;
      acc[question.department].questionCount += 1;
      acc[question.department].maxPossibleScore += question.value;

      if (isRandomData) {
        const randomScore = generateRandomMetrics(`${question.department}-${question.id}`, 60, 100);
        acc[question.department].answeredCount += 1;
        acc[question.department].earnedScore += Math.floor(question.score * (randomScore / 100));
      } else {
        const answer = answers[question.id];
        if (answer) {
          acc[question.department].answeredCount += 1;
          if (answer.value === true) {
            acc[question.department].earnedScore += question.score;
          }
        }
      }
    });
    return acc;
  }, {} as Record<string, {
    totalValue: number;
    earnedScore: number;
    questionCount: number;
    answeredCount: number;
    maxPossibleScore: number;
  }>);

  // Calculate segment metrics
  const segmentMetrics = segments.reduce((acc, segment) => {
    const metrics = segment.questions.reduce((segAcc, question) => {
      segAcc.totalValue += question.value;
      segAcc.maxPossibleScore += question.value;
      
      if (isRandomData) {
        const randomScore = generateRandomMetrics(`${segment.id}-${question.id}`, 60, 100);
        segAcc.answeredCount += 1;
        segAcc.earnedScore += Math.floor(question.score * (randomScore / 100));
      } else {
        const answer = answers[question.id];
        if (answer) {
          segAcc.answeredCount += 1;
          if (answer.value === true) {
            segAcc.earnedScore += question.score;
          }
        }
      }
      return segAcc;
    }, {
      totalValue: 0,
      earnedScore: 0,
      answeredCount: 0,
      maxPossibleScore: 0,
      questionCount: segment.questions.length
    });
    
    acc[segment.id] = metrics;
    return acc;
  }, {} as Record<number, {
    totalValue: number;
    earnedScore: number;
    answeredCount: number;
    maxPossibleScore: number;
    questionCount: number;
  }>);

  // Calculate overall metrics
  const overallMetrics = Object.values(departmentMetrics).reduce((acc, dept) => ({
    totalValue: acc.totalValue + dept.totalValue,
    earnedScore: acc.earnedScore + dept.earnedScore,
    maxPossibleScore: acc.maxPossibleScore + dept.maxPossibleScore,
  }), {
    totalValue: 0,
    earnedScore: 0,
    maxPossibleScore: 0,
  });

  const overallPercentage = Math.round((overallMetrics.earnedScore / overallMetrics.maxPossibleScore) * 100) || 0;

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Audit Report</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Overall Score:</span>
            <span className="text-sm font-medium">{overallPercentage}%</span>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate('/audit')}
          className="touch-target"
        >
          Back to Overview
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DepartmentBarChart departmentMetrics={departmentMetrics} />
        <SegmentRadarChart segments={segments} segmentMetrics={segmentMetrics} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(departmentMetrics).map(([department, metrics]) => (
          <DepartmentMetricCard
            key={department}
            department={department}
            metrics={metrics}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {segments.map((segment) => (
          <SegmentMetricCard
            key={segment.id}
            name={segment.name}
            metrics={segmentMetrics[segment.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default ReportDashboard;
