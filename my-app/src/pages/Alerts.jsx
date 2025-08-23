import React from "react";

function Alerts() {
  // Sample data for alerts
  const alerts = [
    {
      id: 1,
      type: "Warning",
      message: "Unusual activity detected in District 12.",
      time: "10 mins ago",
    },
    {
      id: 2,
      type: "Critical",
      message: "Bridge safety threshold exceeded in Sector 4.",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "Info",
      message: "New report added for Highway Project.",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Alerts</h1>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg shadow-md border-l-4 
              ${alert.type === "Critical" ? "border-red-600 bg-red-100" : ""} 
              ${alert.type === "Warning" ? "border-yellow-500 bg-yellow-100" : ""} 
              ${alert.type === "Info" ? "border-blue-500 bg-blue-100" : ""}`}
          >
            <h2 className="text-lg font-semibold">{alert.type} Alert</h2>
            <p>{alert.message}</p>
            <span className="text-sm text-gray-600">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
