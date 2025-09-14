import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MapContainer = ({ safeZones, selectedZone, onZoneSelect, userLocation, mapView, onMapViewChange }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // University College center
  const [zoomLevel, setZoomLevel] = useState(16); // Higher zoom for campus view

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 8));
  };

  const handleLocateUser = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      setZoomLevel(15);
    }
  };

  const getMarkerColor = (zone) => {
    if (zone?.status === 'full') return '#DC2626'; // red-600
    if (zone?.capacity - zone?.currentOccupancy < 50) return '#D97706'; // amber-600
    return '#059669'; // emerald-600
  };

  const getBuildingTypeIcon = (buildingType) => {
    const typeIcons = {
      academic: 'BookOpen',
      medical: 'Heart',
      residential: 'Home',
      recreational: 'Trophy',
      administrative: 'Building'
    };
    return typeIcons?.[buildingType] || 'MapPin';
  };

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        {/* View Toggle */}
        <div className="bg-card rounded-lg shadow-elevation-4 p-1">
          <div className="flex space-x-1">
            {['street', 'satellite', 'campus']?.map((view) => (
              <button
                key={view}
                onClick={() => onMapViewChange(view)}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-150 ${
                  mapView === view
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {view === 'street' && 'Street'}
                {view === 'satellite' && 'Satellite'}
                {view === 'campus' && 'Campus'}
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="bg-card rounded-lg shadow-elevation-4 flex flex-col">
          <button
            onClick={handleZoomIn}
            className="p-3 hover:bg-muted transition-colors duration-150 border-b border-border"
            aria-label="Zoom in"
          >
            <Icon name="Plus" size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-3 hover:bg-muted transition-colors duration-150"
            aria-label="Zoom out"
          >
            <Icon name="Minus" size={18} />
          </button>
        </div>

        {/* Locate User */}
        <button
          onClick={handleLocateUser}
          className="bg-card p-3 rounded-lg shadow-elevation-4 hover:bg-muted transition-colors duration-150"
          aria-label="Locate me"
        >
          <Icon name="Navigation" size={18} />
        </button>
      </div>
      
      {/* Campus Map Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-card rounded-lg shadow-elevation-4 p-4">
        <h4 className="font-medium text-sm mb-3">Campus Safe Zones</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Nearly Full</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Full</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Your Location</span>
          </div>
        </div>
        
        {/* Building Types Legend */}
        <div className="mt-4 pt-3 border-t border-border">
          <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wide mb-2">Building Types</h5>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="flex items-center space-x-1">
              <Icon name="BookOpen" size={12} />
              <span>Academic</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={12} />
              <span>Medical</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Home" size={12} />
              <span>Residential</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Trophy" size={12} />
              <span>Sports</span>
            </div>
          </div>
        </div>
      </div>

      {/* College Campus Map Background */}
      <div className="absolute inset-0 bg-green-50">
        {/* Campus Layout Illustration */}
        <div className="w-full h-full relative overflow-hidden">
          {/* Campus Roads */}
          <div className="absolute inset-0">
            {/* Main campus road */}
            <div className="absolute top-1/2 left-0 right-0 h-8 bg-gray-300 transform -translate-y-1/2"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-6 bg-gray-300 transform -translate-x-1/2"></div>
          </div>
          
          {/* Campus Areas */}
          <div className="absolute top-4 left-4 w-32 h-24 bg-blue-100 rounded-lg border-2 border-blue-300 flex items-center justify-center">
            <div className="text-center">
              <Icon name="BookOpen" size={24} className="mx-auto mb-1 text-blue-600" />
              <span className="text-xs font-medium text-blue-800">Academic Block</span>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 w-32 h-24 bg-green-100 rounded-lg border-2 border-green-300 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Home" size={24} className="mx-auto mb-1 text-green-600" />
              <span className="text-xs font-medium text-green-800">Hostel Area</span>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-4 w-32 h-24 bg-red-100 rounded-lg border-2 border-red-300 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Heart" size={24} className="mx-auto mb-1 text-red-600" />
              <span className="text-xs font-medium text-red-800">Health Center</span>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 w-32 h-24 bg-purple-100 rounded-lg border-2 border-purple-300 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Trophy" size={24} className="mx-auto mb-1 text-purple-600" />
              <span className="text-xs font-medium text-purple-800">Sports Complex</span>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-32 bg-orange-100 rounded-lg border-2 border-orange-300 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Building" size={32} className="mx-auto mb-2 text-orange-600" />
              <span className="text-sm font-semibold text-orange-800">Student Union</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Markers (Enhanced for Campus) */}
      <div className="absolute inset-0 pointer-events-none">
        {safeZones?.map((zone, index) => (
          <div
            key={zone?.id}
            className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${15 + (index % 3) * 25}%`,
              top: `${25 + Math.floor(index / 3) * 20}%`,
            }}
            onClick={() => onZoneSelect(zone)}
          >
            <div
              className={`w-8 h-8 rounded-full border-3 border-white shadow-elevation-4 flex items-center justify-center ${
                selectedZone?.id === zone?.id ? 'ring-2 ring-primary' : ''
              }`}
              style={{ backgroundColor: getMarkerColor(zone) }}
            >
              <Icon 
                name={getBuildingTypeIcon(zone?.buildingType)} 
                size={16} 
                color="white"
              />
            </div>
            {selectedZone?.id === zone?.id && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-card rounded-lg shadow-elevation-8 p-4 min-w-80 z-20 border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={getBuildingTypeIcon(zone?.buildingType)} size={18} className="text-primary" />
                    <h4 className="font-semibold text-sm">{zone?.name}</h4>
                  </div>
                  <button
                    onClick={(e) => {
                      e?.stopPropagation();
                      onZoneSelect(null);
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} />
                    <span>{zone?.address}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Icon name="Users" size={14} />
                    <span>{zone?.currentOccupancy}/{zone?.capacity} people</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      zone?.status === 'available' ? 'bg-emerald-100 text-emerald-800' :
                      zone?.status === 'nearly_full'? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {zone?.status?.replace('_', ' ')}
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Icon name="Phone" size={14} />
                    <span>{zone?.contact}</span>
                  </p>
                  <p className="text-xs text-foreground mt-2">{zone?.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {zone?.facilities?.map((facility, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted rounded-full text-xs font-medium">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* User Location Marker */}
        {userLocation && (
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '50%', top: '60%' }}
          >
            <div className="w-5 h-5 bg-blue-600 rounded-full border-3 border-white shadow-elevation-4 animate-pulse flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapContainer;