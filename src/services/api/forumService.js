import forumData from "@/services/mockData/forum.json";

class ForumService {
  constructor() {
    this.discussions = [...forumData.discussions];
    this.replies = [...forumData.replies];
    this.lastDiscussionId = Math.max(...this.discussions.map(d => d.Id), 0);
    this.lastReplyId = Math.max(...this.replies.map(r => r.Id), 0);
  }

  async getAllDiscussions() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.discussions];
  }

  async getDiscussionsByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.discussions.filter(d => d.category === category);
  }

  async getDiscussionById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const discussion = this.discussions.find(d => d.Id === parseInt(id));
    if (!discussion) {
      throw new Error("Discussion not found");
    }
    return { ...discussion };
  }

  async createDiscussion(discussionData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newDiscussion = {
      ...discussionData,
      Id: ++this.lastDiscussionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replyCount: 0
    };
    this.discussions.unshift(newDiscussion);
    return { ...newDiscussion };
  }

  async updateDiscussion(id, data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.discussions.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Discussion not found");
    }
    this.discussions[index] = {
      ...this.discussions[index],
      ...data,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    return { ...this.discussions[index] };
  }

  async deleteDiscussion(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.discussions.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Discussion not found");
    }
    this.discussions.splice(index, 1);
    // Also delete associated replies
    this.replies = this.replies.filter(r => r.discussionId !== parseInt(id));
    return true;
  }

  async getRepliesByDiscussion(discussionId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.replies
      .filter(r => r.discussionId === parseInt(discussionId))
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  async createReply(replyData) {
    await new Promise(resolve => setTimeout(resolve, 350));
    const newReply = {
      ...replyData,
      Id: ++this.lastReplyId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.replies.push(newReply);
    
    // Update reply count in discussion
    const discussionIndex = this.discussions.findIndex(d => d.Id === parseInt(replyData.discussionId));
    if (discussionIndex !== -1) {
      this.discussions[discussionIndex].replyCount++;
      this.discussions[discussionIndex].updatedAt = new Date().toISOString();
    }
    
    return { ...newReply };
  }

  async updateReply(id, data) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.replies.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Reply not found");
    }
    this.replies[index] = {
      ...this.replies[index],
      ...data,
      Id: parseInt(id),
      updatedAt: new Date().toISOString()
    };
    return { ...this.replies[index] };
  }

  async deleteReply(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = this.replies.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Reply not found");
    }
    const reply = this.replies[index];
    this.replies.splice(index, 1);
    
    // Update reply count in discussion
    const discussionIndex = this.discussions.findIndex(d => d.Id === reply.discussionId);
    if (discussionIndex !== -1) {
      this.discussions[discussionIndex].replyCount--;
    }
    
    return true;
  }

  getCategories() {
    return [
      "Career Development",
      "Leadership",
      "Business Skills",
      "Personal Development",
      "Interview Skills",
      "Professional Skills",
      "Marketing",
      "Mentorship"
    ];
  }
}

export default new ForumService();