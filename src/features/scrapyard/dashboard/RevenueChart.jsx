import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data?.labels && data.labels.length > 0 ? data.labels : ["No Data"],

    datasets: [
      {
        label: "Revenue",

        data: data?.values && data.values.length > 0 ? data.values : [0],

        fill: true,

        borderColor: "#16a34a",

        backgroundColor: "rgba(22,163,74,0.12)",

        tension: 0.4,

        borderWidth: 3,

        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="sd-card">
      <h2 className="sd-card-title">📉 Revenue Analysis</h2>

      <div className="sd-chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
