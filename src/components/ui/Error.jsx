import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  showRetry = true,
  variant = "default" 
}) => {
  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
        <ApperIcon name="AlertCircle" size={20} className="text-red-500 mr-2" />
        <span className="text-red-700">{message}</span>
        {showRetry && onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className="ml-3 text-red-600 hover:text-red-700"
          >
            Retry
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" size={24} className="text-red-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops!</h3>
      <p className="text-gray-600 mb-6 max-w-md">{message}</p>
      
      {showRetry && onRetry && (
        <Button
          variant="primary"
          onClick={onRetry}
          className="inline-flex items-center"
        >
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;