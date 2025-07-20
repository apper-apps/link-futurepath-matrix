import contentData from "@/services/mockData/content.json";

class ContentService {
  constructor() {
    this.content = [...contentData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.content];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const item = this.content.find(c => c.Id === parseInt(id));
    if (!item) {
      throw new Error("Content not found");
    }
    return { ...item };
  }

  async getByTier(tier) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.content.filter(c => c.tier === tier || c.tier === "free");
  }

  async getByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.content.filter(c => c.category === category);
  }

  async getFreeContent() {
    return await this.getByTier("free");
  }

  async getPremiumContent() {
    await new Promise(resolve => setTimeout(resolve, 250));
    return this.content.filter(c => c.tier === "premium");
  }

  getCategories() {
    return [...new Set(this.content.map(c => c.category))];
  }
}

export default new ContentService();