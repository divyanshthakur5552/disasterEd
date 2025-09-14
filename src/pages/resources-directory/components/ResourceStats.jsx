import React from 'react';
import Icon from '../../../components/AppIcon';

const ResourceStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Resources',
      value: stats?.totalResources,
      icon: 'Database',
      color: 'text-primary'
    },
    {
      label: 'Emergency Services',
      value: stats?.emergencyServices,
      icon: 'AlertTriangle',
      color: 'text-error'
    },
    {
      label: 'Relief Camps',
      value: stats?.reliefCamps,
      icon: 'Home',
      color: 'text-success'
    },
    {
      label: 'Mental Health Support',
      value: stats?.mentalHealthServices,
      icon: 'Heart',
      color: 'text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 text-center shadow-elevation-2">
          <div className="flex items-center justify-center mb-2">
            <div className="p-2 bg-muted/50 rounded-lg">
              <Icon name={stat?.icon} size={24} color={`var(--color-${stat?.color?.replace('text-', '')})`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">{stat?.value}</p>
          <p className="text-sm text-muted-foreground">{stat?.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ResourceStats;