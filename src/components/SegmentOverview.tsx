import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { requirements, type Segment } from '../data/requirements';
import { useAudit } from '../context/AuditContext';

const SegmentOverview = () => {
  const navigate = useNavigate();
  const segments = requirements.sample_data.segments;
  const { getSegmentProgress, getTotalProgress } = useAudit();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Audit Segments</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Overall Progress:</span>
            <span className="text-sm font-medium">{getTotalProgress()}%</span>
          </div>
        </div>
        <Button
          onClick={() => navigate('/report')}
          className="touch-target"
        >
          View Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {segments.map((segment: Segment) => (
          <Card
            key={segment.id}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/segment/${segment.id}`)}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{segment.name}</h3>
                <p className="text-sm text-muted-foreground">{segment.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{getSegmentProgress(segment.id)}%</span>
                </div>
                <Progress value={getSegmentProgress(segment.id)} className="h-2" />
              </div>

              <div className="text-sm text-muted-foreground">
                {segment.questions.length} Questions
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SegmentOverview;
