import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const TrainingCard = ({ module, onStartModule, video, progress = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-2 overflow-hidden hover:shadow-elevation-4 transition-all duration-300">
      {/* Card Header */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={module.image}
          alt={module.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
              module.severity
            )}`}
          >
            {module.severity?.toUpperCase()} RISK
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-xl font-bold text-white mb-1">{module.title}</h3>
          <p className="text-white/90 text-sm">{module.subtitle}</p>
        </div>
      </div>
      {/* Card Content */}
      <div className="p-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Progress
            </span>
            <span className="text-sm font-bold text-foreground">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(
                progress
              )}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Module Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mx-auto mb-1">
              <Icon name="Clock" size={16} color="var(--color-primary)" />
            </div>
            <span className="text-xs text-muted-foreground">
              {module.duration}
            </span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full mx-auto mb-1">
              <Icon name="Users" size={16} color="var(--color-accent)" />
            </div>
            <span className="text-xs text-muted-foreground">
              {module.participants}
            </span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full mx-auto mb-1">
              <Icon name="Award" size={16} color="var(--color-success)" />
            </div>
            <span className="text-xs text-muted-foreground">
              {module.difficulty}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {module.description}
        </p>

        {/* Key Topics */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Key Topics:
          </h4>
          <div className="flex flex-wrap gap-2">
            {module.keyTopics
              ?.slice(0, isExpanded ? module.keyTopics?.length : 3)
              ?.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                >
                  {topic}
                </span>
              ))}
            {module.keyTopics?.length > 3 && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="px-2 py-1 text-primary text-xs hover:underline"
              >
                +{module.keyTopics?.length - 3} more
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="default"
            className="flex-1"
            iconName="Play"
            iconPosition="left"
            onClick={() => onStartModule(module.id)}
          >
            {progress > 0 ? "Continue" : "Start Module"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="space-y-3">
              <div>
                <h5 className="text-sm font-semibold text-foreground mb-1">
                  Learning Objectives:
                </h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {module.objectives?.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Icon
                        name="CheckCircle2"
                        size={14}
                        color="var(--color-success)"
                        className="mt-0.5 flex-shrink-0"
                      />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-foreground mb-1">
                  Prerequisites:
                </h5>
                <p className="text-sm text-muted-foreground">
                  {module.prerequisites}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingCard;
