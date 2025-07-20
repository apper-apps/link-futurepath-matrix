import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ContentCard = ({ content, memberTier, onClick }) => {
  const isLocked = content.tier === "premium" && memberTier !== "premium";

  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return "Play";
      case "course": return "BookOpen";
      default: return "FileText";
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        hover 
        className={`cursor-pointer relative overflow-hidden ${isLocked ? "opacity-75" : ""}`}
        onClick={onClick}
      >
        {isLocked && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-orange-500/20 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center">
              <ApperIcon name="Lock" size={32} className="text-primary-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-primary-700">Premium Only</span>
            </div>
          </div>
        )}
        
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={content.imageUrl} 
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={content.tier === "premium" ? "premium" : "free"}>
              {content.tier === "premium" ? "Premium" : "Free"}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
            <ApperIcon name={getTypeIcon(content.type)} size={16} className="text-white" />
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary-600 font-medium">{content.category}</span>
            <span className="text-sm text-gray-500">{formatDuration(content.duration)}</span>
          </div>
          
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {content.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {content.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContentCard;