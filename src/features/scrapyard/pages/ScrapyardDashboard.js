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
import {
  connectSocket,
  disconnectSocket,
} from "../../../Services/SocketService";
import LogoutMenu from "../../../shared/components/LogoutMenu";
import ScrapyardSidebar from "../../../shared/layout/ScrapyardSidebar";

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

/* ─────────────────────────────────────────────────
   CSS-in-JS  (all styles in one place, no external file)
───────────────────────────────────────────────── */
const CSS = `
  :root {
    --sd-green:          #16a34a;
    --sd-green-hover:    #15803d;
    --sd-green-light:    #dcfce7;
    --sd-green-text:     #166534;
    --sd-blue-light:     #dbeafe;
    --sd-blue-text:      #1e40af;
    --sd-orange-light:   #ffedd5;
    --sd-orange-text:    #9a3412;
    --sd-purple-light:   #f3e8ff;
    --sd-purple-text:    #6b21a8;
    --sd-red:            #d32f2f;
    --sd-bg-page:        #f5f5f4;
    --sd-bg-surface:     #ffffff;
    --sd-bg-muted:       #f9fafb;
    --sd-border:         #e5e7eb;
    --sd-text-primary:   #111827;
    --sd-text-secondary: #6b7280;
    --sd-text-hint:      #9ca3af;
    --sd-shadow:         0 1px 4px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04);
    --sd-radius:         12px;
    --sd-radius-sm:      8px;
    --sd-radius-xs:      6px;
    --sd-font:           'Segoe UI', system-ui, -apple-system, sans-serif;
    --sd-transition:     .15s ease;
  }

  /* ── Layout ── */
  .sd-layout {
    display: flex;
    min-height: 100vh;
    background: var(--sd-bg-page);
    font-family: var(--sd-font);
  }
  .sd-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow-x: hidden;
  }

  /* ── Top bar ── */
  .sd-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 28px 16px;
    background: var(--sd-bg-surface);
    border-bottom: 1px solid var(--sd-border);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .sd-topbar__title {
    font-size: 20px;
    font-weight: 700;
    color: var(--sd-text-primary);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sd-topbar__subtitle {
    font-size: 12px;
    color: var(--sd-text-secondary);
    margin: 2px 0 0;
  }

  /* ── Scrollable body ── */
  .sd-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  /* ── Generic card ── */
  .sd-card {
    background: var(--sd-bg-surface);
    border: 1px solid var(--sd-border);
    border-radius: var(--sd-radius);
    box-shadow: var(--sd-shadow);
    overflow: hidden;
  }
  .sd-card__body {
    padding: 20px 22px;
  }
  .sd-card__title {
    font-size: 15px;
    font-weight: 700;
    color: var(--sd-text-primary);
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── Stats grid ── */
  .sd-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .sd-stat-card {
    background: var(--sd-bg-surface);
    border: 1px solid var(--sd-border);
    border-radius: var(--sd-radius);
    box-shadow: var(--sd-shadow);
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    overflow: hidden;
    transition: transform var(--sd-transition), box-shadow var(--sd-transition);
  }
  .sd-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0,0,0,.09);
  }
  .sd-stat-card__accent {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: var(--sd-radius) var(--sd-radius) 0 0;
  }
  .sd-stat-card__icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: var(--sd-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 4px;
  }
  .sd-stat-card__label {
    font-size: 11px;
    font-weight: 600;
    color: var(--sd-text-hint);
    text-transform: uppercase;
    letter-spacing: .5px;
    margin: 0;
  }
  .sd-stat-card__value {
    font-size: 22px;
    font-weight: 700;
    color: var(--sd-text-primary);
    margin: 0;
    line-height: 1.2;
  }

  /* ── Current prices strip ── */
  .sd-prices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 10px;
  }
  .sd-price-chip {
    background: var(--sd-bg-muted);
    border: 1px solid var(--sd-border);
    border-radius: var(--sd-radius-sm);
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    transition: border-color var(--sd-transition);
  }
  .sd-price-chip:hover { border-color: #a3e0b5; }
  .sd-price-chip__header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--sd-text-primary);
  }
  .sd-price-chip__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: var(--sd-text-secondary);
  }
  .sd-price-chip__val {
    font-size: 13px;
    font-weight: 700;
    color: var(--sd-green);
  }

  /* ── Two-column chart row ── */
  .sd-charts-row {
    display: grid;
    gap: 16px;
  }
  .sd-charts-row--2 { grid-template-columns: 1fr 1fr; }
  .sd-charts-row--8-4 { grid-template-columns: 2fr 1fr; }

  .sd-chart-wrap {
    height: 280px;
    position: relative;
  }

  /* ── Low stock alert ── */
  .sd-alert {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: var(--sd-radius-sm);
    padding: 12px 14px;
    font-size: 12px;
    color: #92400e;
    margin-bottom: 4px;
  }
  .sd-alert__title {
    font-weight: 700;
    margin-bottom: 4px;
  }

  /* ── Update prices form ── */
  .sd-price-form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 14px;
  }
  .sd-form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .sd-form-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--sd-text-secondary);
    text-transform: uppercase;
    letter-spacing: .4px;
  }
  .sd-form-input {
    padding: 8px 10px;
    border: 1px solid var(--sd-border);
    border-radius: var(--sd-radius-xs);
    background: var(--sd-bg-surface);
    color: var(--sd-text-primary);
    font-size: 12px;
    font-family: var(--sd-font);
    outline: none;
    transition: border-color var(--sd-transition), box-shadow var(--sd-transition);
    width: 100%;
  }
  .sd-form-input:focus {
    border-color: var(--sd-green);
    box-shadow: 0 0 0 3px rgba(22,163,74,.12);
  }
  .sd-form-input::placeholder { color: var(--sd-text-hint); }

  .sd-update-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    margin-top: 16px;
    padding: 9px 20px;
    background: var(--sd-green);
    color: #fff;
    border: none;
    border-radius: var(--sd-radius-sm);
    font-size: 13px;
    font-weight: 600;
    font-family: var(--sd-font);
    cursor: pointer;
    transition: background var(--sd-transition), transform var(--sd-transition);
  }
  .sd-update-btn:hover {
    background: var(--sd-green-hover);
    transform: translateY(-1px);
  }
  .sd-update-btn:active { transform: translateY(0); }

  /* ── Inventory list ── */
  .sd-inv-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--sd-border);
    font-size: 13px;
  }
  .sd-inv-row:last-of-type { border-bottom: none; }
  .sd-inv-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--sd-text-primary);
    font-weight: 500;
  }
  .sd-inv-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .sd-inv-qty {
    font-weight: 700;
  }
  .sd-inv-total {
    display: flex;
    justify-content: space-between;
    padding: 12px 0 0;
    border-top: 2px solid var(--sd-green);
    margin-top: 6px;
    font-size: 14px;
    font-weight: 700;
    color: var(--sd-green-text);
  }

  /* ── Responsive ── */
  @media (max-width: 1100px) {
    .sd-stats-grid { grid-template-columns: repeat(2, 1fr); }
    .sd-charts-row--2 { grid-template-columns: 1fr; }
    .sd-charts-row--8-4 { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .sd-stats-grid { grid-template-columns: 1fr 1fr; }
    .sd-body { padding: 16px; }
    .sd-topbar { padding: 14px 16px; }
  }
`;

/* ─────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────── */
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

const DOUGHNUT_COLORS = [
  "#4CAF50",
  "#2196F3",
  "#FFC107",
  "#9C27B0",
  "#FF5722",
  "#00BCD4",
  "#FF9800",
];

const PRICE_ITEMS = [
  { icon: "🔩", label: "Metal", key: "Metal" },
  { icon: "🧴", label: "Plastic", key: "Plastic" },
  { icon: "📄", label: "Paper", key: "Paper" },
  { icon: "🪟", label: "Glass", key: "Glass" },
  { icon: "💻", label: "Electronics", key: "Electronics" },
  { icon: "👕", label: "Textiles", key: "Textiles" },
  { icon: "♻️", label: "Others", key: "Others" },
];

const STAT_META = [
  {
    label: "Total Scrap Received",
    icon: "⚖️",
    accent: "#16a34a",
    iconBg: "#dcfce7",
  },
  {
    label: "Scrap Sold",
    icon: "📤",
    accent: "#3b82f6",
    iconBg: "#dbeafe",
  },
  {
    label: "Orders Received",
    icon: "📦",
    accent: "#f97316",
    iconBg: "#ffedd5",
  },
  {
    label: "Revenue Collected",
    icon: "💰",
    accent: "#9333ea",
    iconBg: "#f3e8ff",
  },
];

