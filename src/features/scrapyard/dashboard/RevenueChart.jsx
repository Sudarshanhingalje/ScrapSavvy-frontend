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
    labels: data?.labels || [],
    datasets: [
      {
        label: "Revenue",
        data: data?.values || [],
        fill: true,
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,0.1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="sd-card">
      <h2 className="sd-card-title">📉 Revenue Analysis</h2>

      <div className="sd-chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default RevenueChart;
