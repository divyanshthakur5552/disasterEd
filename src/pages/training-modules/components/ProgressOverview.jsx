import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ overallProgress, completedModules, totalModules, streakDays, badges }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getProgressText = (progress) => {
    if (progress >= 80) return 'Excellent Progress!';
    if (progress >= 50) return 'Good Progress';
    return 'Getting Started';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-2 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Your Learning Progress</h2>
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={20} color="var(--color-success)" />
          <span className="text-sm font-medium text-success">{getProgressText(overallProgress)}</span>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Overall Completion</span>
          <span className="text-lg font-bold text-foreground">{overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-700 ${getProgressColor(overallProgress)}`}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Completed Modules */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-2">
            <Icon name="BookOpen" size={24} color="var(--color-primary)" />
          </div>
          <div className="text-2xl font-bold text-foreground">{completedModules}</div>
          <div className="text-xs text-muted-foreground">of {totalModules} Modules</div>
        </div>

        {/* Learning Streak */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-full mx-auto mb-2">
            <Icon name="Flame" size={24} color="var(--color-warning)" />
          </div>
          <div className="text-2xl font-bold text-foreground">{streakDays}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>

        {/* Badges Earned */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto mb-2">
            <Icon name="Award" size={24} color="var(--color-success)" />
          </div>
          <div className="text-2xl font-bold text-foreground">{badges}</div>
          <div className="text-xs text-muted-foreground">Badges Earned</div>
        </div>

        {/* Time Spent */}
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mx-auto mb-2">
            <Icon name="Clock" size={24} color="var(--color-accent)" />
          </div>
          <div className="text-2xl font-bold text-foreground">24h</div>
          <div className="text-xs text-muted-foreground">Total Time</div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="mt-6 pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Recent Achievements</h3>
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 bg-success/10 px-3 py-2 rounded-full whitespace-nowrap">
            <Icon name="Award" size={16} color="var(--color-success)" />
            <span className="text-sm font-medium text-success">Fire Safety Expert</span>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full whitespace-nowrap">
            <Icon name="Target" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Quiz Master</span>
          </div>
          <div className="flex items-center gap-2 bg-warning/10 px-3 py-2 rounded-full whitespace-nowrap">
            <Icon name="Zap" size={16} color="var(--color-warning)" />
            <span className="text-sm font-medium text-warning">Quick Learner</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;