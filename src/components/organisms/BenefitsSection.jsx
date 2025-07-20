import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "BookOpen",
      title: "Expert-Curated Content",
      description: "Access high-quality courses and resources created by industry leaders and career experts.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: "Users",
      title: "Mentorship Programs",
      description: "Get personalized guidance from experienced professionals in your field through 1-on-1 sessions.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: "TrendingUp",
      title: "Career Advancement",
      description: "Develop the skills and strategies needed to accelerate your career growth and achieve your goals.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: "Award",
      title: "Professional Certification",
      description: "Earn certificates upon completion to showcase your achievements and enhance your resume.",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: "MessageCircle",
      title: "Community Support",
      description: "Connect with like-minded professionals, share experiences, and build lasting professional relationships.",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: "Zap",
      title: "Continuous Learning",
      description: "Stay ahead with regularly updated content covering the latest industry trends and best practices.",
      gradient: "from-yellow-500 to-yellow-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="gradient-text">FuturePath</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive resources and personalized support to help you navigate 
              your career journey with confidence and achieve lasting success.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center mb-6`}>
                  <ApperIcon name={benefit.icon} size={24} className="text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have already accelerated their careers with FuturePath. 
              Start your journey today with our free membership.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-sm opacity-90">
                <ApperIcon name="Check" size={16} />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2 text-sm opacity-90">
                <ApperIcon name="Check" size={16} />
                <span>Upgrade anytime</span>
              </div>
              <div className="flex items-center space-x-2 text-sm opacity-90">
                <ApperIcon name="Check" size={16} />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;