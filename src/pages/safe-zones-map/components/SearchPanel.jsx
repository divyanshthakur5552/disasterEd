import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchPanel = ({ onSearch, onFilter, isCollapsed, onToggleCollapse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');

  const distanceOptions = [
    { value: '', label: 'Any Distance' },
    { value: '1', label: 'Within 1 km' },
    { value: '2', label: 'Within 2 km' },
    { value: '5', label: 'Within 5 km' },
    { value: '10', label: 'Within 10 km' },
  ];

  const capacityOptions = [
    { value: '', label: 'Any Capacity' },
    { value: '50', label: '50+ people' },
    { value: '100', label: '100+ people' },
    { value: '200', label: '200+ people' },
    { value: '500', label: '500+ people' },
  ];

  const facilityOptions = [
    { value: '', label: 'All Facilities' },
    { value: 'medical', label: 'Medical Aid' },
    { value: 'food', label: 'Food & Water' },
    { value: 'shelter', label: 'Shelter' },
    { value: 'communication', label: 'Communication' },
    { value: 'power', label: 'Power Supply' },
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = () => {
    onFilter({
      distance: selectedDistance,
      capacity: selectedCapacity,
      facility: selectedFacility,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDistance('');
    setSelectedCapacity('');
    setSelectedFacility('');
    onSearch('');
    onFilter({});
  };

  return (
    <div className={`bg-card rounded-lg shadow-elevation-4 transition-all duration-300 ${
      isCollapsed ? 'p-1' : 'p-3'
    }`}>
      {/* Mobile Toggle Button */}
      <div className="flex items-center justify-between mb-1 lg:hidden">
        <h3 className="font-medium text-lg">Search Safe Zones</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? 'Expand search' : 'Collapse search'}
        >
          <Icon name={isCollapsed ? 'ChevronDown' : 'ChevronUp'} size={20} />
        </Button>
      </div>
      {/* Search Content */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'}`}>
        <div className="hidden lg:block mb-2">
          <h3 className="font-medium text-lg mb-1">Search Safe Zones</h3>
          <p className="text-sm text-muted-foreground">
            Find emergency shelters and evacuation routes near you
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-2">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search by name, address, or facility..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pr-12"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Icon name="Search" size={18} />
            </Button>
          </div>
        </form>

        {/* Filters */}
        <div className="space-y-1 mb-2">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
            Filters
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1">
            <Select
              label="Distance"
              options={distanceOptions}
              value={selectedDistance}
              onChange={(value) => {
                setSelectedDistance(value);
                handleFilterChange();
              }}
              placeholder="Select distance"
            />

            <Select
              label="Capacity"
              options={capacityOptions}
              value={selectedCapacity}
              onChange={(value) => {
                setSelectedCapacity(value);
                handleFilterChange();
              }}
              placeholder="Select capacity"
            />

            <Select
              label="Facilities"
              options={facilityOptions}
              value={selectedFacility}
              onChange={(value) => {
                setSelectedFacility(value);
                handleFilterChange();
              }}
              placeholder="Select facility"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-1 mb-2">
          <Button
            variant="outline"
            onClick={clearFilters}
            iconName="RotateCcw"
            iconPosition="left"
            className="flex-1"
          >
            Clear Filters
          </Button>
          
          <Button
            variant="default"
            iconName="Navigation"
            iconPosition="left"
            className="flex-1"
          >
            Find Nearest
          </Button>
        </div>

        {/* Emergency Contacts */}
        <div className="p-2 bg-error/10 rounded-lg border border-error/20">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
            <h4 className="font-medium text-sm text-error">Emergency Contacts</h4>
          </div>
          <div className="space-y-0 text-xs">
            <p className="flex items-center justify-between">
              <span>Fire Department:</span>
              <a href="tel:101" className="text-error hover:underline font-medium">101</a>
            </p>
            <p className="flex items-center justify-between">
              <span>Police:</span>
              <a href="tel:100" className="text-error hover:underline font-medium">100</a>
            </p>
            <p className="flex items-center justify-between">
              <span>Medical Emergency:</span>
              <a href="tel:108" className="text-error hover:underline font-medium">108</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;