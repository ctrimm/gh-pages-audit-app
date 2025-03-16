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
          },
          {
            id: "B-04",
            text: "The booking confirmation email was received promptly and contained all necessary information.",
            type: "boolean",
            required: true,
            department: "Operations",
            value: 4,
            score: 4,
            conditionalQuestions: [
              {
                id: "B-04-1",
                text: "What information was missing from the confirmation email?",
                type: "text",
                required: true,
                department: "Operations",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["B-04"]?.value === false
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
          },
          {
            id: "R-03",
            text: "All electronics and fixtures are in working order.",
            type: "boolean",
            required: true,
            department: "Engineering",
            value: 6,
            score: 6,
            conditionalQuestions: [
              {
                id: "R-03-1",
                text: "List non-functioning items:",
                type: "text",
                required: true,
                department: "Engineering",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["R-03"]?.value === false
              }
            ]
          },
          {
            id: "R-04",
            text: "Room temperature control is responsive and effective.",
            type: "boolean",
            required: true,
            department: "Engineering",
            value: 5,
            score: 5
          },
          {
            id: "R-05",
            text: "Photo of duvet insert tag next to room key packet demonstrating the poly fill",
            type: "photo",
            required: true,
            department: "Quality Control",
            value: 5,
            score: 5
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
                id: "IRD-01-1",
                text: "How long did you wait beyond the promised time?",
                type: "text",
                required: true,
                department: "Food & Beverage",
                value: 2,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["IRD-02"]?.value === false
              }
            ]
          },
          {
            id: "IRD-03",
            text: "Food temperature was appropriate (hot food hot, cold food cold).",
            type: "boolean",
            required: true,
            department: "Food & Beverage",
            value: 10,
            score: 0,
            conditionalQuestions: [
              {
                id: "IRD-03-1",
                text: "Please photograph the item that was not at proper temperature.",
                type: "photo",
                required: true,
                department: "Food & Beverage",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["IRD-03"]?.value === false
              }
            ]
          },
          {
            id: "IRD-04",
            text: "Presentation of the food met luxury standards.",
            type: "boolean",
            required: true,
            department: "Food & Beverage",
            value: 7,
            score: 7
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
      },
      {
        id: 6,
        name: "Checkout",
        description: "Evaluation of the departure experience",
        questions: [
          {
            id: "C-01",
            text: "Bill was accurate and clearly itemized.",
            type: "boolean",
            required: true,
            department: "Front Office",
            value: 10,
            score: 10,
            conditionalQuestions: [
              {
                id: "C-01-1",
                text: "Please photograph any billing discrepancies.",
                type: "photo",
                required: true,
                department: "Front Office",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["C-01"]?.value === false
              }
            ]
          },
          {
            id: "C-02",
            text: "Checkout process was efficient and professional.",
            type: "boolean",
            required: true,
            department: "Front Office",
            value: 7,
            score: 7
          },
          {
            id: "C-03",
            text: "Bellman arrived promptly for luggage assistance.",
            type: "boolean",
            required: true,
            department: "Guest Service",
            value: 5,
            score: 5,
            conditionalQuestions: [
              {
                id: "C-03-1",
                text: "How long did you wait for assistance?",
                type: "text",
                required: true,
                department: "Guest Service",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["C-03"]?.value === false
              }
            ]
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
