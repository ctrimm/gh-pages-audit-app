# GitHub Pages Audit App

A React-based web application for conducting and managing audits with department metrics, segment analysis, and photo evidence capabilities. The app is deployed using GitHub Pages.

## Features

- **Audit Form System**: Structured data collection for audit processes
- **Department Metrics**: 
  - Visual metrics display using metric cards
  - Department performance bar charts
- **Segment Analysis**:
  - Segment overview dashboard
  - Radar charts for segment performance visualization
- **Photo Evidence**: Upload and manage photo documentation
- **Requirements Tracking**: Built-in system for tracking audit requirements
- **Report Dashboard**: Comprehensive view of audit results and metrics

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with animations
- **Charts**: Recharts for data visualization
- **UI Components**: 
  - Radix UI primitives
  - Custom UI components with class-variance-authority
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Installation

1. Clone the repository:
```bash
git clone https://github.com/corytrimm/gh-pages-audit-app.git
cd gh-pages-audit-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Deployment

The app is automatically deployed to GitHub Pages. To deploy manually:

```bash
npm run deploy
```

This will build the app and deploy it to the gh-pages branch. The app will be available at: https://corytrimm.github.io/gh-pages-audit-app

## ESLint Configuration

The project uses a modern ESLint setup with TypeScript support. To enable stricter type checking, update the ESLint configuration as shown below:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```
