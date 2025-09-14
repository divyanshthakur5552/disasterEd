import React from 'react';

import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    'all': 'Grid3X3',
    'mental-health': 'Heart',
    'relief-camps': 'Home',
    'donations': 'HandHeart',
    'community-support': 'Users',
    'emergency-services': 'AlertTriangle'
  };

  const categoryLabels = {
    'all': 'All Resources',
    'mental-health': 'Mental Health',
    'relief-camps': 'Relief Camps',
    'donations': 'Donations',
    'community-support': 'Community Support',
    'emergency-services': 'Emergency Services'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-2">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Filter by Category</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {categories?.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            iconName={categoryIcons?.[category]}
            iconPosition="left"
            onClick={() => onCategoryChange(category)}
            className="justify-start"
          >
            <span className="hidden sm:inline">{categoryLabels?.[category]}</span>
            <span className="sm:hidden">{categoryLabels?.[category]?.split(' ')?.[0]}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;