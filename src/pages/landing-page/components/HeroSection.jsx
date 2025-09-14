import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
              >
                <Icon name="Shield" size={16} />
                <span>Emergency Preparedness Education</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl lg:text-6xl font-bold text-foreground leading-tight"
              >
                Be Ready, <span className="text-primary">Stay Safe</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                Comprehensive disaster preparedness training for educational
                institutions. Learn essential safety protocols, emergency
                procedures, and life-saving skills through interactive modules
                and real-time guidance.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/training-modules">
                <Button
                  variant="default"
                  size="lg"
                  iconName="BookOpen"
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  Start Training
                </Button>
              </Link>
              <Link to="/live-alerts-dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="AlertTriangle"
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  View Alerts
                </Button>
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">
                  Students Trained
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1,200+</div>
                <div className="text-sm text-muted-foreground">
                  Schools Enrolled
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.8%</div>
                <div className="text-sm text-muted-foreground">
                  Safety Score
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-elevation-8">
              <Image
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Emergency preparedness training session with students and instructor"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Floating Alert Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute top-6 right-6 bg-card border border-border rounded-lg p-4 shadow-elevation-4 max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon
                        name="CheckCircle"
                        size={20}
                        color="var(--color-success)"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      All Clear
                    </div>
                    <div className="text-xs text-muted-foreground">
                      No active alerts in your area
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
