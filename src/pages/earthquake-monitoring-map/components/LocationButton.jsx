import React, { useState, useCallback } from "react";
import Icon from "../../../components/AppIcon";

const DEFAULT_LOCATION = { lat: 28.6139, lng: 77.209 }; // New Delhi fallback

const LocationButton = ({ onLocationFound }) => {
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle | success | error

  const handleLocationClick = useCallback(() => {
    if (isLocating) return;

    setIsLocating(true);
    setLocationStatus("idle");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setIsLocating(false);
          setLocationStatus("success");
          onLocationFound?.({ lat: latitude, lng: longitude });

          // Reset tooltip after short delay
          setTimeout(() => setLocationStatus("idle"), 2000);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLocating(false);
          setLocationStatus("error");

          // Fallback to default location
          onLocationFound?.(DEFAULT_LOCATION);
          setTimeout(() => setLocationStatus("idle"), 3000);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      setIsLocating(false);
      setLocationStatus("error");
      onLocationFound?.(DEFAULT_LOCATION);
      setTimeout(() => setLocationStatus("idle"), 3000);
    }
  }, [isLocating, onLocationFound]);

  const getButtonStyles = () => {
    switch (locationStatus) {
      case "success":
        return "bg-green-500 hover:bg-green-600 shadow-lg";
      case "error":
        return "bg-red-500 hover:bg-red-600 shadow-lg";
      default:
        return isLocating
          ? "bg-yellow-500 hover:bg-yellow-600 shadow"
          : "bg-blue-500 hover:bg-blue-600 shadow";
    }
  };

  const getIconName = () => {
    if (locationStatus === "success") return "CheckCircle";
    if (locationStatus === "error") return "AlertCircle";
    if (isLocating) return "Loader";
    return "MapPin";
  };

  const getTooltipText = () => {
    if (locationStatus === "success") return "Location found!";
    if (locationStatus === "error") return "Using default location";
    if (isLocating) return "Finding your location...";
    return "Find my location";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[700] flex flex-col items-end space-y-2">
      {/* Location Button */}
      <button
        onClick={handleLocationClick}
        disabled={isLocating}
        className={`
          flex items-center justify-center w-14 h-14 rounded-full text-white
          transition-all duration-200 ease-out
          hover:scale-105 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-blue-300/30
          disabled:cursor-not-allowed
          ${getButtonStyles()}
        `}
        aria-label={getTooltipText()}
        title={getTooltipText()}
      >
        <Icon
          name={getIconName()}
          size={24}
          color="white"
          strokeWidth={2}
          className={isLocating ? "animate-spin" : ""}
        />
      </button>

      {/* Tooltip */}
      {(locationStatus !== "idle" || isLocating) && (
        <div
          className={`
            relative px-3 py-2 rounded-lg text-sm font-medium
            whitespace-nowrap shadow-md animate-fade-in
            ${
              locationStatus === "success"
                ? "bg-green-500 text-white"
                : locationStatus === "error"
                ? "bg-red-500 text-white"
                : "bg-yellow-500 text-white"
            }
          `}
          aria-live="polite"
        >
          {getTooltipText()}
          <span
            className={`
              absolute -bottom-2 right-4 w-0 h-0
              border-l-4 border-r-4 border-t-4
              border-l-transparent border-r-transparent
              ${
                locationStatus === "success"
                  ? "border-t-green-500"
                  : locationStatus === "error"
                  ? "border-t-red-500"
                  : "border-t-yellow-500"
              }
            `}
          />
        </div>
      )}
    </div>
  );
};

export default LocationButton;
