import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EmergencyPanel = ({ isVisible, onToggle }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const emergencyContacts = [
    {
      id: 1,
      name: "National Emergency",
      number: "112",
      description: "Primary emergency number for all services",
      type: "primary",
      available: true
    },
    {
      id: 2,
      name: "Disaster Management",
      number: "1078",
      description: "National Disaster Management Authority",
      type: "disaster",
      available: true
    },
    {
      id: 3,
      name: "Fire Department",
      number: "101",
      description: "Fire and rescue services",
      type: "fire",
      available: true
    },
    {
      id: 4,
      name: "Police",
      number: "100",
      description: "Local police emergency",
      type: "police",
      available: true
    },
    {
      id: 5,
      name: "Medical Emergency",
      number: "108",
      description: "Ambulance and medical services",
      type: "medical",
      available: true
    }
  ];

  const safetyTips = [
    {
      id: 1,
      icon: "Shield",
      title: "Drop, Cover, Hold",
      description: "Drop to hands and knees, take cover under a sturdy desk, hold on until shaking stops"
    },
    {
      id: 2,
      icon: "Home",
      title: "Stay Indoors",
      description: "If inside, stay inside. Don't run outside during shaking as most injuries occur from falling debris"
    },
    {
      id: 3,
      icon: "Car",
      title: "If Driving",
      description: "Pull over safely, avoid bridges and overpasses, stay in vehicle until shaking stops"
    },
    {
      id: 4,
      icon: "Mountain",
      title: "If Outdoors",
      description: "Move away from buildings, trees, and power lines. Get to an open area"
    }
  ];

  const getContactIcon = (type) => {
    switch (type) {
      case 'primary': return 'Phone';
      case 'disaster': return 'AlertTriangle';
      case 'fire': return 'Flame';
      case 'police': return 'Shield';
      case 'medical': return 'Heart';
      default: return 'Phone';
    }
  };

  const getContactColor = (type) => {
    switch (type) {
      case 'primary': return 'var(--color-primary)';
      case 'disaster': return 'var(--color-warning)';
      case 'fire': return 'var(--color-error)';
      case 'police': return 'var(--color-secondary)';
      case 'medical': return 'var(--color-success)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const handleCall = (number) => {
    // In a real app, this would initiate a phone call
    console.log(`Calling ${number}`);
    alert(`Emergency call to ${number} would be initiated in a real application.`);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[600] flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-warm-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-error/5">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-error rounded-lg">
              <Icon name="AlertTriangle" size={24} color="white" strokeWidth={2} />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-foreground">
                Emergency Information
              </h2>
              <p className="font-body text-sm text-muted-foreground">
                Quick access to emergency contacts and safety guidelines
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors duration-150"
          >
            <Icon name="X" size={20} color="var(--color-muted-foreground)" strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Emergency Contacts */}
          <div className="p-6 border-b border-border">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Emergency Contacts
            </h3>
            <div className="grid gap-3">
              {emergencyContacts?.map((contact) => (
                <div
                  key={contact?.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:shadow-warm transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-card border border-border">
                      <Icon 
                        name={getContactIcon(contact?.type)} 
                        size={20} 
                        color={getContactColor(contact?.type)} 
                        strokeWidth={2} 
                      />
                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-foreground">
                        {contact?.name}
                      </h4>
                      <p className="font-caption text-sm text-muted-foreground">
                        {contact?.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(contact?.number)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150 font-body font-medium"
                  >
                    <Icon name="Phone" size={16} color="white" strokeWidth={2} />
                    <span>{contact?.number}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div className="p-6">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              Earthquake Safety Tips
            </h3>
            <div className="grid gap-4">
              {safetyTips?.map((tip) => (
                <div
                  key={tip?.id}
                  className="flex items-start space-x-3 p-4 bg-success/5 rounded-lg border border-success/20"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-lg flex-shrink-0">
                    <Icon name={tip?.icon} size={16} color="var(--color-success)" strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-foreground mb-1">
                      {tip?.title}
                    </h4>
                    <p className="font-caption text-sm text-muted-foreground">
                      {tip?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="p-6 border-t border-border bg-muted/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-body font-semibold text-foreground">
                  Need More Help?
                </h4>
                <p className="font-caption text-sm text-muted-foreground">
                  Visit the National Disaster Management Authority website
                </p>
              </div>
              <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-150 font-body font-medium">
                Visit NDMA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPanel;