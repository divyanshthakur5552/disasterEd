import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import InteractiveQuizzes from "./pages/interactive-quizzes";
import LiveAlertsDashboard from "./pages/live-alerts-dashboard";
import LandingPage from "./pages/landing-page";
import SafeZonesMap from "./pages/safe-zones-map";
import TrainingModules from "./pages/training-modules";
import ResourcesDirectory from "./pages/resources-directory";
import ChatBot from "pages/chat-bot";
import EarthquakeMonitoringMap from "pages/earthquake-monitoring-map";
import LoginScreen from "pages/login-screen";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/interactive-quizzes" element={<InteractiveQuizzes />} />
          <Route
            path="/live-alerts-dashboard"
            element={<LiveAlertsDashboard />}
          />
          <Route
            path="/earthquake-monitoring-map"
            element={<EarthquakeMonitoringMap />}
          />
          <Route path="/chat-bot" element={<ChatBot />} />
          <Route path="/safe-zones-map" element={<SafeZonesMap />} />
          <Route path="/training-modules" element={<TrainingModules />} />
          <Route path="/resources-directory" element={<ResourcesDirectory />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
