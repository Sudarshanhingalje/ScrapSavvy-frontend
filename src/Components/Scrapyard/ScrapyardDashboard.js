import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "../.././Static/Dashboard.css";
import LogoutMenu from "../Common/LogoutMenu";
import ScrapyardSidebar from "../Common/ScrapyardSidebar";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ScrapyardDashboard = () => {
  const [stats] = useState({
    totalScrap: 5250,
    scrapSold: 4200,
    ordersReceived: 78,
    paymentReceived: 285000,
  });

  // Monthly collection data for chart
  const monthlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Scrap Collected (kg)",
        data: [650, 780, 520, 890, 1020, 840],
        backgroundColor: "rgba(76, 175, 80, 0.6)",
        borderColor: "rgba(76, 175, 80, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Scrap type distribution data for doughnut chart
  const scrapTypeData = {
    labels: [
      "Metal Scrap",
      "Paper & Cardboard",
      "Plastic Waste",
      "Glass Materials",
      "E-Waste",
    ],
    datasets: [
      {
        data: [40, 25, 18, 12, 5],
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#9C27B0",
          "#FF5722",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Weekly revenue data for line chart
  const weeklyRevenueData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: [65000, 72000, 58000, 90000],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="d-flex">
      <ScrapyardSidebar />
      <div className="container">
        <div className="dashboard-content">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="dashboard-title">Dashboard - Scrapyard</h1>
            <LogoutMenu />
          </div>

          {/* Stats Cards Row */}
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card stats-card">
                <div className="card-body">
                  <div className="stat-number">{stats.totalScrap} kg</div>
                  <div className="stat-label">Quantity Available</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card stats-card blue">
                <div className="card-body">
                  <div className="stat-number">{stats.scrapSold} kg</div>
                  <div className="stat-label">Quantity Sold</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card stats-card orange">
                <div className="card-body">
                  <div className="stat-number">{stats.ordersReceived}</div>
                  <div className="stat-label">Orders Received</div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card stats-card purple">
                <div className="card-body">
                  <div className="stat-number">
                    ₹{stats.paymentReceived.toLocaleString()}
                  </div>
                  <div className="stat-label">Payment Received</div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Widgets Row */}
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card" style={{ height: "400px" }}>
                <div className="card-body">
                  <h3 style={{ marginBottom: "20px", color: "#333" }}>
                    Monthly Collection Trends
                  </h3>
                  <div style={{ height: "300px" }}>
                    <Bar data={monthlyData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card" style={{ height: "400px" }}>
                <div className="card-body">
                  <h3 style={{ marginBottom: "20px", color: "#333" }}>
                    Scrap Type Distribution
                  </h3>
                  <div style={{ height: "300px" }}>
                    <Doughnut data={scrapTypeData} options={doughnutOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Analytics Row */}
          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className="card" style={{ height: "400px" }}>
                <div className="card-body">
                  <h3 style={{ marginBottom: "20px", color: "#333" }}>
                    Weekly Revenue Analysis
                  </h3>
                  <div style={{ height: "300px" }}>
                    <Line data={weeklyRevenueData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card" style={{ height: "400px" }}>
                <div className="card-body">
                  <h3 style={{ marginBottom: "20px", color: "#333" }}>
                    Inventory Summary
                  </h3>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>🔩 Metal Scrap</span>
                      <span style={{ fontWeight: "bold", color: "#4caf50" }}>
                        2,100 kg
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>📄 Paper & Cardboard</span>
                      <span style={{ fontWeight: "bold", color: "#2196f3" }}>
                        1,312 kg
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>🧴 Plastic Waste</span>
                      <span style={{ fontWeight: "bold", color: "#ffc107" }}>
                        945 kg
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>🪟 Glass Materials</span>
                      <span style={{ fontWeight: "bold", color: "#9c27b0" }}>
                        630 kg
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>💻 E-Waste</span>
                      <span style={{ fontWeight: "bold", color: "#ff5722" }}>
                        263 kg
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "15px 0",
                        borderTop: "2px solid #4caf50",
                        marginTop: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      <span>Total Stock</span>
                      <span style={{ color: "#2e7d32" }}>5,250 kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities Row */}
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h3 style={{ marginBottom: "20px", color: "#333" }}>
                    Top Buyers This Month
                  </h3>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>🏭 GreenTech Industries</span>
                      <span style={{ fontWeight: "bold", color: "#4caf50" }}>
                        ₹85,000
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>🏢 EcoRecycle Corp</span>
                      <span style={{ fontWeight: "bold", color: "#4caf50" }}>
                        ₹72,000
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>🌱 Sustainable Solutions</span>
                      <span style={{ fontWeight: "bold", color: "#4caf50" }}>
                        ₹58,000
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <span>♻️ Metro Recyclers</span>
                      <span style={{ fontWeight: "bold", color: "#4caf50" }}>
                        ₹45,000
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "12px 0",
                      }}
                    >
                      <span>🔄 Urban Waste Management</span>
                      <span style={{ fontWeight: "bold", color: "#4caf50" }}>
                        ₹25,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h3 style={{ marginBottom: "20px", color: "#333" }}>
                    Recent Activities
                  </h3>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    <div
                      className="activity-item"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      📦 New shipment received - 500kg mixed metals
                    </div>
                    <div
                      className="activity-item"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      💰 Payment confirmed - ₹45,000 from EcoRecycle Corp
                    </div>
                    <div
                      className="activity-item"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      🚛 Dispatch completed - Paper waste to GreenTech
                    </div>
                    <div
                      className="activity-item"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      📊 Inventory audit completed successfully
                    </div>
                    <div
                      className="activity-item"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      ✅ Quality verification - Plastic batch approved
                    </div>
                    <div
                      className="activity-item"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      🔄 Stock replenishment - E-waste section updated
                    </div>
                    <div
                      className="activity-item"
                      style={{
                        padding: "8px 0",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      📞 New inquiry - Glass materials bulk order
                    </div>
                    <div className="activity-item" style={{ padding: "8px 0" }}>
                      🎯 Daily target achieved - 98% efficiency rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapyardDashboard;
