import { useState, useEffect } from 'react';
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    XCircle,
    RotateCcw,
    LogOut,
    Award,
    BookOpen,
    Shuffle,
    List,
    Target,
    X,
    ChevronRight,
    Zap
} from 'lucide-react';
import { allQuestions } from './data/questions';

// Footer Component - Displayed on all pages
const Footer = () => (
    <footer className="w-full py-3 text-center text-slate-400 text-xs font-medium border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        Made by Abdul Mueed
    </footer>
);

const QuizApp = () => {
    const [gameState, setGameState] = useState('welcome');
    const [quizMode, setQuizMode] = useState(null);
    const [activeQuestions, setActiveQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [showReview, setShowReview] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleStartFull = () => {
        setQuizMode('full');
        setActiveQuestions(allQuestions);
        setGameState('playing');
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setScore(0);
        setShowReview(false);
    };

    const handleStartRandom = () => {
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 80);
        setQuizMode('random');
        setActiveQuestions(selected);
        setGameState('playing');
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setScore(0);
        setShowReview(false);
        setShowFeedback(false);
        setSelectedOption(null);
    };

    const handleStartQuickMock = () => {
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 80);
        setQuizMode('quickMock');
        setActiveQuestions(selected);
        setGameState('playing');
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setScore(0);
        setShowReview(false);
        setShowFeedback(false);
        setSelectedOption(null);
    };

    const handleQuickMockSelect = (option) => {
        if (showFeedback) return; // Prevent multiple clicks

        const isCorrect = option === activeQuestions[currentQuestionIndex].a;
        setSelectedOption(option);
        setShowFeedback(true);
        setUserAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: option
        }));

        // Auto-advance after 1.5 seconds
        setTimeout(() => {
            if (currentQuestionIndex < activeQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setShowFeedback(false);
                setSelectedOption(null);
            } else {
                // Last question - calculate score and show results
                let rawScore = 0;
                const updatedAnswers = { ...userAnswers, [currentQuestionIndex]: option };
                activeQuestions.forEach((q, index) => {
                    if (updatedAnswers[index] === q.a) {
                        rawScore++;
                    }
                });
                setScore(rawScore * 0.5);
                setGameState('results');
                setShowFeedback(false);
                setSelectedOption(null);
            }
        }, 1500);
    };

    const handleOptionSelect = (option) => {
        setUserAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: option
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < activeQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleFinish = () => {
        let rawScore = 0;
        activeQuestions.forEach((q, index) => {
            if (userAnswers[index] === q.a) {
                rawScore++;
            }
        });
        const finalScore = quizMode === 'random' ? rawScore * 0.5 : rawScore;
        setScore(finalScore);
        setGameState('results');
    };

    const handleExit = () => {
        setGameState('exit');
    };

    const currentQuestion = activeQuestions[currentQuestionIndex];
    const progressPercentage = activeQuestions.length > 0 ? ((currentQuestionIndex + 1) / activeQuestions.length) * 100 : 0;
    const isOptionSelected = userAnswers[currentQuestionIndex] !== undefined;

    // EXIT STATE
    if (gameState === 'exit') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex flex-col font-sans">
                <div className="flex-1 flex items-center justify-center p-6">
                    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full border border-white/20">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                            <BookOpen className="w-8 h-8 text-emerald-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">JazakAllah Khair</h2>
                        <p className="text-slate-300 text-sm mb-6 leading-relaxed">Thank you for dedicating time to your studies. May your knowledge benefit you.</p>
                        <button
                            onClick={() => setGameState('welcome')}
                            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm rounded-lg transition-all duration-200 shadow-lg shadow-emerald-500/30"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // WELCOME STATE
    if (gameState === 'welcome') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex flex-col font-sans">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500 p-2 rounded-lg">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-slate-900 text-lg">Islamiat Preparation</h1>
                                <p className="text-xs text-slate-500">Final Exam Study Suite</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="text-right">
                                <span className="text-2xl font-bold text-emerald-600">{allQuestions.length}</span>
                                <span className="text-slate-400 ml-1">MCQs</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex items-center justify-center p-6">
                    <div className="max-w-4xl w-full">
                        {/* Hero Section */}
                        <div className="text-center mb-10">
                            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full mb-4">
                                COMPREHENSIVE PREPARATION
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                                Master Your <span className="text-emerald-600">Islamiat</span> Exam
                            </h2>
                            <p className="text-slate-500 text-sm max-w-lg mx-auto">
                                Choose your preferred study mode and start practicing with our comprehensive question bank.
                            </p>
                        </div>

                        {/* Mode Cards - Three Columns */}
                        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                            {/* Complete Series Card */}
                            <button
                                onClick={handleStartFull}
                                className="group bg-white border border-slate-200 hover:border-emerald-300 p-6 rounded-xl text-left transition-all duration-200 hover:shadow-lg hover:shadow-emerald-100/50"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                        <List className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1">Complete Series</h3>
                                <p className="text-slate-500 text-sm mb-3">Practice all {allQuestions.length} questions in order</p>
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded">1 mark each</span>
                                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded">{allQuestions.length} total marks</span>
                                </div>
                            </button>

                            {/* Mock Exam Card */}
                            <button
                                onClick={handleStartRandom}
                                className="group bg-slate-900 hover:bg-slate-800 p-6 rounded-xl text-left transition-all duration-200 hover:shadow-xl"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                                        <Shuffle className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="font-bold text-white mb-1">Mock Examination</h3>
                                <p className="text-slate-400 text-sm mb-3">80 random questions from the pool</p>
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="px-2 py-1 bg-white/10 text-slate-300 rounded">0.5 marks each</span>
                                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">40 total marks</span>
                                </div>
                            </button>

                            {/* Quick Mock Card */}
                            <button
                                onClick={handleStartQuickMock}
                                className="group bg-gradient-to-br from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 p-6 rounded-xl text-left transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/30"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                                        <Zap className="w-5 h-5 text-emerald-200" />
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-emerald-200 group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="font-bold text-white mb-1">Quick Mock</h3>
                                <p className="text-emerald-100 text-sm mb-3">Instant feedback, auto-advance</p>
                                <div className="flex items-center gap-4 text-xs">
                                    <span className="px-2 py-1 bg-white/10 text-emerald-100 rounded">0.5 marks each</span>
                                    <span className="px-2 py-1 bg-emerald-400/20 text-emerald-200 rounded">40 total marks</span>
                                </div>
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex justify-center gap-8 mt-10 text-center">
                            <div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Categories</div>
                                <div className="font-bold text-slate-700">Multiple</div>
                            </div>
                            <div className="w-px bg-slate-200"></div>
                            <div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Question Types</div>
                                <div className="font-bold text-slate-700">MCQs Only</div>
                            </div>
                            <div className="w-px bg-slate-200"></div>
                            <div>
                                <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Difficulty</div>
                                <div className="font-bold text-slate-700">Mixed</div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // RESULTS STATE
    if (gameState === 'results') {
        const totalQuestions = activeQuestions.length;
        const correctCount = activeQuestions.filter((q, i) => userAnswers[i] === q.a).length;
        const maxScore = (quizMode === 'random' || quizMode === 'quickMock') ? 40 : totalQuestions;
        const percentage = Math.round((score / maxScore) * 100);

        return (
            <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 px-6 py-4">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Award className="w-6 h-6 text-emerald-600" />
                            <h1 className="font-bold text-slate-900">Performance Report</h1>
                        </div>
                        <span className="text-sm text-slate-500">
                            {quizMode === 'random' ? 'Mock Exam' : quizMode === 'quickMock' ? 'Quick Mock' : 'Complete Series'}
                        </span>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {/* Score Summary - Compact */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                {/* Main Score */}
                                <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white md:col-span-1">
                                    <div className="text-sm opacity-80 mb-1">Your Score</div>
                                    <div className="text-4xl font-black">{score}<span className="text-xl font-medium opacity-70">/{maxScore}</span></div>
                                    <div className="text-sm mt-2 opacity-80">{percentage}% Accuracy</div>
                                </div>
                                {/* Stats */}
                                <div className="p-6 text-center">
                                    <div className="text-3xl font-bold text-slate-800">{totalQuestions}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wide">Questions</div>
                                </div>
                                <div className="p-6 text-center">
                                    <div className="text-3xl font-bold text-emerald-600">{correctCount}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wide">Correct</div>
                                </div>
                                <div className="p-6 text-center">
                                    <div className="text-3xl font-bold text-red-500">{totalQuestions - correctCount}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wide">Incorrect</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setGameState('welcome')}
                                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" />
                                New Quiz
                            </button>
                            <button
                                onClick={handleExit}
                                className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Exit
                            </button>
                        </div>

                        {/* Detailed Review */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="font-semibold text-slate-900 text-sm">Answer Review</h3>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setShowReview(false)}
                                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${!showReview ? 'bg-red-100 text-red-700' : 'text-slate-500 hover:bg-slate-100'}`}
                                    >
                                        Incorrect Only
                                    </button>
                                    <button
                                        onClick={() => setShowReview(true)}
                                        className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${showReview ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-100'}`}
                                    >
                                        View All
                                    </button>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                                {activeQuestions.map((q, index) => {
                                    const isCorrect = userAnswers[index] === q.a;
                                    const userAnswer = userAnswers[index];

                                    if (isCorrect && !showReview) return null;

                                    return (
                                        <div key={index} className={`p-4 ${isCorrect ? 'bg-emerald-50/50' : 'bg-red-50/50'}`}>
                                            <div className="flex gap-3">
                                                <div className="shrink-0 mt-0.5">
                                                    {isCorrect ? (
                                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-red-500" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-slate-800 mb-2">
                                                        <span className="text-slate-400 font-medium">Q{index + 1}.</span> {q.q}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 text-xs">
                                                        {!isCorrect && (
                                                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                                                                Your answer: {userAnswer || "Skipped"}
                                                            </span>
                                                        )}
                                                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                                                            Correct: {q.a}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // Loading state
    if (!currentQuestion) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
                </div>
                <Footer />
            </div>
        );
    }

    // PLAYING STATE - Desktop Optimized
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-slate-200 px-6 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setGameState('welcome')}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Quit Quiz"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="h-5 w-px bg-slate-200"></div>
                        <div>
                            <span className="text-xs font-medium uppercase tracking-wide text-emerald-600">
                                {quizMode === 'random' ? 'Mock Exam' : quizMode === 'quickMock' ? 'Quick Mock' : 'Full Series'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Progress */}
                        <div className="flex items-center gap-3">
                            <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-emerald-500 h-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-slate-600">{Math.round(progressPercentage)}%</span>
                        </div>

                        <div className="h-5 w-px bg-slate-200"></div>

                        {/* Question Counter */}
                        <div className="text-sm">
                            <span className="font-bold text-slate-900">{currentQuestionIndex + 1}</span>
                            <span className="text-slate-400"> / {activeQuestions.length}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Quiz Area */}
            <main className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-3xl">
                    {/* Question Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        {/* Question */}
                        <div className="p-6 border-b border-slate-100">
                            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Question {currentQuestionIndex + 1}</span>
                            <h2 className="text-base md:text-lg font-semibold text-slate-800 mt-2 leading-relaxed">
                                {currentQuestion.q}
                            </h2>
                        </div>

                        {/* Options - 2x2 Grid on Desktop */}
                        <div className="p-5 bg-slate-50">
                            <div className="grid md:grid-cols-2 gap-3">
                                {currentQuestion.options.map((option, idx) => {
                                    const isSelected = userAnswers[currentQuestionIndex] === option;
                                    const optionLabels = ['A', 'B', 'C', 'D'];
                                    const isQuickMock = quizMode === 'quickMock';
                                    const correctAnswer = currentQuestion.a;
                                    const isCorrectOption = option === correctAnswer;
                                    const wasSelectedInQuickMock = selectedOption === option;
                                    const wasCorrectSelection = selectedOption === correctAnswer;

                                    // Determine styling for Quick Mock mode with feedback
                                    let buttonClass = '';
                                    let labelClass = '';
                                    let textClass = '';

                                    if (isQuickMock && showFeedback) {
                                        // Feedback is showing
                                        if (isCorrectOption) {
                                            // This is the correct answer - always show green
                                            buttonClass = 'border-emerald-500 bg-emerald-100';
                                            labelClass = 'bg-emerald-500 text-white';
                                            textClass = 'text-emerald-900 font-medium';
                                        } else if (wasSelectedInQuickMock && !wasCorrectSelection) {
                                            // User selected this wrong answer
                                            buttonClass = 'border-red-500 bg-red-100';
                                            labelClass = 'bg-red-500 text-white';
                                            textClass = 'text-red-900 font-medium';
                                        } else {
                                            // Other unselected options
                                            buttonClass = 'border-slate-200 bg-white opacity-50';
                                            labelClass = 'bg-slate-100 text-slate-500';
                                            textClass = 'text-slate-600';
                                        }
                                    } else if (isQuickMock) {
                                        // Quick Mock but no feedback yet
                                        buttonClass = 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50';
                                        labelClass = 'bg-slate-100 text-slate-500';
                                        textClass = 'text-slate-600';
                                    } else {
                                        // Regular mode (full/random)
                                        buttonClass = isSelected
                                            ? 'border-emerald-500 bg-emerald-50'
                                            : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50';
                                        labelClass = isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500';
                                        textClass = isSelected ? 'text-emerald-900 font-medium' : 'text-slate-600';
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => isQuickMock ? handleQuickMockSelect(option) : handleOptionSelect(option)}
                                            disabled={isQuickMock && showFeedback}
                                            className={`text-left p-4 rounded-lg border-2 transition-all duration-150 flex items-start gap-3 ${buttonClass} ${isQuickMock && showFeedback ? 'cursor-default' : ''}`}
                                        >
                                            <span className={`shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${labelClass}`}>
                                                {optionLabels[idx]}
                                            </span>
                                            <span className={`text-sm ${textClass}`}>
                                                {option}
                                            </span>
                                            {isQuickMock && showFeedback && isCorrectOption && (
                                                <CheckCircle className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />
                                            )}
                                            {isQuickMock && showFeedback && wasSelectedInQuickMock && !wasCorrectSelection && (
                                                <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Navigation - Hidden for Quick Mock */}
                        {quizMode !== 'quickMock' && (
                            <div className="px-5 py-4 bg-white border-t border-slate-100 flex justify-between items-center">
                                <button
                                    onClick={handleBack}
                                    disabled={currentQuestionIndex === 0}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                                        ${currentQuestionIndex === 0
                                            ? 'text-slate-300 cursor-not-allowed'
                                            : 'text-slate-600 hover:bg-slate-100'
                                        }
                                    `}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Previous
                                </button>

                                {currentQuestionIndex === activeQuestions.length - 1 ? (
                                    <button
                                        onClick={handleFinish}
                                        disabled={!isOptionSelected}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                                            ${!isOptionSelected
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                                            }
                                        `}
                                    >
                                        Finish Exam
                                        <Award className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        disabled={!isOptionSelected}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all
                                            ${!isOptionSelected
                                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                                            }
                                        `}
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Quick Mock Progress Indicator */}
                        {quizMode === 'quickMock' && showFeedback && (
                            <div className="px-5 py-3 bg-emerald-50 border-t border-emerald-100 text-center">
                                <span className="text-sm text-emerald-600 font-medium">
                                    {currentQuestionIndex < activeQuestions.length - 1
                                        ? 'Moving to next question...'
                                        : 'Calculating your score...'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default QuizApp;
