import { motion } from "framer-motion";
import HeroSection from "@/components/organisms/HeroSection";
import BenefitsSection from "@/components/organisms/BenefitsSection";
import ContentGrid from "@/components/organisms/ContentGrid";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <BenefitsSection />
      
      {/* Featured Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="gradient-text">Resources</span>
            </h2>
            <p className="text-xl text-gray-600">
              Explore our most popular courses and articles to get started on your career journey.
            </p>
          </div>
          
          <ContentGrid showFilters={false} />
        </div>
      </section>
    </motion.div>
  );
};

export default Home;