import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ResourceCard from './components/ResourceCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import EmergencySection from './components/EmergencySection';
import DonationSection from './components/DonationSection';
import ResourceStats from './components/ResourceStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ResourcesDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Mock data for resources
  const resources = [
    {
      id: 1,
      name: "Disaster Mental Health Counseling Center",
      type: "Professional Counseling",
      category: "mental-health",
      priority: "high",
      icon: "Heart",
      description: `Specialized mental health services for disaster survivors including trauma counseling, PTSD treatment, and family therapy.\nProvides individual and group counseling sessions with licensed therapists experienced in disaster recovery.`,
      contact: "+91-9876543210",
      email: "counseling@disasterhealth.org",
      location: "123 Recovery Street, Mumbai, Maharashtra",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM",
      eligibility: "Open to all disaster survivors and their families",
      website: "https://disasterhealth.org"
    },
    {
      id: 2,
      name: "Central Relief Camp - Sector 15",
      type: "Temporary Shelter",
      category: "relief-camps",
      priority: "emergency",
      icon: "Home",
      description: `Primary relief camp providing temporary accommodation, food, medical care, and basic necessities for disaster-affected families.\nFully equipped with dormitories, kitchen facilities, medical station, and children's play area.`,
      contact: "+91-9876543211",
      email: "sector15camp@relief.gov.in",
      location: "Sector 15, Community Center, New Delhi",
      hours: "24/7 Operations",
      eligibility: "Families displaced by natural disasters with valid identification",
      website: "https://reliefcamps.gov.in"
    },
    {
      id: 3,
      name: "Student Crisis Helpline",
      type: "24/7 Crisis Support",
      category: "mental-health",
      priority: "emergency",
      icon: "Phone",
      description: `Dedicated crisis intervention helpline for students affected by disasters.\nProvides immediate emotional support, crisis counseling, and referrals to local mental health services.`,
      contact: "1800-123-4567",
      email: "crisis@studenthelp.org",
      location: "Available nationwide via phone and online chat",
      hours: "24/7 Emergency Helpline",
      eligibility: "Students aged 12-25 and their families"
    },
    {
      id: 4,
      name: "Community Food Distribution Center",
      type: "Food Assistance",
      category: "community-support",
      priority: "high",
      icon: "Users",
      description: `Community-operated food distribution center providing free meals and grocery packages to disaster-affected families.\nOffers nutritious meals, baby food, and special dietary accommodations.`,
      contact: "+91-9876543212",
      email: "food@communityaid.org",
      location: "456 Community Hall, Bangalore, Karnataka",
      hours: "Daily: 8:00 AM - 8:00 PM",
      eligibility: "Disaster-affected individuals and families with proof of impact"
    },
    {
      id: 5,
      name: "Emergency Medical Services",
      type: "Medical Care",
      category: "emergency-services",
      priority: "emergency",
      icon: "AlertTriangle",
      description: `Emergency medical services providing immediate healthcare, first aid, and medical evacuation for disaster victims.\nStaffed with paramedics, nurses, and emergency physicians.`,
      contact: "112",
      email: "emergency@medicalservices.gov.in",
      location: "Mobile units deployed across affected areas",
      hours: "24/7 Emergency Response",
      eligibility: "All individuals requiring emergency medical care"
    },
    {
      id: 6,
      name: "Disaster Relief Fund",
      type: "Financial Assistance",
      category: "donations",
      priority: "normal",
      icon: "HandHeart",
      description: `Official disaster relief fund accepting donations and providing financial assistance to affected families.\nTransparent fund management with regular updates on distribution and impact.`,
      contact: "+91-9876543213",
      email: "donations@relieffund.gov.in",
      location: "789 Government Complex, Chennai, Tamil Nadu",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM",
      eligibility: "Verified disaster-affected families eligible for financial aid"
    },
    {
      id: 7,
      name: "Educational Support Services",
      type: "Academic Assistance",
      category: "community-support",
      priority: "normal",
      icon: "BookOpen",
      description: `Educational support services helping students continue their studies after disasters.\nProvides temporary classrooms, study materials, tutoring, and psychological support for academic recovery.`,
      contact: "+91-9876543214",
      email: "education@disastersupport.org",
      location: "Multiple locations across affected districts",
      hours: "Mon-Sat: 8:00 AM - 6:00 PM",
      eligibility: "Students from disaster-affected schools and colleges"
    },
    {
      id: 8,
      name: "Family Reunification Center",
      type: "Family Services",
      category: "community-support",
      priority: "high",
      icon: "Users",
      description: `Specialized center helping families separated during disasters to reconnect and reunite.\nMaintains database of missing persons and coordinates with rescue teams and other relief centers.`,
      contact: "+91-9876543215",
      email: "reunification@familyservices.org",
      location: "101 Central Coordination Center, Hyderabad, Telangana",
      hours: "24/7 Operations",
      eligibility: "Families separated due to disaster events"
    }
  ];

  // Emergency mental health resources
  const emergencyResources = [
    {
      id: 'e1',
      name: "National Crisis Helpline",
      description: "Immediate crisis intervention and emotional support",
      contact: "1800-599-0019"
    },
    {
      id: 'e2',
      name: "Student Mental Health Emergency",
      description: "24/7 support specifically for students and young adults",
      contact: "1800-123-4567"
    },
    {
      id: 'e3',
      name: "Disaster Trauma Support",
      description: "Specialized trauma counseling for disaster survivors",
      contact: "+91-9876543216"
    }
  ];

  // Donation information
  const donationInfo = {
    organization: "National Disaster Relief Foundation",
    contact: "+91-9876543217",
    email: "donations@ndrf.gov.in",
    address: "456 Relief Headquarters, Sector 12, Noida, Uttar Pradesh 201301",
    volunteerContact: "+91-9876543218",
    volunteerOpportunities: [
      {
        title: "Relief Camp Volunteer",
        description: "Assist with camp operations, food distribution, and family support",
        commitment: "Minimum 4 hours per week"
      },
      {
        title: "Mental Health Support Volunteer",
        description: "Provide emotional support and companionship to survivors",
        commitment: "Training required, 6 hours per week"
      },
      {
        title: "Educational Support Volunteer",
        description: "Help students with studies and provide tutoring services",
        commitment: "Flexible schedule, 3-5 hours per week"
      }
    ]
  };

  // Categories for filtering
  const categories = ['all', 'mental-health', 'relief-camps', 'donations', 'community-support', 'emergency-services'];

  // Filter resources based on search term and category
  const filteredResources = useMemo(() => {
    return resources?.filter(resource => {
      const matchesSearch = resource?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          resource?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          resource?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          resource?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesCategory = activeCategory === 'all' || resource?.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  // Calculate stats
  const stats = {
    totalResources: resources?.length,
    emergencyServices: resources?.filter(r => r?.category === 'emergency-services')?.length,
    reliefCamps: resources?.filter(r => r?.category === 'relief-camps')?.length,
    mentalHealthServices: resources?.filter(r => r?.category === 'mental-health')?.length
  };

  // Handle phone calls
  const handleCall = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  // Handle sharing
  const handleShare = (resource) => {
    if (navigator.share) {
      navigator.share({
        title: resource?.name,
        text: resource?.description,
        url: window.location?.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `${resource?.name}\n${resource?.description}\n\nContact: ${resource?.contact}\nLocation: ${resource?.location}`;
      navigator.clipboard?.writeText(shareText)?.then(() => {
        alert('Resource information copied to clipboard!');
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="Library" size={32} color="var(--color-primary)" />
            </div>
          </div>
          <h1 className="font-heading font-bold text-4xl text-foreground mb-4">
            Resources Directory
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive post-disaster support information including mental health services, relief camps, 
            and community assistance programs for affected students and families.
          </p>
        </motion.div>

        {/* Resource Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ResourceStats stats={stats} />
        </motion.div>

        {/* Emergency Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EmergencySection 
            emergencyResources={emergencyResources}
            onCall={handleCall}
          />
        </motion.div>

        {/* Donation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <DonationSection 
            donationInfo={donationInfo}
            onCall={handleCall}
            onShare={handleShare}
          />
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
            <h2 className="font-heading font-semibold text-xl text-foreground mb-4">Find Resources</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-2">
                <SearchBar 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Search by name, type, location, or services..."
                />
              </div>
              <div>
                <Button
                  variant="outline"
                  iconName="MapPin"
                  iconPosition="left"
                  onClick={() => window.open('/safe-zones-map', '_blank')}
                  fullWidth
                >
                  View on Map
                </Button>
              </div>
            </div>

            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredResources?.length} of {resources?.length} resources
              {searchTerm && ` for "${searchTerm}"`}
              {activeCategory !== 'all' && ` in ${activeCategory?.replace('-', ' ')}`}
            </p>
            
            {filteredResources?.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => {
                  const resourceList = filteredResources?.map(r => 
                    `${r?.name}\nType: ${r?.type}\nContact: ${r?.contact}\nLocation: ${r?.location}\nHours: ${r?.hours}\n\n`
                  )?.join('');
                  
                  const blob = new Blob([resourceList], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'disaster-resources.txt';
                  a?.click();
                  URL.revokeObjectURL(url);
                }}
              >
                Export List
              </Button>
            )}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredResources?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredResources?.map((resource, index) => (
                <motion.div
                  key={resource?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <ResourceCard 
                    resource={resource}
                    onCall={handleCall}
                    onShare={handleShare}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                </div>
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">No Resources Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filter criteria to find relevant resources.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-muted/30 border border-border rounded-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you're experiencing a mental health crisis or emergency situation, don't wait. 
                Contact emergency services immediately.
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                  onClick={() => handleCall('112')}
                >
                  Emergency: 112
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Phone"
                  iconPosition="left"
                  onClick={() => handleCall('1800-599-0019')}
                >
                  Crisis Helpline
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Resource Updates</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Resource information is updated regularly. If you notice outdated information or 
                want to add a new resource, please contact us.
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="Mail"
                iconPosition="left"
                onClick={() => window.open('mailto:resources@disastered.org')}
              >
                Report Updates
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ResourcesDirectory;