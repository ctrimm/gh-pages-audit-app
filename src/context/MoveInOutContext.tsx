import { createContext, useContext, useState, ReactNode } from 'react';
import { moveInOutRequirements, type MoveInOutQuestionFromData } from '../data/moveInOutRequirements';

type AnswerValue = boolean | string | File;

type Answer = {
  value: AnswerValue;
  questionId: string;
  segmentId: number;
};

type MoveInOutContextType = {
  answers: Record<string, Answer>;
  setAnswer: (segmentId: number, questionId: string, value: AnswerValue) => void;
  getSegmentProgress: (segmentId: number) => number;
  getTotalProgress: () => number;
};

const MoveInOutContext = createContext<MoveInOutContextType | undefined>(undefined);

export function MoveInOutProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const setAnswer = (segmentId: number, questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        value,
        questionId,
        segmentId,
      },
    }));
  };

  const getSegmentProgress = (segmentId: number) => {
    const segment = moveInOutRequirements.sample_data.segments.find(s => s.id === segmentId);
    if (!segment) return 0;

    let totalQuestions = segment.questions.length;
    let answeredQuestions = 0;

    segment.questions.forEach((question: MoveInOutQuestionFromData) => {
      if (answers[question.id]?.value !== undefined) {
        answeredQuestions++;
      }

      // Count conditional questions if their parent question is answered appropriately
      if ('conditionalQuestions' in question && question.conditionalQuestions) {
        question.conditionalQuestions.forEach(conditionalQ => {
          if (conditionalQ.showWhen(answers)) {
            totalQuestions++;
            if (answers[conditionalQ.id]?.value !== undefined) {
              answeredQuestions++;
            }
          }
        });
      }
    });

    return Math.round((answeredQuestions / totalQuestions) * 100) || 0;
  };

  const getTotalProgress = () => {
    let totalQuestions = 0;
    let answeredQuestions = 0;

    moveInOutRequirements.sample_data.segments.forEach(segment => {
      segment.questions.forEach((question: MoveInOutQuestionFromData) => {
        totalQuestions++;
        if (answers[question.id]?.value !== undefined) {
          answeredQuestions++;
        }

        // Count conditional questions if their parent question is answered appropriately
        if ('conditionalQuestions' in question && question.conditionalQuestions) {
          question.conditionalQuestions.forEach(conditionalQ => {
            if (conditionalQ.showWhen(answers)) {
              totalQuestions++;
              if (answers[conditionalQ.id]?.value !== undefined) {
                answeredQuestions++;
              }
            }
          });
        }
      });
    });

    return Math.round((answeredQuestions / totalQuestions) * 100) || 0;
  };

  return (
    <MoveInOutContext.Provider
      value={{
        answers,
        setAnswer,
        getSegmentProgress,
        getTotalProgress,
      }}
    >
      {children}
    </MoveInOutContext.Provider>
  );
}

export function useMoveInOut() {
  const context = useContext(MoveInOutContext);
  if (context === undefined) {
    throw new Error('useMoveInOut must be used within a MoveInOutProvider');
  }
  return context;
}
