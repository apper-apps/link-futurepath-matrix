import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const FilterSelect = forwardRef(({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select...",
  className,
  ...props 
}, ref) => {
  return (
    <div className={cn("relative", className)}>
      <select
        ref={ref}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 appearance-none cursor-pointer"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
      </div>
    </div>
  );
});

FilterSelect.displayName = "FilterSelect";

export default FilterSelect;