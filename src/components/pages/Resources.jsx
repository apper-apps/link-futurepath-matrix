import { motion } from "framer-motion";
import ContentGrid from "@/components/organisms/ContentGrid";

const Resources = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Learning <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover our comprehensive collection of courses, articles, and videos designed to accelerate your professional growth.
          </p>
        </div>
        
        <ContentGrid showFilters={true} />
      </div>
    </motion.div>
  );
};

export default Resources;