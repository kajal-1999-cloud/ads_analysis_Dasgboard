import { useCampaignStore } from "../../store/useCampaignStore";

export default function CampaignTable() {
  const campaigns = useCampaignStore((s) => s.filtered);   // <-- FIXED
  const selectCampaign = useCampaignStore((s) => s.selectCampaign);

  if (!campaigns.length) return <div>Loading campaigns...</div>;

  return (
    <table width="100%" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          <th style={th}>Name</th>
          <th style={th}>Status</th>
          <th style={th}>Budget</th>
          <th style={th}>Daily Budget</th>
          <th style={th}>Platforms</th>
        </tr>
      </thead>

      <tbody>
        {campaigns.map((c) => (
          <tr key={c.id} onClick={() => selectCampaign(c.id)} style={{ cursor: "pointer" }}>
            <td style={td}>{c.name}</td>
            <td style={td}>{c.status}</td>
            <td style={td}>${c.budget}</td>
            <td style={td}>${c.daily_budget}</td>
            <td style={td}>{c.platforms.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  padding: "8px",
  borderBottom: "1px solid #ddd"
};

const td: React.CSSProperties = { padding: "10px", borderBottom: "1px solid #eee" };






