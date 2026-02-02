import { useState, useEffect, useCallback } from 'react';
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
    <footer className="w-full py-4 text-center text-slate-500 text-xs font-medium border-t border-slate-800/50 bg-slate-900/80 backdrop-blur-sm">
        <span className="text-slate-400">Made with</span> <span className="text-purple-500">♥</span> <span className="text-slate-400">by</span> <span className="text-slate-300">Abdul Mueed</span>
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
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse movement for interactive glow
    const handleMouseMove = useCallback((e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    }, []);

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
        // Shuffle options for the first question
        const firstQuestionShuffledOptions = [...selected[0].options].sort(() => 0.5 - Math.random());
        setQuizMode('quickMock');
        setActiveQuestions(selected);
        setGameState('playing');
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setScore(0);
        setShowReview(false);
        setShowFeedback(false);
        setSelectedOption(null);
        setShuffledOptions(firstQuestionShuffledOptions);
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
                const nextIndex = currentQuestionIndex + 1;
                const nextQuestionShuffledOptions = [...activeQuestions[nextIndex].options].sort(() => 0.5 - Math.random());
                setCurrentQuestionIndex(nextIndex);
                setShowFeedback(false);
                setSelectedOption(null);
                setShuffledOptions(nextQuestionShuffledOptions);
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
            <div className="min-h-screen bg-[#0a0a0f] flex flex-col font-sans relative overflow-hidden">
                {/* Premium background orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] bg-gradient-to-tl from-teal-600/15 via-emerald-500/10 to-transparent rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 flex-1 flex items-center justify-center p-6">
                    <div className="relative p-[1px] rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 opacity-30"></div>
                        <div className="relative bg-[#12121a] backdrop-blur-xl p-10 rounded-3xl text-center max-w-sm w-full">
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-500 rounded-full blur-xl opacity-40"></div>
                                <div className="relative w-full h-full bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                                    <BookOpen className="w-8 h-8 text-purple-400" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-black text-white mb-3">JazakAllah Khair</h2>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Thank you for dedicating time to your studies. May your knowledge benefit you.</p>
                            <button
                                onClick={() => setGameState('welcome')}
                                className="group relative w-full py-3.5 text-white font-semibold text-sm rounded-2xl transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                                <span className="relative z-10">Return to Dashboard</span>
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // WELCOME STATE
    if (gameState === 'welcome') {
        return (
            <div
                className="min-h-screen bg-[#0a0a0f] flex flex-col font-sans relative overflow-hidden"
                onMouseMove={handleMouseMove}
            >
                {/* Mouse-following gradient glow */}
                <div
                    className="fixed pointer-events-none z-0 w-[600px] h-[600px] rounded-full transition-all duration-300 ease-out"
                    style={{
                        background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.08) 40%, transparent 70%)',
                        left: mousePosition.x - 300,
                        top: mousePosition.y - 300,
                        filter: 'blur(60px)',
                    }}
                ></div>

                {/* Rich gradient background orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Main purple/pink orb - top right */}
                    <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                    {/* Orange/amber orb - bottom left */}
                    <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-gradient-to-tr from-orange-600/25 via-amber-500/15 to-transparent rounded-full blur-3xl"></div>
                    {/* Teal accent orb - center */}
                    <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    {/* Small floating accent lights */}
                    <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl animate-float"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-rose-500/15 rounded-full blur-2xl animate-float-delayed"></div>
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
                    {/* Radial gradient overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_70%)]"></div>
                </div>

                {/* Header */}
                <header className="relative z-10 bg-black/40 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <div className="relative bg-gradient-to-br from-purple-600 to-fuchsia-600 p-3 rounded-xl shadow-2xl">
                                    <BookOpen className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="font-bold text-white text-xl tracking-tight">Islamiat Prep</h1>
                                <p className="text-xs text-slate-500">Final Exam Study Suite</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                <span className="text-3xl font-black bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">{allQuestions.length}</span>
                                <span className="text-slate-500 ml-2 text-sm font-medium">MCQs</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-8">
                    <div className="max-w-6xl w-full">
                        {/* Hero Section */}
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold rounded-full mb-8 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                </span>
                                COMPREHENSIVE PREPARATION
                            </div>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                                Master Your{' '}
                                <span className="relative">
                                    <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Islamiat</span>
                                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full blur-sm"></span>
                                </span>{' '}
                                Exam
                            </h2>
                            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                Choose your study mode and start practicing with our comprehensive question bank.
                            </p>
                        </div>

                        {/* Mode Cards - Row Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mb-12">
                            {/* Complete Series Card */}
                            <button
                                onClick={handleStartFull}
                                className="group relative rounded-3xl transition-transform duration-300 hover:-translate-y-2 h-full"
                            >
                                {/* Gradient border effect */}
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <div className="relative bg-[#12121a] backdrop-blur-xl p-7 rounded-3xl text-left border border-white/5 group-hover:border-transparent transition-colors h-full flex flex-col">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="relative">
                                            <div className="absolute -inset-2 bg-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative p-3.5 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 rounded-xl border border-purple-500/20">
                                                <List className="w-6 h-6 text-purple-400" />
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <h3 className="font-bold text-white text-xl mb-2">Complete Series</h3>
                                    <p className="text-slate-500 text-sm mb-5 leading-relaxed flex-grow">Practice all {allQuestions.length} questions in sequential order</p>
                                    <div className="flex items-center gap-3 text-xs mt-auto">
                                        <span className="px-3 py-1.5 bg-white/5 text-slate-400 rounded-lg border border-white/5">1 mark each</span>
                                        <span className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">{allQuestions.length} total</span>
                                    </div>
                                </div>
                            </button>

                            {/* Mock Exam Card */}
                            <button
                                onClick={handleStartRandom}
                                className="group relative rounded-3xl transition-transform duration-300 hover:-translate-y-2 h-full"
                            >
                                {/* Gradient border effect */}
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <div className="relative bg-[#12121a] backdrop-blur-xl p-7 rounded-3xl text-left border border-white/5 group-hover:border-transparent transition-colors h-full flex flex-col">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="relative">
                                            <div className="absolute -inset-2 bg-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative p-3.5 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 rounded-xl border border-purple-500/20">
                                                <Shuffle className="w-6 h-6 text-purple-400" />
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <h3 className="font-bold text-white text-xl mb-2">Mock Examination</h3>
                                    <p className="text-slate-500 text-sm mb-5 leading-relaxed flex-grow">80 random questions from the pool</p>
                                    <div className="flex items-center gap-3 text-xs mt-auto">
                                        <span className="px-3 py-1.5 bg-white/5 text-slate-400 rounded-lg border border-white/5">0.5 marks</span>
                                        <span className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">40 total</span>
                                    </div>
                                </div>
                            </button>

                            {/* Quick Mock Card */}
                            <button
                                onClick={handleStartQuickMock}
                                className="group relative rounded-3xl transition-transform duration-300 hover:-translate-y-2 h-full"
                            >
                                {/* Gradient border effect */}
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-3xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                                <div className="relative bg-[#12121a] backdrop-blur-xl p-7 rounded-3xl text-left border border-white/5 group-hover:border-transparent transition-colors h-full flex flex-col">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="relative">
                                            <div className="absolute -inset-2 bg-purple-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="relative p-3.5 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 rounded-xl border border-purple-500/20">
                                                <Zap className="w-6 h-6 text-purple-400" />
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <h3 className="font-bold text-white text-xl mb-2">Quick Mock</h3>
                                    <p className="text-slate-500 text-sm mb-5 leading-relaxed flex-grow">Instant feedback with auto-advance</p>
                                    <div className="flex items-center gap-3 text-xs mt-auto">
                                        <span className="px-3 py-1.5 bg-white/5 text-slate-400 rounded-lg border border-white/5">0.5 marks</span>
                                        <span className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">40 total</span>
                                    </div>
                                </div>
                            </button>
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            {[
                                { label: 'Categories', value: 'Multiple' },
                                { label: 'Question Types', value: 'MCQs Only' },
                                { label: 'Difficulty', value: 'Mixed' }
                            ].map((stat, idx) => (
                                <div key={idx} className="px-6 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-2xl text-center min-w-[140px]">
                                    <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className="font-bold text-white text-sm">{stat.value}</div>
                                </div>
                            ))}
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
            <div className="min-h-screen bg-[#0a0a0f] flex flex-col font-sans relative overflow-hidden">
                {/* Premium background orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-transparent rounded-full blur-3xl"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_70%)]"></div>
                </div>

                {/* Header */}
                <header className="relative z-10 bg-black/40 backdrop-blur-2xl border-b border-white/5 px-6 py-4">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl blur opacity-40"></div>
                                <div className="relative p-3 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <h1 className="font-bold text-white text-xl">Performance Report</h1>
                        </div>
                        <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-400">
                            {quizMode === 'random' ? 'Mock Exam' : quizMode === 'quickMock' ? 'Quick Mock' : 'Complete Series'}
                        </span>
                    </div>
                </header>

                <main className="relative z-10 flex-1 p-6 overflow-auto">
                    <div className="max-w-5xl mx-auto space-y-6">
                        {/* Score Summary */}
                        <div className="bg-[#12121a] backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden">
                            <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
                                {/* Main Score */}
                                <div className="p-8 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 text-white md:col-span-1 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                    <div className="relative z-10">
                                        <div className="text-sm text-purple-100 mb-2 font-medium">Your Score</div>
                                        <div className="text-5xl font-black">{score}<span className="text-2xl font-medium text-purple-200">/{maxScore}</span></div>
                                        <div className="text-sm mt-3 text-purple-100">{percentage}% Accuracy</div>
                                    </div>
                                </div>
                                {/* Stats */}
                                <div className="p-6 text-center flex flex-col justify-center">
                                    <div className="text-4xl font-black text-white">{totalQuestions}</div>
                                    <div className="text-xs text-slate-600 uppercase tracking-wide mt-1">Questions</div>
                                </div>
                                <div className="p-6 text-center flex flex-col justify-center">
                                    <div className="text-4xl font-black text-emerald-400">{correctCount}</div>
                                    <div className="text-xs text-slate-600 uppercase tracking-wide mt-1">Correct</div>
                                </div>
                                <div className="p-6 text-center flex flex-col justify-center">
                                    <div className="text-4xl font-black text-rose-400">{totalQuestions - correctCount}</div>
                                    <div className="text-xs text-slate-600 uppercase tracking-wide mt-1">Incorrect</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setGameState('welcome')}
                                className="group relative px-8 py-3.5 text-white text-sm font-semibold rounded-2xl flex items-center gap-2 transition-all overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 transition-all"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    <RotateCcw className="w-4 h-4" />
                                    New Quiz
                                </span>
                            </button>
                            <button
                                onClick={handleExit}
                                className="px-8 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-sm font-semibold rounded-2xl flex items-center gap-2 transition-all backdrop-blur"
                            >
                                <LogOut className="w-4 h-4" />
                                Exit
                            </button>
                        </div>

                        {/* Detailed Review */}
                        <div className="bg-[#12121a] backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden">
                            <div className="px-5 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h3 className="font-semibold text-white text-sm">Answer Review</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowReview(false)}
                                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${!showReview ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-slate-400 hover:bg-white/5'}`}
                                    >
                                        Incorrect Only
                                    </button>
                                    <button
                                        onClick={() => setShowReview(true)}
                                        className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${showReview ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-slate-400 hover:bg-white/5'}`}
                                    >
                                        View All
                                    </button>
                                </div>
                            </div>

                            <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                                {activeQuestions.map((q, index) => {
                                    const isCorrect = userAnswers[index] === q.a;
                                    const userAnswer = userAnswers[index];

                                    if (isCorrect && !showReview) return null;

                                    return (
                                        <div key={index} className={`p-4 ${isCorrect ? 'bg-emerald-500/5' : 'bg-rose-500/5'}`}>
                                            <div className="flex gap-3">
                                                <div className="shrink-0 mt-0.5">
                                                    {isCorrect ? (
                                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-rose-400" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-slate-300 mb-2">
                                                        <span className="text-slate-600 font-medium">Q{index + 1}.</span> {q.q}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 text-xs">
                                                        {!isCorrect && (
                                                            <span className="px-2.5 py-1 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30">
                                                                Your answer: {userAnswer || "Skipped"}
                                                            </span>
                                                        )}
                                                        <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f]">
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                </div>
                <Footer />
            </div>
        );
    }

    // PLAYING STATE - Desktop Optimized
    return (
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col font-sans relative overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating orb 1 - Purple, slow drift */}
                <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-600/20 via-fuchsia-500/15 to-transparent rounded-full blur-3xl animate-pulse"
                    style={{ animation: 'float 8s ease-in-out infinite, pulse 4s ease-in-out infinite' }}></div>

                {/* Floating orb 2 - Teal, opposite direction */}
                <div className="absolute bottom-0 -left-32 w-[350px] h-[350px] bg-gradient-to-tr from-teal-600/15 via-emerald-500/10 to-transparent rounded-full blur-3xl"
                    style={{ animation: 'floatReverse 10s ease-in-out infinite, pulse 5s ease-in-out infinite alternate' }}></div>

                {/* Floating orb 3 - Pink accent, center-right */}
                <div className="absolute top-1/3 -right-20 w-[300px] h-[300px] bg-gradient-to-l from-pink-500/10 via-fuchsia-500/5 to-transparent rounded-full blur-3xl"
                    style={{ animation: 'drift 12s ease-in-out infinite' }}></div>

                {/* Floating orb 4 - Blue accent, bottom-center */}
                <div className="absolute -bottom-20 left-1/3 w-[250px] h-[250px] bg-gradient-to-t from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl"
                    style={{ animation: 'floatReverse 9s ease-in-out infinite' }}></div>

                {/* Subtle moving particles/stars */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full blur-sm"
                    style={{ animation: 'twinkle 3s ease-in-out infinite' }}></div>
                <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-fuchsia-400/40 rounded-full blur-sm"
                    style={{ animation: 'twinkle 4s ease-in-out infinite 1s' }}></div>
                <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-pink-400/30 rounded-full blur-sm"
                    style={{ animation: 'twinkle 3.5s ease-in-out infinite 0.5s' }}></div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0f_70%)]"></div>
            </div>

            {/* Top Navigation Bar */}
            <header className="relative z-10 bg-black/40 backdrop-blur-2xl border-b border-white/5 px-6 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setGameState('welcome')}
                            className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                            title="Quit Quiz"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="h-5 w-px bg-white/10"></div>
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wide bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                                {quizMode === 'random' ? 'Mock Exam' : quizMode === 'quickMock' ? 'Quick Mock' : 'Full Series'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Progress */}
                        <div className="flex items-center gap-3">
                            <div className="w-32 bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
                                <div
                                    className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 h-full transition-all duration-300"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-purple-400">{Math.round(progressPercentage)}%</span>
                        </div>

                        <div className="h-5 w-px bg-white/10"></div>

                        {/* Question Counter */}
                        <div className="text-sm px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl">
                            <span className="font-bold text-white">{currentQuestionIndex + 1}</span>
                            <span className="text-slate-500"> / {activeQuestions.length}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Quiz Area */}
            <main className="relative z-10 flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-3xl">
                    {/* Question Card */}
                    <div className="bg-[#12121a] backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                        {/* Question */}
                        <div className="p-6 border-b border-white/5">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-semibold text-purple-400 mb-3">
                                Question {currentQuestionIndex + 1}
                            </span>
                            <h2 className="text-lg md:text-xl font-semibold text-white leading-relaxed">
                                {currentQuestion.q}
                            </h2>
                        </div>

                        {/* Options - 2x2 Grid on Desktop */}
                        <div className="p-5 bg-black/20">
                            <div className="grid md:grid-cols-2 gap-3">
                                {(quizMode === 'quickMock' ? shuffledOptions : currentQuestion.options).map((option, idx) => {
                                    const isSelected = userAnswers[currentQuestionIndex] === option;
                                    const optionLabels = ['A', 'B', 'C', 'D'];
                                    const isQuickMock = quizMode === 'quickMock';
                                    const correctAnswer = currentQuestion.a;
                                    const isCorrectOption = option === correctAnswer;
                                    const wasSelectedInQuickMock = selectedOption === option;
                                    const wasCorrectSelection = selectedOption === correctAnswer;

                                    // Determine styling for premium theme
                                    let buttonClass = '';
                                    let labelClass = '';
                                    let textClass = '';

                                    if (isQuickMock && showFeedback) {
                                        // Feedback is showing
                                        if (isCorrectOption) {
                                            buttonClass = 'border-emerald-500 bg-emerald-500/20';
                                            labelClass = 'bg-emerald-500 text-white';
                                            textClass = 'text-emerald-300 font-medium';
                                        } else if (wasSelectedInQuickMock && !wasCorrectSelection) {
                                            buttonClass = 'border-rose-500 bg-rose-500/20';
                                            labelClass = 'bg-rose-500 text-white';
                                            textClass = 'text-rose-300 font-medium';
                                        } else {
                                            buttonClass = 'border-white/5 bg-white/[0.02] opacity-50';
                                            labelClass = 'bg-white/10 text-slate-500';
                                            textClass = 'text-slate-600';
                                        }
                                    } else if (isQuickMock) {
                                        buttonClass = 'border-white/10 bg-white/[0.03] hover:border-purple-500/50 hover:bg-purple-500/10';
                                        labelClass = 'bg-white/10 text-slate-400';
                                        textClass = 'text-slate-300';
                                    } else {
                                        // Regular mode (full/random)
                                        buttonClass = isSelected
                                            ? 'border-purple-500 bg-purple-500/20'
                                            : 'border-white/10 bg-white/[0.03] hover:border-purple-500/50 hover:bg-purple-500/10';
                                        labelClass = isSelected ? 'bg-purple-500 text-white' : 'bg-white/10 text-slate-400';
                                        textClass = isSelected ? 'text-purple-300 font-medium' : 'text-slate-300';
                                    }

                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => isQuickMock ? handleQuickMockSelect(option) : handleOptionSelect(option)}
                                            disabled={isQuickMock && showFeedback}
                                            className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-3 ${buttonClass} ${isQuickMock && showFeedback ? 'cursor-default' : ''}`}
                                        >
                                            <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${labelClass}`}>
                                                {optionLabels[idx]}
                                            </span>
                                            <span className={`text-sm leading-relaxed ${textClass}`}>
                                                {option}
                                            </span>
                                            {isQuickMock && showFeedback && isCorrectOption && (
                                                <CheckCircle className="w-5 h-5 text-emerald-400 ml-auto shrink-0" />
                                            )}
                                            {isQuickMock && showFeedback && wasSelectedInQuickMock && !wasCorrectSelection && (
                                                <XCircle className="w-5 h-5 text-rose-400 ml-auto shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Navigation - Hidden for Quick Mock */}
                        {quizMode !== 'quickMock' && (
                            <div className="px-5 py-4 bg-[#12121a] border-t border-white/5 flex justify-between items-center">
                                <button
                                    onClick={handleBack}
                                    disabled={currentQuestionIndex === 0}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                                    ${currentQuestionIndex === 0
                                            ? 'text-slate-700 cursor-not-allowed'
                                            : 'text-slate-400 hover:bg-white/5'
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
                                        className={`group relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all overflow-hidden
                                        ${!isOptionSelected
                                                ? 'bg-white/5 text-slate-600 cursor-not-allowed'
                                                : 'text-white'
                                            }
                                    `}
                                    >
                                        {isOptionSelected && (
                                            <>
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500"></div>
                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 blur-lg opacity-50"></div>
                                            </>
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            Finish Exam
                                            <Award className="w-4 h-4" />
                                        </span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        disabled={!isOptionSelected}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all
                                        ${!isOptionSelected
                                                ? 'bg-white/5 text-slate-600 cursor-not-allowed'
                                                : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
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
                            <div className="px-5 py-3 bg-purple-500/10 border-t border-purple-500/20 text-center">
                                <span className="text-sm text-purple-400 font-medium">
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