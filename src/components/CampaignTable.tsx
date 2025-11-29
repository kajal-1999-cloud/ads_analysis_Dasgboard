// src/components/CampaignTable.tsx
import React, { useMemo, useState } from "react";
import { useCampaignStore } from "../store/useCampaignStore";
import { useNavigate } from "react-router-dom";

export default function CampaignTable() {
  const campaigns = useCampaignStore((s) => s.campaigns);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let items = campaigns.slice();
    if (q) {
      items = items.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
    }
    if (sortBy === "budget") items.sort((a, b) => b.budget - a.budget);
    if (sortBy === "created") items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return items;
  }, [campaigns, sortBy, q]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <input placeholder="Search campaigns..." value={q} onChange={(e) => setQ(e.target.value)} style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 6 }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setSortBy("budget")}>Sort: Budget</button>
          <button onClick={() => setSortBy("created")}>Sort: New</button>
          <button onClick={() => setSortBy(null)}>Clear</button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
            <th style={{ padding: 8 }}>Name</th>
            <th>Platform</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id} style={{ borderBottom: "1px solid #f3f4f6", cursor: "pointer" }} onClick={() => navigate(`/campaign/${c.id}`)}>
              <td style={{ padding: 8 }}>{c.name}</td>
              <td>{c.platforms.join(", ")}</td>
              <td>{c.budget.toLocaleString()}</td>
              <td>{c.status}</td>
              <td>{new Date(c.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 12 }}>No campaigns</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
