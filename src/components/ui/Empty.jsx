import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "There are no items to display at the moment.",
  actionLabel,
  onAction,
  icon = "Search",
  variant = "default"
}) => {
  if (variant === "search") {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ApperIcon name="Search" size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-600 max-w-md">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  if (variant === "premium") {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name="Crown" size={32} className="text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Unlock Premium Content</h3>
        <p className="text-gray-600 max-w-md mb-6">
          Upgrade to premium membership to access exclusive courses, mentorship programs, and advanced resources.
        </p>
        {onAction && (
          <Button variant="primary" onClick={onAction} size="lg">
            <ApperIcon name="Zap" size={16} className="mr-2" />
            Upgrade to Premium
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} size={24} className="text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;