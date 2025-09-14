import React, { useState, useEffect, useCallback } from "react";
import Icon from "../../../components/AppIcon";

const DataRefreshButton = ({ onRefresh, lastUpdated }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [timeUntilRefresh, setTimeUntilRefresh] = useState(30);

  // Refresh handler (memoized to avoid stale closures)
  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setTimeUntilRefresh(30); // reset countdown

    try {
      await onRefresh?.();
    } catch (error) {
      console.error("Refresh failed:", error);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  }, [isRefreshing, onRefresh]);

  // Auto refresh countdown
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setTimeUntilRefresh((prev) => {
        if (prev <= 1) {
          handleRefresh();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, handleRefresh]);

  const toggleAutoRefresh = () => {
    setAutoRefresh((prev) => !prev);
    setTimeUntilRefresh(30);
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "Never";
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-[300]">
      <div className="flex flex-col items-start space-y-2">
        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`
            flex items-center justify-center w-12 h-12 rounded-full
            transition-all duration-200 ease-out
            hover:scale-105 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-secondary/30
            disabled:cursor-not-allowed
            ${
              isRefreshing
                ? "bg-warning hover:bg-warning/90 shadow-warm"
                : "bg-secondary hover:bg-secondary/90 shadow-warm hover:shadow-warm-lg"
            }
          `}
          aria-label={isRefreshing ? "Refreshing data..." : "Refresh data"}
          title={isRefreshing ? "Refreshing data..." : "Refresh data"}
        >
          <Icon
            name="RefreshCw"
            size={20}
            color="white"
            strokeWidth={2}
            className={isRefreshing ? "animate-spin" : ""}
          />
        </button>

        {/* Auto Refresh Toggle */}
        <button
          onClick={toggleAutoRefresh}
          className={`
            flex items-center justify-center w-12 h-12 rounded-full
            transition-all duration-200 ease-out
            hover:scale-105 active:scale-95
            focus:outline-none focus:ring-4 focus:ring-accent/30
            ${
              autoRefresh
                ? "bg-accent hover:bg-accent/90 shadow-warm"
                : "bg-muted hover:bg-muted/90 shadow-warm border border-border"
            }
          `}
          aria-label={
            autoRefresh ? "Disable auto refresh" : "Enable auto refresh"
          }
          title={autoRefresh ? "Disable auto refresh" : "Enable auto refresh"}
        >
          <Icon
            name={autoRefresh ? "Pause" : "Play"}
            size={16}
            color={autoRefresh ? "white" : "var(--color-muted-foreground)"}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Status Panel */}
      <div className="mt-3 bg-card border border-border rounded-lg p-3 shadow-warm min-w-[200px]">
        <div className="space-y-2 text-xs">
          {/* Last Updated */}
          <div className="flex items-center justify-between">
            <span className="font-caption text-muted-foreground">
              Last updated:
            </span>
            <span className="font-data text-foreground">
              {formatLastUpdated()}
            </span>
          </div>

          {/* Auto Refresh Status */}
          <div className="flex items-center justify-between">
            <span className="font-caption text-muted-foreground">
              Auto refresh:
            </span>
            <div className="flex items-center space-x-1">
              <div
                className={`w-2 h-2 rounded-full ${
                  autoRefresh
                    ? "bg-success animate-pulse"
                    : "bg-muted-foreground"
                }`}
              />
              <span className="font-data text-foreground">
                {autoRefresh ? "ON" : "OFF"}
              </span>
            </div>
          </div>

          {/* Countdown */}
          {autoRefresh && !isRefreshing && (
            <div className="flex items-center justify-between">
              <span className="font-caption text-muted-foreground">
                Next refresh:
              </span>
              <span className="font-data text-primary font-medium">
                {timeUntilRefresh}s
              </span>
            </div>
          )}

          {/* Refreshing Status */}
          {isRefreshing && (
            <div
              className="flex items-center justify-center text-warning"
              aria-live="polite"
            >
              <Icon
                name="Loader"
                size={12}
                color="var(--color-warning)"
                strokeWidth={2}
                className="animate-spin mr-1"
              />
              <span className="font-caption">Updating data...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataRefreshButton;
