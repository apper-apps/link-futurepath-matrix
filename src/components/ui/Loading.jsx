import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading...", variant = "default" }) => {
  if (variant === "skeleton") {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 rounded-lg aspect-video mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 rounded-xl aspect-video mb-4"></div>
            <div className="space-y-3 p-4">
              <div className="flex justify-between">
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              </div>
              <div className="h-5 bg-gray-300 rounded w-4/5"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon name="Zap" size={20} className="text-primary-600 animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export default Loading;