import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CollectionChart = ({ data }) => {
  const chartData = {
    labels: data?.labels && data.labels.length > 0 ? data.labels : ["No Data"],

    datasets: [
      {
        label: "Scrap Collected (kg)",

        data: data?.values && data.values.length > 0 ? data.values : [0],

        backgroundColor: "rgba(34,197,94,0.6)",

        borderColor: "rgba(22,163,74,1)",

        borderWidth: 2,

        borderRadius: 6,
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
      <h2 className="sd-card-title">📈 Monthly Collection</h2>

      <div className="sd-chart-wrapper">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CollectionChart;
