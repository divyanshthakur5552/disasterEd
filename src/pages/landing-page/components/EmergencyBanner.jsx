import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyBanner = () => {
  const [currentAlert, setCurrentAlert] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const emergencyAlerts = [
    {
      type: "Weather Alert",
      severity: "Medium",
      message: "Heavy rainfall expected in your area. Review flood safety procedures.",
      icon: "CloudRain",
      color: "bg-yellow-500",
      textColor: "text-yellow-800",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      type: "Safety Reminder",
      severity: "Info",
      message: "Monthly fire drill scheduled for next week. Prepare evacuation routes.",
      icon: "Flame",
      color: "bg-blue-500",
      textColor: "text-blue-800",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      type: "Training Update",
      severity: "Info",
      message: "New earthquake response module now available. Start your training today.",
      icon: "BookOpen",
      color: "bg-green-500",
      textColor: "text-green-800",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlert((prev) => (prev + 1) % emergencyAlerts?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [emergencyAlerts?.length]);

  if (!isVisible) return null;

  const alert = emergencyAlerts?.[currentAlert];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentAlert}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`${alert?.bgColor} ${alert?.borderColor} border-l-4 border-l-current`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Alert Icon */}
              <div className={`flex-shrink-0 w-10 h-10 ${alert?.color} rounded-lg flex items-center justify-center`}>
                <Icon name={alert?.icon} size={20} color="white" strokeWidth={2} />
              </div>

              {/* Alert Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-medium ${alert?.textColor} bg-white/50 px-2 py-1 rounded-full`}>
                    {alert?.type}
                  </span>
                  <span className={`text-xs font-medium ${alert?.textColor} opacity-75`}>
                    {alert?.severity}
                  </span>
                </div>
                <p className={`text-sm font-medium ${alert?.textColor} mt-1`}>
                  {alert?.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="hidden sm:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className={`${alert?.textColor} hover:bg-white/20`}
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              {/* Alert Indicators */}
              <div className="hidden md:flex items-center space-x-1">
                {emergencyAlerts?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentAlert(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentAlert 
                        ? `${alert?.color}` 
                        : `${alert?.textColor} opacity-30`
                    }`}
                    aria-label={`View alert ${index + 1}`}
                  />
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsVisible(false)}
                className={`${alert?.textColor} hover:opacity-75 transition-opacity p-1`}
                aria-label="Dismiss alert"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Action Button */}
          <div className="sm:hidden mt-3 pt-3 border-t border-current border-opacity-20">
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              className={`${alert?.textColor} hover:bg-white/20 w-full justify-center`}
            >
              Learn More
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmergencyBanner;