import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onCall, onShare }) => {
  const getPriorityBadge = (priority) => {
    const badges = {
      emergency: { color: 'bg-error text-error-foreground', label: 'Emergency' },
      high: { color: 'bg-warning text-warning-foreground', label: 'High Priority' },
      normal: { color: 'bg-accent text-accent-foreground', label: 'Available' }
    };
    return badges?.[priority] || badges?.normal;
  };

  const badge = getPriorityBadge(resource?.priority);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${resource?.category === 'mental-health' ? 'bg-accent/10' : 
            resource?.category === 'relief-camps' ? 'bg-success/10' : 
            resource?.category === 'donations' ? 'bg-warning/10' : 'bg-primary/10'}`}>
            <Icon 
              name={resource?.icon} 
              size={24} 
              color={resource?.category === 'mental-health' ? 'var(--color-accent)' : 
                resource?.category === 'relief-camps' ? 'var(--color-success)' : 
                resource?.category === 'donations' ? 'var(--color-warning)' : 'var(--color-primary)'} 
            />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-foreground">{resource?.name}</h3>
            <p className="text-sm text-muted-foreground">{resource?.type}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge?.color}`}>
          {badge?.label}
        </span>
      </div>
      <p className="text-sm text-text-secondary mb-4 line-clamp-3">{resource?.description}</p>
      <div className="space-y-3 mb-4">
        {resource?.contact && (
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{resource?.contact}</span>
          </div>
        )}
        
        {resource?.email && (
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{resource?.email}</span>
          </div>
        )}

        {resource?.location && (
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{resource?.location}</span>
          </div>
        )}

        {resource?.hours && (
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{resource?.hours}</span>
          </div>
        )}

        {resource?.eligibility && (
          <div className="flex items-start space-x-2">
            <Icon name="Users" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
            <span className="text-sm text-foreground">{resource?.eligibility}</span>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 pt-4 border-t border-border">
        {resource?.contact && (
          <Button
            variant="default"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            onClick={() => onCall(resource?.contact)}
            className="flex-1"
          >
            Call Now
          </Button>
        )}
        
        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          onClick={() => onShare(resource)}
        >
          Share
        </Button>

        {resource?.website && (
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            onClick={() => window.open(resource?.website, '_blank')}
          >
            Visit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;