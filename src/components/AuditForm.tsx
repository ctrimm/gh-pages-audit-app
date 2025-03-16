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
    if (!('conditionalQuestions' in question) || !question.conditionalQuestions) {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{segment.name}</h2>
          <p className="text-muted-foreground">{segment.description}</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
          className="touch-target"
        >
          Back to Overview
        </Button>
      </div>

      <div className="space-y-6">
        {segment.questions.map((question) => (
          <div key={question.id} className="space-y-4">
            <Card className="p-4">
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
          variant="secondary"
          onClick={() => navigate('/')}
          className="touch-target"
        >
          Save & Exit
        </Button>
        <Button
          onClick={() => navigate('/report')}
          className="touch-target"
        >
          Complete Audit
        </Button>
      </div>
    </div>
  );
};

export default AuditForm;
