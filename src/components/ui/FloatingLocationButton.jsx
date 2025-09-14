import React, { useState } from 'react';
import Icon from '../AppIcon';

const FloatingLocationButton = ({ onLocationFound }) => {
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, success, error

  const handleLocationClick = () => {
    if (isLocating) return;

    setIsLocating(true);
    setLocationStatus('idle');

    if ('geolocation' in navigator) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          setIsLocating(false);
          setLocationStatus('success');
          
          // Call parent callback with location data
          if (onLocationFound) {
            onLocationFound({ lat: latitude, lng: longitude });
          }

          // Reset status after animation
          setTimeout(() => setLocationStatus('idle'), 2000);
        },
        (error) => {
          setIsLocating(false);
          setLocationStatus('error');
          console.error('Geolocation error:', error);

          // Reset status after showing error
          setTimeout(() => setLocationStatus('idle'), 3000);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      setIsLocating(false);
      setLocationStatus('error');
      setTimeout(() => setLocationStatus('idle'), 3000);
    }
  };

  const getButtonStyles = () => {
    if (locationStatus === 'success') {
      return 'bg-success hover:bg-success/90 shadow-warm-lg animate-bounce-gentle';
    }
    if (locationStatus === 'error') {
      return 'bg-error hover:bg-error/90 shadow-warm-lg';
    }
    if (isLocating) {
      return 'bg-warning hover:bg-warning/90 shadow-warm';
    }
    return 'bg-primary hover:bg-primary/90 shadow-warm hover:shadow-warm-lg';
  };

  const getIconName = () => {
    if (locationStatus === 'success') return 'CheckCircle';
    if (locationStatus === 'error') return 'AlertCircle';
    if (isLocating) return 'Loader';
    return 'MapPin';
  };

  const getIconColor = () => {
    return 'white';
  };

  return (
    <div className="fixed bottom-6 right-6 z-[300]">
      <button
        onClick={handleLocationClick}
        disabled={isLocating}
        className={`
          flex items-center justify-center w-14 h-14 rounded-full text-white
          transition-all duration-200 ease-out
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-primary/30
          disabled:cursor-not-allowed
          ${getButtonStyles()}
        `}
        aria-label={
          isLocating ? 'Finding your location...' :
          locationStatus === 'success' ? 'Location found' :
          locationStatus === 'error'? 'Location error' : 'Find my location'
        }
      >
        <Icon 
          name={getIconName()} 
          size={24} 
          color={getIconColor()} 
          strokeWidth={2}
          className={isLocating ? 'animate-spin' : ''}
        />
      </button>

      {/* Status Tooltip */}
      {locationStatus !== 'idle' && (
        <div className={`
          absolute bottom-16 right-0 px-3 py-2 rounded-lg text-sm font-body font-medium
          whitespace-nowrap shadow-warm animate-fade-in
          ${locationStatus === 'success' ? 'bg-success text-white' : 
            locationStatus === 'error'? 'bg-error text-white' : 'bg-card text-foreground border border-border'}
        `}>
          {locationStatus === 'success' && 'Location found!'}
          {locationStatus === 'error' && 'Location unavailable'}
          
          {/* Tooltip Arrow */}
          <div className={`
            absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4
            border-l-transparent border-r-transparent
            ${locationStatus === 'success' ? 'border-t-success' : 
              locationStatus === 'error'? 'border-t-error' : 'border-t-card'}
          `} />
        </div>
      )}

      {/* Loading Indicator */}
      {isLocating && (
        <div className="absolute bottom-16 right-0 px-3 py-2 bg-warning text-white rounded-lg text-sm font-body font-medium whitespace-nowrap shadow-warm animate-fade-in">
          Finding your location...
          
          {/* Tooltip Arrow */}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-warning" />
        </div>
      )}
    </div>
  );
};

export default FloatingLocationButton;