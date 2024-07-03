import React, { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const LineChart = () => {
  const donations = [
    { date: "2024-01-01", amount: 100 },
    { date: "2024-01-02", amount: 200 },
    { date: "2024-01-08", amount: 300 },
    { date: "2024-02-01", amount: 150 },
    { date: "2024-02-05", amount: 250 },
    { date: "2024-03-01", amount: 350 },
  ];

  const [timeUnit, setTimeUnit] = useState("day");

  const data = useMemo(() => {
    const groupedData = donations.reduce((acc, donation) => {
      const timeKey = new Date(donation.date).toISOString().split("T")[0];
      if (!acc[timeKey]) {
        acc[timeKey] = 0;
      }
      acc[timeKey] += donation.amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: "Total Donations",
          data: Object.values(groupedData),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    };
  }, [timeUnit]);

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: timeUnit,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
      <div>
        <button onClick={() => setTimeUnit("day")}>Day</button>
        <button onClick={() => setTimeUnit("month")}>Month</button>
        <button onClick={() => setTimeUnit("year")}>Year</button>
        <button onClick={() => setTimeUnit("all")}>All</button>
      </div>
    </div>
  );
};

export default LineChart;