/* ─────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────── */
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

  /* ── Socket ── */
  useEffect(() => {
    connectSocket((type, data) => {
      console.log("LIVE:", type);
      if (type === "inventory") setInventory(data);
      if (type === "transactions") setTransactions(data);
      if (type === "orders") setOrders(data);
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
    return () => disconnectSocket();
  }, []);

  /* ── Transactions ── */
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

  /* ── Inventory ── */
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/inventory", {
      headers: { Authorization: "Bearer " + token },
    })
      .then(async (res) => {
        const text = await res.text();
        return text ? JSON.parse(text) : [];
      })
      .then((data) => setInventory(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  /* ── Orders (polled) ── */
  const fetchOrders = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/scrap-orders/owner", {
      headers: { Authorization: `Bearer ${token}` },
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

  /* ── Prices ── */
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

  /* ─────────────────────────────────────────────
     DERIVED DATA
  ───────────────────────────────────────────── */
  const completedOrders = orders.filter((o) => o.status === "COMPLETED");
  const totalOrders = orders.length;
  const totalScrapSold = completedOrders.reduce(
    (sum, o) => sum + (o.quantity || 0),
    0,
  );
  const totalRevenue = completedOrders.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0,
  );
  const totalScrapReceived = orders.reduce(
    (sum, o) => sum + (o.quantity || 0),
    0,
  );

  const statValues = [
    `${totalScrapReceived.toLocaleString()} kg`,
    `${totalScrapSold.toLocaleString()} kg`,
    totalOrders,
    `₹${totalRevenue.toLocaleString()}`,
  ];

  /* ── Scrap Type Distribution (Doughnut) ── */
  const scrapTypeMap = inventory.reduce((acc, item) => {
    const type = item.materialType || "Others";
    if (!acc[type]) acc[type] = 0;
    acc[type] += Number(item.quantity || 0);
    return acc;
  }, {});
  const scrapTypeLabels = Object.keys(scrapTypeMap);
  const scrapTypeValues = Object.values(scrapTypeMap);

  const scrapTypeData = {
    labels: scrapTypeLabels.length ? scrapTypeLabels : ["No Data"],
    datasets: [
      {
        data: scrapTypeValues.length ? scrapTypeValues : [1],
        backgroundColor: DOUGHNUT_COLORS.slice(0, scrapTypeLabels.length || 1),
        borderWidth: 2,
      },
    ],
  };

  /* ── Monthly Collection (Bar) ── */
  const monthlyMap = {};
  transactions
    .filter((tx) => tx.type === "ADD")
    .forEach((tx) => {
      if (!tx.createdAt) return;
      const month = MONTH_NAMES[new Date(tx.createdAt).getMonth()];
      monthlyMap[month] = (monthlyMap[month] || 0) + (tx.quantity || 0);
    });
  const monthlyLabels = MONTH_NAMES.filter((m) => monthlyMap[m] !== undefined);
  const monthlyValues = monthlyLabels.map((m) => monthlyMap[m]);

  const monthlyData = {
    labels: monthlyLabels.length ? monthlyLabels : ["No Data"],
    datasets: [
      {
        label: "Scrap Collected (kg)",
        data: monthlyValues.length ? monthlyValues : [0],
        backgroundColor: "rgba(76,175,80,.6)",
        borderColor: "rgba(76,175,80,1)",
        borderWidth: 2,
      },
    ],
  };

  /* ── Weekly Revenue (Line) ── */
  const weeklyRevenueMap = {};
  transactions
    .filter((tx) => tx.type === "REMOVE")
    .forEach((tx) => {
      if (!tx.createdAt) return;
      const d = new Date(tx.createdAt);
      const jan = new Date(d.getFullYear(), 0, 1);
      const week = Math.ceil(((d - jan) / 86400000 + jan.getDay() + 1) / 7);
      const key = `Week ${week}`;
      weeklyRevenueMap[key] =
        (weeklyRevenueMap[key] || 0) +
        (tx.pricePerKg || 0) * (tx.quantity || 0);
    });
  const weeklyLabels = Object.keys(weeklyRevenueMap).sort(
    (a, b) => parseInt(a.split(" ")[1]) - parseInt(b.split(" ")[1]),
  );
  const weeklyValues = weeklyLabels.map((k) => weeklyRevenueMap[k]);

  const weeklyRevenueData = {
    labels: weeklyLabels.length ? weeklyLabels : ["No Data"],
    datasets: [
      {
        label: "Revenue (₹)",
        data: weeklyValues.length ? weeklyValues : [0],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76,175,80,.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  /* ── Inventory Summary ── */
  const groupedInventory = inventory.reduce((acc, item) => {
    const type = item.materialType || "Others";
    if (!acc[type]) acc[type] = 0;
    acc[type] += Number(item.quantity || 0);
    return acc;
  }, {});

  const inventoryItems = Object.entries(groupedInventory).map(
    ([label, quantity], i) => ({
      label,
      quantity,
      qty: `${quantity.toLocaleString()} kg`,
      color: DOUGHNUT_COLORS[i % DOUGHNUT_COLORS.length],
    }),
  );

  const totalStock = inventory.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );

  /* ── Chart options ── */
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

  /* ── Price form handlers ── */
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    setRates((prev) => ({
      ...prev,
      [name]: { ...prev[name], [type]: value },
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
            headers: { "Content-Type": "application/json" },
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

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <>
      {/* Inject styles */}
      <style>{CSS}</style>

      <div className="sd-layout">
        <ScrapyardSidebar />

        <div className="sd-main">
          {/* ── Top bar ── */}
          <div className="sd-topbar">
            <div>
              <h1 className="sd-topbar__title">🏭 Dashboard — Scrapyard</h1>
              <p className="sd-topbar__subtitle">
                Real-time overview of your scrapyard operations
              </p>
            </div>
            <LogoutMenu />
          </div>

          <div className="sd-body">
            {/* ── Low Stock Alert ── */}
            {lowStockItems.length > 0 && (
              <div className="sd-alert">
                <div className="sd-alert__title">⚠️ Low Stock Alert</div>
                {lowStockItems.map((item) => (
                  <div key={item.id}>
                    {item.materialType} → {item.quantity} kg
                  </div>
                ))}
              </div>
            )}

            {/* ── Stats Cards ── */}
            <div className="sd-stats-grid">
              {STAT_META.map(({ label, icon, accent, iconBg }, i) => (
                <div className="sd-stat-card" key={label}>
                  <div
                    className="sd-stat-card__accent"
                    style={{ background: accent }}
                  />
                  <div
                    className="sd-stat-card__icon-wrap"
                    style={{ background: iconBg }}
                  >
                    {icon}
                  </div>
                  <p className="sd-stat-card__label">{label}</p>
                  <h3 className="sd-stat-card__value">{statValues[i]}</h3>
                </div>
              ))}
            </div>

            {/* ── Current Scrap Prices ── */}
            <div className="sd-card">
              <div className="sd-card__body">
                <h2 className="sd-card__title">📊 Current Scrap Prices</h2>
                <div className="sd-prices-grid">
                  {PRICE_ITEMS.map(({ icon, label, key }) => (
                    <div className="sd-price-chip" key={key}>
                      <div className="sd-price-chip__header">
                        <span>{icon}</span>
                        <span>{label}</span>
                      </div>
                      <div className="sd-price-chip__row">
                        <span>Customer</span>
                        <span className="sd-price-chip__val">
                          ₹{prices[key]?.customer ?? "--"}/kg
                        </span>
                      </div>
                      <div className="sd-price-chip__row">
                        <span>Company</span>
                        <span className="sd-price-chip__val">
                          ₹{prices[key]?.company ?? "--"}/kg
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Charts Row 1: Bar + Doughnut ── */}
            <div className="sd-charts-row sd-charts-row--2">
              <div className="sd-card">
                <div className="sd-card__body">
                  <h2 className="sd-card__title">
                    📈 Monthly Collection Trends
                  </h2>
                  <div className="sd-chart-wrap">
                    <Bar data={monthlyData} options={chartOptions} />
                  </div>
                </div>
              </div>
              <div className="sd-card">
                <div className="sd-card__body">
                  <h2 className="sd-card__title">🥧 Scrap Type Distribution</h2>
                  <div className="sd-chart-wrap">
                    <Doughnut data={scrapTypeData} options={doughnutOptions} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Update Prices ── */}
            <div className="sd-card">
              <div className="sd-card__body">
                <h2 className="sd-card__title">✏️ Update Scrap Prices</h2>
                <div className="sd-price-form-grid">
                  {Object.keys(rates).map((item) => (
                    <div className="sd-form-group" key={item}>
                      <label className="sd-form-label">{item}</label>
                      <input
                        type="number"
                        name={item}
                        value={rates[item].customer}
                        onChange={(e) => handleChange(e, "customer")}
                        placeholder="Customer ₹/kg"
                        className="sd-form-input"
                        style={{ marginBottom: "5px" }}
                      />
                      <input
                        type="number"
                        name={item}
                        value={rates[item].company}
                        onChange={(e) => handleChange(e, "company")}
                        placeholder="Company ₹/kg"
                        className="sd-form-input"
                      />
                    </div>
                  ))}
                </div>
                <button className="sd-update-btn" onClick={handleSubmit}>
                  ✅ Update Prices
                </button>
              </div>
            </div>

            {/* ── Charts Row 2: Line + Inventory ── */}
            <div className="sd-charts-row sd-charts-row--8-4">
              <div className="sd-card">
                <div className="sd-card__body">
                  <h2 className="sd-card__title">📉 Weekly Revenue Analysis</h2>
                  <div className="sd-chart-wrap">
                    <Line data={weeklyRevenueData} options={chartOptions} />
                  </div>
                </div>
              </div>
              <div className="sd-card">
                <div className="sd-card__body">
                  <h2 className="sd-card__title">🗃️ Inventory Summary</h2>
                  {inventoryItems.length === 0 ? (
                    <p style={{ fontSize: "13px", color: "#9ca3af" }}>
                      No active stock.
                    </p>
                  ) : (
                    <>
                      {inventoryItems.map(({ label, qty, color, quantity }) => (
                        <div className="sd-inv-row" key={label}>
                          <span className="sd-inv-label">
                            <span
                              className="sd-inv-dot"
                              style={{
                                background: quantity < 30 ? "#d32f2f" : color,
                              }}
                            />
                            {label}
                          </span>
                          <span
                            className="sd-inv-qty"
                            style={{ color: quantity < 30 ? "#d32f2f" : color }}
                          >
                            {qty}
                          </span>
                        </div>
                      ))}
                      <div className="sd-inv-total">
                        <span>Total Stock</span>
                        <span>{totalStock.toLocaleString()} kg</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrapyardDashboard;
