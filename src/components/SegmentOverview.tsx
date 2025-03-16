import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { requirements } from '../data/requirements';
import { useAudit } from '../context/AuditContext';

const SegmentOverview = () => {
  const navigate = useNavigate();
  const { getTotalProgress, getSegmentProgress } = useAudit();

  // Calculate total questions and segments with photos
  const totalQuestions = requirements.sample_data.segments.reduce((total, segment) => {
    let count = segment.questions.length;
    segment.questions.forEach(q => {
      if ('conditionalQuestions' in q && q.conditionalQuestions) {
        count += q.conditionalQuestions.length;
      }
    });
    return total + count;
  }, 0);

  const hasPhotoRequirements = requirements.sample_data.segments.some(segment =>
    segment.questions.some(q =>
      q.type === 'photo' ||
      ('conditionalQuestions' in q && q.conditionalQuestions?.some(cq => cq.type === 'photo'))
    )
  );

  // Estimate total time (2 min per question)
  const estimatedTotalMinutes = Math.ceil(totalQuestions * 2);

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-900">Welcome to Your Hotel Audit</h2>
          <div className="space-y-2">
            <p className="text-blue-800">This audit will help evaluate various aspects of the guest experience. Here's what you need to know:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700 ml-2">
              <li>The audit is divided into {requirements.sample_data.segments.length} segments, covering the entire guest journey</li>
              <li>You'll answer {totalQuestions} questions across all segments</li>
              {hasPhotoRequirements && (
                <li>Some segments require photos - please ensure your camera/device is ready</li>
              )}
              <li>Estimated total completion time: {estimatedTotalMinutes} minutes</li>
              <li>You can complete segments in any order</li>
              <li>Progress is automatically saved - return anytime to continue</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requirements.sample_data.segments.map((segment) => (
          <Card
            key={segment.id}
            className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate(`/segment/${segment.id}`)}
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{segment.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {segment.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{getSegmentProgress(segment.id)}%</span>
                </div>
                <Progress value={getSegmentProgress(segment.id)} />
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
