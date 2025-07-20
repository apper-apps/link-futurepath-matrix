import membersData from "@/services/mockData/members.json";

class MemberService {
  constructor() {
    this.members = [...membersData];
    this.currentMember = this.members[0]; // Demo user for testing
  }

  async getCurrentMember() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { ...this.currentMember };
  }

  async updateMemberTier(memberId, newTier, subscriptionData = null) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const memberIndex = this.members.findIndex(m => m.Id === parseInt(memberId));
    if (memberIndex === -1) {
      throw new Error("Member not found");
    }

    this.members[memberIndex] = {
      ...this.members[memberIndex],
      tier: newTier,
      ...subscriptionData
    };

    if (this.currentMember.Id === parseInt(memberId)) {
      this.currentMember = { ...this.members[memberIndex] };
    }

    return { ...this.members[memberIndex] };
  }

  async createFreeMember(email) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newId = Math.max(...this.members.map(m => m.Id)) + 1;
    const newMember = {
      Id: newId,
      email,
      tier: "free",
      stripeCustomerId: null,
      joinedAt: new Date().toISOString(),
      subscriptionId: null
    };

    this.members.push(newMember);
    this.currentMember = { ...newMember };
    
    return { ...newMember };
  }

  async simulateStripeUpgrade(memberId) {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate Stripe processing time
    
    const subscriptionData = {
      stripeCustomerId: `cus_${Date.now()}`,
      subscriptionId: `sub_${Date.now()}`,
      tier: "premium"
    };

    return await this.updateMemberTier(memberId, "premium", subscriptionData);
  }

  async cancelSubscription(memberId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return await this.updateMemberTier(memberId, "free", {
      stripeCustomerId: null,
      subscriptionId: null
    });
  }
}

export default new MemberService();