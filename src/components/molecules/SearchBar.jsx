import { useState } from "react";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ placeholder = "Search content...", onSearch, className }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" size={20} className="text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        className="pl-10 pr-10"
      />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600"
        >
          <ApperIcon name="X" size={20} className="text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;