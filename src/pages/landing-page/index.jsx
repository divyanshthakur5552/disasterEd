import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import EmergencyBanner from "./components/EmergencyBanner";
import NavigationCards from "./components/NavigationCards";
import StatsSection from "./components/StatsSection";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    if (!isAuthenticated) {
      navigate("/", { replace: true }); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <NavigationCards />
        <StatsSection />
      </main>

      <button
        onClick={handleLogout}
        className="fixed bottom-5 right-5 bg-red-600 text-white px-4 py-2 rounded shadow-lg"
      >
        Logout
      </button>

      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-xl text-foreground">
                    DisasterEd
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Emergency Preparedness
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                Empowering educational institutions with comprehensive disaster
                preparedness training, real-time alerts, and emergency response
                resources to ensure student and staff safety.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/training-modules"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Training Modules
                  </a>
                </li>
                <li>
                  <a
                    href="/interactive-quizzes"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Interactive Quizzes
                  </a>
                </li>
                <li>
                  <a
                    href="/live-alerts-dashboard"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Live Alerts
                  </a>
                </li>
                <li>
                  <a
                    href="/safe-zones-map"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Safe Zones
                  </a>
                </li>
              </ul>
            </div>

            {/* Emergency Contacts */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Emergency Contacts
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Emergency: 112</li>
                <li>Fire: 101</li>
                <li>Police: 100</li>
                <li>Medical: 108</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} DisasterEd. All rights reserved.
            </p>

            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary text-sm"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
