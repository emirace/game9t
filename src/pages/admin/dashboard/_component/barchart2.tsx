import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart2: React.FC = () => {
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
    legend: { show: true, position: "top" },
    xaxis: {
      categories: ["1 Hr", "2 Hr", "3 Hr", "4 Hr", "5 Hr", "6 Hr"],

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
        text: "Transaction",
        offsetX: 27,
        style: {
          fontSize: "13px",
          fontWeight: 700,
        },
      },
    },
    grid: {
      borderColor: "#333",
      strokeDashArray: 4,
    },
    theme: {
      mode: "dark",
    },
    colors: ["#0d47a1", "#ffca28"], // Adjusted for blue and yellow
    tooltip: {
      enabled: true,
    },
  };
  const series = [
    {
      name: "Deposits",
      data: [30, 20, 35, 25, 45, 40],
    },
    {
      name: "Withdrawals",
      data: [25, 40, 30, 35, 20, 55],
    },
  ];

  return (
    <div className="bg-chart  rounded-lg">
      <h2 className="text-white text-lg my-2 mx-4">Recent Transactions</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
      />
    </div>
  );
};

export default BarChart2;
