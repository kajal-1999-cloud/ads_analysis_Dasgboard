
import { useCampaignStore } from "../../store/useCampaignStore";
import { useEffect, useState } from "react";

export default function SummaryGrid() {
  const {
    campaigns,
    globalInsights,
    selectedCampaignInsights,
    fetchCampaigns,
    fetchCampaignInsight,
  } = useCampaignStore();

  const [selected, setSelected] = useState("all");

  // Load campaign list if not loaded
  useEffect(() => {
    if (campaigns.length === 0) fetchCampaigns();
  }, []);

  // On dropdown change
  const handleSelect = async (id: string) => {
    setSelected(id);
    if (id === "all") return;
    await fetchCampaignInsight(id);
  };

  // Which insights to show
  const insights =
    selected === "all" ? globalInsights : selectedCampaignInsights;

  if (!insights) return <div>Loading insights...</div>;

  const data = [
    { label: "Total Impressions", value: insights.total_impressions },
    { label: "Total Clicks", value: insights.total_clicks },
    { label: "Total Conversions", value: insights.total_conversions },
    { label: "Avg CTR (%)", value: insights.avg_ctr },
    { label: "Avg CPC ($)", value: insights.avg_cpc },
  ];

  return (
    <div>
      {/* Dropdown */}
      <div style={{ marginBottom: 12 }}>
        <select
          value={selected}
          onChange={(e) => handleSelect(e.target.value)}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            fontSize: 14,
          }}
        >
          <option value="all">All Campaigns (Global Insights)</option>

          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {data.map((item) => (
          <div key={item.label} style={cardStyle}>
            <h4 style={{ margin: 0, fontSize: 15 }}>{item.label}</h4>
            <p style={{ fontSize: 22, marginTop: 6 }}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "16px",
  borderRadius: 6,
  border: "1px solid #eee",
};
