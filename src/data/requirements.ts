export const requirements = {
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
          },
          {
            id: "B-03",
            text: "You easily found information indicating the hotel was pet-friendly.",
            type: "boolean",
            required: true,
            department: "Marketing",
            value: 2,
            score: 0,
            conditionalQuestions: [
              {
                id: "B-03-1",
                text: "Where was this information located?",
                type: "text",
                required: true,
                department: "Marketing",
                value: 1,
                score: 1,
                showWhen: (answers: Record<string, any>) => answers["B-03"]?.value === true
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
            text: "Did an associate open your door(s) for you once you pulled up?",
            type: "boolean",
            required: true,
            department: "Guest Service",
            value: 5,
            score: 0
          },
          {
            id: "A-03",
            text: "What time is it as you pull up to the drive?",
            type: "text",
            required: true,
            department: "Operations",
            value: 0,
            score: 0
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
          },
          {
            id: "R-03",
            text: "Photo of duvet insert tag next to room key packet demonstrating the poly fill",
            type: "photo",
            required: true,
            department: "Quality Control",
            value: 5,
            score: 5
          }
        ]
      }
    ]
  }
} as const;

export type Segment = typeof requirements.sample_data.segments[number];

export type ConditionalQuestion = {
  id: string;
  text: string;
  type: 'boolean' | 'text' | 'photo';
  required: boolean;
  department: string;
  value: number;
  score: number;
  showWhen: (answers: Record<string, { value: boolean | string | File }>) => boolean;
};

export type BaseQuestion = {
  id: string;
  text: string;
  type: 'boolean' | 'text' | 'photo';
  required: boolean;
  department: string;
  value: number;
  score: number;
  conditionalQuestions?: readonly ConditionalQuestion[];
};

export type QuestionFromData = typeof requirements.sample_data.segments[number]['questions'][number];
