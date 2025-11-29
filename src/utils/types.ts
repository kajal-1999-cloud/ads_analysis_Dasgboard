// ============================
// Campaign List Item
// ============================
export interface Campaign {
  id: string;
  name: string;
  brand_id: string;
  status: "active" | "paused" | "completed";
  budget: number;
  daily_budget: number;
  platforms: string[];
  created_at: string; // ISO date string
}

// ============================
// Single Campaign Response
// ============================
export interface CampaignResponse {
  campaign: Campaign;
}

// ============================
// Aggregate Insights (All Campaigns)
// ============================
export interface GlobalInsights {
  timestamp: string;
  total_campaigns: number;
  active_campaigns: number;
  paused_campaigns: number;
  completed_campaigns: number;

  total_impressions: number;
  total_clicks: number;
  total_conversions: number;
  total_spend: number;

  avg_ctr: number;
  avg_cpc: number;
  avg_conversion_rate: number;
}

export interface GlobalInsightsResponse {
  insights: GlobalInsights;
}

// ============================
// Insights for single campaign
// ============================
export interface CampaignInsight {
  campaign_id: string;
  timestamp: string;

  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;

  ctr: number; // click-through rate
  cpc: number; // cost per click
  conversion_rate: number;
}

export interface CampaignInsightResponse {
  insights: CampaignInsight;
}

// ============================
// Real-time SSE Data Format
// ============================
export interface StreamInsight {
  campaign_id: string;
  timestamp: string;

  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;

  ctr: number;
  cpc: number;
  conversion_rate: number;
}

// src/utils/types.ts
export interface Campaign {
  id: string;
  name: string;
  [key: string]: any;
}

export interface StreamInsight {
  campaign_id: string;
  timestamp: string; // ISO string
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  conversion_rate: number;
}

export interface GlobalInsights {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  [key: string]: any;
}
