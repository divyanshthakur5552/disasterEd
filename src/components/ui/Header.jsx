import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import ChatBot from "pages/chat-bot";
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: "Home", path: "/landing-page", icon: "Home" },
    { label: "Training", path: "/training-modules", icon: "BookOpen" },
    { label: "Chat Bot", path: "/chat-bot", icon: "MessageCircle" },
    { label: "Quizzes", path: "/interactive-quizzes", icon: "Brain" },
    {
      label: "Map",
      path: "/earthquake-monitoring-map",
      icon: "Globe",
    },
    { label: "Alerts", path: "/live-alerts-dashboard", icon: "AlertTriangle" },

    { label: "Resources", path: "/resources-directory", icon: "Library" },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="mt-2 max-w-6xl mx-auto fixed top-0 left-0 right-0 z-50  bg-white/30 backdrop-blur-md shadow border-b border-border  rounded-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/landing-page"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Shield" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-foreground">
                  DisasterEd
                </span>
                <span className="font-caption text-xs text-muted-foreground -mt-1">
                  Emergency Preparedness
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-150  ${
                    isActivePath(item?.path)
                      ? "bg-primary text-primary-foreground shadow-elevation-2"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {" "}
                  {/* //hover:bg-muted */}
                  <Icon
                    name={item?.icon}
                    size={18}
                    color={
                      isActivePath(item?.path)
                        ? "currentColor"
                        : "var(--color-muted-foreground)"
                    }
                  />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <div className="fixed top-16 left-0 right-0 bg-card border-b border-border shadow-elevation-8 z-999  lg:hidden animate-slide-in">
              <nav className="px-4 py-4 space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-150 min-h-[44px] ${
                      isActivePath(item?.path)
                        ? "bg-primary text-primary-foreground shadow-elevation-2"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    }`}
                  >
                    <Icon
                      name={item?.icon}
                      size={20}
                      color={
                        isActivePath(item?.path)
                          ? "currentColor"
                          : "var(--color-muted-foreground)"
                      }
                    />
                    <span>{item?.label}</span>
                    {item?.path === "/live-alerts-dashboard" && (
                      <div className="ml-auto w-2 h-2 bg-error rounded-full animate-pulse" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </>
        )}
      </header>
      {/* Header Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Header;
