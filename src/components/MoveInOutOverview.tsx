import { useNavigate } from 'react-router-dom';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { moveInOutRequirements, type MoveInOutQuestionFromData, type QuestionType } from '../data/moveInOutRequirements';
import { useMoveInOut } from '../context/MoveInOutContext';

const MoveInOutOverview = () => {
  const navigate = useNavigate();
  const { getTotalProgress, getSegmentProgress } = useMoveInOut();

  // Calculate total questions and segments with photos
  const totalQuestions = moveInOutRequirements.sample_data.segments.reduce((total, segment) => {
    let count = segment.questions.length;
    segment.questions.forEach(q => {
      if ('conditionalQuestions' in q && q.conditionalQuestions) {
        count += q.conditionalQuestions.length;
      }
    });
    return total + count;
  }, 0);

  const hasPhotoRequirements = moveInOutRequirements.sample_data.segments.some(segment =>
    segment.questions.some((q: MoveInOutQuestionFromData) => {
      const hasPhotoType = (q.type as QuestionType) === 'photo';
      const hasPhotoConditionals = q.conditionalQuestions?.some(cq => (cq.type as QuestionType) === 'photo');
      return hasPhotoType || !!hasPhotoConditionals;
    })
  );

  // Estimate total time (3 min per question due to detailed property inspection)
  const estimatedTotalMinutes = Math.ceil(totalQuestions * 3);

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-green-900">Property Move-In/Out Inspection</h2>
          <div className="space-y-2">
            <p className="text-green-800">This inspection checklist helps document the property's condition during tenant transitions. Here's what you need to know:</p>
            <ul className="list-disc list-inside space-y-1 text-green-700 ml-2">
              <li>The inspection covers {moveInOutRequirements.sample_data.segments.length} key areas of the property</li>
              <li>You'll complete {totalQuestions} inspection points across all areas</li>
              {hasPhotoRequirements && (
                <li>Photo documentation is required for any damages or issues found</li>
              )}
              <li>Estimated completion time: {estimatedTotalMinutes} minutes</li>
              <li>Areas can be inspected in any order</li>
              <li>Progress is automatically saved - return anytime to continue</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Inspection Areas</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Overall Progress:</span>
            <span className="text-sm font-medium">{getTotalProgress()}%</span>
          </div>
        </div>
        <Button
          onClick={() => navigate('/move-in-out/report')}
          className="touch-target"
        >
          View Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {moveInOutRequirements.sample_data.segments.map((segment) => (
          <Card
            key={segment.id}
            className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => navigate(`/move-in-out/segment/${segment.id}`)}
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
                {segment.questions.length} Inspection Points
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MoveInOutOverview;
