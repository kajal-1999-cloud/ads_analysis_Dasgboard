import  { useMemo } from "react";
import { useCampaignStore } from "../../store/useCampaignStore";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

export default function RealTimeChart() {
  const buffer = useCampaignStore((s) => s.trendBuffer);

  const data = useMemo(() => {
    return buffer.map((b) => ({
      time: new Date(b.timestamp).toLocaleTimeString(),
      impressions: b.impressions,
      clicks: b.clicks,
      spend: Number(b.spend.toFixed(2)),
    }));
  }, [buffer]);

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: 12, borderRadius: 8, border: "1px solid #e6e6e6", minHeight: 220 }}>
        Waiting for stream to populate chart...
      </div>
    );
  }

  return (
    <div style={{ borderRadius: 8, border: "1px solid #e6e6e6", padding: 8, minHeight: 220 }}>
      <h4 style={{ margin: "6px 10px" }}>Live trend</h4>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#0ea5e9" dot={false} strokeWidth={2} />
            <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#f97316" dot={false} strokeWidth={2} />
            <Line yAxisId="right" type="monotone" dataKey="spend" stroke="#10b981" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
