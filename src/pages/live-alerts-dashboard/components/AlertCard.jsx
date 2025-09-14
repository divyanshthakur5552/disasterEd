import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alert, onExpand }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getDisasterIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'fire':
        return 'Flame';
      case 'flood':
        return 'Waves';
      case 'earthquake':
        return 'Zap';
      case 'cyclone':
        return 'Wind';
      case 'landslide':
        return 'Mountain';
      default:
        return 'AlertTriangle';
    }
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onExpand) {
      onExpand(alert?.id, !isExpanded);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${alert?.severity?.toLowerCase() === 'critical' || alert?.severity?.toLowerCase() === 'high' ? 'bg-red-100' : 'bg-amber-100'}`}>
              <Icon 
                name={getDisasterIcon(alert?.type)} 
                size={24} 
                color={alert?.severity?.toLowerCase() === 'critical' || alert?.severity?.toLowerCase() === 'high' ? '#DC2626' : '#D97706'} 
              />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground">{alert?.title}</h3>
              <p className="text-sm text-muted-foreground">{alert?.type} • {alert?.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert?.severity)}`}>
              {alert?.severity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleExpand}
              className="h-8 w-8"
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </Button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-3">
          <p className="text-foreground">{alert?.description}</p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{formatTime(alert?.timestamp)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span>{alert?.affectedRadius} km radius</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} />
              <span>{alert?.affectedPopulation?.toLocaleString('en-IN')} affected</span>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-border space-y-4">
            {/* Safety Instructions */}
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Safety Instructions</span>
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {alert?.safetyInstructions?.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={14} className="mt-0.5 flex-shrink-0" color="var(--color-success)" />
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Affected Areas */}
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Map" size={16} />
                <span>Affected Areas</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {alert?.affectedAreas?.map((area, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                <Icon name="Phone" size={16} />
                <span>Emergency Contacts</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {alert?.emergencyContacts?.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium text-sm text-foreground">{contact?.service}</p>
                      <p className="text-xs text-muted-foreground">{contact?.number}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      <Icon name="Phone" size={14} className="mr-1" />
                      Call
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="default" size="sm">
                <Icon name="MapPin" size={14} className="mr-2" />
                View Safe Zones
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Share" size={14} className="mr-2" />
                Share Alert
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="BookOpen" size={14} className="mr-2" />
                Safety Guide
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertCard;