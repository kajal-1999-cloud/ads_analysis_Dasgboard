import { useCampaignStore } from "../../store/useCampaignStore";
import type { StreamInsight } from "../../utils/types";

function formatNumber(n: number) {
  return n?.toLocaleString?.() ?? n;
}

export default function LiveMetricsTable() {
  const buffer = useCampaignStore((s) => s.trendBuffer);

  if (!buffer || buffer.length === 0) {
    return <div style={{ padding: 12, borderRadius: 8, background: "#f8fafc" }}>Waiting for live metrics...</div>;
  }

  const latest: StreamInsight = buffer[buffer.length - 1];

  return (
    <div style={{ borderRadius: 8, border: "1px solid #e6e6e6", padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ fontWeight: 600 }}>Latest metrics — {latest.timestamp}</div>
        <div style={{ color: "#6b7280", fontSize: 13 }}>{latest.campaign_id}</div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #efefef" }}>
            <th style={{ padding: "8px 6px" }}>Metric</th>
            <th style={{ padding: "8px 6px" }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: "8px 6px" }}>Impressions</td>
            <td style={{ padding: "8px 6px" }}>{formatNumber(latest.impressions)}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 6px" }}>Clicks</td>
            <td style={{ padding: "8px 6px" }}>{formatNumber(latest.clicks)}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 6px" }}>Conversions</td>
            <td style={{ padding: "8px 6px" }}>{formatNumber(latest.conversions)}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 6px" }}>Spend</td>
            <td style={{ padding: "8px 6px" }}>${latest.spend.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 6px" }}>CTR</td>
            <td style={{ padding: "8px 6px" }}>{latest.ctr}%</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 6px" }}>CPC</td>
            <td style={{ padding: "8px 6px" }}>${latest.cpc.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 6px" }}>Conv Rate</td>
            <td style={{ padding: "8px 6px" }}>{latest.conversion_rate}%</td>
          </tr>
        </tbody>
      </table>

      {/* recent rows (compact) */}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Recent readings</div>
        <div style={{ maxHeight: 160, overflow: "auto", borderRadius: 6, border: "1px solid #f3f4f6" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ textAlign: "left", background: "#fafafa" }}>
                <th style={{ padding: 6 }}>Time</th>
                <th style={{ padding: 6 }}>Impr</th>
                <th style={{ padding: 6 }}>Clicks</th>
                <th style={{ padding: 6 }}>Conv</th>
                <th style={{ padding: 6 }}>Spend</th>
                <th style={{ padding: 6 }}>CTR</th>
              </tr>
            </thead>
            <tbody>
              {[...buffer].reverse().map((r, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ padding: 6 }}>{new Date(r.timestamp).toLocaleTimeString()}</td>
                  <td style={{ padding: 6 }}>{formatNumber(r.impressions)}</td>
                  <td style={{ padding: 6 }}>{formatNumber(r.clicks)}</td>
                  <td style={{ padding: 6 }}>{formatNumber(r.conversions)}</td>
                  <td style={{ padding: 6 }}>${r.spend.toFixed(2)}</td>
                  <td style={{ padding: 6 }}>{r.ctr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
