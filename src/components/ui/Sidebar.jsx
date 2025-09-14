import React, { useState } from 'react';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);

  // Mock earthquake data - in real app this would come from props or API
  const earthquakes = [
    {
      id: 1,
      magnitude: 6.2,
      location: 'Northern California',
      depth: '12 km',
      time: '2 hours ago',
      distance: '45 km NW',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      id: 2,
      magnitude: 4.8,
      location: 'Central Valley',
      depth: '8 km',
      time: '4 hours ago',
      distance: '78 km SE',
      coordinates: { lat: 36.7783, lng: -119.4179 }
    },
    {
      id: 3,
      magnitude: 5.1,
      location: 'San Francisco Bay Area',
      depth: '15 km',
      time: '6 hours ago',
      distance: '23 km W',
      coordinates: { lat: 37.8044, lng: -122.2711 }
    },
    {
      id: 4,
      magnitude: 3.9,
      location: 'Los Angeles Basin',
      depth: '5 km',
      time: '8 hours ago',
      distance: '156 km S',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: 5,
      magnitude: 4.3,
      location: 'Mojave Desert',
      depth: '22 km',
      time: '12 hours ago',
      distance: '203 km NE',
      coordinates: { lat: 35.0178, lng: -117.3272 }
    }
  ];

  const getMagnitudeColor = (magnitude) => {
    if (magnitude >= 6.0) return 'text-error';
    if (magnitude >= 5.0) return 'text-warning';
    if (magnitude >= 4.0) return 'text-accent';
    return 'text-success';
  };

  const getMagnitudeBg = (magnitude) => {
    if (magnitude >= 6.0) return 'bg-error/10 border-error/20';
    if (magnitude >= 5.0) return 'bg-warning/10 border-warning/20';
    if (magnitude >= 4.0) return 'bg-accent/10 border-accent/20';
    return 'bg-success/10 border-success/20';
  };

  const getShadowIntensity = (magnitude) => {
    if (magnitude >= 6.0) return 'shadow-warm-lg';
    if (magnitude >= 5.0) return 'shadow-warm';
    return 'shadow-warm-sm';
  };

  const handleEarthquakeClick = (earthquake) => {
    setSelectedEarthquake(earthquake?.id === selectedEarthquake ? null : earthquake?.id);
    // In real app, this would trigger map recentering
    console.log('Recenter map to:', earthquake?.coordinates);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-[400] lg:hidden"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 z-[500] w-80 bg-card border-r border-border
        transform transition-transform duration-300 ease-out
        ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0
        ${isCollapsed ? 'lg:-translate-x-full' : ''}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="List" size={20} color="var(--color-primary)" strokeWidth={2} />
              <h2 className="font-heading font-semibold text-lg text-foreground">
                Recent Earthquakes
              </h2>
            </div>
            <button
              onClick={onToggle}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors duration-150"
            >
              <Icon name="X" size={18} color="var(--color-muted-foreground)" strokeWidth={2} />
            </button>
          </div>

          {/* Filter Controls */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-2 text-sm">
              <Icon name="Filter" size={16} color="var(--color-muted-foreground)" strokeWidth={2} />
              <span className="font-body text-muted-foreground">Last 24 hours</span>
              <span className="font-data text-primary font-medium">
                {earthquakes?.length} events
              </span>
            </div>
          </div>

          {/* Earthquake List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-2">
              {earthquakes?.map((earthquake) => (
                <div
                  key={earthquake?.id}
                  onClick={() => handleEarthquakeClick(earthquake)}
                  className={`
                    relative p-4 rounded-lg border cursor-pointer transition-all duration-200
                    hover:scale-[1.02] active:scale-[0.98]
                    ${getMagnitudeBg(earthquake?.magnitude)}
                    ${getShadowIntensity(earthquake?.magnitude)}
                    ${selectedEarthquake === earthquake?.id ? 'ring-2 ring-primary ring-offset-2' : ''}
                  `}
                >
                  {/* Magnitude Badge */}
                  <div className="flex items-start justify-between mb-2">
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-full font-data font-bold text-lg
                      ${getMagnitudeColor(earthquake?.magnitude)}
                      ${getMagnitudeBg(earthquake?.magnitude)}
                    `}>
                      {earthquake?.magnitude}
                    </div>
                    <div className="text-right">
                      <div className="font-caption text-xs text-muted-foreground">
                        {earthquake?.time}
                      </div>
                      <div className="font-caption text-xs text-muted-foreground">
                        {earthquake?.distance}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <h3 className="font-body font-semibold text-foreground mb-1">
                    {earthquake?.location}
                  </h3>

                  {/* Details */}
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="ArrowDown" size={14} color="var(--color-muted-foreground)" strokeWidth={2} />
                      <span className="font-data text-muted-foreground">
                        {earthquake?.depth}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" strokeWidth={2} />
                      <span className="font-data text-muted-foreground text-xs">
                        {earthquake?.coordinates?.lat?.toFixed(3)}, {earthquake?.coordinates?.lng?.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedEarthquake === earthquake?.id && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="RefreshCw" size={16} color="var(--color-success)" strokeWidth={2} />
                <span className="font-caption text-success">Live updates</span>
              </div>
              <span className="font-data text-muted-foreground text-xs">
                Updated 30s ago
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;