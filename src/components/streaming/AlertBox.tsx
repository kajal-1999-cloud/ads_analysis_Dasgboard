// src/components/Streaming/AlertBox.tsx
import React from "react";

export default function AlertBox({ alerts }: { alerts: string[] }) {
  if (!alerts || alerts.length === 0) {
    return (
      <div style={{ marginBottom: 12, padding: 10, borderRadius: 8, background: "#f8fafc", color: "#374151" }}>
        No alerts
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 12 }}>
      {alerts.map((a, i) => (
        <div
          key={i}
          style={{
            marginBottom: 8,
            padding: "10px 12px",
            borderRadius: 8,
            background: i === alerts.length - 1 ? "#ecfccb" : "#fff7ed",
            border: "1px solid #f1f5f9",
            fontSize: 13,
          }}
        >
          {a}
        </div>
      ))}
    </div>
  );
}
