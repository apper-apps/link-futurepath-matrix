import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import forumService from "@/services/api/forumService";
import { useMember } from "@/hooks/useMember";

const Forum = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showReplies, setShowReplies] = useState({});
  const [replies, setReplies] = useState({});
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
    category: ""
  });
  const [newReply, setNewReply] = useState({});

  const navigate = useNavigate();
  const { member } = useMember();

  // Check premium access
  useEffect(() => {
    if (member && member.tier !== "premium") {
      toast.warning("Forum access is available for premium members only!");
      navigate("/pricing");
      return;
    }
  }, [member, navigate]);

  const loadDiscussions = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await forumService.getAllDiscussions();
      setDiscussions(data);
      setFilteredDiscussions(data);
    } catch (err) {
      setError(err.message || "Failed to load discussions");
    } finally {
      setLoading(false);
    }
  };

  const loadReplies = async (discussionId) => {
    try {
      const repliesData = await forumService.getRepliesByDiscussion(discussionId);
      setReplies(prev => ({
        ...prev,
        [discussionId]: repliesData
      }));
    } catch (err) {
      toast.error("Failed to load replies");
    }
  };

  useEffect(() => {
    if (member?.tier === "premium") {
      loadDiscussions();
    }
  }, [member]);

  useEffect(() => {
    let filtered = [...discussions];
    
    if (selectedCategory) {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }
    
    // Sort by pinned first, then by updated date
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    setFilteredDiscussions(filtered);
  }, [discussions, selectedCategory]);

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();
    if (!newDiscussion.title.trim() || !newDiscussion.content.trim() || !newDiscussion.category) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      const discussionData = {
        ...newDiscussion,
        author: member.name || "Anonymous",
        authorAvatar: member.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      };
      
      const created = await forumService.createDiscussion(discussionData);
      setDiscussions(prev => [created, ...prev]);
      setNewDiscussion({ title: "", content: "", category: "" });
      setShowCreateForm(false);
      toast.success("Discussion created successfully!");
    } catch (err) {
      toast.error("Failed to create discussion");
    }
  };

  const handleCreateReply = async (discussionId) => {
    const content = newReply[discussionId]?.trim();
    if (!content) {
      toast.warning("Please enter a reply");
      return;
    }

    try {
      const replyData = {
        discussionId,
        content,
        author: member.name || "Anonymous",
        authorAvatar: member.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      };
      
      const created = await forumService.createReply(replyData);
      setReplies(prev => ({
        ...prev,
        [discussionId]: [...(prev[discussionId] || []), created]
      }));
      setNewReply(prev => ({ ...prev, [discussionId]: "" }));
      
      // Update discussion reply count
      setDiscussions(prev => 
        prev.map(d => 
          d.Id === discussionId 
            ? { ...d, replyCount: d.replyCount + 1, updatedAt: new Date().toISOString() }
            : d
        )
      );
      
      toast.success("Reply added successfully!");
    } catch (err) {
      toast.error("Failed to add reply");
    }
  };

  const toggleReplies = (discussionId) => {
    setShowReplies(prev => ({
      ...prev,
      [discussionId]: !prev[discussionId]
    }));
    
    if (!replies[discussionId]) {
      loadReplies(discussionId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const categories = forumService.getCategories();

  if (loading) return <Loading variant="page" message="Loading forum..." />;
  if (error) return <Error message={error} onRetry={loadDiscussions} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Premium <span className="gradient-text">Forum</span>
              </h1>
              <p className="text-lg text-gray-600">
                Connect with fellow premium members, share insights, and get expert advice
              </p>
            </div>
            <Button onClick={() => setShowCreateForm(true)} className="flex items-center">
              <ApperIcon name="Plus" size={16} className="mr-2" />
              New Discussion
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === "" ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("")}
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Create Discussion Form */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Create New Discussion</h3>
                <form onSubmit={handleCreateDiscussion} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Discussion title..."
                      value={newDiscussion.title}
                      onChange={(e) => setNewDiscussion(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <select
                      value={newDiscussion.category}
                      onChange={(e) => setNewDiscussion(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <textarea
                      placeholder="Write your discussion content..."
                      value={newDiscussion.content}
                      onChange={(e) => setNewDiscussion(prev => ({ ...prev, content: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit">Create Discussion</Button>
                    <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Discussions List */}
        {filteredDiscussions.length === 0 ? (
          selectedCategory ? (
            <Empty 
              title="No discussions in this category"
              description="Be the first to start a discussion in this category!"
              icon="MessageCircle"
            />
          ) : (
            <Empty 
              title="No discussions yet"
              description="Start the conversation by creating the first discussion!"
              icon="MessageCircle"
            />
          )
        ) : (
          <div className="space-y-4">
            {filteredDiscussions.map((discussion) => (
              <motion.div
                key={discussion.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={discussion.authorAvatar}
                      alt={discussion.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {discussion.title}
                        </h3>
                        {discussion.isPinned && (
                          <Badge variant="premium" className="text-xs">
                            <ApperIcon name="Pin" size={12} className="mr-1" />
                            Pinned
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                        <span>{discussion.author}</span>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {discussion.category}
                        </Badge>
                        <span>•</span>
                        <span>{formatDate(discussion.createdAt)}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {discussion.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleReplies(discussion.Id)}
                          className="flex items-center"
                        >
                          <ApperIcon name="MessageCircle" size={16} className="mr-2" />
                          {discussion.replyCount} {discussion.replyCount === 1 ? 'Reply' : 'Replies'}
                          <ApperIcon 
                            name={showReplies[discussion.Id] ? "ChevronUp" : "ChevronDown"} 
                            size={16} 
                            className="ml-2" 
                          />
                        </Button>
                        <span className="text-xs text-gray-500">
                          Last updated {formatDate(discussion.updatedAt)}
                        </span>
                      </div>

                      {/* Replies Section */}
                      <AnimatePresence>
                        {showReplies[discussion.Id] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-gray-200"
                          >
                            <div className="space-y-4">
                              {replies[discussion.Id]?.map((reply) => (
                                <div key={reply.Id} className="flex items-start gap-3">
                                  <img
                                    src={reply.authorAvatar}
                                    alt={reply.author}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <div className="flex-1 bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-sm font-medium text-gray-900">
                                        {reply.author}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {formatDate(reply.createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                              
                              {/* Reply Form */}
                              <div className="flex items-start gap-3 mt-4">
                                <img
                                  src={member?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
                                  alt="You"
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="flex-1 flex gap-2">
                                  <input
                                    type="text"
                                    placeholder="Write a reply..."
                                    value={newReply[discussion.Id] || ""}
                                    onChange={(e) => setNewReply(prev => ({
                                      ...prev,
                                      [discussion.Id]: e.target.value
                                    }))}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        handleCreateReply(discussion.Id);
                                      }
                                    }}
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => handleCreateReply(discussion.Id)}
                                    disabled={!newReply[discussion.Id]?.trim()}
                                  >
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Forum;