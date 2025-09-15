import React from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyContact = ({ className = "" }) => {
  const emergencyNumber = "100";
  const campusSecurityNumber = "(555) 123-4567";

  const handleEmergencyCall = (number) => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className={`bg-destructive/10 border border-destructive/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Phone" size={18} className="text-destructive" />
        <h3 className="text-sm font-semibold text-destructive">Emergency Contacts</h3>
      </div>
      
      <div className="space-y-2">
        {/* Emergency Services */}
        <button
          onClick={() => handleEmergencyCall(emergencyNumber)}
          className="w-full flex items-center justify-between p-2 bg-card rounded-md hover:bg-muted transition-colors duration-200"
        >
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={14} className="text-destructive" />
            <span className="text-sm font-medium text-foreground">Emergency Services</span>
          </div>
          <span className="text-sm font-mono text-destructive">{emergencyNumber}</span>
        </button>

        {/* Campus Security */}
        <button
          onClick={() => handleEmergencyCall(campusSecurityNumber)}
          className="w-full flex items-center justify-between p-2 bg-card rounded-md hover:bg-muted transition-colors duration-200"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={14} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Campus Security</span>
          </div>
          <span className="text-sm font-mono text-primary">{campusSecurityNumber}</span>
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Available 24/7 for immediate assistance
        </p>
      </div>
    </div>
  );
};

export default EmergencyContact;
