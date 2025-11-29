// src/components/Charts/PlaceholderChart.tsx
import { useCampaignStore } from "../../store/useCampaignStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PlaceholderChart({ height = 300 }: any) {
  const global = useCampaignStore((s) => s.globalInsights);

  if (!global) {
    return (
      <div
        style={{
          height,
          background: "#f5f5f5",
          borderRadius: 6,
          border: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontSize: 14,
        }}
      >
        Loading Global Insights...
      </div>
    );
  }

  // -------------------------------
  // Monthly Trend (Jan → Dec)
  // -------------------------------
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const data = months.map((month) => ({
    month,
    impressions: Math.round(global.total_impressions / 12 + (Math.random() * 5000 - 2500)),
    clicks: Math.round(global.total_clicks / 12 + (Math.random() * 200 - 100)),
    conversions: Math.round(global.total_conversions / 12 + (Math.random() * 50 - 25)),
    spend: Math.round(global.total_spend / 12 + (Math.random() * 500 - 250)),
  }));

  return (
    <div
      style={{
        height,
        background: "white",
        borderRadius: 6,
        border: "1px solid #ddd",
        padding: "10px 10px 0 10px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
          <Legend />

          <Line type="monotone" dataKey="impressions" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="conversions" stroke="#ff7300" strokeWidth={2} />
          <Line type="monotone" dataKey="spend" stroke="#ff0000" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
