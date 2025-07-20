import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text", 
  className, 
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 bg-white placeholder-gray-500",
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;