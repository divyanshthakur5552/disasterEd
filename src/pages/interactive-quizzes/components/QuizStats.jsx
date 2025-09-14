import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const QuizStats = ({ quizResults, completedQuizzes }) => {
  const totalQuizzes = 12; // Total available quizzes
  const completionRate = Math.round((completedQuizzes?.length / totalQuizzes) * 100);
  
  const averageScore = completedQuizzes?.length > 0 
    ? Math.round(Object.values(quizResults)?.reduce((sum, result) => sum + result?.score, 0) / completedQuizzes?.length)
    : 0;

  const categoryData = [
    { name: 'Fire Safety', completed: 3, total: 4, score: 85 },
    { name: 'Earthquake', completed: 2, total: 3, score: 78 },
    { name: 'Flood', completed: 1, total: 2, score: 92 },
    { name: 'General', completed: 2, total: 3, score: 88 }
  ];

  const performanceData = [
    { category: 'Fire', score: 85 },
    { category: 'Earthquake', score: 78 },
    { category: 'Flood', score: 92 },
    { category: 'General', score: 88 }
  ];

  const pieData = [
    { name: 'Completed', value: completedQuizzes?.length, color: '#059669' },
    { name: 'Remaining', value: totalQuizzes - completedQuizzes?.length, color: '#E5E7EB' }
  ];

  const achievements = [
    { 
      id: 1, 
      name: 'First Steps', 
      description: 'Complete your first quiz', 
      icon: 'Award',
      earned: completedQuizzes?.length >= 1,
      progress: Math.min(completedQuizzes?.length, 1)
    },
    { 
      id: 2, 
      name: 'Knowledge Seeker', 
      description: 'Complete 5 quizzes', 
      icon: 'BookOpen',
      earned: completedQuizzes?.length >= 5,
      progress: Math.min(completedQuizzes?.length / 5, 1)
    },
    { 
      id: 3, 
      name: 'Expert Level', 
      description: 'Score 90%+ on any quiz', 
      icon: 'Trophy',
      earned: Object.values(quizResults)?.some(result => result?.score >= 90),
      progress: Object.values(quizResults)?.some(result => result?.score >= 90) ? 1 : 0
    },
    { 
      id: 4, 
      name: 'Perfect Score', 
      description: 'Score 100% on any quiz', 
      icon: 'Star',
      earned: Object.values(quizResults)?.some(result => result?.score === 100),
      progress: Object.values(quizResults)?.some(result => result?.score === 100) ? 1 : 0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Quizzes Completed</p>
              <p className="text-2xl font-bold text-foreground">{completedQuizzes?.length}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="CheckCircle" size={24} color="var(--color-primary)" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Average Score</p>
              <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <Icon name="TrendingUp" size={24} color="var(--color-success)" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Completion Rate</p>
              <p className="text-2xl font-bold text-foreground">{completionRate}%</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <Icon name="Target" size={24} color="var(--color-accent)" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Achievements</p>
              <p className="text-2xl font-bold text-foreground">{achievements?.filter(a => a?.earned)?.length}</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <Icon name="Award" size={24} color="var(--color-warning)" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Performance by Category</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="category" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-card)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="score" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Completion Progress */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Quiz Completion</h3>
          <div className="flex items-center justify-center h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm text-muted-foreground">Completed ({completedQuizzes?.length})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <span className="text-sm text-muted-foreground">Remaining ({totalQuizzes - completedQuizzes?.length})</span>
            </div>
          </div>
        </div>
      </div>
      {/* Category Progress */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Progress by Category</h3>
        <div className="space-y-4">
          {categoryData?.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-foreground">{category?.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {category?.completed}/{category?.total} completed
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(category?.completed / category?.total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-medium text-foreground">{category?.score}%</div>
                <div className="text-xs text-muted-foreground">avg score</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements?.map((achievement) => (
            <div 
              key={achievement?.id} 
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                achievement?.earned 
                  ? 'border-success bg-success/5' :'border-border bg-background'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  achievement?.earned ? 'bg-success/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={achievement?.icon} 
                    size={20} 
                    color={achievement?.earned ? 'var(--color-success)' : 'var(--color-muted-foreground)'} 
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{achievement?.name}</h4>
                  <p className="text-sm text-muted-foreground">{achievement?.description}</p>
                  {!achievement?.earned && achievement?.progress > 0 && (
                    <div className="w-full bg-muted rounded-full h-1 mt-2">
                      <div 
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${achievement?.progress * 100}%` }}
                      />
                    </div>
                  )}
                </div>
                {achievement?.earned && (
                  <Icon name="Check" size={20} color="var(--color-success)" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizStats;