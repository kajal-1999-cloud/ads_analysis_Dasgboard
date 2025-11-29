import { create } from "zustand";
import {
  getAllCampaigns,
  getGlobalInsights,
  getCampaignInsights,
} from "../api/campaigns";
import { api } from "../api/apiClient";

interface StreamInsight {
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

interface Store {
  campaigns: any[];
  filtered: any[];
  globalInsights: any;

  selectedCampaign: any;
  selectedCampaignInsights: any;

  filters: {
    name: string;
    platform: string;
    status: string;
  };

  loading: boolean;
  error: string | null;

  trendBuffer: StreamInsight[];
  alerts: string[];
  streamSource: EventSource | null;

  fetchCampaigns: () => Promise<void>;
  fetchCampaignDetails: (id: string) => Promise<void>;
  fetchGlobalInsights: () => Promise<void>;
  selectCampaign: (id: string) => Promise<void>;
  fetchCampaignInsight: (id: string) => Promise<void>;

  setFilter: (key: string, value: string) => void;
  applyFilters: () => void;

  startStream: (id: string) => void;
  stopStream: () => void;
  analyzeTrends: (buffer: StreamInsight[]) => string[];
}

// ================================
// STORE IMPLEMENTATION
// ================================

const backendBase = api.defaults.baseURL;

export const useCampaignStore = create<Store>((set, get) => ({
  // Initial State
  campaigns: [],
  filtered: [],

  globalInsights: null,
  selectedCampaign: null,
  selectedCampaignInsights: null,

  filters: {
    name: "",
    platform: "",
    status: "",
  },

  loading: false,
  error: null,

  trendBuffer: [],
  alerts: [],
  streamSource: null,

  // ============================
  // FETCH ALL CAMPAIGNS
  // ============================
  fetchCampaigns: async () => {
    set({ loading: true });
    try {
      const data = await getAllCampaigns();
      const campaigns = data.campaigns || [];

      // default sort → newest first
      campaigns.sort((a: any, b: any) => {
        if (!a.created_at || !b.created_at) return 0;
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      set({
        campaigns,
        filtered: campaigns, // important
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  fetchCampaignDetails: async (id: string) => {
    set({ loading: true });
    try {
      const res = await api.get(`/campaign/${id}`);
      set({ selectedCampaign: res.data.campaign, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // ============================
  // GLOBAL INSIGHTS
  // ============================
  fetchGlobalInsights: async () => {
    set({ loading: true });
    try {
      const data = await getGlobalInsights();
      set({ globalInsights: data.insights, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  // ============================
  // SELECT CAMPAIGN STATIC INSIGHTS
  // ============================
  selectCampaign: async (id: string) => {
    set({ loading: true });
    try {
      const insights = await getCampaignInsights(id);
      set({
        selectedCampaign: id,
        selectedCampaignInsights: insights.insights,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCampaignInsight: async (id: string) => {
    try {
      const res = await getCampaignInsights(id);
      set({ selectedCampaignInsights: res.insights });
    } catch (e) {
      console.error(e);
    }
  },

  // ============================
  // FILTERS
  // ============================
  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
    get().applyFilters();
  },

  applyFilters: () => {
    const { campaigns, filters } = get();
    let result = [...campaigns];
    console.log("campaigns, filters", campaigns, filters);
    // Name Search
    if (filters.name.trim()) {
      result = result.filter((c) =>
        c.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Platform
    if (filters.platform.trim()) {
      const platform = filters.platform.toLowerCase();

      result = result.filter((c) =>
        c.platforms.some((p: string) => p.toLowerCase() === platform)
      );
    }

    // Status
    if (filters.status.trim()) {
      result = result.filter((c) => c.status === filters.status);
    }

    // Always sort by newest date
    result.sort((a: any, b: any) => {
      if (!a.created_at || !b.created_at) return 0;
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    set({ filtered: result });
  },

  // ============================
  // SSE REAL-TIME STREAM
  // ============================
  startStream: (id: string) => {
    const existing = get().streamSource;
    if (existing) existing.close();

    const source = new EventSource(`${backendBase}${id}/insights/stream`);

    source.onmessage = (event: MessageEvent) => {
      try {
        const data: StreamInsight = JSON.parse(event.data);

        const { trendBuffer, analyzeTrends } = get();
        const updatedBuffer = [...trendBuffer.slice(-19), data];
        const newAlerts = analyzeTrends(updatedBuffer);

        set({
          trendBuffer: updatedBuffer,
          alerts: newAlerts,
        });
      } catch (err) {
        console.log("Stream parse error:", err);
      }
    };

    source.onerror = () => {
      console.log("⚠ SSE connection error");
      source.close();
    };

    set({ streamSource: source });
  },

  stopStream: () => {
    const stream = get().streamSource;
    if (stream) stream.close();

    set({
      streamSource: null,
      trendBuffer: [],
      alerts: [],
    });
  },

  analyzeTrends: (buffer: StreamInsight[]) => {
    const alerts: string[] = [];
    if (buffer.length < 5) return alerts;

    const last = buffer[buffer.length - 1];
    const prev = buffer[buffer.length - 2];

    if (prev.ctr > 0 && last.ctr < prev.ctr * 0.6) {
      alerts.push(`⚠ CTR dropped (${prev.ctr}% → ${last.ctr}%)`);
    }

    if (last.cpc > prev.cpc * 1.5) {
      alerts.push(`⚠ CPC spiked (${prev.cpc} → ${last.cpc})`);
    }

    if (last.spend > prev.spend && last.conversions < prev.conversions) {
      alerts.push("⚠ High spend but conversions decreasing");
    }

    if (last.clicks === 0 && last.impressions > 0) {
      alerts.push("⚠ No clicks — possible ad fatigue");
    }

    if (last.ctr > 5) {
      alerts.push("Strong CTR — excellent performance");
    }

    return alerts;
  },
}));
