// src/pages/earthquake-monitoring-map/components/EarthquakeMap.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "../../../components/AppIcon";

const EarthquakeMap = ({
  earthquakes,
  userLocation,
  selectedEarthquake,
  onEarthquakeSelect,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const userMarkerRef = useRef(null);

  const [mapCenter] = useState({ lat: 20, lng: 78 });
  const [mapZoom] = useState(5);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);

  // Date formatter
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [mapCenter.lat, mapCenter.lng],
        zoom: mapZoom,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
      setIsMapLoaded(true);
      setMapError(null);
    } catch (error) {
      console.error("Failed to initialize map:", error);
      setMapError("Failed to load map. Please refresh the page.");
      setIsMapLoaded(false);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [mapCenter, mapZoom]);

  // Marker helpers
  const getMarkerColor = (magnitude) => {
    if (magnitude >= 6.0) return "#dc2626"; // red
    if (magnitude >= 5.0) return "#ea580c"; // orange
    if (magnitude >= 4.0) return "#d97706"; // amber
    return "#16a34a"; // green
  };

  const createEarthquakeIcon = useMemo(
    () => (magnitude) => {
      const size = Math.max(20, Math.min(40, magnitude * 6));
      return L.divIcon({
        className: "earthquake-marker",
        html: `
          <div style="
            width:${size}px;height:${size}px;
            background-color:${getMarkerColor(magnitude)};
            border:2px solid #fff;border-radius:50%;
            display:flex;align-items:center;justify-content:center;
            font-weight:bold;color:white;
            font-size:${Math.max(10, size * 0.3)}px;
            box-shadow:0 2px 8px rgba(0,0,0,0.3);
          ">${magnitude}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    },
    []
  );

  const createUserIcon = () =>
    L.divIcon({
      className: "user-marker",
      html: `
        <div style="
          width:24px;height:24px;
          background-color:#3b82f6;
          border:3px solid #fff;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
        ">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          </svg>
        </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

  // Render earthquake markers
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapLoaded) return;

    markersRef.current.forEach((m) => mapInstanceRef.current.removeLayer(m));
    markersRef.current = [];

    earthquakes?.forEach((eq) => {
      const marker = L.marker([eq.coordinates.lat, eq.coordinates.lng], {
        icon: createEarthquakeIcon(eq.magnitude),
      });

      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold mb-2">Magnitude ${eq.magnitude}</h3>
          <p><strong>Location:</strong> ${eq.location}</p>
          <p><strong>Depth:</strong> ${eq.depth}</p>
          <p><strong>Distance:</strong> ${eq.distance}</p>
          <p><strong>Intensity:</strong> ${eq.intensity}</p>
          <p><strong>Time:</strong> ${formatDate(eq.timestamp)}</p>
        </div>
      `);

      marker.on("click", () => onEarthquakeSelect?.(eq.id));

      marker.addTo(mapInstanceRef.current);
      markersRef.current.push(marker);
    });
  }, [earthquakes, isMapLoaded, onEarthquakeSelect, createEarthquakeIcon]);

  // Render user marker
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapLoaded) return;

    if (userMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const marker = L.marker([userLocation.lat, userLocation.lng], {
        icon: createUserIcon(),
      });

      marker.bindPopup(`
        <div>
          <h3 class="font-bold mb-2">Your Location</h3>
          <p>Lat: ${userLocation.lat.toFixed(6)}</p>
          <p>Lng: ${userLocation.lng.toFixed(6)}</p>
        </div>
      `);

      marker.addTo(mapInstanceRef.current);
      userMarkerRef.current = marker;
    }
  }, [userLocation, isMapLoaded]);

  // Auto zoom to selected earthquake
  useEffect(() => {
    if (!mapInstanceRef.current || !isMapLoaded || !selectedEarthquake) return;

    const eq = earthquakes?.find((e) => e.id === selectedEarthquake);
    if (eq) {
      mapInstanceRef.current.setView(
        [eq.coordinates.lat, eq.coordinates.lng],
        10,
        { animate: true }
      );

      markersRef.current.forEach((m) => {
        const { lat, lng } = m.getLatLng();
        if (lat === eq.coordinates.lat && lng === eq.coordinates.lng) {
          m.openPopup();
        }
      });
    }
  }, [selectedEarthquake, earthquakes, isMapLoaded]);

  // Controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();
  const handleResetView = () =>
    mapInstanceRef.current?.setView([20, 78], 5, { animate: true });

  const handleFocusUser = () => {
    if (mapInstanceRef.current && userLocation) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 12, {
        animate: true,
      });

      if (userMarkerRef.current) {
        userMarkerRef.current.openPopup();
      }
    }
  };

  // Error fallback
  if (mapError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center">
          <Icon
            name="AlertTriangle"
            size={48}
            color="var(--color-error)"
            className="mx-auto mb-4"
          />
          <h3 className="font-semibold text-lg mb-2">Map Error</h3>
          <p className="text-muted-foreground mb-4">{mapError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden">
      {/* Loading overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="flex flex-col items-center space-y-3">
            <Icon
              name="Loader"
              size={32}
              color="var(--color-primary)"
              className="animate-spin"
            />
            <p className="text-muted-foreground">Loading interactive map…</p>
          </div>
        </div>
      )}

      {/* Map */}
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        style={{ minHeight: "400px" }}
      />

      {/* Controls */}
      {isMapLoaded && (
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-[1000]">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-card border border-border rounded-lg shadow hover:scale-105 transition flex items-center justify-center"
          >
            <Icon name="Plus" size={18} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-card border border-border rounded-lg shadow hover:scale-105 transition flex items-center justify-center"
          >
            <Icon name="Minus" size={18} />
          </button>
          <button
            onClick={handleResetView}
            className="w-10 h-10 bg-card border border-border rounded-lg shadow hover:scale-105 transition flex items-center justify-center"
          >
            <Icon name="Home" size={18} />
          </button>
          {userLocation && (
            <button
              onClick={handleFocusUser}
              className="w-10 h-10 bg-card border border-border rounded-lg shadow hover:scale-105 transition flex items-center justify-center"
            >
              <Icon name="LocateFixed" size={18} />
            </button>
          )}
        </div>
      )}

      {/* Legend */}
      {isMapLoaded && (
        <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-4 shadow text-xs space-y-2 z-[1000]">
          <h3 className="font-semibold text-sm mb-2">Magnitude Scale</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>3.0 – 3.9</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full" />
            <span>4.0 – 4.9</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span>5.0 – 5.9</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>6.0+</span>
          </div>
          {userLocation && (
            <div className="flex items-center space-x-2 pt-2 border-t border-border">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Your Location</span>
            </div>
          )}
        </div>
      )}

      {/* Status */}
      {isMapLoaded && (
        <div className="absolute top-4 left-4 bg-card border border-border rounded-lg px-3 py-2 shadow text-xs z-[1000]">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Interactive Map • {earthquakes?.length || 0} events</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarthquakeMap;
