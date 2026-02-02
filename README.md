# Islamiat Final Preparation

A comprehensive MCQs quiz application for Islamiat final exam preparation, built with React and Tailwind CSS. Features a premium dark theme with animated backgrounds and multiple study modes.

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## Features

### 📚 Study Modes

| Mode | Questions | Marking | Description |
|------|-----------|---------|-------------|
| **Complete Series** | 169 | 1 mark each | Practice all questions in sequential order |
| **Mock Exam** | 80 | 0.5 marks (40 total) | Random questions from the pool |
| **Quick Mock** | 80 | 0.5 marks (40 total) | Instant feedback with auto-advance |
| **Dates & Numbers** | Dynamic | 1 mark each | Focus on dates, years, and numeric facts |

### ✨ UI Features

- **Premium Dark Theme** - Modern 2026 SaaS aesthetic with glassmorphism
- **Animated Background** - Floating orbs with pulse, drift, and twinkle animations
- **Gradient Borders** - Beautiful purple-fuchsia-pink gradient card borders
- **Mouse-Follow Glow** - Interactive glow effect that follows cursor
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### 📊 Quiz Features

- **Progress Tracking** - Visual progress bar and question counter
- **Instant Results** - Score breakdown with correct/incorrect count and percentage
- **Answer Review** - Review all answers with correct solutions highlighted
- **Shuffled Options** - Options are randomized for each question

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Utility-first Styling
- **Lucide React** - Modern Icon Library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mueed96/islamiat-quiz-app.git

# Navigate to project directory
cd islamiat-quiz-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

## Deployment

This project is configured for easy deployment on **Vercel**:

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite settings
4. Click Deploy

## Project Structure

```
islamiat-quiz-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── data/
│   │   └── questions.js    # All 169 MCQs
│   ├── App.jsx             # Main quiz component with all modes
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind CSS + custom animations
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Screenshots

The app features:
- Welcome screen with 4 mode selection cards
- Quiz playing screen with animated background
- Results screen with detailed review

## Author

**Abdul Mueed**

## License

This project is for educational purposes.
