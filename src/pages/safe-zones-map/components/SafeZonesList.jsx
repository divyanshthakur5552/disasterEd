import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SafeZonesList = ({ safeZones, onZoneSelect, selectedZone, userLocation }) => {
  const [sortBy, setSortBy] = useState('proximity');

  const calculateDistance = (zone) => {
    if (!userLocation) return 0;
    // Simple distance calculation (in reality, would use proper geolocation)
    const lat1 = userLocation?.lat;
    const lon1 = userLocation?.lng;
    const lat2 = zone?.coordinates?.lat;
    const lon2 = zone?.coordinates?.lng;
    
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const sortedZones = [...safeZones]?.sort((a, b) => {
    switch (sortBy) {
      case 'proximity':
        return calculateDistance(a) - calculateDistance(b);
      case 'capacity':
        return b?.capacity - a?.capacity;
      case 'availability':
        return (b?.capacity - b?.currentOccupancy) - (a?.capacity - a?.currentOccupancy);
      case 'alphabetical':
        return a?.name?.localeCompare(b?.name);
      default:
        return 0;
    }
  });

  const getStatusColor = (zone) => {
    if (zone?.status === 'full') return 'text-error';
    if (zone?.capacity - zone?.currentOccupancy < 50) return 'text-warning';
    return 'text-success';
  };

  const getStatusText = (zone) => {
    if (zone?.status === 'full') return 'Full';
    if (zone?.capacity - zone?.currentOccupancy < 50) return 'Nearly Full';
    return 'Available';
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-4 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-lg">Safe Zones</h3>
          <span className="text-sm text-muted-foreground">
            {safeZones?.length} locations
          </span>
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'proximity', label: 'Nearest', icon: 'Navigation' },
            { value: 'capacity', label: 'Capacity', icon: 'Users' },
            { value: 'availability', label: 'Available', icon: 'CheckCircle' },
            { value: 'alphabetical', label: 'A-Z', icon: 'ArrowUpDown' },
          ]?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setSortBy(option?.value)}
              className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                sortBy === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={option?.icon} size={14} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Safe Zones List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {sortedZones?.map((zone) => (
            <div
              key={zone?.id}
              onClick={() => onZoneSelect(zone)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-150 hover:shadow-elevation-2 ${
                selectedZone?.id === zone?.id
                  ? 'border-primary bg-primary/5 shadow-elevation-2'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {/* Zone Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{zone?.name}</h4>
                  <p className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{zone?.address}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <span className={`text-xs font-medium ${getStatusColor(zone)}`}>
                    {getStatusText(zone)}
                  </span>
                  {userLocation && (
                    <span className="text-xs text-muted-foreground">
                      {calculateDistance(zone)?.toFixed(1)} km
                    </span>
                  )}
                </div>
              </div>

              {/* Zone Details */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">
                    {zone?.currentOccupancy}/{zone?.capacity}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} color="var(--color-muted-foreground)" />
                  <span className="text-xs text-muted-foreground">
                    {zone?.contact}
                  </span>
                </div>
              </div>

              {/* Facilities */}
              <div className="flex flex-wrap gap-1 mb-3">
                {zone?.facilities?.slice(0, 4)?.map((facility, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-muted text-xs rounded-md"
                  >
                    {facility}
                  </span>
                ))}
                {zone?.facilities?.length > 4 && (
                  <span className="px-2 py-1 bg-muted text-xs rounded-md">
                    +{zone?.facilities?.length - 4} more
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Navigation"
                  iconPosition="left"
                  className="flex-1 text-xs"
                >
                  Directions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                  className="flex-1 text-xs"
                >
                  Call
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafeZonesList;