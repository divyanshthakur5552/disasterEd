import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';

import MapContainer from './components/MapContainer';
import SearchPanel from './components/SearchPanel';
import SafeZonesList from './components/SafeZonesList';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SafeZonesMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [mapView, setMapView] = useState('street');
  const [userLocation, setUserLocation] = useState(null);
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEmergencyPanelCollapsed, setIsEmergencyPanelCollapsed] = useState(false);

  // College Campus Safe Zones Data - Fake Campus Map
  const mockSafeZones = [
    {
      id: 1,
      name: "Student Union Building - Main Hall",
      address: "Central Campus, Block A, University College",
      coordinates: { lat: 28.6139, lng: 77.2090 },
      capacity: 800,
      currentOccupancy: 150,
      status: "available",
      contact: "+91-11-2345-6789",
      facilities: ["Medical Aid", "Food & Water", "Shelter", "Communication", "Power Supply"],
      description: "Large student union hall with cafeteria facilities and emergency medical station.",
      buildingType: "administrative"
    },
    {
      id: 2,
      name: "Engineering Building - Auditorium",
      address: "Academic Block B, Engineering Department",
      coordinates: { lat: 28.6200, lng: 77.2100 },
      capacity: 500,
      currentOccupancy: 450,
      status: "nearly_full",
      contact: "+91-11-2345-6790",
      facilities: ["Shelter", "Communication", "Basic Medical"],
      description: "Main engineering auditorium with backup power systems and communication equipment.",
      buildingType: "academic"
    },
    {
      id: 3,
      name: "Sports Complex - Indoor Arena",
      address: "Sports Campus, Athletic Center",
      coordinates: { lat: 28.6080, lng: 77.2150 },
      capacity: 1000,
      currentOccupancy: 1000,
      status: "full",
      contact: "+91-11-2345-6791",
      facilities: ["Medical Aid", "Food & Water", "Shelter", "Power Supply"],
      description: "Large indoor sports arena with first aid facilities and refreshment area.",
      buildingType: "recreational"
    },
    {
      id: 4,
      name: "Campus Health Center",
      address: "Medical Campus, Health Services Building",
      coordinates: { lat: 28.6180, lng: 77.2050 },
      capacity: 300,
      currentOccupancy: 80,
      status: "available",
      contact: "+91-11-2345-6792",
      facilities: ["Medical Aid", "Emergency Care", "Communication", "Ambulance Service"],
      description: "Campus medical center with trained medical staff and emergency equipment.",
      buildingType: "medical"
    },
    {
      id: 5,
      name: "Library - Conference Hall",
      address: "Central Library Building, 3rd Floor",
      coordinates: { lat: 28.6120, lng: 77.2200 },
      capacity: 400,
      currentOccupancy: 90,
      status: "available",
      contact: "+91-11-2345-6793",
      facilities: ["Shelter", "Communication", "Power Supply", "Study Materials"],
      description: "Library conference hall with study materials and communication facilities.",
      buildingType: "academic"
    },
    {
      id: 6,
      name: "Hostel Block A - Common Hall",
      address: "Residential Campus, Hostel Block A",
      coordinates: { lat: 28.6160, lng: 77.2120 },
      capacity: 600,
      currentOccupancy: 200,
      status: "available",
      contact: "+91-11-2345-6794",
      facilities: ["Shelter", "Food & Water", "Communication", "Basic Medical"],
      description: "Hostel common hall with kitchen facilities and basic medical supplies.",
      buildingType: "residential"
    },
    {
      id: 7,
      name: "Computer Science Lab Complex",
      address: "IT Building, Computer Labs Section",
      coordinates: { lat: 28.6110, lng: 77.2180 },
      capacity: 250,
      currentOccupancy: 60,
      status: "available",
      contact: "+91-11-2345-6795",
      facilities: ["Shelter", "Communication", "Power Supply", "Internet Access"],
      description: "Computer labs with reliable internet and communication systems.",
      buildingType: "academic"
    },
    {
      id: 8,
      name: "Faculty Lounge - Administration Block",
      address: "Administration Building, Faculty Wing",
      coordinates: { lat: 28.6190, lng: 77.2070 },
      capacity: 150,
      currentOccupancy: 45,
      status: "available",
      contact: "+91-11-2345-6796",
      facilities: ["Shelter", "Communication", "Basic Medical"],
      description: "Faculty lounge area with communication facilities and first aid supplies.",
      buildingType: "administrative"
    }
  ];

  const [filteredZones, setFilteredZones] = useState(mockSafeZones);

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position?.coords?.latitude,
            lng: position?.coords?.longitude
          });
        },
        (error) => {
          console.log('Location access denied, using default location');
          setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Delhi center
        }
      );
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 }); // Delhi center
    }
  }, []);

  // Filter safe zones based on search and filters
  useEffect(() => {
    let filtered = mockSafeZones;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(zone =>
        zone?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        zone?.address?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        zone?.facilities?.some(facility => 
          facility?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Apply other filters
    if (filters?.capacity) {
      filtered = filtered?.filter(zone => zone?.capacity >= parseInt(filters?.capacity));
    }

    if (filters?.facility) {
      filtered = filtered?.filter(zone =>
        zone?.facilities?.some(facility =>
          facility?.toLowerCase()?.includes(filters?.facility?.toLowerCase())
        )
      );
    }

    setFilteredZones(filtered);
  }, [searchQuery, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleEmergencyPanel = () => {
    setIsEmergencyPanelCollapsed(!isEmergencyPanelCollapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <Header />
      <main className="max-w-full px-3 sm:px-4 lg:px-6 py-4 lg:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Page Header with Status Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                    <Icon name="Shield" size={24} color="white" />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                      Campus Safe Zones Map
                    </h1>
                    <p className="text-slate-600 text-sm lg:text-base">
                      Real-time emergency shelter locations across University College
                    </p>
                  </div>
                </div>
                
                {/* Live Status Bar */}
                <div className="flex items-center gap-2 text-xs lg:text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium">Live Status</span>
                  </div>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">Last updated: {new Date()?.toLocaleTimeString()}</span>
                </div>
              </div>
              
              {/* Mobile Controls */}
              <div className="flex gap-2 lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleEmergencyPanel}
                  className="flex-1 bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                >
                  <Icon name="Phone" size={16} className="mr-2" />
                  Emergency
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSidebar}
                  className="flex-1"
                >
                  <Icon name="List" size={16} className="mr-2" />
                  Zones
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Campus Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 p-4 lg:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-2xl shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Icon name="School" size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-blue-900 mb-2 text-lg">University College Campus</h4>
                <p className="text-blue-700 text-sm lg:text-base mb-4 leading-relaxed">
                  Interactive campus map with 8 designated safe zones across academic, residential, and recreational areas. 
                  Each location features emergency communication systems and trained safety coordinators.
                </p>
                <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    8 Safe Zones
                  </span>
                  <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center gap-1">
                    <Icon name="Heart" size={12} />
                    Medical Ready
                  </span>
                  <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    24/7 Security
                  </span>
                  <span className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-full text-xs font-medium flex items-center gap-1">
                    <Icon name="Wifi" size={12} />
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Improved Main Content Layout */}
          <div className="relative">
            {/* Enhanced Emergency Panel - Better Positioning */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: isEmergencyPanelCollapsed ? 0.9 : 1, 
                x: isEmergencyPanelCollapsed ? -200 : 0 
              }}
              transition={{ duration: 0.3 }}
              className="fixed left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-40 w-64 lg:w-72"
            >
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-r-xl shadow-xl backdrop-blur-sm bg-white/95 overflow-hidden">
                {/* Panel Header */}
                <div className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-white/20 rounded-full">
                        <Icon name="AlertTriangle" size={16} />
                      </div>
                      <h4 className="font-semibold text-sm">Campus Emergency</h4>
                    </div>
                    <button
                      onClick={toggleEmergencyPanel}
                      className="p-1 hover:bg-white/20 rounded-full transition-colors lg:hidden"
                    >
                      <Icon name={isEmergencyPanelCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-red-100 mt-2 leading-relaxed">
                    In case of emergency, contact security immediately and proceed to nearest safe zone
                  </p>
                </div>

                {/* Emergency Contacts */}
                <div className="p-4 space-y-3">
                  <a
                    href="tel:100"
                    className="group flex items-center justify-between w-full p-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                        <Icon name="Phone" size={14} />
                      </div>
                      <span className="text-sm font-medium">Campus Security</span>
                    </div>
                    <span className="font-bold text-lg">100</span>
                  </a>
                  
                  <a
                    href="tel:101"
                    className="group flex items-center justify-between w-full p-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                        <Icon name="Flame" size={14} />
                      </div>
                      <span className="text-sm font-medium">Fire Emergency</span>
                    </div>
                    <span className="font-bold text-lg">101</span>
                  </a>
                  
                  <a
                    href="tel:108"
                    className="group flex items-center justify-between w-full p-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                        <Icon name="Heart" size={14} />
                      </div>
                      <span className="text-sm font-medium">Medical Emergency</span>
                    </div>
                    <span className="font-bold text-lg">108</span>
                  </a>
                  
                  <button className="w-full p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Icon name="Navigation" size={14} />
                    <span className="text-sm font-medium">Find Nearest Zone</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Improved Main Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6 min-h-[calc(100vh-360px)] pl-0 lg:pl-80">
              
              {/* Search Panel - Responsive */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="xl:col-span-3 order-1 xl:order-1"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-fit lg:h-full max-h-[600px]">
                  <SearchPanel
                    onSearch={handleSearch}
                    onFilter={handleFilter}
                    isCollapsed={isSearchCollapsed}
                    onToggleCollapse={() => setIsSearchCollapsed(!isSearchCollapsed)}
                  />
                </div>
              </motion.div>

              {/* Map Container - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="xl:col-span-6 order-3 xl:order-2 min-h-[400px] lg:min-h-[600px]"
              >
                <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden h-full relative">
                  {/* Map Header */}
                  <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm border border-slate-200">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="Map" size={16} color="var(--color-primary)" />
                        <span className="font-medium text-slate-700">Interactive Campus Map</span>
                      </div>
                    </div>
                    
                    {/* Map View Toggle */}
                    <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-1 flex gap-1">
                      <button
                        onClick={() => setMapView('street')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          mapView === 'street' ?'bg-blue-600 text-white shadow-sm' :'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Street
                      </button>
                      <button
                        onClick={() => setMapView('satellite')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                          mapView === 'satellite' ?'bg-blue-600 text-white shadow-sm' :'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Satellite
                      </button>
                    </div>
                  </div>
                  
                  <MapContainer
                    safeZones={filteredZones}
                    selectedZone={selectedZone}
                    onZoneSelect={handleZoneSelect}
                    userLocation={userLocation}
                    mapView={mapView}
                    onMapViewChange={setMapView}
                  />
                </div>
              </motion.div>

              {/* Safe Zones List - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="xl:col-span-3 order-2 xl:order-3 max-xl:hidden"
              >
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-full max-h-[600px]">
                  <SafeZonesList
                    safeZones={filteredZones}
                    onZoneSelect={handleZoneSelect}
                    selectedZone={selectedZone}
                    userLocation={userLocation}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Mobile Sidebar */}
          {isSidebarOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
                onClick={toggleSidebar}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl z-50 xl:hidden"
              >
                <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">Campus Safe Zones</h3>
                      <p className="text-sm text-slate-600">Real-time status</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleSidebar}
                      className="rounded-xl"
                    >
                      <Icon name="X" size={20} />
                    </Button>
                  </div>
                </div>
                <div className="h-[calc(100%-88px)] overflow-auto">
                  <SafeZonesList
                    safeZones={filteredZones}
                    onZoneSelect={(zone) => {
                      handleZoneSelect(zone);
                      toggleSidebar();
                    }}
                    selectedZone={selectedZone}
                    userLocation={userLocation}
                  />
                </div>
              </motion.div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SafeZonesMap;