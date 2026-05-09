import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "../.././Static/Dashboard.css";
import { connectSocket, disconnectSocket } from "../../Services/SocketService";
import LogoutMenu from "../Common/LogoutMenu";
import ScrapyardSidebar from "../Common/ScrapyardSidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ScrapyardDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [prices, setPrices] = useState({});
  const [rates, setRates] = useState({
    Metal: { customer: "", company: "" },
    Plastic: { customer: "", company: "" },
    Paper: { customer: "", company: "" },
    Glass: { customer: "", company: "" },
    Electronics: { customer: "", company: "" },
    Textiles: { customer: "", company: "" },
    Others: { customer: "", company: "" },
  });
  const [inventory, setInventory] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const lowStockItems = inventory.filter((item) => item.quantity < 30);

  useEffect(() => {
    connectSocket((type, data) => {
      console.log("LIVE:", type);

      // INVENTORY
      if (type === "inventory") {
        setInventory(data);
      }

      // TRANSACTIONS
      if (type === "transactions") {
        setTransactions(data);
      }

      // ORDERS
      if (type === "orders") {
        setOrders(data);
      }

      // PRICES
      if (type === "prices") {
        const map = {};

        data.forEach((item) => {
          map[item.materialType] = {
            customer: item.customerPrice,
            company: item.companyPrice,
          };
        });

        setPrices(map);
      }
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchTx = () => {
      fetch("http://localhost:8080/api/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (!res.ok) {
            console.error("Transactions API failed:", res.status);
            return [];
          }
          const text = await res.text();
          return text ? JSON.parse(text) : [];
        })
        .then((data) => setTransactions(Array.isArray(data) ? data : []))
        .catch(() => setTransactions([]));
    };

    fetchTx();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/inventory", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(async (res) => {
        const text = await res.text();
        return text ? JSON.parse(text) : [];
      })
      .then((data) => setInventory(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  // ── Fetch orders every 5s ──
  const fetchOrders = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/scrap-orders/owner", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          console.error("Orders API failed:", res.status);
          return [];
        }
        const text = await res.text();
        return text ? JSON.parse(text) : [];
      })
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setOrders([]));
  };

  // ── Fetch prices every 5s ──
  useEffect(() => {
    const fetchPrices = () => {
      // const ownerId = localStorage.getItem("userId");
      const ownerId = 2;
      const token = localStorage.getItem("token");
      fetch(`http://localhost:8080/api/prices/all?ownerId=${ownerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (!res.ok) return [];
          const text = await res.text();
          return text ? JSON.parse(text) : [];
        })
        .then((data) => {
          const priceMap = {};

          data.forEach((item) => {
            priceMap[item.materialType] = {
              customer: item.customerPrice,
              company: item.companyPrice,
            };
          });

          setPrices(priceMap);
        })
        .catch((err) => console.error(err));
    };

    fetchPrices();
  }, []);

  // ══════════════════════════════════════════════
  //  DERIVED DATA FROM REAL ORDERS
  // ══════════════════════════════════════════════

  // ── Stats ──
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "COMPLETED");
  const totalScrapSold = completedOrders.reduce(
    (sum, o) => sum + (o.quantity || 0),
    0,
  );
  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0,
  );

  // total scrap across ALL orders (not just completed)
  const totalScrapReceived = orders.reduce(
    (sum, o) => sum + (o.quantity || 0),
    0,
  );

  // ── Scrap Type Distribution (Doughnut) ──
  // Group quantity by scrapType from all orders
  const scrapTypeMap = inventory.reduce((acc, item) => {
    const type = item.materialType || "Others";

    if (!acc[type]) {
      acc[type] = 0;
    }

    acc[type] += Number(item.quantity || 0);

    return acc;
  }, {});

  const scrapTypeLabels = Object.keys(scrapTypeMap);
  const scrapTypeValues = Object.values(scrapTypeMap);
  const doughnutColors = [
    "#4CAF50",
    "#2196F3",
    "#FFC107",
    "#9C27B0",
    "#FF5722",
    "#00BCD4",
    "#FF9800",
  ];

  const scrapTypeData = {
    labels: scrapTypeLabels.length ? scrapTypeLabels : ["No Data"],
    datasets: [
      {
        data: scrapTypeValues.length ? scrapTypeValues : [1],
        backgroundColor: doughnutColors.slice(0, scrapTypeLabels.length || 1),
        borderWidth: 2,
      },
    ],
  };

  // ── Monthly Collection Trends (Bar) ──
  // Group quantity by month from order date
  const monthlyMap = {};
  transactions
    .filter((tx) => tx.type === "ADD")
    .forEach((tx) => {
      if (!tx.createdAt) return;
      const month = MONTH_NAMES[new Date(tx.createdAt).getMonth()];
      monthlyMap[month] = (monthlyMap[month] || 0) + (tx.quantity || 0);
    });
  // Keep only months that have data, in calendar order
  const monthlyLabels = MONTH_NAMES.filter((m) => monthlyMap[m] !== undefined);
  const monthlyValues = monthlyLabels.map((m) => monthlyMap[m]);

  const monthlyData = {
    labels: monthlyLabels.length ? monthlyLabels : ["No Data"],
    datasets: [
      {
        label: "Scrap Collected (kg)",
        data: monthlyValues.length ? monthlyValues : [0],
        backgroundColor: "rgba(76, 175, 80, 0.6)",
        borderColor: "rgba(76, 175, 80, 1)",
        borderWidth: 2,
      },
    ],
  };

  // ── Weekly Revenue Analysis (Line) ──
  // Group totalPrice of COMPLETED orders by ISO week number
  const weeklyRevenueMap = {};
  transactions
    .filter((tx) => tx.type === "REMOVE") // or SOLD if you use that
    .forEach((tx) => {
      if (!tx.createdAt) return;

      const d = new Date(tx.createdAt);
      const jan = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(((d - jan) / 86400000 + jan.getDay() + 1) / 7);
      const key = `Week ${week}`;

      const revenue = (tx.pricePerKg || 0) * (tx.quantity || 0);

      weeklyRevenueMap[key] = (weeklyRevenueMap[key] || 0) + revenue;
    });

  const weeklyLabels = Object.keys(weeklyRevenueMap).sort((a, b) => {
    return parseInt(a.split(" ")[1]) - parseInt(b.split(" ")[1]);
  });
  const weeklyValues = weeklyLabels.map((k) => weeklyRevenueMap[k]);

  const weeklyRevenueData = {
    labels: weeklyLabels.length ? weeklyLabels : ["No Data"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: weeklyValues.length ? weeklyValues : [0],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };
  const groupedInventory = inventory.reduce((acc, item) => {
    const type = item.materialType || "Others";

    if (!acc[type]) {
      acc[type] = 0;
    }

    acc[type] += Number(item.quantity || 0);

    return acc;
  }, {});
  // ── Inventory Summary (from scrapTypeMap, only PENDING/ACCEPTED = in stock) ──
  const inventoryItems = Object.entries(groupedInventory).map(
    ([label, quantity], i) => ({
      label,
      quantity,
      qty: `${quantity.toLocaleString()} kg`,
      color: doughnutColors[i % doughnutColors.length],
    }),
  );

  const totalStock = inventory.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );

  const lowStockAlert = lowStockItems.length > 0 && (
    <div
      style={{
        background: "#fff3cd",
        border: "1px solid #ffeeba",
        padding: "10px",
        borderRadius: "6px",
        marginBottom: "10px",
        fontSize: "13px",
      }}
    >
      ⚠️ Low Stock Alert:
      {lowStockItems.map((item) => (
        <div key={item.id}>
          {item.materialType} → {item.quantity} kg
        </div>
      ))}
    </div>
  );

  // ══════════════════════════════════════════════
  //  PRICE UPDATE
  // ══════════════════════════════════════════════
  const handleChange = (e, type) => {
    const { name, value } = e.target;

    setRates((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        [type]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      // const ownerId = localStorage.getItem("userId");
      const ownerId = 2;

      for (const key in rates) {
        if (rates[key].customer || rates[key].company) {
          await fetch("http://localhost:8080/api/prices/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ownerId: Number(ownerId),
              materialType: key,
              customerPrice: Number(rates[key].customer),
              companyPrice: Number(rates[key].company),
            }),
          });
        }
      }

      alert("Prices Updated Successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error updating prices ❌");
    }
  };

  // ── Chart options ──
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true } },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
  };

  // ── Current price display ──
  const priceItems = [
    { icon: "🔩", label: "Metal", key: "Metal" },
    { icon: "🧴", label: "Plastic", key: "Plastic" },
    { icon: "📄", label: "Paper", key: "Paper" },
    { icon: "🪟", label: "Glass", key: "Glass" },
    { icon: "💻", label: "Electronics", key: "Electronics" },
    { icon: "👕", label: "Textiles", key: "Textiles" },
    { icon: "♻️", label: "Others", key: "Others" },
  ];

  return (
    <div className="d-flex">
      <ScrapyardSidebar />

      <div className="container-fluid" style={{ padding: "0 20px" }}>
        <div className="dashboard-content">
          {/* ── Header ── */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="dashboard-title" style={{ margin: 0 }}>
              Dashboard — Scrapyard
            </h1>
            <LogoutMenu />
          </div>

          {/* ── Stats Cards (all from real orders) ── */}
          <div className="row mb-3">
            {[
              {
                label: "Total Scrap Received",
                value: `${totalScrapReceived.toLocaleString()} kg`,
                cls: "",
              },
              {
                label: "Scrap Sold",
                value: `${totalScrapSold.toLocaleString()} kg`,
                cls: "blue",
              },
              { label: "Orders Received", value: totalOrders, cls: "orange" },
              {
                label: "Revenue Collected",
                value: `₹${totalRevenue.toLocaleString()}`,
                cls: "purple",
              },
            ].map(({ label, value, cls }) => (
              <div className="col-lg-3 col-md-6 mb-3" key={label}>
                <div className={`card stats-card ${cls}`}>
                  <div className="card-body">
                    <div className="stat-number">{value}</div>
                    <div className="stat-label">{label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Current Scrap Prices ── */}
          <div className="card mb-3">
            <div className="card-body py-3">
              <h5 className="mb-3">Current Scrap Prices</h5>
              <div className="row g-2">
                {priceItems.map(({ icon, label, key }) => (
                  <div className="col-md-3 col-6" key={key}>
                    <div
                      style={{
                        background: "#f8f9fa",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontSize: "13px",
                      }}
                    >
                      {icon} <b>{label}:</b> ₹ ₹{prices[key]?.customer ?? "--"}{" "}
                      / ₹{prices[key]?.company ?? "--"} /kg
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h5>Recent Transactions</h5>

                {(Array.isArray(transactions) ? transactions : [])
                  .slice(0, 5)
                  .map((tx) => (
                    <div
                      key={tx.id}
                      style={{
                        padding: "10px 0",
                        borderBottom: "1px solid #eee",
                        fontSize: "13px",
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>
                        {tx.type === "ADD"
                          ? "🟢 Stock Added"
                          : tx.type === "REMOVE"
                            ? "🔴 Stock Sold"
                            : "⚪ Activity"}
                      </div>

                      <div>Material: {tx.materialType}</div>
                      <div>Quantity: {tx.quantity} kg</div>
                      <div>Price: ₹{tx.pricePerKg || 0}/kg</div>

                      <div style={{ color: "#666" }}>
                        Source: {tx.source || "-"} | Ref:{" "}
                        {tx.referenceId || "-"}
                      </div>

                      <div style={{ fontSize: "12px", color: "#999" }}>
                        {tx.createdAt
                          ? new Date(tx.createdAt).toLocaleString()
                          : "No Date"}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* ── Charts Row 1: Bar + Doughnut ── */}
          <div className="row mb-3">
            <div className="col-lg-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="mb-3">Monthly Collection Trends</h5>
                  <div style={{ height: "280px" }}>
                    <Bar data={monthlyData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="mb-3">Scrap Type Distribution</h5>
                  <div style={{ height: "280px" }}>
                    <Doughnut data={scrapTypeData} options={doughnutOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Update Prices ── */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-3">Update Scrap Prices</h5>
              <div className="row g-2">
                {Object.keys(rates).map((item) => (
                  <div className="col-md-3 col-6" key={item}>
                    <label style={{ fontSize: "13px" }}>{item}</label>

                    <input
                      type="number"
                      name={item}
                      value={rates[item].customer}
                      onChange={(e) => handleChange(e, "customer")}
                      placeholder="Customer ₹/kg"
                      className="form-control form-control-sm mb-1"
                    />

                    <input
                      type="number"
                      name={item}
                      value={rates[item].company}
                      onChange={(e) => handleChange(e, "company")}
                      placeholder="Company ₹/kg"
                      className="form-control form-control-sm"
                    />
                  </div>
                ))}
              </div>
              <button
                className="btn btn-success btn-sm mt-3"
                onClick={handleSubmit}
              >
                Update Prices
              </button>
            </div>
          </div>

          {/* ── Charts Row 2: Line + Inventory ── */}
          <div className="row mb-4">
            <div className="col-lg-8 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="mb-3">Weekly Revenue Analysis</h5>
                  <div style={{ height: "280px" }}>
                    <Line data={weeklyRevenueData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="mb-3">Inventory Summary</h5>

                  {inventoryItems.length === 0 ? (
                    <p style={{ fontSize: "13px", color: "#888" }}>
                      No active stock.
                    </p>
                  ) : (
                    <>
                      {inventoryItems.map(({ label, qty, color, quantity }) => (
                        <div
                          key={label}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px 0",
                            borderBottom: "1px solid #eee",
                            fontSize: "13px",
                          }}
                        >
                          <span>{label}</span>
                          <span
                            style={{
                              fontWeight: 700,
                              color: quantity < 30 ? "#d32f2f" : color,
                            }}
                          >
                            {qty}
                          </span>
                        </div>
                      ))}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px 0 0",
                          borderTop: "2px solid #4caf50",
                          marginTop: "6px",
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        <span>Total Stock</span>
                        <span style={{ color: "#2e7d32" }}>
                          {totalStock.toLocaleString()} kg
                        </span>
                      </div>
                    </>
                  )}
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
