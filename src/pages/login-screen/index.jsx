import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Icon from "../../components/AppIcon";
import LoginForm from "./components/LoginForm";
import EmergencyContact from "./components/EmergencyContact";
import SafetyReminder from "./components/SafetyReminder";
import DisasterIcons from "./components/DisasterIcons";

const LoginScreen = () => {
  const [selectedRole, setSelectedRole] = useState("student");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>Login - DisasterEd | Emergency Preparedness Platform</title>
        <meta
          name="description"
          content="Secure login to DisasterGuard - Your comprehensive disaster preparedness and emergency management platform for educational institutions."
        />
        <meta
          name="keywords"
          content="disaster preparedness, emergency management, school safety, login, education"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    DisasterGuard
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Emergency Preparedness Platform
                  </p>
                </div>
              </div>

              {/* Current Time & Emergency Info */}
              <div className="hidden md:flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm font-mono text-foreground">
                    {formatTime(currentTime)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(currentTime)}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-destructive">
                  <Icon name="Phone" size={16} />
                  <span className="text-sm font-semibold">Emergency: 911</span>
                </div>
              </div>

              {/* Mobile Emergency Button */}
              <div className="md:hidden">
                <button className="flex items-center space-x-1 px-3 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium">
                  <Icon name="Phone" size={14} />
                  <span>911</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Emergency & Safety Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Mobile Emergency Contact */}
                <div className="md:hidden">
                  <EmergencyContact />
                </div>

                {/* Safety Reminder */}
                <SafetyReminder />

                {/* Disaster Icons */}
                <DisasterIcons />

                {/* Desktop Emergency Contact */}
                <div className="hidden md:block">
                  <EmergencyContact />
                </div>
              </div>

              {/* Center Column - Login Form */}
              <div className="lg:col-span-2">
                <div className="max-w-md mx-auto">
                  {/* Welcome Message */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Shield" size={32} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Welcome to DisasterEd
                    </h2>
                    <p className="text-muted-foreground">
                      Sign in to access disaster preparedness resources and
                      emergency management tools
                    </p>
                  </div>

                  {/* Login Form */}
                  <LoginForm
                    selectedRole={selectedRole}
                    onRoleChange={handleRoleChange}
                  />

                  {/* Platform Features */}
                  <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3 text-center">
                      Platform Features
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Icon
                          name="BookOpen"
                          size={14}
                          className="text-primary"
                        />
                        <span className="text-xs text-muted-foreground">
                          Interactive Learning
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Map" size={14} className="text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Evacuation Maps
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Bell" size={14} className="text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Real-time Alerts
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Award" size={14} className="text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Progress Tracking
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">
                  © {new Date()?.getFullYear()} DisasterGuard. All rights
                  reserved.
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Privacy Policy
                </button>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Terms of Service
                </button>
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                  Help Center
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground">
                For technical support, contact: support@disasterguard.edu |
                (555) 987-6543
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LoginScreen;
