import { useState, useEffect } from "react";
import memberService from "@/services/api/memberService";

export const useMember = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMember = async () => {
    try {
      setLoading(true);
      setError("");
      const memberData = await memberService.getCurrentMember();
      setMember(memberData);
    } catch (err) {
      setError(err.message || "Failed to load member data");
    } finally {
      setLoading(false);
    }
  };

  const upgradeToPremium = async () => {
    if (!member) return;
    
    try {
      setLoading(true);
      setError("");
      const updatedMember = await memberService.simulateStripeUpgrade(member.Id);
      setMember(updatedMember);
      return updatedMember;
    } catch (err) {
      setError(err.message || "Upgrade failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async () => {
    if (!member) return;
    
    try {
      setLoading(true);
      setError("");
      const updatedMember = await memberService.cancelSubscription(member.Id);
      setMember(updatedMember);
      return updatedMember;
    } catch (err) {
      setError(err.message || "Cancellation failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createFreeMember = async (email) => {
    try {
      setLoading(true);
      setError("");
      const newMember = await memberService.createFreeMember(email);
      setMember(newMember);
      return newMember;
    } catch (err) {
      setError(err.message || "Failed to create member");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMember();
  }, []);

  return {
    member,
    loading,
    error,
    loadMember,
    upgradeToPremium,
    cancelSubscription,
    createFreeMember
  };
};