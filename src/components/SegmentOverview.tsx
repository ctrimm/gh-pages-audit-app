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
    <div className="py-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-muted-foreground hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Dashboard
        </Button>
      </div>

      <div className="relative">
        {/* Hero Image */}
        <div className="h-[400px] w-full overflow-hidden rounded-xl relative">
          <img 
            src="https://lh3.googleusercontent.com/p/AF1QipNwMcCOS4AX0gN0Xm41v5611HCEHlbWT5nU0P_W=s1360-w1360-h1020"
            alt="Omni Bedford Springs Resort" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Omni Bedford Springs</h1>
            <p className="text-lg opacity-90">Current Audit in Progress</p>
          </div>
        </div>
      </div>

      <Card className="p-8 bg-white shadow-lg -mt-20 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Guest Experience Audit</h2>
              <p className="text-muted-foreground">Guest Stay: April 5-7, 2024</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{getTotalProgress()}% Complete</div>
              <Progress value={getTotalProgress()} className="w-32" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center py-6 border-y">
            <div>
              <div className="text-2xl font-semibold">{requirements.sample_data.segments.length}</div>
              <div className="text-sm text-muted-foreground">Segments</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">{estimatedTotalMinutes}</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Audit Segments</h3>
              <Button
                onClick={() => navigate('/report')}
                variant="outline"
              >
                View Report
              </Button>
            </div>

            <div className="grid gap-6">
              {requirements.sample_data.segments.map((segment) => (
                <Card
                  key={segment.id}
                  className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/audit/segment/${segment.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{segment.name}</h4>
                      <p className="text-sm text-muted-foreground">{segment.description}</p>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <div className="text-sm font-medium">{getSegmentProgress(segment.id)}%</div>
                      <Progress value={getSegmentProgress(segment.id)} className="w-24" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SegmentOverview;
