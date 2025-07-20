import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import MembershipBadge from "@/components/molecules/MembershipBadge";
import ApperIcon from "@/components/ApperIcon";
import { useMember } from "@/hooks/useMember";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { member } = useMember();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources" },
    { name: "Pricing", href: "/pricing" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Account", href: "/account" }
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-orange-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">FuturePath</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-primary-700 bg-primary-50"
                    : "text-gray-700 hover:text-primary-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {member && (
              <div className="flex items-center space-x-3">
                <MembershipBadge tier={member.tier} />
                {member.tier === "free" && (
                  <Link to="/pricing">
                    <Button variant="secondary" size="sm">
                      <ApperIcon name="Crown" size={16} className="mr-2" />
                      Upgrade
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-primary-700 bg-primary-50"
                      : "text-gray-700 hover:text-primary-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {member && (
                <div className="pt-4 pb-2 border-t border-gray-200">
                  <div className="flex items-center justify-between px-3 py-2">
                    <MembershipBadge tier={member.tier} />
                    {member.tier === "free" && (
                      <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="secondary" size="sm">
                          <ApperIcon name="Crown" size={16} className="mr-1" />
                          Upgrade
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;