import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, searchTerm, onClear }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    onClear();
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalSearchTerm(value);
    // Real-time search as user types
    onSearch(value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <form onSubmit={handleSearch} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={18} color="var(--color-muted-foreground)" />
          </div>
          <Input
            type="text"
            placeholder="Search alerts by location, type, or description..."
            value={localSearchTerm}
            onChange={handleInputChange}
            className="pl-10 pr-10"
          />
          {localSearchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-foreground transition-colors"
            >
              <Icon name="X" size={18} color="var(--color-muted-foreground)" />
            </button>
          )}
        </div>
        
        <Button 
          type="submit" 
          variant="default"
          className="px-6"
        >
          <Icon name="Search" size={16} className="mr-2" />
          Search
        </Button>
      </form>
      
      {searchTerm && (
        <div className="mt-3 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Searching for: <span className="font-medium text-foreground">"{searchTerm}"</span>
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear search
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;