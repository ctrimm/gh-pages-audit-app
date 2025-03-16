import { useParams, useNavigate } from 'react-router-dom';
import { moveInOutRequirements, type ConditionalQuestion, type BaseQuestion, type QuestionType } from '../data/moveInOutRequirements';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useMoveInOut } from '../context/MoveInOutContext';
import { PhotoUpload } from './inputs/PhotoUpload';

const MoveInOutForm = () => {
  const { segmentId } = useParams();
  const navigate = useNavigate();
  const { answers, setAnswer } = useMoveInOut();
  
  const segment = moveInOutRequirements.sample_data.segments.find(
    (s) => s.id === Number(segmentId)
  );

  if (!segment) {
    return <div>Area not found</div>;
  }

  const handleAnswer = (question: BaseQuestion | ConditionalQuestion, value: boolean | string | File) => {
    setAnswer(segment.id, question.id, value);
  };

  const renderQuestion = (question: BaseQuestion | ConditionalQuestion) => {
    const currentAnswer = answers[question.id]?.value;

    const questionType = question.type as QuestionType;
    switch (questionType) {
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

  const renderConditionalQuestions = (question: BaseQuestion) => {
    if (!question.conditionalQuestions?.length) {
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

  // Estimate completion time (3 min per question for detailed inspection)
  const estimatedMinutes = Math.ceil(totalQuestions * 3);

  const hasPhotoQuestions = segment.questions.some(q => {
    return (q.type as QuestionType) === 'photo' || (
      'conditionalQuestions' in q && 
      q.conditionalQuestions?.some(cq => (cq.type as QuestionType) === 'photo')
    );
  });

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-green-900">Inspecting {segment.name}</h2>
          <div className="space-y-2">
            <p className="text-green-800">This section covers the inspection of {segment.name.toLowerCase()}. Here's what you need to know:</p>
            <ul className="list-disc list-inside space-y-1 text-green-700 ml-2">
              <li>You'll complete {totalQuestions} inspection points for this area</li>
              {hasPhotoQuestions && (
                <li>Photo documentation is required for any damages or issues found</li>
              )}
              <li>Estimated completion time: {estimatedMinutes} minutes</li>
              <li>You can save and return to complete the inspection later</li>
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
          onClick={() => navigate('/move-in-out')}
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
          onClick={() => navigate('/move-in-out')}
          className="touch-target"
        >
          Save & Exit
        </Button>
        <Button
          onClick={() => navigate('/move-in-out/report')}
          className="touch-target"
        >
          Complete Inspection
        </Button>
      </div>
    </div>
  );
};

export default MoveInOutForm;
