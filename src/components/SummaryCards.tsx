// src/components/SummaryCards.tsx
import React from "react";
import { useCampaignStore } from "../store/useCampaignStore";

export default function SummaryCards() {
  const global = useCampaignStore((s) => s.globalInsights);

  if (!global) return <div>Loading summary...</div>;

  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
      <Card title="Total Impressions" value={global.total_impressions.toLocaleString()} />
      <Card title="Total Clicks" value={global.total_clicks.toLocaleString()} />
      <Card title="Total Conversions" value={global.total_conversions.toLocaleString()} />
      <Card title="Total Spend" value={formatCurrency(global.total_spend)} />
      <Card title="Avg CTR" value={`${Number(global.avg_ctr).toFixed(2)}%`} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: React.ReactNode }) {
  return (
    <div style={{
      padding: 12,
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      minWidth: 160,
      background: "#fff"
    }}>
      <div style={{ fontSize: 12, color: "#6b7280" }}>{title}</div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function formatCurrency(n: number) {
  // default USD; adjust if needed
  return `$${n.toFixed(2)}`;
}
