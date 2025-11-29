import { useCampaignStore } from "../../store/useCampaignStore";

export default function CampaignFilters() {
  const setFilter = useCampaignStore((s) => s.setFilter);

  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>

      {/* Search by Name */}
      <input
        placeholder="Search campaign..."
        onChange={(e) => setFilter("name", e.target.value)}
        style={inputStyle}
      />

      {/* Platform Filter */}
      <select onChange={(e) => setFilter("platform", e.target.value)} style={inputStyle}>
        <option value="">All Platforms</option>
        <option value="meta">Meta</option>
        <option value="google">Google</option>
        <option value="linkedin">Linkedin</option>
      </select>

      {/* Status Filter */}
      <select onChange={(e) => setFilter("status", e.target.value)} style={inputStyle}>
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: 6,
};
