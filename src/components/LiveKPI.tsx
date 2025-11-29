// src/components/LiveKPI.tsx
import { useCampaignStore } from "../store/useCampaignStore";

export default function LiveKPI() {
  const buffer = useCampaignStore((s) => s.trendBuffer);
  const alerts = useCampaignStore((s) => s.alerts);

  const last = buffer.length ? buffer[buffer.length - 1] : null;

  return (
    <div style={{ border: "1px solid #e5e7eb", padding: 12, borderRadius: 8, minWidth: 280 }}>
      <div style={{ fontSize: 13, color: "#6b7280" }}>Live Metrics</div>
      {!last && <div style={{ marginTop: 8 }}>No live data yet</div>}
      {last && (
        <div style={{ marginTop: 8 }}>
          <div><strong>Time:</strong> {new Date(last.timestamp).toLocaleTimeString()}</div>
          <div><strong>Impr:</strong> {last.impressions.toLocaleString()}</div>
          <div><strong>Clicks:</strong> {last.clicks.toLocaleString()}</div>
          <div><strong>Conv:</strong> {last.conversions.toLocaleString()}</div>
          <div><strong>CTR:</strong> {Number(last.ctr).toFixed(2)}%</div>
          <div><strong>CPC:</strong> {Number(last.cpc).toFixed(2)}</div>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 13, color: "#6b7280" }}>Alerts</div>
        {alerts.length === 0 && <div style={{ marginTop: 6 }}>No alerts</div>}
        {alerts.map((a, i) => (
          <div key={i} style={{ marginTop: 6, fontSize: 13, color: a.startsWith("🔥") ? "#16a34a" : "#b91c1c" }}>
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}
