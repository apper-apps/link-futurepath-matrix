import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Footer = () => {
  const footerLinks = {
    Company: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" }
    ],
    Resources: [
      { name: "All Resources", href: "/resources" },
      { name: "Free Content", href: "/resources?tier=free" },
      { name: "Premium Content", href: "/resources?tier=premium" }
    ],
    Support: [
      { name: "Help Center", href: "/help" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-orange-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold">FuturePath</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering professionals with premium educational content and career guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <ApperIcon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <ApperIcon name="Linkedin" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <ApperIcon name="Youtube" size={20} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} FuturePath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;