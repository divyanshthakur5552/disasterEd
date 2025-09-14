import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencySection = ({ emergencyResources, onCall }) => {
  return (
    <div className="bg-gradient-to-r from-error/10 to-warning/10 border border-error/20 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-error/20 rounded-lg">
          <Icon name="AlertTriangle" size={24} color="var(--color-error)" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Emergency Mental Health Resources</h2>
          <p className="text-sm text-muted-foreground">Immediate crisis intervention and support services</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyResources?.map((resource) => (
          <div key={resource?.id} className="bg-card border border-border rounded-lg p-4 shadow-elevation-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-semibold text-foreground">{resource?.name}</h3>
              <span className="px-2 py-1 bg-error text-error-foreground rounded-full text-xs font-medium">
                24/7
              </span>
            </div>
            
            <p className="text-sm text-text-secondary mb-3">{resource?.description}</p>
            
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm font-medium text-foreground">{resource?.contact}</span>
            </div>

            <Button
              variant="default"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => onCall(resource?.contact)}
              fullWidth
            >
              Call Emergency Line
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-warning)" className="mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Crisis Support Available</p>
            <p className="text-xs text-muted-foreground mt-1">
              If you or someone you know is in immediate danger, please call emergency services at 112 or visit the nearest hospital.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySection;