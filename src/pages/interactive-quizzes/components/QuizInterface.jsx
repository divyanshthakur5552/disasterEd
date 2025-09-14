import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuizInterface = ({ quiz, onQuizComplete, onBackToList }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(quiz?.duration * 60);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeRemaining > 0 && !showResults) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, showResults]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz?.questionsData?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    quiz?.questionsData?.forEach((question, index) => {
      if (selectedAnswers?.[index] === question?.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / quiz?.questionsData?.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    // Save to localStorage
    const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
    quizResults[quiz.id] = {
      score: finalScore,
      completedAt: new Date()?.toISOString(),
      timeSpent: (quiz?.duration * 60) - timeRemaining
    };
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
    
    onQuizComplete(quiz?.id, finalScore);
  };

  const currentQuestionData = quiz?.questionsData?.[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz?.questionsData?.length) * 100;

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <div className="mb-6">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
              score >= 80 ? 'bg-success/10' : score >= 60 ? 'bg-warning/10' : 'bg-error/10'
            }`}>
              <Icon 
                name={score >= 80 ? "Trophy" : score >= 60 ? "Award" : "AlertCircle"} 
                size={40} 
                color={score >= 80 ? 'var(--color-success)' : score >= 60 ? 'var(--color-warning)' : 'var(--color-error)'}
              />
            </div>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground">You scored {score}% on {quiz?.title}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{score}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {Object.keys(selectedAnswers)?.filter(key => 
                  selectedAnswers?.[key] === quiz?.questionsData?.[key]?.correctAnswer
                )?.length}/{quiz?.questionsData?.length}
              </div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {formatTime((quiz?.duration * 60) - timeRemaining)}
              </div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => window.location?.reload()}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Retake Quiz
            </Button>
            <Button
              variant="default"
              onClick={onBackToList}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Quizzes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackToList}
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="font-heading font-bold text-xl text-foreground">{quiz?.title}</h1>
              <p className="text-muted-foreground text-sm">Question {currentQuestion + 1} of {quiz?.questionsData?.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
              <span className={`font-mono ${timeRemaining < 300 ? 'text-error' : 'text-muted-foreground'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Question Card */}
      <div className="bg-card rounded-lg border border-border p-8 mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
          {currentQuestionData?.question}
        </h2>

        <div className="space-y-3">
          {currentQuestionData?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-elevation-2 ${
                selectedAnswers?.[currentQuestion] === index
                  ? 'border-primary bg-primary/5 text-primary' :'border-border bg-background hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers?.[currentQuestion] === index
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedAnswers?.[currentQuestion] === index && (
                    <Icon name="Check" size={14} color="white" />
                  )}
                </div>
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          {quiz?.questionsData?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                index === currentQuestion
                  ? 'bg-primary text-primary-foreground'
                  : selectedAnswers?.[index] !== undefined
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion === quiz?.questionsData?.length - 1 ? (
          <Button
            variant="default"
            onClick={handleSubmitQuiz}
            disabled={Object.keys(selectedAnswers)?.length !== quiz?.questionsData?.length}
            iconName="Send"
            iconPosition="right"
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={handleNextQuestion}
            disabled={selectedAnswers?.[currentQuestion] === undefined}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;