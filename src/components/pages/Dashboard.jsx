import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import MembershipBadge from "@/components/molecules/MembershipBadge";
import ContentGrid from "@/components/organisms/ContentGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { useMember } from "@/hooks/useMember";
import contentService from "@/services/api/contentService";

const Dashboard = () => {
  const [recentContent, setRecentContent] = useState([]);
  const [stats, setStats] = useState({ total: 0, free: 0, premium: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const { member } = useMember();

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const allContent = await contentService.getAll();
      const freeContent = allContent.filter(c => c.tier === "free");
      const premiumContent = allContent.filter(c => c.tier === "premium");
      
      // Show recent content based on membership tier
      const accessibleContent = member?.tier === "premium" 
        ? allContent 
        : freeContent;
      
      setRecentContent(accessibleContent.slice(0, 6));
      setStats({
        total: allContent.length,
        free: freeContent.length,
        premium: premiumContent.length
      });
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [member]);

  if (loading) return <Loading message="Loading your dashboard..." />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const quickActions = [
    {
      title: "Browse All Resources",
      description: "Explore our complete library",
      icon: "BookOpen",
      href: "/resources",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "View Pricing",
      description: "Compare membership plans",
      icon: "CreditCard",
      href: "/pricing",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Account Settings",
      description: "Manage your membership",
      icon: "Settings",
      href: "/account",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back!
              </h1>
              <p className="text-gray-600">
                Continue your learning journey and track your progress.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <MembershipBadge tier={member?.tier} className="text-lg px-4 py-2" />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="BookOpen" size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Resources</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="Unlock" size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.free}</p>
                <p className="text-sm text-gray-600">Free Content</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                <ApperIcon name="Crown" size={24} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.premium}</p>
                <p className="text-sm text-gray-600">Premium Content</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={action.href}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] cursor-pointer">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mr-4`}>
                        <ApperIcon name={action.icon} size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Membership Status & Upgrade */}
        {member?.tier === "free" && (
          <div className="mb-8">
            <Card className="p-6 bg-gradient-to-r from-primary-50 to-orange-50 border-primary-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-4 sm:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Unlock Premium Content
                  </h3>
                  <p className="text-gray-600">
                    Get access to advanced courses, mentorship programs, and exclusive resources.
                  </p>
                </div>
                <Link to="/pricing">
                  <Button variant="primary" size="lg">
                    <ApperIcon name="Crown" size={16} className="mr-2" />
                    Upgrade Now
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* Recent Content */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {member?.tier === "premium" ? "Available Content" : "Free Content"}
            </h2>
            <Link to="/resources">
              <Button variant="outline">
                View All
                <ApperIcon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
          
          {recentContent.length === 0 ? (
            <Empty 
              title="No content available"
              description="Check back soon for new resources."
              icon="BookOpen"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentContent.map((content, index) => (
                <motion.div
                  key={content.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={content.imageUrl} 
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <MembershipBadge tier={content.tier} />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-primary-600 font-medium">{content.category}</span>
                        <span className="text-sm text-gray-500">{content.duration} min</span>
                      </div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {content.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {content.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;