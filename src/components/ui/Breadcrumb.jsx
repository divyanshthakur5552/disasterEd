import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();

  const pathMapping = {
    "/landing-page": "Home",
    "/training-modules": "Training Modules",
    "/interactive-quizzes": "Interactive Quizzes",
    "/live-alerts-dashboard": "Live Alerts Dashboard",
    "/safe-zones-map": "Safe Zones Map",
    "/resources-directory": "Resources Directory",
    "/chat-bot": "Chat Bot",
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const currentPath = location?.pathname;
    const currentPageName = pathMapping?.[currentPath];

    if (currentPath === "/landing-page") {
      return [{ label: "Home", path: "/landing-page", isActive: true }];
    }

    return [
      { label: "Home", path: "/landing-page", isActive: false },
      { label: currentPageName || "Page", path: currentPath, isActive: true },
    ];
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav
      className="flex items-center space-x-2 text-sm font-caption mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon
                name="ChevronRight"
                size={16}
                color="var(--color-muted-foreground)"
                className="mx-2"
              />
            )}
            {item?.isActive ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item?.label}
              </span>
            ) : (
              <Link
                to={item?.path}
                className="text-muted-foreground hover:text-primary transition-colors duration-150"
              >
                {item?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
