import React from "react";
import Chart from "react-apexcharts";

interface PieChartProps {
  title: string;
  series: number[];
  labels: string[];
  colors?: string[];
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  title,
  series,
  labels,
  colors = ["#ff5252", "#42a5f5", "#8bc34a", "#004d40"], // Default colors
  height = 300,
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "pie",
      background: "transparent",
    },
    labels: labels,
    colors: colors,
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
        fontSize: "14px",
      },
    },
    legend: {
      position: "right",
      labels: {
        colors: ["#fff"],
      },
      markers: {
        shape: "rect",
        strokeWidth: 0,
        offsetX: -4,
      },
      formatter: function (label: string, opts: any) {
        return ` ${label} - ${opts.w.globals.series[opts.seriesIndex]}`;
      },
    },
    stroke: { show: false },
    title: {
      text: title,
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#fff",
      },
    },
    tooltip: {
      enabled: true,
      theme: "dark",
    },
    theme: {
      mode: "dark",
    },
  };

  return (
    <div className="w-full bg-chart rounded-lg pt-2">
      <Chart options={options} series={series} type="pie" height={height} />
    </div>
  );
};

export default PieChart;
