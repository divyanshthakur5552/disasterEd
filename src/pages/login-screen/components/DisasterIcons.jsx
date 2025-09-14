import React from 'react';
import Icon from '../../../components/AppIcon';

const DisasterIcons = ({ className = "" }) => {
  const disasterTypes = [
    {
      icon: "Zap",
      name: "Earthquake",
      color: "text-amber-600"
    },
    {
      icon: "Flame",
      name: "Fire",
      color: "text-red-600"
    },
    {
      icon: "CloudRain",
      name: "Flood",
      color: "text-blue-600"
    },
    {
      icon: "Wind",
      name: "Storm",
      color: "text-slate-600"
    },
    {
      icon: "Mountain",
      name: "Landslide",
      color: "text-amber-700"
    },
    {
      icon: "Snowflake",
      name: "Blizzard",
      color: "text-cyan-600"
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Learn About Disaster Preparedness
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {disasterTypes?.map((disaster, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-3 bg-card border border-border rounded-lg hover:shadow-card transition-all duration-200 cursor-pointer group"
          >
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200`}>
              <Icon 
                name={disaster?.icon} 
                size={16} 
                className={disaster?.color}
              />
            </div>
            <span className="text-xs font-medium text-foreground text-center">
              {disaster?.name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Access comprehensive safety guides after login
        </p>
      </div>
    </div>
  );
};

export default DisasterIcons;