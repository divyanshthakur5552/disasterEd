import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyReminder = ({ className = "" }) => {
  const safetyTips = [
    {
      icon: "MapPin",
      title: "Know Your Location",
      description: "Always be aware of your current location and nearest exits"
    },
    {
      icon: "Users",
      title: "Stay Connected",
      description: "Keep emergency contacts updated and devices charged"
    },
    {
      icon: "AlertCircle",
      title: "Follow Alerts",
      description: "Pay attention to emergency notifications and instructions"
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Heart" size={18} className="text-success" />
        <h3 className="text-sm font-semibold text-foreground">Safety First</h3>
      </div>
      <div className="space-y-3">
        {safetyTips?.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={tip?.icon} size={12} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-medium text-foreground mb-1">{tip?.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{tip?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Shield" size={14} className="text-success" />
          <p className="text-xs text-muted-foreground">
            Your safety is our priority
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyReminder;