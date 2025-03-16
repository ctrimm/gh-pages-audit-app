import { createContext, useContext, useState, ReactNode } from 'react';

type AnswerValue = boolean | string | File;

type Answer = {
  value: AnswerValue;
  questionId: string;
  segmentId: number;
};

type AuditContextType = {
  answers: Record<string, Answer>;
  setAnswer: (segmentId: number, questionId: string, value: AnswerValue) => void;
  getSegmentProgress: (segmentId: number) => number;
  getTotalProgress: () => number;
};

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export function AuditProvider({ children }: { children: ReactNode }) {
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
    const segmentAnswers = Object.values(answers).filter(
      (answer) => answer.segmentId === segmentId
    );

    const totalQuestions = Object.values(answers).reduce((count, answer) => {
      if (answer.segmentId === segmentId) {
        count++;
      }
      return count;
    }, 0);

    return Math.round((segmentAnswers.length / totalQuestions) * 100) || 0;
  };

  const getTotalProgress = () => {
    const totalQuestions = Object.keys(answers).length;
    const answeredQuestions = Object.values(answers).filter(
      (answer) => answer.value !== undefined && answer.value !== ''
    ).length;
    return Math.round((answeredQuestions / totalQuestions) * 100) || 0;
  };

  return (
    <AuditContext.Provider
      value={{
        answers,
        setAnswer,
        getSegmentProgress,
        getTotalProgress,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
}

export function useAudit() {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
}
