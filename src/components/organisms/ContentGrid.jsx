import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ContentCard from "@/components/molecules/ContentCard";
import SearchBar from "@/components/molecules/SearchBar";
import FilterSelect from "@/components/molecules/FilterSelect";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import contentService from "@/services/api/contentService";
import { useMember } from "@/hooks/useMember";

const ContentGrid = ({ showFilters = true, filterByTier = null }) => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTier, setSelectedTier] = useState(filterByTier || "");
  
  const navigate = useNavigate();
  const { member } = useMember();

  const loadContent = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contentService.getAll();
      setContent(data);
      setFilteredContent(data);
    } catch (err) {
      setError(err.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    let filtered = [...content];

    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (selectedTier) {
      if (selectedTier === "free") {
        filtered = filtered.filter(item => item.tier === "free");
      } else if (selectedTier === "premium") {
        filtered = filtered.filter(item => item.tier === "premium");
      }
    }

    setFilteredContent(filtered);
  }, [content, searchQuery, selectedCategory, selectedTier]);

  const handleContentClick = (contentItem) => {
    if (contentItem.tier === "premium" && member?.tier !== "premium") {
      toast.warning("This content requires a premium membership!");
      navigate("/pricing");
      return;
    }
    
    // In a real app, this would navigate to the content details page
    toast.success(`Opening: ${contentItem.title}`);
  };

  const categories = contentService.getCategories();
  const categoryOptions = categories.map(cat => ({
    value: cat,
    label: cat
  }));

  const tierOptions = [
    { value: "free", label: "Free Content" },
    { value: "premium", label: "Premium Content" }
  ];

  if (loading) return <Loading variant="grid" message="Loading content..." />;
  if (error) return <Error message={error} onRetry={loadContent} />;

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar 
            placeholder="Search courses, articles, videos..."
            onSearch={setSearchQuery}
            className="flex-1"
          />
          <FilterSelect
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="All Categories"
            className="sm:w-48"
          />
          {!filterByTier && (
            <FilterSelect
              options={tierOptions}
              value={selectedTier}
              onChange={setSelectedTier}
              placeholder="All Tiers"
              className="sm:w-48"
            />
          )}
        </div>
      )}

      {filteredContent.length === 0 ? (
        searchQuery || selectedCategory || selectedTier ? (
          <Empty variant="search" />
        ) : (
          <Empty 
            title="No Content Available"
            description="Check back soon for new learning resources and courses."
            icon="BookOpen"
          />
        )
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredContent.map((item, index) => (
            <motion.div
              key={item.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ContentCard
                content={item}
                memberTier={member?.tier}
                onClick={() => handleContentClick(item)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ContentGrid;