import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import TrainingCard from "./components/TrainingCard";
import ProgressOverview from "./components/ProgressOverview";
import FilterSearch from "./components/FilterSearch";
import ModuleModal from "./components/ModuleModal";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const TrainingModules = () => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});

  // Mock training modules data
  const mockModules = [
    {
      id: "fire-safety",
      title: "Fire Safety & Evacuation",
      subtitle: "Essential fire emergency protocols",
      description:
        "Learn comprehensive fire safety measures, evacuation procedures, and emergency response protocols to protect yourself and others during fire emergencies.",
      image:
        "https://images.unsplash.com/photo-1692085654401-8d61c49d5017?w=400&h=300&fit=crop",
      video: "https://www.youtube.com/embed/Xgc90CoJbDI?autoplay=1",
      severity: "high",
      duration: "45 min",
      participants: "2.5k+",
      difficulty: "intermediate",
      category: "fire",
      keyTopics: [
        "Fire Prevention",
        "Evacuation Routes",
        "Fire Extinguishers",
        "Smoke Safety",
        "Emergency Exits",
        "First Aid Burns",
      ],
      objectives: [
        "Identify fire hazards and prevention methods",
        "Execute proper evacuation procedures",
        "Use fire safety equipment effectively",
        "Apply first aid for burn injuries",
      ],
      prerequisites: "Basic safety awareness recommended",
      detailedContent: {
        overview: `Fire safety is crucial for protecting lives and property. This comprehensive module covers fire prevention, detection, and response strategies that every individual should know.`,
        procedures: `Fire Emergency Response Procedures:\n\n1. ALERT - Sound the alarm immediately\n2. ASSIST - Help others evacuate safely\n3. ATTEMPT - Only fight small fires if trained\n4. EVACUATE - Leave the building quickly and safely\n\nRemember: Never use elevators during a fire emergency. Always use stairs and stay low if there's smoke.`,
        checklist: `Fire Safety Checklist:\n\n✓ Know all evacuation routes from your location\n✓ Locate fire extinguishers and learn how to use them\n✓ Identify assembly points outside the building\n✓ Practice fire drills regularly\n✓ Keep emergency contact numbers accessible\n✓ Check smoke detector batteries monthly`,
      },
    },
    {
      id: "flood-response",
      title: "Flood Response & Water Safety",
      subtitle: "Flood preparedness and response",
      description:
        "Master flood preparedness strategies, water safety protocols, and emergency response procedures for flood situations.",
      image:
        "https://images.unsplash.com/photo-1567654007013-3d64876fe8dd?w=400&h=300&fit=crop",
      video: "https://www.youtube.com/embed/pi_nUPcQz_A?autoplay=1",
      severity: "high",
      duration: "50 min",
      participants: "1.8k+",
      difficulty: "intermediate",
      category: "natural",
      keyTopics: [
        "Flood Preparedness",
        "Water Safety",
        "Evacuation Planning",
        "Emergency Supplies",
        "Communication",
        "Recovery",
      ],
      objectives: [
        "Develop flood preparedness plans",
        "Understand water safety principles",
        "Execute safe evacuation procedures",
        "Manage post-flood recovery",
      ],
      prerequisites: "None required",
      detailedContent: {
        overview: `Floods are among the most common natural disasters. This module provides essential knowledge for flood preparedness, response, and recovery to minimize risks and protect lives.`,
        procedures: `Flood Response Procedures:\n\n1. MONITOR - Stay informed about weather conditions\n2. PREPARE - Gather emergency supplies and documents\n3. EVACUATE - Leave early when advised by authorities\n4. AVOID - Never drive or walk through flood waters\n\nRemember: Turn around, don't drown. Just 6 inches of moving water can knock you down.`,
        checklist: `Flood Preparedness Checklist:\n\n✓ Create a family emergency plan\n✓ Prepare an emergency supply kit\n✓ Know your evacuation routes\n✓ Protect important documents\n✓ Install sump pumps and backup power\n✓ Review insurance coverage regularly`,
      },
    },
    {
      id: "earthquake-safety",
      title: "Earthquake Safety & Response",
      subtitle: "Seismic emergency preparedness",
      description:
        "Learn earthquake safety protocols, structural awareness, and emergency response procedures for seismic events.",
      image:
        "https://plus.unsplash.com/premium_photo-1695566086196-1cdadbaa1988?w=400&h=300&fit=crop",
      video: "https://www.youtube.com/embed/MllUVQM3KVk?autoplay=1",
      severity: "high",
      duration: "40 min",
      participants: "2.1k+",
      difficulty: "beginner",
      category: "natural",
      keyTopics: [
        "Drop Cover Hold",
        "Structural Safety",
        "Emergency Kits",
        "Aftershocks",
        "Communication",
        "Recovery",
      ],
      objectives: [
        "Master Drop, Cover, and Hold techniques",
        "Identify safe and unsafe locations",
        "Prepare earthquake emergency kits",
        "Understand aftershock safety",
      ],
      prerequisites: "None required",
      detailedContent: {
        overview: `Earthquakes can strike without warning. This module teaches essential earthquake safety techniques and preparedness strategies to protect yourself and others during seismic events.`,
        procedures: `Earthquake Response Procedures:\n\n1. DROP - Get down on hands and knees\n2. COVER - Take cover under a sturdy desk or table\n3. HOLD ON - Hold onto your shelter and protect your head\n\nIf outdoors: Move away from buildings, trees, and power lines. If driving: Pull over safely and stay in the vehicle.`,
        checklist: `Earthquake Preparedness Checklist:\n\n✓ Secure heavy furniture and appliances\n✓ Create an earthquake emergency kit\n✓ Identify safe spots in each room\n✓ Practice Drop, Cover, and Hold drills\n✓ Know how to turn off utilities\n✓ Establish family communication plan`,
      },
    },
    {
      id: "medical-emergency",
      title: "Medical Emergency Response",
      subtitle: "First aid and emergency care",
      description:
        "Essential first aid skills, CPR techniques, and medical emergency response procedures for various health crises.",
      image:
        "https://images.unsplash.com/photo-1564732005956-20420ebdab60?w=400&h=300&fit=crop",
      video: "https://www.youtube.com/embed/s1R0dL1VB0I?autoplay=1",
      severity: "medium",
      duration: "60 min",
      participants: "3.2k+",
      difficulty: "intermediate",
      category: "medical",
      keyTopics: [
        "CPR",
        "First Aid",
        "Shock Treatment",
        "AED Usage",
        "Wound Care",
        "Emergency Calls",
      ],
      objectives: [
        "Perform basic CPR and rescue breathing",
        "Use an Automated External Defibrillator (AED)",
        "Treat common injuries and wounds",
        "Recognize signs of medical emergencies",
      ],
      prerequisites: "None required",
      detailedContent: {
        overview: `Medical emergencies require immediate and proper response. This module covers essential first aid skills and emergency medical procedures that can save lives in critical situations.`,
        procedures: `Medical Emergency Response:\n\n1. ASSESS - Check for responsiveness and breathing\n2. ALERT - Call emergency services (911)\n3. ASSIST - Provide appropriate first aid\n4. ARRANGE - Prepare for professional medical help\n\nRemember: Your safety comes first. Never put yourself in danger while helping others.`,
        checklist: `Medical Emergency Checklist:\n\n✓ Learn basic CPR and first aid techniques\n✓ Know location of AED devices\n✓ Keep first aid kit stocked and accessible\n✓ Know emergency contact numbers\n✓ Practice emergency scenarios regularly\n✓ Stay current with first aid certifications`,
      },
    },
    {
      id: "security-threats",
      title: "Security Threat Response",
      subtitle: "Personal and facility security",
      description:
        "Security awareness, threat assessment, and emergency response procedures for various security situations.",
      image:
        "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?w=400&h=300&fit=crop",
      video: "https://www.youtube.com/embed/lD3SadhsQNg?autoplay=1",
      severity: "medium",
      duration: "35 min",
      participants: "1.5k+",
      difficulty: "beginner",
      category: "security",
      keyTopics: [
        "Threat Assessment",
        "Lockdown Procedures",
        "Evacuation vs Shelter",
        "Communication",
        "Personal Safety",
        "Reporting",
      ],
      objectives: [
        "Recognize potential security threats",
        "Execute lockdown and evacuation procedures",
        "Maintain situational awareness",
        "Report suspicious activities properly",
      ],
      prerequisites: "None required",
      detailedContent: {
        overview: `Security threats require quick thinking and proper response. This module teaches threat recognition, response procedures, and personal safety strategies for various security situations.`,
        procedures: `Security Threat Response:\n\n1. RECOGNIZE - Identify potential threats early\n2. REPORT - Alert authorities immediately\n3. RESPOND - Follow established procedures\n4. RECOVER - Assist with post-incident procedures\n\nRemember: Trust your instincts. If something seems wrong, report it to authorities.`,
        checklist: `Security Preparedness Checklist:\n\n✓ Know emergency contact numbers\n✓ Understand lockdown procedures\n✓ Identify safe rooms and exits\n✓ Practice situational awareness\n✓ Report suspicious activities\n✓ Keep emergency communication devices charged`,
      },
    },
    {
      id: "chemical-spill",
      title: "Chemical Spill Response",
      subtitle: "Hazardous material safety",
      description:
        "Chemical safety protocols, spill response procedures, and protective measures for hazardous material incidents.",
      image:
        "https://plus.unsplash.com/premium_photo-1664300765506-d9ba0028b0a7?w=400&h=300&fit=crop",
      video: "https://www.youtube.com/embed/GPux33UVG_c?autoplay=1",
      severity: "high",
      duration: "55 min",
      participants: "900+",
      difficulty: "advanced",
      category: "security",
      keyTopics: [
        "Chemical Identification",
        "PPE Usage",
        "Containment",
        "Evacuation",
        "Decontamination",
        "Reporting",
      ],
      objectives: [
        "Identify hazardous chemicals and their risks",
        "Use personal protective equipment properly",
        "Execute spill containment procedures",
        "Perform emergency decontamination",
      ],
      prerequisites: "Basic safety training required",
      detailedContent: {
        overview: `Chemical spills pose serious health and environmental risks. This advanced module covers identification, containment, and response procedures for hazardous material incidents.`,
        procedures: `Chemical Spill Response:\n\n1. IDENTIFY - Determine the type of chemical involved\n2. ISOLATE - Secure the area and prevent exposure\n3. INFORM - Alert emergency responders immediately\n4. IMPLEMENT - Follow specific response procedures\n\nRemember: Never attempt to clean up unknown chemicals without proper training and equipment.`,
        checklist: `Chemical Safety Checklist:\n\n✓ Know chemical inventory and locations\n✓ Understand Safety Data Sheets (SDS)\n✓ Locate emergency equipment and PPE\n✓ Know evacuation routes and procedures\n✓ Practice spill response drills\n✓ Maintain emergency contact information`,
      },
    },
  ];

  // Initialize modules and progress on component mount
  useEffect(() => {
    setModules(mockModules);
    setFilteredModules(mockModules);

    // Load progress from localStorage
    const savedProgress = localStorage.getItem("training-progress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    } else {
      // Initialize with some sample progress
      const initialProgress = {
        "fire-safety": 75,
        "flood-response": 100,
        "earthquake-safety": 50,
        "medical-emergency": 25,
        "security-threats": 0,
        "chemical-spill": 0,
      };
      setUserProgress(initialProgress);
      localStorage.setItem(
        "training-progress",
        JSON.stringify(initialProgress)
      );
    }
  }, []);

  // Filter modules based on search and filters
  useEffect(() => {
    let filtered = modules;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(
        (module) =>
          module.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
          module.description
            ?.toLowerCase()
            ?.includes(searchTerm?.toLowerCase()) ||
          module.keyTopics?.some((topic) =>
            topic?.toLowerCase()?.includes(searchTerm?.toLowerCase())
          )
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(
        (module) => module.category === filters?.category
      );
    }

    // Apply difficulty filter
    if (filters?.difficulty) {
      filtered = filtered?.filter(
        (module) => module.difficulty === filters?.difficulty
      );
    }

    // Apply severity filter
    if (filters?.severity) {
      filtered = filtered?.filter(
        (module) => module.severity === filters?.severity
      );
    }

    setFilteredModules(filtered);
  }, [modules, searchTerm, filters]);

  const handleStartModule = (moduleId) => {
    const module = modules?.find((m) => m?.id === moduleId);
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const handleCompleteModule = (moduleId) => {
    const newProgress = { ...userProgress, [moduleId]: 100 };
    setUserProgress(newProgress);
    localStorage.setItem("training-progress", JSON.stringify(newProgress));
    setIsModalOpen(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilters({});
  };

  // Calculate overall progress
  const completedModules = Object.values(userProgress)?.filter(
    (progress) => progress === 100
  )?.length;
  const totalModules = modules?.length;
  const overallProgress = Math.round(
    Object.values(userProgress)?.reduce((sum, progress) => sum + progress, 0) /
      totalModules
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl">
              <Icon
                name="GraduationCap"
                size={32}
                color="var(--color-primary)"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Training Modules
              </h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive disaster preparedness education and emergency
                response training
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="BookOpen" size={16} />
              <span>{totalModules} modules available</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              <span>12k+ students enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span>Average 45 min per module</span>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <ProgressOverview
          overallProgress={overallProgress}
          completedModules={completedModules}
          totalModules={totalModules}
          streakDays={7}
          badges={3}
        />

        {/* Filter and Search */}
        <FilterSearch
          onSearch={handleSearch}
          onFilter={handleFilter}
          filters={filters}
          onClearFilters={handleClearFilters}
        />

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-foreground">
              {searchTerm || Object.keys(filters)?.some((key) => filters?.[key])
                ? `${filteredModules?.length} modules found`
                : "All Training Modules"}
            </h2>
            {(searchTerm ||
              Object.keys(filters)?.some((key) => filters?.[key])) && (
              <Button
                variant="ghost"
                size="sm"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={handleClearFilters}
              >
                Show All
              </Button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Filter" size={16} />
            <span>Sort by relevance</span>
          </div>
        </div>

        {/* Training Modules Grid */}
        {filteredModules?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredModules?.map((module) => (
              <TrainingCard
                key={module.id}
                module={module}
                video={module.video}
                progress={userProgress?.[module.id] || 0}
                onStartModule={handleStartModule}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
              <Icon
                name="Search"
                size={32}
                color="var(--color-muted-foreground)"
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No modules found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters to find relevant
              training modules.
            </p>
            <Button
              variant="outline"
              onClick={handleClearFilters}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
            <Icon name="Target" size={32} color="var(--color-primary)" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Ready to Test Your Knowledge?
          </h3>
          <p className="text-muted-foreground mb-4">
            Complete training modules and test your understanding with
            interactive quizzes.
          </p>
          <Button
            variant="default"
            iconName="Brain"
            iconPosition="left"
            onClick={() => (window.location.href = "/interactive-quizzes")}
          >
            Take Interactive Quizzes
          </Button>
        </div>
      </main>
      {/* Module Modal */}
      <ModuleModal
        module={selectedModule}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        video={selectedModule?.video}
        onComplete={handleCompleteModule}
      />
    </div>
  );
};

export default TrainingModules;
