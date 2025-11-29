// src/components/Streaming/StreamingSection.tsx
import React, { useEffect, useMemo } from "react";
import { useCampaignStore } from "../../store/useCampaignStore";
// import LiveMetricsTable from "./LiveMetricsTable";
import AlertBox from "./AlertBox";
import RealTimeChart from "./RealTimeChart";
import type { Campaign } from "../../utils/types";
import LiveMetricsTable from "./LiveMetricsTable";

export default function StreamingSection() {
  const campaigns = useCampaignStore((s) => s.campaigns);
  const fetchCampaigns = useCampaignStore((s) => s.fetchCampaigns);
  const selectedCampaign = useCampaignStore((s) => s.selectedCampaign);
  const startStream = useCampaignStore((s) => s.startStream);
  const stopStream = useCampaignStore((s) => s.stopStream);
  const trendBuffer = useCampaignStore((s) => s.trendBuffer);
  const alerts = useCampaignStore((s) => s.alerts);

  useEffect(() => {
    // ensure campaigns loaded to populate selector
    if (!campaigns || campaigns.length === 0) fetchCampaigns();
  }, []);

  // default choose first campaign if none selected
  const chosen = useMemo(() => {
    if (selectedCampaign) return selectedCampaign;
    if (campaigns && campaigns.length > 0) return campaigns[0].id;
    return null;
  }, [selectedCampaign, campaigns]);

  useEffect(() => {
    // auto start stream for chosen campaign
    if (chosen) {
      startStream(chosen);
      // stop stream when unmount
      return () => stopStream();
    }
    return;
  }, [chosen]);

  return (
    <section style={{ marginTop: 20 }}>
      {/* <h3 style={{ marginBottom: 12 }}>Real-time Streaming Insights</h3> */}

      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13 }}>Campaign</label>
          <select
            value={chosen ?? ""}
            onChange={(e) => {
              // change stream to new campaign
              const id = e.target.value;
              if (!id) return;
              stopStream();
              startStream(id);
            }}
            style={{ padding: "6px 10px", borderRadius: 6 }}
          >
            {campaigns && campaigns.length > 0 ? (
              campaigns.map((c: Campaign) => (
                <option key={c.id} value={c.id}>
                  {c.name || c.id}
                </option>
              ))
            ) : (
              <option value="">No campaigns</option>
            )}
          </select>
        </div>

        <div>
          <button
            onClick={() => {
              if (chosen) startStream(chosen);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              background: "#0ea5e9",
              color: "white",
              cursor: "pointer",
              marginRight: 8,
            }}
          >
            Start Stream
          </button>

          <button
            onClick={() => stopStream()}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Stop Stream
          </button>
        </div>

        <div style={{ marginLeft: "auto", minWidth: 220 }}>
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            Live buffer: {trendBuffer.length} readings
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 340 }}>
          <AlertBox alerts={alerts} />
          <LiveMetricsTable />
        </div>

        <div style={{ width: 520, minWidth: 320 }}>
          <RealTimeChart />
        </div>
      </div>
    </section>
  );
}
