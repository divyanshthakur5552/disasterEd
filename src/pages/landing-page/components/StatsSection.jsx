import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const StatsSection = () => {
  const stats = [
    {
      icon: "Users",
      value: "50,000+",
      label: "Students Trained",
      description: "Across 1,200+ educational institutions",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: "Shield",
      value: "99.8%",
      label: "Safety Success Rate",
      description: "Emergency response effectiveness",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: "Clock",
      value: "24/7",
      label: "Alert Monitoring",
      description: "Real-time disaster tracking",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: "Award",
      value: "15+",
      label: "Safety Certifications",
      description: "Government approved programs",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentUpdates = [
    {
      type: "Training Update",
      title: "New Earthquake Response Module",
      description:
        "Enhanced seismic safety protocols with interactive simulations",
      timestamp: "2 hours ago",
      icon: "BookOpen",
      priority: "high",
    },
    {
      type: "Alert System",
      title: "Weather Monitoring Enhanced",
      description:
        "Improved early warning system for severe weather conditions",
      timestamp: "6 hours ago",
      icon: "CloudRain",
      priority: "medium",
    },
    {
      type: "Safety Update",
      title: "Fire Safety Guidelines Revised",
      description:
        "Updated evacuation procedures based on latest safety standards",
      timestamp: "1 day ago",
      icon: "Flame",
      priority: "medium",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-card border border-border rounded-xl p-6 text-center shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 ${stat?.bgColor} rounded-lg mb-4`}
              >
                <Icon
                  name={stat?.icon}
                  size={24}
                  className={stat?.color}
                  strokeWidth={2}
                />
              </div>
              <div className="space-y-2">
                <div className="text-2xl lg:text-3xl font-bold text-foreground">
                  {stat?.value}
                </div>
                <div className="text-sm font-medium text-foreground">
                  {stat?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat?.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Updates Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-elevation-4"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Recent Safety Updates
              </h3>
              <p className="text-muted-foreground">
                Stay informed about the latest improvements to our safety
                platform
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Last updated: {new Date()?.toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-4">
            {recentUpdates?.map((update, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                    update?.priority === "high"
                      ? "bg-red-50 text-red-600"
                      : update?.priority === "medium"
                      ? "bg-yellow-50 text-yellow-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Icon name={update?.icon} size={20} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {update?.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {update?.timestamp}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {update?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {update?.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Icon
                    name="ChevronRight"
                    size={16}
                    color="var(--color-muted-foreground)"
                    className="hover:text-primary transition-colors cursor-pointer"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Updates Link */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200 inline-flex items-center space-x-2">
              <span>View All Updates</span>
              <Icon name="ExternalLink" size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
