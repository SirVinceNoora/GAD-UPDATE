# GAD Corner Dashboard

A modern, responsive GAD (Gender and Development) Corner dashboard built with React, TypeScript, and Tailwind CSS.

## Features

- Interactive charts using Recharts (Bar, Pie, Line charts)
- Dark theme with navy blue background and orange accents
- Responsive design for mobile and desktop
- Glassmorphism effects on cards
- Animated chart loading
- Sticky header

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Lucide React (icons)
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
