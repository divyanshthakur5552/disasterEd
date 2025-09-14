import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterSearch = ({ onSearch, onFilter, filters, onClearFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'natural', label: 'Natural Disasters' },
    { value: 'fire', label: 'Fire Safety' },
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'security', label: 'Security Threats' },
  ];

  const difficultyOptions = [
    { value: '', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const severityOptions = [
    { value: '', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onFilter({ category: value, difficulty: selectedDifficulty, severity: selectedSeverity });
  };

  const handleDifficultyChange = (value) => {
    setSelectedDifficulty(value);
    onFilter({ category: selectedCategory, difficulty: value, severity: selectedSeverity });
  };

  const handleSeverityChange = (value) => {
    setSelectedSeverity(value);
    onFilter({ category: selectedCategory, difficulty: selectedDifficulty, severity: value });
  };

  const handleClearAll = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedDifficulty('');
    setSelectedSeverity('');
    onClearFilters();
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedDifficulty || selectedSeverity;

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-2 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Find Training Modules</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search modules by title, topic, or keyword..."
            value={searchTerm}
            onChange={(e) => handleSearch(e?.target?.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={18} color="var(--color-muted-foreground)" />
          </div>
        </div>
      </div>
      {/* Filter Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onChange={handleCategoryChange}
          placeholder="Select category"
        />

        <Select
          label="Difficulty Level"
          options={difficultyOptions}
          value={selectedDifficulty}
          onChange={handleDifficultyChange}
          placeholder="Select difficulty"
        />

        <Select
          label="Risk Level"
          options={severityOptions}
          value={selectedSeverity}
          onChange={handleSeverityChange}
          placeholder="Select risk level"
        />
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
            
            {searchTerm && (
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <Icon name="Search" size={14} />
                <span>"{searchTerm}"</span>
                <button
                  onClick={() => handleSearch('')}
                  className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {selectedCategory && (
              <div className="flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                <Icon name="Tag" size={14} />
                <span>{categoryOptions?.find(opt => opt?.value === selectedCategory)?.label}</span>
                <button
                  onClick={() => handleCategoryChange('')}
                  className="ml-1 hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {selectedDifficulty && (
              <div className="flex items-center gap-1 bg-warning/10 text-warning px-3 py-1 rounded-full text-sm">
                <Icon name="BarChart3" size={14} />
                <span>{difficultyOptions?.find(opt => opt?.value === selectedDifficulty)?.label}</span>
                <button
                  onClick={() => handleDifficultyChange('')}
                  className="ml-1 hover:bg-warning/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            {selectedSeverity && (
              <div className="flex items-center gap-1 bg-error/10 text-error px-3 py-1 rounded-full text-sm">
                <Icon name="AlertTriangle" size={14} />
                <span>{severityOptions?.find(opt => opt?.value === selectedSeverity)?.label}</span>
                <button
                  onClick={() => handleSeverityChange('')}
                  className="ml-1 hover:bg-error/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSearch;