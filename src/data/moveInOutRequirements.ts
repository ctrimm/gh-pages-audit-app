export const moveInOutRequirements = {
  sample_data: {
    segments: [
      {
        id: 1,
        name: "Booking",
        description: "Evaluation of the booking experience",
        questions: [
          {
            id: "B-01",
            text: "The website was easy to understand and navigate.",
            type: "boolean",
            required: true,
            department: "Operations",
            value: 5,
            score: 5
          },
          {
            id: "B-02",
            text: "Room photos are high quality and appealing.",
            type: "boolean",
            required: true,
            department: "Marketing",
            value: 3,
            score: 3,
            conditionalQuestions: [
              {
                id: "B-02-1",
                text: "Please provide a screenshot of a low-quality photo.",
                type: "photo",
                required: true,
                department: "Marketing",
                value: 2,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["B-02"]?.value === false
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Arrival",
        description: "Evaluation of the arrival experience",
        questions: [
          {
            id: "A-01",
            text: "Was someone on the drive waiting and ready to receive you and other guests?",
            type: "boolean",
            required: true,
            department: "Guest Service",
            value: 8,
            score: 0,
            conditionalQuestions: [
              {
                id: "A-01-1",
                text: "How long did you wait before someone arrived?",
                type: "text",
                required: true,
                department: "Guest Service",
                value: 2,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["A-01"]?.value === false
              }
            ]
          },
          {
            id: "A-02",
            text: "The check-in process was efficient and all pre-arrival preferences were noted.",
            type: "boolean",
            required: true,
            department: "Front Office",
            value: 7,
            score: 7,
            conditionalQuestions: [
              {
                id: "A-02-1",
                text: "What preferences were missed?",
                type: "text",
                required: true,
                department: "Front Office",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["A-02"]?.value === false
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Room Inspection",
        description: "Evaluation of the guest room",
        questions: [
          {
            id: "R-01",
            text: "There are no obvious defects upon arrival.",
            type: "boolean",
            required: true,
            department: "Housekeeping",
            value: 10,
            score: 10,
            conditionalQuestions: [
              {
                id: "R-01-1",
                text: "Please describe and photograph any defects found.",
                type: "photo",
                required: true,
                department: "Housekeeping",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["R-01"]?.value === false
              }
            ]
          },
          {
            id: "R-02",
            text: "The room smelled fresh and inviting; no off-odors.",
            type: "boolean",
            required: true,
            department: "Housekeeping",
            value: 8,
            score: 0,
            conditionalQuestions: [
              {
                id: "R-02-1",
                text: "Describe the odor detected.",
                type: "text",
                required: true,
                department: "Housekeeping",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["R-02"]?.value === false
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: "In-Room Dining",
        description: "Evaluation of the room service experience",
        questions: [
          {
            id: "IRD-01",
            text: "Digital/printed menu was current and easily accessible.",
            type: "boolean",
            required: true,
            department: "Food & Beverage",
            value: 5,
            score: 5,
            conditionalQuestions: [
              {
                id: "IRD-01-1",
                text: "What discrepancies were found in the menu?",
                type: "text",
                required: true,
                department: "Food & Beverage",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["IRD-01"]?.value === false
              }
            ]
          },
          {
            id: "IRD-02",
            text: "Order was delivered within the promised timeframe.",
            type: "boolean",
            required: true,
            department: "Food & Beverage",
            value: 8,
            score: 8,
            conditionalQuestions: [
              {
                id: "IRD-02-1",
                text: "How long did you wait beyond the promised time?",
                type: "text",
                required: true,
                department: "Food & Beverage",
                value: 2,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["IRD-02"]?.value === false
              }
            ]
          }
        ]
      },
      {
        id: 5,
        name: "Housekeeping Service",
        description: "Evaluation of daily housekeeping service",
        questions: [
          {
            id: "H-01",
            text: "Room was serviced at the requested time.",
            type: "boolean",
            required: true,
            department: "Housekeeping",
            value: 5,
            score: 5,
            conditionalQuestions: [
              {
                id: "H-01-1",
                text: "What time was service requested vs. completed?",
                type: "text",
                required: true,
                department: "Housekeeping",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["H-01"]?.value === false
              }
            ]
          },
          {
            id: "H-02",
            text: "Turndown service included all standard elements.",
            type: "boolean",
            required: true,
            department: "Housekeeping",
            value: 8,
            score: 8,
            conditionalQuestions: [
              {
                id: "H-02-1",
                text: "Please photograph any missing turndown elements.",
                type: "photo",
                required: true,
                department: "Housekeeping",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["H-02"]?.value === false
              }
            ]
          }
        ]
      }
    ]
  }
} as const;

export type QuestionType = 'boolean' | 'text' | 'photo';

export interface ConditionalQuestion {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  department: string;
  value: number;
  score: number;
  showWhen: (answers: Record<string, any>) => boolean;
}

export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  department: string;
  value: number;
  score: number;
  conditionalQuestions?: readonly ConditionalQuestion[];
}

export type MoveInOutSegment = typeof moveInOutRequirements.sample_data.segments[number];
export type MoveInOutQuestionFromData = BaseQuestion;
