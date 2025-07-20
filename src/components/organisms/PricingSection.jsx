import { useState } from "react";
import { toast } from "react-toastify";
import PricingCard from "@/components/molecules/PricingCard";
import { useMember } from "@/hooks/useMember";

const PricingSection = () => {
  const [loading, setLoading] = useState(false);
  const { member, upgradeToPremium, cancelSubscription } = useMember();

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      await upgradeToPremium();
      toast.success("Successfully upgraded to Premium! 🎉");
    } catch (error) {
      toast.error("Upgrade failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel your premium subscription?")) {
      return;
    }
    
    try {
      setLoading(true);
      await cancelSubscription();
      toast.info("Subscription cancelled successfully");
    } catch (error) {
      toast.error("Failed to cancel subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const freePlan = {
    title: "Free Membership",
    price: "0",
    description: "Get started with essential resources",
    features: [
      "Access to basic articles and guides",
      "Limited course previews",
      "Community forum access",
      "Monthly newsletter",
      "Basic career assessments"
    ],
    buttonText: member?.tier === "free" ? "Current Plan" : "Get Started Free",
    current: member?.tier === "free",
    onButtonClick: () => toast.info("You already have access to free content!")
  };

  const premiumPlan = {
    title: "Premium Membership",
    price: "29",
    period: "month",
    description: "Unlock your full potential",
    features: [
      "All free content plus premium courses",
      "1-on-1 mentorship sessions",
      "Advanced career coaching",
      "Exclusive webinars and events",
      "Downloadable resources and templates",
      "Priority community support",
      "Certificate upon course completion"
    ],
    buttonText: member?.tier === "premium" ? "Manage Subscription" : "Upgrade to Premium",
    popular: true,
    current: member?.tier === "premium",
    onButtonClick: member?.tier === "premium" ? handleCancel : handleUpgrade,
    loading
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <PricingCard {...freePlan} />
      <PricingCard {...premiumPlan} />
    </div>
  );
};

export default PricingSection;