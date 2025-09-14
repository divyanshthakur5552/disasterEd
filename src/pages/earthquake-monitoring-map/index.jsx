import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import EarthquakeMap from "./components/EarthquakeMap";
import EarthquakeListSidebar from "./components/EarthquakeListSidebar";
import LocationButton from "./components/LocationButton";
import DataRefreshButton from "./components/DataRefreshButton";
import EmergencyPanel from "./components/EmergencyPanel";
import Icon from "../../components/AppIcon";

// Haversine formula for distance (km)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1); // in km
};

// Fetch & transform earthquake data
const fetchEarthquakes = async (userLocation = null) => {
  const res = await fetch(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
  );
  const data = await res.json();

  return data.features.map((eq, index) => {
    const lat = eq.geometry.coordinates[1];
    const lng = eq.geometry.coordinates[0];
    const depth = eq.geometry.coordinates[2];

    return {
      id: eq.id || index,
      magnitude: eq.properties.mag,
      location: eq.properties.place,
      depth: depth + " km",
      distance: userLocation
        ? calculateDistance(userLocation.lat, userLocation.lng, lat, lng) +
          " km"
        : "",
      coordinates: { lat, lng },
      timestamp: new Date(eq.properties.time),
      intensity:
        eq.properties.mag >= 6
          ? "VI - Strong"
          : eq.properties.mag >= 5
          ? "V - Moderate"
          : eq.properties.mag >= 4
          ? "IV - Light"
          : "III - Weak",
    };
  });
};

const EarthquakeMonitoringMap = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEmergencyPanelOpen, setIsEmergencyPanelOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial load
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await fetchEarthquakes(userLocation);
        setEarthquakes(data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error fetching earthquake data:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [userLocation]);

  // Refresh handler
  const handleDataRefresh = async () => {
    try {
      setIsLoading(true);
      const data = await fetchEarthquakes(userLocation);
      setEarthquakes(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error refreshing data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationFound = (location) => setUserLocation(location);
  const handleEarthquakeSelect = (id) =>
    setSelectedEarthquake(selectedEarthquake === id ? null : id);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleEmergencyPanel = () =>
    setIsEmergencyPanelOpen(!isEmergencyPanelOpen);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        if (isEmergencyPanelOpen) setIsEmergencyPanelOpen(false);
        else if (selectedEarthquake) setSelectedEarthquake(null);
      }
      if (event.key === "s" && event.ctrlKey) {
        event.preventDefault();
        toggleSidebar();
      }
      if (event.key === "e" && event.ctrlKey) {
        event.preventDefault();
        toggleEmergencyPanel();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isEmergencyPanelOpen, selectedEarthquake]);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-[500] bg-card shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <div className="pt-20 h-screen flex">
        <EarthquakeListSidebar
          earthquakes={earthquakes}
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          selectedEarthquake={selectedEarthquake}
          onEarthquakeSelect={handleEarthquakeSelect}
        />

        <main
          className={`flex-1 transition-all duration-300 ease-out ${
            isSidebarOpen ? "lg:ml-80" : "ml-0"
          }`}
        >
          <div className="lg:hidden flex items-center justify-between p-4 bg-card border-b border-border">
            <button
              onClick={toggleSidebar}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150"
            >
              <Icon name="List" size={16} color="white" strokeWidth={2} />
              <span className="font-body font-medium">Earthquakes</span>
            </button>
            <button
              onClick={toggleEmergencyPanel}
              className="flex items-center space-x-2 px-3 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors duration-150"
            >
              <Icon
                name="AlertTriangle"
                size={16}
                color="white"
                strokeWidth={2}
              />
              <span className="font-body font-medium">Emergency</span>
            </button>
          </div>

          <div className="h-full relative">
            {isLoading ? (
              <div className="flex items-center justify-center h-full bg-muted">
                <div className="flex flex-col items-center space-y-4">
                  <Icon
                    name="Loader"
                    size={48}
                    color="var(--color-primary)"
                    strokeWidth={2}
                    className="animate-spin"
                  />
                  <div className="text-center">
                    <h2 className="font-heading font-semibold text-xl text-foreground mb-2">
                      Loading Earthquake Data
                    </h2>
                    <p className="font-body text-muted-foreground">
                      Fetching real-time seismic activity information...
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <EarthquakeMap
                earthquakes={earthquakes}
                userLocation={userLocation}
                selectedEarthquake={selectedEarthquake}
                onEarthquakeSelect={handleEarthquakeSelect}
              />
            )}
          </div>
        </main>
      </div>

      {/* Floating Buttons Bottom-Left */}
      {!isLoading && (
        <div className="fixed bottom-6 left-6 z-[600] flex flex-col space-y-3">
          <LocationButton onLocationFound={handleLocationFound} />
          <DataRefreshButton
            onRefresh={handleDataRefresh}
            lastUpdated={lastUpdated}
          />
        </div>
      )}

      {/* Desktop Emergency Button */}
      <div className="hidden lg:block fixed top-24 right-6 z-[600]">
        <button
          onClick={toggleEmergencyPanel}
          className="flex items-center space-x-2 px-4 py-2 bg-error text-white rounded-lg shadow-warm hover:shadow-warm-lg hover:bg-error/90 transition-all duration-200 hover:scale-105"
        >
          <Icon name="AlertTriangle" size={16} color="white" strokeWidth={2} />
          <span className="font-body font-medium">Emergency Info</span>
        </button>
      </div>

      {/* Emergency Panel */}
      <EmergencyPanel
        isVisible={isEmergencyPanelOpen}
        onToggle={toggleEmergencyPanel}
      />

      {/* Keyboard Shortcuts Info */}
      <div className="hidden lg:block fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[500]">
        <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-warm">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span className="font-caption">
              <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+S</kbd>{" "}
              Toggle Sidebar
            </span>
            <span className="font-caption">
              <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl+E</kbd>{" "}
              Emergency Info
            </span>
            <span className="font-caption">
              <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Esc</kbd>{" "}
              Close Panels
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthquakeMonitoringMap;
