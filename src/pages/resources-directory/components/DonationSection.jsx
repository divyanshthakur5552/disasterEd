import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DonationSection = ({ donationInfo, onCall, onShare }) => {
  return (
    <div className="bg-gradient-to-r from-success/10 to-accent/10 border border-success/20 rounded-lg p-6 mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-success/20 rounded-lg">
          <Icon name="HandHeart" size={24} color="var(--color-success)" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">Support Disaster Relief</h2>
          <p className="text-sm text-muted-foreground">Help affected communities through donations and volunteer work</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Information */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Donation Information</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Building2" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">{donationInfo?.organization}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">{donationInfo?.contact}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} color="var(--color-muted-foreground)" />
              <span className="text-sm text-foreground">{donationInfo?.email}</span>
            </div>

            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" className="mt-0.5" />
              <span className="text-sm text-foreground">{donationInfo?.address}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="success"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={() => onCall(donationInfo?.contact)}
              className="flex-1"
            >
              Contact for Donations
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Share2"
              onClick={() => onShare(donationInfo)}
            >
              Share
            </Button>
          </div>
        </div>

        {/* Volunteer Opportunities */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-3">Volunteer Opportunities</h3>
          
          <div className="space-y-3 mb-4">
            {donationInfo?.volunteerOpportunities?.map((opportunity, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 bg-muted/50 rounded-md">
                <Icon name="Users" size={16} color="var(--color-accent)" className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{opportunity?.title}</p>
                  <p className="text-xs text-muted-foreground">{opportunity?.description}</p>
                  <p className="text-xs text-accent font-medium mt-1">{opportunity?.commitment}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            onClick={() => onCall(donationInfo?.volunteerContact)}
            fullWidth
          >
            Join as Volunteer
          </Button>
        </div>
      </div>
      <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Heart" size={16} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Every Contribution Matters</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your support helps provide essential supplies, temporary shelter, and recovery assistance to disaster-affected communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSection;