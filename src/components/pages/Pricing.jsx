import { motion } from "framer-motion";
import PricingSection from "@/components/organisms/PricingSection";
import ApperIcon from "@/components/ApperIcon";

const Pricing = () => {
  const faqs = [
    {
      question: "Can I switch between plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial for Premium?",
      answer: "We offer a comprehensive free membership that gives you access to basic content. You can upgrade to Premium anytime to unlock advanced features."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, MasterCard, and American Express through our secure Stripe integration."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Absolutely! You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing period."
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
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Choose Your <span className="gradient-text">Membership</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with our free membership and upgrade anytime to unlock premium content, 
              mentorship, and advanced career resources.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <PricingSection />
        </motion.div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Feature Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { feature: "Basic articles and guides", free: true, premium: true },
                    { feature: "Community forum access", free: true, premium: true },
                    { feature: "Monthly newsletter", free: true, premium: true },
                    { feature: "Premium courses", free: false, premium: true },
                    { feature: "1-on-1 mentorship", free: false, premium: true },
                    { feature: "Advanced career coaching", free: false, premium: true },
                    { feature: "Exclusive webinars", free: false, premium: true },
                    { feature: "Downloadable resources", free: false, premium: true },
                    { feature: "Course certificates", free: false, premium: true }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-gray-900">{row.feature}</td>
                      <td className="text-center py-4 px-6">
                        {row.free ? (
                          <ApperIcon name="Check" size={20} className="text-green-500 mx-auto" />
                        ) : (
                          <ApperIcon name="X" size={20} className="text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="text-center py-4 px-6">
                        <ApperIcon name="Check" size={20} className="text-green-500 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pricing;