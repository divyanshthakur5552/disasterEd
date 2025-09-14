import React, { useState } from "react";
import Icon from "../../../components/AppIcon";

const EarthquakeListSidebar = ({
  earthquakes,
  isOpen,
  onToggle,
  selectedEarthquake,
  onEarthquakeSelect,
}) => {
  const [sortBy, setSortBy] = useState("time"); // time, magnitude, distance

  const getMagnitudeColor = (magnitude) => {
    if (magnitude >= 6.0) return "text-error";
    if (magnitude >= 5.0) return "text-warning";
    if (magnitude >= 4.0) return "text-accent";
    return "text-success";
  };

  const getMagnitudeBg = (magnitude) => {
    if (magnitude >= 6.0) return "bg-error/10 border-error/20";
    if (magnitude >= 5.0) return "bg-warning/10 border-warning/20";
    if (magnitude >= 4.0) return "bg-accent/10 border-accent/20";
    return "bg-success/10 border-success/20";
  };

  const getShadowIntensity = (magnitude) => {
    if (magnitude >= 6.0) return "shadow-warm-lg";
    if (magnitude >= 5.0) return "shadow-warm";
    return "shadow-warm-sm";
  };

  const sortedEarthquakes = [...earthquakes]?.sort((a, b) => {
    switch (sortBy) {
      case "magnitude":
        return b?.magnitude - a?.magnitude;
      case "distance":
        return parseFloat(a?.distance) - parseFloat(b?.distance);
      case "time":
      default:
        return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffMs = now - eventTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[400] lg:hidden"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`
        fixed top-16 left-0 bottom-0 z-[400] w-80 bg-card border-r border-border
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        ${!isOpen ? "lg:-translate-x-full" : ""}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon
                name="List"
                size={20}
                color="var(--color-primary)"
                strokeWidth={2}
              />
              <h2 className="font-heading font-semibold text-lg text-foreground">
                Recent Earthquakes
              </h2>
            </div>
            <button
              onClick={onToggle}
              className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors duration-150 lg:hidden"
            >
              <Icon
                name="X"
                size={18}
                color="var(--color-muted-foreground)"
                strokeWidth={2}
              />
            </button>
          </div>

          {/* Filter Controls */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 text-sm">
                <Icon
                  name="Filter"
                  size={16}
                  color="var(--color-muted-foreground)"
                  strokeWidth={2}
                />
                <span className="font-body text-muted-foreground">
                  Last 24 hours
                </span>
              </div>
              <span className="font-data text-primary font-medium text-sm">
                {earthquakes?.length} events
              </span>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="font-caption text-xs text-muted-foreground">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="font-caption text-xs bg-muted border border-border rounded px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="time">Time</option>
                <option value="magnitude">Magnitude</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>

          {/* Earthquake List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-2">
              {sortedEarthquakes?.map((earthquake) => (
                <div
                  key={earthquake?.id}
                  onClick={() => onEarthquakeSelect(earthquake?.id)}
                  className={`
                    relative p-4 rounded-lg border cursor-pointer transition-all duration-200
                    hover:scale-[1.02] active:scale-[0.98]
                    ${getMagnitudeBg(earthquake?.magnitude)}
                    ${getShadowIntensity(earthquake?.magnitude)}
                    ${
                      selectedEarthquake === earthquake?.id
                        ? "ring-2 ring-primary ring-offset-2"
                        : ""
                    }
                  `}
                >
                  {/* Magnitude Badge */}
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className={`
                      flex items-center justify-center w-12 h-12 rounded-full font-data font-bold text-lg
                      ${getMagnitudeColor(earthquake?.magnitude)}
                      ${getMagnitudeBg(earthquake?.magnitude)}
                    `}
                    >
                      {Number(earthquake?.magnitude).toFixed(2)}
                    </div>
                    <div className="text-right">
                      <div className="font-caption text-xs text-muted-foreground">
                        {formatTimeAgo(earthquake?.timestamp)}
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
                      <Icon
                        name="ArrowDown"
                        size={14}
                        color="var(--color-muted-foreground)"
                        strokeWidth={2}
                      />
                      <span className="font-data text-muted-foreground">
                        {earthquake?.depth}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon
                        name="MapPin"
                        size={14}
                        color="var(--color-muted-foreground)"
                        strokeWidth={2}
                      />
                      <span className="font-data text-muted-foreground text-xs">
                        {earthquake?.coordinates?.lat?.toFixed(3)},{" "}
                        {earthquake?.coordinates?.lng?.toFixed(3)}
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-caption text-muted-foreground">
                        Intensity: {earthquake?.intensity || "N/A"}
                      </span>
                      <span className="font-caption text-muted-foreground">
                        ID: {earthquake?.id}
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
                <Icon
                  name="RefreshCw"
                  size={16}
                  color="var(--color-success)"
                  strokeWidth={2}
                />
                <span className="font-caption text-success">Live updates</span>
              </div>
              <span className="font-data text-muted-foreground text-xs">
                Updated{" "}
                {new Date()?.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default EarthquakeListSidebar;
