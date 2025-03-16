export const moveInOutRequirements = {
  sample_data: {
    segments: [
      {
        id: 1,
        name: "General Condition",
        description: "Overall condition of the property",
        questions: [
          {
            id: "G-01",
            text: "Walls are in good condition (no holes, major scuffs, or damage)",
            type: "boolean",
            required: true,
            department: "Property Management",
            value: 10,
            score: 10,
            conditionalQuestions: [
              {
                id: "G-01-1",
                text: "Please photograph and describe wall damage",
                type: "photo",
                required: true,
                department: "Property Management",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["G-01"]?.value === false
              }
            ]
          },
          {
            id: "G-02",
            text: "Flooring is in good condition (no stains, tears, or damage)",
            type: "boolean",
            required: true,
            department: "Property Management",
            value: 8,
            score: 8,
            conditionalQuestions: [
              {
                id: "G-02-1",
                text: "Please photograph and describe floor damage",
                type: "photo",
                required: true,
                department: "Property Management",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["G-02"]?.value === false
              }
            ]
          },
          {
            id: "G-03",
            text: "Windows and screens are intact and functioning properly",
            type: "boolean",
            required: true,
            department: "Property Management",
            value: 6,
            score: 6,
            conditionalQuestions: [
              {
                id: "G-03-1",
                text: "Document any window or screen issues",
                type: "photo",
                required: true,
                department: "Property Management",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["G-03"]?.value === false
              }
            ]
          }
        ]
      },
      {
        id: 2,
        name: "Kitchen",
        description: "Kitchen appliances and fixtures",
        questions: [
          {
            id: "K-01",
            text: "All appliances are functioning properly (refrigerator, stove, dishwasher)",
            type: "boolean",
            required: true,
            department: "Maintenance",
            value: 10,
            score: 10,
            conditionalQuestions: [
              {
                id: "K-01-1",
                text: "List non-functioning appliances and issues",
                type: "text",
                required: true,
                department: "Maintenance",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["K-01"]?.value === false
              }
            ]
          },
          {
            id: "K-02",
            text: "Countertops and cabinets are in good condition",
            type: "boolean",
            required: true,
            department: "Property Management",
            value: 7,
            score: 7,
            conditionalQuestions: [
              {
                id: "K-02-1",
                text: "Please photograph any damage to countertops or cabinets",
                type: "photo",
                required: true,
                department: "Property Management",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["K-02"]?.value === false
              }
            ]
          },
          {
            id: "K-03",
            text: "Sink and faucet are working properly with no leaks",
            type: "boolean",
            required: true,
            department: "Maintenance",
            value: 5,
            score: 5,
            conditionalQuestions: [
              {
                id: "K-03-1",
                text: "Document any plumbing issues",
                type: "text",
                required: true,
                department: "Maintenance",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["K-03"]?.value === false
              }
            ]
          }
        ]
      },
      {
        id: 3,
        name: "Bathrooms",
        description: "Bathroom fixtures and condition",
        questions: [
          {
            id: "B-01",
            text: "All plumbing fixtures are functioning properly (no leaks)",
            type: "boolean",
            required: true,
            department: "Maintenance",
            value: 10,
            score: 10,
            conditionalQuestions: [
              {
                id: "B-01-1",
                text: "Document location and nature of plumbing issues",
                type: "text",
                required: true,
                department: "Maintenance",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["B-01"]?.value === false
              }
            ]
          },
          {
            id: "B-02",
            text: "Tiles and grout are in good condition",
            type: "boolean",
            required: true,
            department: "Property Management",
            value: 6,
            score: 6,
            conditionalQuestions: [
              {
                id: "B-02-1",
                text: "Please photograph damaged tiles or grout",
                type: "photo",
                required: true,
                department: "Property Management",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["B-02"]?.value === false
              }
            ]
          },
          {
            id: "B-03",
            text: "Toilet is securely mounted and functioning properly",
            type: "boolean",
            required: true,
            department: "Maintenance",
            value: 8,
            score: 8,
            conditionalQuestions: [
              {
                id: "B-03-1",
                text: "Describe any toilet issues",
                type: "text",
                required: true,
                department: "Maintenance",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["B-03"]?.value === false
              }
            ]
          }
        ]
      },
      {
        id: 4,
        name: "Safety Features",
        description: "Safety equipment and features",
        questions: [
          {
            id: "S-01",
            text: "Smoke detectors are present and functional",
            type: "boolean",
            required: true,
            department: "Safety",
            value: 10,
            score: 10,
            conditionalQuestions: [
              {
                id: "S-01-1",
                text: "Note locations of missing or non-functional smoke detectors",
                type: "text",
                required: true,
                department: "Safety",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["S-01"]?.value === false
              }
            ]
          },
          {
            id: "S-02",
            text: "All doors and windows lock properly",
            type: "boolean",
            required: true,
            department: "Safety",
            value: 8,
            score: 8,
            conditionalQuestions: [
              {
                id: "S-02-1",
                text: "List locations of faulty locks",
                type: "text",
                required: true,
                department: "Safety",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["S-02"]?.value === false
              }
            ]
          },
          {
            id: "S-03",
            text: "Carbon monoxide detector is present and functional (if required)",
            type: "boolean",
            required: true,
            department: "Safety",
            value: 7,
            score: 7,
            conditionalQuestions: [
              {
                id: "S-03-1",
                text: "Note any issues with carbon monoxide detector",
                type: "text",
                required: true,
                department: "Safety",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["S-03"]?.value === false
              }
            ]
          }
        ]
      },
      {
        id: 5,
        name: "Keys and Access",
        description: "Property access items",
        questions: [
          {
            id: "A-01",
            text: "All required keys are present and functional",
            type: "boolean",
            required: true,
            department: "Property Management",
            value: 5,
            score: 5,
            conditionalQuestions: [
              {
                id: "A-01-1",
                text: "List missing or non-functional keys",
                type: "text",
                required: true,
                department: "Property Management",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["A-01"]?.value === false
              }
            ]
          },
          {
            id: "A-02",
            text: "Access codes/fobs are working properly",
            type: "boolean",
            required: true,
            department: "Property Management",
            value: 5,
            score: 5,
            conditionalQuestions: [
              {
                id: "A-02-1",
                text: "Document any access code or fob issues",
                type: "text",
                required: true,
                department: "Property Management",
                value: 0,
                score: 0,
                showWhen: (answers: Record<string, any>) => answers["A-02"]?.value === false
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
