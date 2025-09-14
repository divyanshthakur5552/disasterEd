import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ModuleModal = ({ module, isOpen, onClose, onComplete, video }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !module) return null;

  const sections = [
    {
      id: "overview",
      title: "Module Overview",
      icon: "BookOpen",
      content:
        module.detailedContent?.overview ||
        `Learn comprehensive ${module.title?.toLowerCase()} safety protocols and emergency response procedures. This module covers essential knowledge for protecting yourself and others during ${module.title?.toLowerCase()} emergencies.`,
    },
    {
      id: "procedures",
      title: "Safety Procedures",
      icon: "Shield",
      content:
        module.detailedContent?.procedures ||
        `Step-by-step safety procedures for ${module.title?.toLowerCase()} situations:\n\n1. Immediate Response Actions\n2. Evacuation Procedures\n3. Communication Protocols\n4. Post-Emergency Actions\n\nFollow these procedures carefully to ensure maximum safety during emergencies.`,
    },
    {
      id: "video",
      title: "Training Video",
      icon: "Play",
      content:
        "Watch the comprehensive training video to see safety procedures in action.",
    },
    {
      id: "checklist",
      title: "Safety Checklist",
      icon: "CheckSquare",
      content:
        module.detailedContent?.checklist ||
        `Essential safety checklist for ${module.title?.toLowerCase()}:\n\n✓ Know evacuation routes\n✓ Identify safety equipment locations\n✓ Understand emergency signals\n✓ Practice response procedures\n✓ Keep emergency contacts ready\n\nRegularly review and practice these items.`,
    },
  ];

  const handleSectionComplete = (sectionIndex) => {
    const newCompleted = new Set(completedSections);
    newCompleted?.add(sectionIndex);
    setCompletedSections(newCompleted);

    if (newCompleted?.size === sections?.length) {
      onComplete(module.id);
    }
  };

  const handleNext = () => {
    if (currentSection < sections?.length - 1) {
      handleSectionComplete(currentSection);
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const currentSectionData = sections?.[currentSection];
  const progress = ((currentSection + 1) / sections?.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-elevation-8 w-full max-w-4xl max-h-[90vh] mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <Icon
                name={currentSectionData?.icon}
                size={24}
                color="var(--color-primary)"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {module.title}
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentSectionData?.title}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Section {currentSection + 1} of {sections?.length}
            </span>
            <span className="text-sm font-bold text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentSectionData?.id === "video" ? (
            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {showVideo ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`${video}`}
                    title={`${module.title} Training Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-black/90">
                    <Button
                      variant="default"
                      size="lg"
                      iconName="Play"
                      iconPosition="left"
                      onClick={() => setShowVideo(true)}
                    >
                      Play Training Video
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground text-center">
                Watch this comprehensive training video to understand{" "}
                {module.title?.toLowerCase()} safety procedures.
              </p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-line text-foreground leading-relaxed">
                {currentSectionData?.content}
              </div>
            </div>
          )}
        </div>

        {/* Section Navigation */}
        <div className="px-6 py-3 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              {sections?.map((section, index) => (
                <button
                  key={section?.id}
                  onClick={() => setCurrentSection(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSection
                      ? "bg-primary"
                      : completedSections?.has(index)
                      ? "bg-success"
                      : "bg-muted"
                  }`}
                  title={section?.title}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              {completedSections?.size > 0 && (
                <span className="text-sm text-success flex items-center gap-1">
                  <Icon name="CheckCircle2" size={16} />
                  {completedSections?.size} completed
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentSection === 0}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => handleSectionComplete(currentSection)}
                iconName="Check"
                iconPosition="left"
              >
                Mark Complete
              </Button>

              {currentSection === sections?.length - 1 ? (
                <Button
                  variant="default"
                  onClick={() => {
                    handleSectionComplete(currentSection);
                    onClose();
                  }}
                  iconName="Award"
                  iconPosition="left"
                >
                  Finish Module
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleModal;
