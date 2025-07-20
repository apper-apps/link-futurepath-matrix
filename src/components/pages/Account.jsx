import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import MembershipBadge from "@/components/molecules/MembershipBadge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { useMember } from "@/hooks/useMember";
import { format } from "date-fns";

const Account = () => {
  const [loading, setLoading] = useState(false);
  const { member, loading: memberLoading, error, upgradeToPremium, cancelSubscription } = useMember();

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
    if (!window.confirm("Are you sure you want to cancel your premium subscription? You'll lose access to premium features at the end of your current billing period.")) {
      return;
    }
    
    try {
      setLoading(true);
      await cancelSubscription();
      toast.info("Subscription cancelled successfully. You'll continue to have premium access until the end of your current billing period.");
    } catch (error) {
      toast.error("Failed to cancel subscription. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (memberLoading) return <Loading message="Loading account information..." />;
  if (error) return <Error message={error} />;
  if (!member) return <Error message="No account information found" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your membership and account preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Information */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <ApperIcon name="Mail" size={16} className="text-gray-400 mr-3" />
                  <span className="text-gray-900">{member.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <ApperIcon name="Calendar" size={16} className="text-gray-400 mr-3" />
                  <span className="text-gray-900">
                    {format(new Date(member.joinedAt), "MMMM d, yyyy")}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Membership Status</label>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <ApperIcon name="User" size={16} className="text-gray-400 mr-3" />
                  <MembershipBadge tier={member.tier} />
                </div>
              </div>
            </div>
          </Card>

          {/* Membership Management */}
          <Card className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Membership Management</h2>
            
            {member.tier === "free" ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Crown" size={24} className="text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upgrade to Premium</h3>
                <p className="text-gray-600 mb-6">
                  Unlock premium courses, mentorship programs, and exclusive resources for just $29/month.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
                    Access to all premium courses
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
                    1-on-1 mentorship sessions
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
                    Exclusive webinars and events
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <ApperIcon name="Check" size={16} className="text-green-500 mr-2" />
                    Course completion certificates
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleUpgrade}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Zap" size={16} className="mr-2" />
                      Upgrade to Premium - $29/month
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="Check" size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Member</h3>
                <p className="text-gray-600 mb-6">
                  You have access to all premium features and content. Thank you for being a valued member!
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ApperIcon name="CreditCard" size={16} className="text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">Active Subscription</span>
                    </div>
                    <span className="text-sm text-green-600">$29/month</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="X" size={16} className="mr-2" />
                      Cancel Subscription
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 mt-3">
                  You'll continue to have premium access until the end of your current billing period.
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Additional Account Actions */}
        <Card className="p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="Download" size={20} className="text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Export Data</h3>
                <p className="text-sm text-gray-600">Download your account information</p>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>

            <div className="flex items-center p-4 border border-gray-200 rounded-lg">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="HelpCircle" size={20} className="text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Get Help</h3>
                <p className="text-sm text-gray-600">Contact our support team</p>
              </div>
              <Button variant="outline" size="sm">
                Contact
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default Account;