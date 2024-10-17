import React from "react";
import ProgressBar from "./progressBar";

const RevenueSources: React.FC = () => {
  const revenues = [
    { name: "Bettings", percentage: 80 },
    { name: "Purchases", percentage: 5 },
    { name: "Withdraw Fees", percentage: 95 },
  ];

  return (
    <div className="p-4 bg-chart  rounded-lg">
      <h2 className="text-white text-lg mb-4">Revenue Sources</h2>
      <div className="flex flex-col gap-3">
        {revenues.map((source, index) => (
          <ProgressBar
            key={index}
            label={source.name}
            percentage={source.percentage}
            big={true}
          />
        ))}
      </div>
    </div>
  );
};

export default RevenueSources;
