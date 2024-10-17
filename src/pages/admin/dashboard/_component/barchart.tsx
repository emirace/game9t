import React from "react";
import Chart from "react-apexcharts";

interface BarChartProps {
  title: string;
  categories: string[];
  series: { name: string; data: number[] }[];
  yAxisTitle: string;
}

const BarChart: React.FC<BarChartProps> = ({
  title,
  categories,
  series,
  yAxisTitle = "Users",
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
      labels: {
        trim: true,
        style: {},
      },
      group: {
        groups: [],
        style: {
          colors: [],
          fontSize: "12px",
          fontWeight: 400,
          cssClass: "",
        },
      },
      axisBorder: {
        color: "#E2E2B6",
      },
      axisTicks: {
        show: false,
      },
      tickPlacement: "between",
      title: {
        style: {
          fontWeight: 700,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      tickAmount: 1,
      labels: {
        showDuplicates: false,
        style: {},
      },
      axisBorder: {
        show: true,
        color: "#E2E2B6",
      },
      title: {
        text: yAxisTitle,
        offsetX: 27,
        style: {
          fontSize: "13px",
          fontWeight: 700,
        },
      },
    },
    fill: {
      colors: ["#f5e8b9"],
    },
    grid: {
      borderColor: "#333",
      strokeDashArray: 4,
    },
    title: {
      text: title,
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "600",
        color: "#fff",
      },
    },
    theme: {
      mode: "dark",
    },
    tooltip: {
      enabled: true,
    },
  };

  return (
    <div className="w-full bg-chart rounded-lg pt-2 ">
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default BarChart;
