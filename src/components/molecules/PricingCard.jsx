import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const PricingCard = ({ 
  title, 
  price, 
  period, 
  description, 
  features, 
  buttonText, 
  onButtonClick, 
  popular = false, 
  current = false,
  loading = false 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`relative p-8 h-full ${popular ? "border-2 border-primary-500 shadow-xl" : ""} ${current ? "bg-gradient-to-br from-primary-50 to-orange-50" : ""}`}>
        {popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-primary-600 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}

        {current && (
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              Current Plan
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold gradient-text">${price}</span>
            {period && <span className="text-gray-600 ml-2">/{period}</span>}
          </div>
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <ApperIcon name="Check" size={16} className="text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          variant={popular ? "primary" : "outline"}
          size="lg"
          className="w-full"
          onClick={onButtonClick}
          disabled={current || loading}
        >
          {loading ? (
            <>
              <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </Card>
    </motion.div>
  );
};

export default PricingCard;