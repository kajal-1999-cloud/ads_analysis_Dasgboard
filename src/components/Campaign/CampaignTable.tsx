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

const th = { textAlign: "left", padding: "10px", borderBottom: "1px solid #ccc" };
const td = { padding: "10px", borderBottom: "1px solid #eee" };












// import { useCampaignStore } from "../../store/useCampaignStore";

// export default function CampaignFilters() {
//   const setFilter = useCampaignStore((s) => s.setFilter);

//   return (
//     <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>

//       {/* Search by Name */}
//       <input
//         placeholder="Search campaign..."
//         onChange={(e) => setFilter("name", e.target.value)}
//         style={inputStyle}
//       />

//       {/* Platform Filter */}
//       <select onChange={(e) => setFilter("platform", e.target.value)} style={inputStyle}>
//         <option value="">All Platforms</option>
//         <option value="Facebook">Facebook</option>
//         <option value="Google">Google</option>
//         <option value="Instagram">Instagram</option>
//       </select>

//       {/* Status Filter */}
//       <select onChange={(e) => setFilter("status", e.target.value)} style={inputStyle}>
//         <option value="">All Status</option>
//         <option value="active">Active</option>
//         <option value="paused">Paused</option>
//         <option value="completed">Completed</option>
//       </select>
//     </div>
//   );
// }

// const inputStyle = {
//   padding: "8px",
//   border: "1px solid #ccc",
//   borderRadius: 6,
// };
