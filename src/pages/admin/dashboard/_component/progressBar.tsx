import React from "react";

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
  big?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  percentage,
  color = "bg-green",
  big = false,
}) => {
  return (
    <div
      className={`flex ${
        big ? "flex-col items-start" : "flex-row items-center justify-between"
      }  `}
    >
      <span className="text-gray-200 flex-1 text-sm whitespace-nowrap">
        {label}
      </span>
      <div
        className={`relative   ${
          big ? "w-full h-6 mt-2" : "flex-1 rounded-md h-3"
        } overflow-hidden  bg-gray-100 `}
      >
        <div
          className={`absolute h-full ${color}`}
          style={{ width: `${percentage}%` }}
        >
          {big && <div className="text-center">{percentage}%</div>}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
