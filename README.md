# Islamiat Final Preparation

A comprehensive MCQs quiz application for Islamiat final exam preparation, built with React and Tailwind CSS.

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

## Features

- **169 MCQs** covering all important Islamiat topics
- **Two Study Modes:**
  - **Complete Series** - Practice all questions in order (1 mark each)
  - **Mock Exam** - 80 random questions (0.5 marks each, 40 total)
- **Progress Tracking** - Visual progress bar and question counter
- **Instant Results** - Score breakdown with correct/incorrect count
- **Answer Review** - Review all answers with correct solutions highlighted
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/islamiat-quiz-app.git

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
│   ├── App.jsx             # Main quiz component
│   ├── main.jsx            # React entry point
│   └── index.css           # Tailwind CSS
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Author

**Abdul Mueed**

## License

This project is for educational purposes.
