import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import AlertCard from "./components/AlertCard";
import FilterToolbar from "./components/FilterToolbar";
import AlertStats from "./components/AlertStats";
import SearchBar from "./components/SearchBar";

const LiveAlertsDashboard = () => {
  const [activeTab, setActiveTab] = useState("alerts");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    severity: "all",
    timeFrame: "all",
    location: "all",
  });

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      title: "Major Fire Outbreak in Commercial Complex",
      type: "Fire",
      severity: "Critical",
      location: "Andheri West, Mumbai",
      description:
        "Large fire reported at Phoenix Mills commercial complex. Multiple fire brigades deployed. Immediate evacuation in progress.",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      affectedRadius: 2.5,
      affectedPopulation: 15000,
      responseTime: 8,
      safetyInstructions: [
        "Evacuate the building immediately using nearest exit",
        "Do not use elevators during evacuation",
        "Stay low to avoid smoke inhalation",
        "Proceed to designated assembly points",
        "Do not re-enter the building until cleared by authorities",
      ],
      affectedAreas: [
        "Phoenix Mills",
        "High Street Phoenix",
        "Palladium Mall",
        "Nearby Residential Areas",
      ],
      emergencyContacts: [
        { service: "Fire Brigade", number: "101" },
        { service: "Police Control", number: "100" },
        { service: "Ambulance", number: "108" },
        { service: "Local Emergency", number: "+91-22-2674-1234" },
      ],
    },
    {
      id: 2,
      title: "Flash Flood Warning - Heavy Rainfall",
      type: "Flood",
      severity: "High",
      location: "Hiranandani, Powai",
      description:
        "Heavy rainfall causing waterlogging in low-lying areas. Water level rising rapidly in Powai Lake vicinity.",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      affectedRadius: 5.0,
      affectedPopulation: 25000,
      responseTime: 12,
      safetyInstructions: [
        "Move to higher ground immediately",
        "Avoid walking or driving through flooded areas",
        "Stay away from electrical equipment if standing in water",
        "Keep emergency supplies ready",
        "Monitor official weather updates regularly",
      ],
      affectedAreas: [
        "Hiranandani Gardens",
        "Powai Lake Area",
        "IIT Bombay Campus",
        "Chandivali",
      ],
      emergencyContacts: [
        { service: "Disaster Management", number: "1077" },
        { service: "Police Control", number: "100" },
        { service: "Municipal Corporation", number: "+91-22-2285-2200" },
        { service: "Emergency Rescue", number: "108" },
      ],
    },
    {
      id: 3,
      title: "Earthquake Tremors Detected",
      type: "Earthquake",
      severity: "Medium",
      location: "Koregaon Park, Pune",
      description:
        "Mild earthquake tremors of magnitude 4.2 detected. No immediate damage reported but residents advised to stay alert.",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      affectedRadius: 15.0,
      affectedPopulation: 50000,
      responseTime: 5,
      safetyInstructions: [
        "Drop, Cover, and Hold On if tremors continue",
        "Stay away from windows and heavy objects",
        "If outdoors, move away from buildings and trees",
        "Check for gas leaks and electrical damage",
        "Be prepared for aftershocks",
      ],
      affectedAreas: [
        "Koregaon Park",
        "Kalyani Nagar",
        "Viman Nagar",
        "Kharadi",
      ],
      emergencyContacts: [
        { service: "Emergency Services", number: "112" },
        { service: "Fire Brigade", number: "101" },
        { service: "Police Control", number: "100" },
        { service: "Medical Emergency", number: "108" },
      ],
    },
    {
      id: 4,
      title: "Cyclone Alert - Coastal Areas",
      type: "Cyclone",
      severity: "High",
      location: "Marine Drive, Mumbai",
      description:
        "Cyclonic storm approaching Mumbai coast. High tide warnings issued. Coastal areas to be evacuated as precautionary measure.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      affectedRadius: 10.0,
      affectedPopulation: 75000,
      responseTime: 20,
      safetyInstructions: [
        "Evacuate coastal areas immediately",
        "Secure loose objects that could become projectiles",
        "Stock up on essential supplies and water",
        "Avoid going near the sea or waterfront",
        "Stay indoors and away from windows",
      ],
      affectedAreas: [
        "Marine Drive",
        "Nariman Point",
        "Colaba",
        "Worli Seaface",
        "Bandra Bandstand",
      ],
      emergencyContacts: [
        { service: "Cyclone Warning Center", number: "+91-22-2215-1502" },
        { service: "Coast Guard", number: "1554" },
        { service: "Police Control", number: "100" },
        { service: "Disaster Management", number: "1077" },
      ],
    },
    {
      id: 5,
      title: "Landslide Risk in Hilly Areas",
      type: "Landslide",
      severity: "Medium",
      location: "Lonavala Hills",
      description:
        "Heavy rains have increased landslide risk in hilly regions. Travelers advised to avoid hill routes until further notice.",
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      affectedRadius: 8.0,
      affectedPopulation: 12000,
      responseTime: 25,
      safetyInstructions: [
        "Avoid travel on hill roads during heavy rain",
        "Watch for signs of ground movement or cracks",
        "Move away from steep slopes if possible",
        "Listen for unusual sounds like trees cracking",
        "Have evacuation plan ready for hillside residents",
      ],
      affectedAreas: ["Lonavala", "Khandala", "Tiger Point", "Bhushi Dam Area"],
      emergencyContacts: [
        { service: "Highway Police", number: "+91-2114-273-456" },
        { service: "Emergency Services", number: "112" },
        { service: "Local Administration", number: "+91-2114-273-100" },
        { service: "Rescue Team", number: "108" },
      ],
    },
    {
      id: 6,
      title: "Industrial Fire - Chemical Plant",
      type: "Fire",
      severity: "Critical",
      location: "MIDC Aurangabad",
      description:
        "Major fire at chemical manufacturing plant. Toxic smoke reported. Evacuation of 5km radius initiated immediately.",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      affectedRadius: 5.0,
      affectedPopulation: 35000,
      responseTime: 15,
      safetyInstructions: [
        "Evacuate immediately if within 5km radius",
        "Cover nose and mouth to avoid toxic fumes",
        "Move perpendicular to wind direction",
        "Seek medical attention if experiencing breathing difficulty",
        "Stay indoors with windows closed if unable to evacuate",
      ],
      affectedAreas: [
        "MIDC Industrial Area",
        "Waluj",
        "Cidco N-7",
        "Jalna Road",
      ],
      emergencyContacts: [
        { service: "Fire Brigade", number: "101" },
        { service: "Pollution Control", number: "+91-240-248-2345" },
        { service: "Industrial Safety", number: "+91-240-248-1000" },
        { service: "Medical Emergency", number: "108" },
      ],
    },
  ];

  // Filter and search logic
  const filteredAlerts = useMemo(() => {
    let filtered = mockAlerts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(
        (alert) =>
          alert?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          alert?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          alert?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          alert?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply type filter
    if (filters?.type !== "all") {
      filtered = filtered?.filter(
        (alert) => alert?.type?.toLowerCase() === filters?.type?.toLowerCase()
      );
    }

    // Apply severity filter
    if (filters?.severity !== "all") {
      filtered = filtered?.filter(
        (alert) =>
          alert?.severity?.toLowerCase() === filters?.severity?.toLowerCase()
      );
    }

    // Apply time frame filter
    if (filters?.timeFrame !== "all") {
      const now = new Date();
      filtered = filtered?.filter((alert) => {
        const alertTime = new Date(alert.timestamp);
        const diffHours = (now - alertTime) / (1000 * 60 * 60);

        switch (filters?.timeFrame) {
          case "last_hour":
            return diffHours <= 1;
          case "last_6_hours":
            return diffHours <= 6;
          case "last_24_hours":
            return diffHours <= 24;
          case "last_week":
            return diffHours <= 168;
          default:
            return true;
        }
      });
    }

    // Apply location filter
    if (filters?.location !== "all") {
      filtered = filtered?.filter((alert) =>
        alert?.location
          ?.toLowerCase()
          ?.includes(filters?.location?.toLowerCase())
      );
    }

    return filtered?.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
  }, [searchTerm, filters]);

  // Calculate alert counts
  const alertCounts = useMemo(() => {
    return {
      total: filteredAlerts?.length,
      critical: filteredAlerts?.filter((a) => a?.severity === "Critical")
        ?.length,
      high: filteredAlerts?.filter((a) => a?.severity === "High")?.length,
      medium: filteredAlerts?.filter((a) => a?.severity === "Medium")?.length,
      low: filteredAlerts?.filter((a) => a?.severity === "Low")?.length,
    };
  }, [filteredAlerts]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: "all",
      severity: "all",
      timeFrame: "all",
      location: "all",
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Add onExpand handler for AlertCard
  const handleAlertExpand = (alertId) => {
    console.log("Expanding alert:", alertId);
    // Handle alert expansion logic here
  };

  // Auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates by updating timestamps
      console.log("Simulating real-time alert updates...");
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Live Alerts Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor real-time disaster alerts and emergency information for
                your area
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="RefreshCw" size={16} className="mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="border-b border-border">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("alerts")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "alerts"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <Icon name="AlertTriangle" size={16} className="mr-2 inline" />
                Active Alerts ({alertCounts?.total})
              </button>
              <button
                onClick={() => setActiveTab("statistics")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "statistics"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                <Icon name="BarChart3" size={16} className="mr-2 inline" />
                Statistics & Analytics
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {activeTab === "alerts" ? (
            <div>
              {/* Search Bar */}
              <SearchBar
                onSearch={handleSearch}
                searchTerm={searchTerm}
                onClear={handleClearSearch}
              />

              {/* Filter Toolbar */}
              <FilterToolbar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                alertCounts={alertCounts}
              />

              {/* Alerts Feed */}
              <div className="space-y-6">
                {filteredAlerts?.length > 0 ? (
                  <>
                    {/* Results Header */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        Showing {filteredAlerts?.length} of {mockAlerts?.length}{" "}
                        alerts
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Clock" size={14} />
                        <span>
                          Last updated:{" "}
                          {new Date()?.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Alert Cards */}
                    <div className="space-y-4">
                      {filteredAlerts?.map((alert, index) => (
                        <motion.div
                          key={alert?.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <AlertCard
                            alert={alert}
                            onExpand={handleAlertExpand}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Icon
                      name="Search"
                      size={48}
                      color="var(--color-muted-foreground)"
                      className="mx-auto mb-4"
                    />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No alerts found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or filters to find
                      relevant alerts.
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <AlertStats alerts={mockAlerts} />
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default LiveAlertsDashboard;
