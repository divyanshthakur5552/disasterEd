import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  alertCounts 
}) => {
  const disasterTypeOptions = [
    { value: 'all', label: 'All Disasters' },
    { value: 'fire', label: 'Fire' },
    { value: 'flood', label: 'Flood' },
    { value: 'earthquake', label: 'Earthquake' },
    { value: 'cyclone', label: 'Cyclone' },
    { value: 'landslide', label: 'Landslide' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const timeFrameOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last_hour', label: 'Last Hour' },
    { value: 'last_6_hours', label: 'Last 6 Hours' },
    { value: 'last_24_hours', label: 'Last 24 Hours' },
    { value: 'last_week', label: 'Last Week' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(value => value !== 'all');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h2 className="font-heading font-semibold text-lg text-foreground">Filter Alerts</h2>
        </div>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear All
          </Button>
        )}
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Disaster Type"
          options={disasterTypeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
          className="w-full"
        />
        
        <Select
          label="Severity Level"
          options={severityOptions}
          value={filters?.severity}
          onChange={(value) => onFilterChange('severity', value)}
          className="w-full"
        />
        
        <Select
          label="Time Frame"
          options={timeFrameOptions}
          value={filters?.timeFrame}
          onChange={(value) => onFilterChange('timeFrame', value)}
          className="w-full"
        />
        
        <Select
          label="Location"
          options={locationOptions}
          value={filters?.location}
          onChange={(value) => onFilterChange('location', value)}
          className="w-full"
        />
      </div>
      {/* Alert Counts Summary */}
      <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="AlertTriangle" size={16} color="var(--color-muted-foreground)" />
          <span className="text-muted-foreground">Total Alerts:</span>
          <span className="font-medium text-foreground">{alertCounts?.total}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <span className="text-muted-foreground">Critical:</span>
          <span className="font-medium text-foreground">{alertCounts?.critical}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-muted-foreground">High:</span>
          <span className="font-medium text-foreground">{alertCounts?.high}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span className="text-muted-foreground">Medium:</span>
          <span className="font-medium text-foreground">{alertCounts?.medium}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-muted-foreground">Low:</span>
          <span className="font-medium text-foreground">{alertCounts?.low}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;