// src/components/PlatformPie.tsx
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useCampaignStore } from "../store/useCampaignStore";

const COLORS = ["#4f46e5", "#06b6d4", "#f97316", "#ef4444", "#10b981"];

export default function PlatformPie() {
  const campaigns = useCampaignStore((s) => s.campaigns);

  const data = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of campaigns) {
      for (const p of c.platforms) {
        map.set(p, (map.get(p) || 0) + 1);
      }
    }
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [campaigns]);

  if (data.length === 0) return <div>Loading platforms...</div>;

  return (
    <div style={{ width: 300, height: 250 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} innerRadius={40}>
            {data.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
