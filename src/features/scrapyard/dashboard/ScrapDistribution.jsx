import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ScrapDistribution = ({ data }) => {
  const chartData = {
    labels: data?.labels && data.labels.length > 0 ? data.labels : ["No Data"],

    datasets: [
      {
        data: data?.values && data.values.length > 0 ? data.values : [1],

        backgroundColor: [
          "#16a34a",
          "#2563eb",
          "#ea580c",
          "#9333ea",
          "#e11d48",
          "#0891b2",
          "#f59e0b",
        ],

        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="sd-card">
      <h2 className="sd-card-title">🥧 Scrap Distribution</h2>

      <div className="sd-chart-wrapper">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ScrapDistribution;
