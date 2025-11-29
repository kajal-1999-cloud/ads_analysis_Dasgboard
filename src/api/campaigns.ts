import type { CampaignInsightResponse, CampaignResponse, GlobalInsightsResponse } from "../utils/types";
import { api } from "./apiClient";


// GET ALL CAMPAIGNS
export async function getAllCampaigns() {
  const res = await api.get("/campaigns");
  return res.data;
}

// GET SINGLE CAMPAIGN
export async function getCampaignById(id: string): Promise<CampaignResponse> {
  const res = await api.get(`/campaign/${id}`);
  return res.data;
}

// GLOBAL INSIGHTS (ALL CAMPAIGNS)
export async function getGlobalInsights(): Promise<GlobalInsightsResponse> {
  const res = await api.get("/campaigns/insights");
  return res.data;
}

// SINGLE CAMPAIGN INSIGHTS
export async function getCampaignInsights(
  id: string
): Promise<CampaignInsightResponse> {
  const res = await api.get(`/campaign/${id}/insights`);
  return res.data;
}
