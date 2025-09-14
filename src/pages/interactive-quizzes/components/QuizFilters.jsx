import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


const QuizFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  selectedDifficulty, 
  setSelectedDifficulty,
  sortBy,
  setSortBy,
  showCompleted,
  setShowCompleted
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'fire', label: 'Fire Safety' },
    { value: 'earthquake', label: 'Earthquake Preparedness' },
    { value: 'flood', label: 'Flood Response' },
    { value: 'general', label: 'General Preparedness' },
    { value: 'first-aid', label: 'First Aid' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const sortOptions = [
    { value: 'title', label: 'Title A-Z' },
    { value: 'difficulty', label: 'Difficulty' },
    { value: 'duration', label: 'Duration' },
    { value: 'rating', label: 'Rating' },
    { value: 'attempts', label: 'Popularity' }
  ];

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('title');
    setShowCompleted(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground">Filter Quizzes</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          className="w-full"
        />

        <Select
          label="Difficulty"
          options={difficultyOptions}
          value={selectedDifficulty}
          onChange={setSelectedDifficulty}
          className="w-full"
        />

        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          className="w-full"
        />

        <div className="flex items-end">
          <Button
            variant={showCompleted ? "default" : "outline"}
            onClick={() => setShowCompleted(!showCompleted)}
            iconName={showCompleted ? "EyeOff" : "Eye"}
            iconPosition="left"
            className="w-full"
          >
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </Button>
        </div>
      </div>

      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'fire' ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(selectedCategory === 'fire' ? 'all' : 'fire')}
          iconName="Flame"
          iconPosition="left"
        >
          Fire Safety
        </Button>
        <Button
          variant={selectedCategory === 'earthquake' ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(selectedCategory === 'earthquake' ? 'all' : 'earthquake')}
          iconName="Zap"
          iconPosition="left"
        >
          Earthquake
        </Button>
        <Button
          variant={selectedCategory === 'flood' ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(selectedCategory === 'flood' ? 'all' : 'flood')}
          iconName="Waves"
          iconPosition="left"
        >
          Flood
        </Button>
        <Button
          variant={selectedDifficulty === 'beginner' ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedDifficulty(selectedDifficulty === 'beginner' ? 'all' : 'beginner')}
          iconName="Play"
          iconPosition="left"
        >
          Beginner
        </Button>
      </div>
    </div>
  );
};

export default QuizFilters;