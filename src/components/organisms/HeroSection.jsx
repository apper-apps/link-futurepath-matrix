import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { useMember } from "@/hooks/useMember";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { member, createFreeMember } = useMember();

  const handleFreeSignup = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await createFreeMember(email);
      toast.success("Welcome to FuturePath! Your free membership is ready.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Active Members", value: "10,000+" },
    { label: "Premium Courses", value: "50+" },
    { label: "Success Rate", value: "95%" }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-orange-50">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-orange-500/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Accelerate Your{" "}
              <span className="gradient-text">Career Journey</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of professionals who have transformed their careers with our premium 
              educational content, expert mentorship, and proven strategies.
            </p>

            {!member && (
              <form onSubmit={handleFreeSignup} className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Zap" size={16} className="mr-2" />
                        Start Free
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  No credit card required. Upgrade anytime.
                </p>
              </form>
            )}

            {member && (
              <div className="mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Welcome back!</h3>
                      <p className="text-gray-600">Ready to continue your journey?</p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => navigate("/dashboard")}
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop"
                  alt="Professional development"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <ApperIcon name="TrendingUp" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Career Growth</div>
                    <div className="text-xs text-gray-500">+25% average increase</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-orange-500 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Users" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Community</div>
                    <div className="text-xs text-gray-500">Join 10k+ members</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;