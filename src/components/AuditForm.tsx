import { useParams, useNavigate } from 'react-router-dom';
import { requirements, type ConditionalQuestion, type QuestionFromData } from '../data/requirements';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useAudit } from '../context/AuditContext';
import { PhotoUpload } from './inputs/PhotoUpload';

const AuditForm = () => {
  const { segmentId } = useParams();
  const navigate = useNavigate();
  const { answers, setAnswer } = useAudit();
  
  const segment = requirements.sample_data.segments.find(
    (s) => s.id === Number(segmentId)
  );

  if (!segment) {
    return <div>Segment not found</div>;
  }

  const handleAnswer = (question: QuestionFromData | ConditionalQuestion, value: boolean | string | File) => {
    setAnswer(segment.id, question.id, value);
  };

  const renderQuestion = (question: QuestionFromData | ConditionalQuestion) => {
    const currentAnswer = answers[question.id]?.value;

    switch (question.type) {
      case 'boolean':
        return (
          <div className="flex gap-4">
            <Button
              variant={currentAnswer === true ? "default" : "secondary"}
              className="touch-target"
              onClick={() => handleAnswer(question, true)}
            >
              Yes
            </Button>
            <Button
              variant={currentAnswer === false ? "default" : "secondary"}
              className="touch-target"
              onClick={() => handleAnswer(question, false)}
            >
              No
            </Button>
          </div>
        );
      case 'text':
        return (
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={(currentAnswer as string) || ''}
            onChange={(e) => handleAnswer(question, e.target.value)}
            placeholder="Enter your answer"
          />
        );
      case 'photo':
        return (
          <PhotoUpload
            questionId={question.id}
            onPhotoSelect={(file) => handleAnswer(question, file)}
          />
        );
      default:
        return null;
    }
  };

  const renderConditionalQuestions = (question: QuestionFromData) => {
    const hasConditionals = 'conditionalQuestions' in question && question.conditionalQuestions;
    if (!hasConditionals) {
      return null;
    }

    return question.conditionalQuestions.map(conditionalQ => {
      if (!conditionalQ.showWhen(answers)) {
        return null;
      }

      return (
        <Card key={conditionalQ.id} className="ml-8 p-4 border-l-4 border-l-primary">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="font-medium">{conditionalQ.text}</h3>
              <span className="text-sm text-muted-foreground">
                {conditionalQ.department}
              </span>
            </div>
            {renderQuestion(conditionalQ)}
          </div>
        </Card>
      );
    });
  };

  // Calculate total questions including conditionals
  const totalQuestions = segment.questions.reduce((acc, question) => {
    let count = 1; // Main question
    const hasConditionals = 'conditionalQuestions' in question && question.conditionalQuestions;
    if (hasConditionals) {
      count += question.conditionalQuestions.length;
    }
    return acc + count;
  }, 0);

  // Estimate completion time (2 min per question as some need photos)
  const estimatedMinutes = Math.ceil(totalQuestions * 2);

  const hasPhotoQuestions = segment.questions.some(q => 
    q.type === 'photo' || 
    ('conditionalQuestions' in q && q.conditionalQuestions?.some((cq: ConditionalQuestion) => cq.type === 'photo'))
  );

  return (
    <div className="py-8 space-y-8">
      <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-900">Welcome to the {segment.name} Audit</h2>
          <div className="space-y-2">
            <p className="text-blue-800">This audit will help evaluate the {segment.name.toLowerCase()} experience. Here's what you need to know:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700 ml-2">
              <li>You'll answer {totalQuestions} questions about various aspects of the {segment.name.toLowerCase()} experience</li>
              {hasPhotoQuestions && (
                <li>Some questions require photos - please ensure your camera/device is ready</li>
              )}
              <li>Estimated completion time: {estimatedMinutes} minutes</li>
              <li>You can save and return to complete the audit later</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{segment.name}</h2>
          <p className="text-muted-foreground">{segment.description}</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate('/audit')}
          className="touch-target"
        >
          Back to Overview
        </Button>
      </div>

      <div className="space-y-8">
        {segment.questions.map((question) => (
          <div key={question.id} className="space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{question.text}</h3>
                  <span className="text-sm text-muted-foreground">
                    {question.department}
                  </span>
                </div>
                {renderQuestion(question)}
              </div>
            </Card>
            {renderConditionalQuestions(question)}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => navigate('/audit')}
          className="touch-target"
        >
          Save & Exit
        </Button>
        <Button
          onClick={() => navigate('/report')}
          className="touch-target px-8"
        >
          Complete Audit
        </Button>
      </div>
    </div>
  );
};

export default AuditForm;
