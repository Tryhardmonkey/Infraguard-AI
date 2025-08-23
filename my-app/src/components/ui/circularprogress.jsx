import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const CircularProgress = ({ percentage }) => {
  const data = [
    { name: "Completed", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  const COLORS = ["#4CAF50", "#E0E0E0"]; // green + gray

  return (
    <div style={{ textAlign: "center" }}>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <div
        style={{
          position: "relative",
          top: "-160px",
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {percentage}%
        <br />
        Completion
      </div>
    </div>
  );
};

export default CircularProgress;
