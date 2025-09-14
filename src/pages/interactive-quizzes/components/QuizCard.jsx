import React from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const QuizCard = ({ quiz, onStartQuiz, completedQuizzes }) => {
  const isCompleted = completedQuizzes?.includes(quiz?.id);
  const difficultyColors = {
    beginner: "bg-emerald-100 text-emerald-700 border-emerald-200",
    intermediate: "bg-amber-100 text-amber-700 border-amber-200",
    advanced: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-4 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${quiz?.color}`}>
            <Icon name={quiz?.icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {quiz?.title}
            </h3>
            <p className="text-muted-foreground text-sm">{quiz?.category}</p>
          </div>
        </div>
        {isCompleted && (
          <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full">
            <Icon name="CheckCircle" size={16} />
            <span className="text-xs font-medium">Completed</span>
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {quiz?.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{quiz?.duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="HelpCircle" size={16} />
            <span>{quiz?.questions} questions</span>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${
            difficultyColors?.[quiz?.difficulty]
          }`}
        >
          {quiz?.difficulty}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={16}
                color={i < quiz?.rating ? "#F59E0B" : "#ffffff"}
                className={i < quiz?.rating ? "fill-current" : ""}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({quiz?.attempts})
          </span>
        </div>
        <Button
          variant={isCompleted ? "outline" : "default"}
          size="sm"
          onClick={() => onStartQuiz(quiz)}
          iconName={isCompleted ? "RotateCcw" : "Play"}
          iconPosition="left"
        >
          {isCompleted ? "Retake" : "Start Quiz"}
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
