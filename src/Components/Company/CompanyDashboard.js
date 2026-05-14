import { useEffect, useState } from "react";
import CompanySidebar from "../Common/CompanySidebar";
import LogoutMenu from "../Common/LogoutMenu";

/* ═══════════════════════════════════════════════════
   INTERNAL CSS  —  light theme, all styles in one place
═══════════════════════════════════════════════════ */
const CSS = `
  :root {
    --cd-green:        #16a34a;
    --cd-green-hov:    #15803d;
    --cd-green-lt:     #dcfce7;
    --cd-green-tx:     #166534;
    --cd-blue:         #2563eb;
    --cd-blue-lt:      #dbeafe;
    --cd-blue-tx:      #1e40af;
    --cd-amber:        #d97706;
    --cd-amber-lt:     #fef3c7;
    --cd-amber-tx:     #92400e;
    --cd-purple:       #7c3aed;
    --cd-purple-lt:    #ede9fe;
    --cd-purple-tx:    #4c1d95;
    --cd-rose:         #e11d48;
    --cd-rose-lt:      #ffe4e6;
    --cd-rose-tx:      #9f1239;
    --cd-cyan:         #0891b2;
    --cd-cyan-lt:      #cffafe;
    --cd-cyan-tx:      #164e63;
    --cd-bg-page:      #f5f5f4;
    --cd-bg-surface:   #ffffff;
    --cd-bg-muted:     #f9fafb;
    --cd-border:       #e5e7eb;
    --cd-text-1:       #111827;
    --cd-text-2:       #6b7280;
    --cd-text-3:       #9ca3af;
    --cd-shadow:       0 1px 3px rgba(0,0,0,.06), 0 4px 14px rgba(0,0,0,.05);
    --cd-radius:       12px;
    --cd-radius-sm:    8px;
    --cd-radius-xs:    6px;
    --cd-font:         'Segoe UI', system-ui, -apple-system, sans-serif;
    --cd-tr:           .15s ease;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Layout ── */
  .cd-wrap { display:flex; min-height:100vh; background:var(--cd-bg-page); font-family:var(--cd-font); }
  .cd-main { flex:1; display:flex; flex-direction:column; min-width:0; overflow-x:hidden; }

  /* ── Topbar ── */
  .cd-top {
    display:flex; align-items:center; justify-content:space-between;
    padding:16px 28px; background:var(--cd-bg-surface);
    border-bottom:1px solid var(--cd-border);
    position:sticky; top:0; z-index:10;
  }
  .cd-top__left h1 { font-size:19px; font-weight:700; color:var(--cd-text-1); display:flex; align-items:center; gap:8px; }
  .cd-top__left p  { font-size:12px; color:var(--cd-text-2); margin-top:2px; }
  .cd-top__right   { display:flex; align-items:center; gap:10px; }
  .cd-notif {
    width:34px; height:34px; border-radius:var(--cd-radius-sm);
    border:1px solid var(--cd-border); background:var(--cd-bg-surface);
    cursor:pointer; display:flex; align-items:center; justify-content:center;
    color:var(--cd-text-2); font-size:15px; position:relative;
  }
  .cd-notif-dot {
    position:absolute; top:7px; right:7px;
    width:7px; height:7px; background:var(--cd-rose); border-radius:50%;
  }

  /* ── Company ID pill ── */
  .cd-company-pill {
    display:flex; align-items:center; gap:6px;
    padding:5px 12px; border-radius:99px;
    background:var(--cd-blue-lt); color:var(--cd-blue-tx);
    font-size:11px; font-weight:600; border:1px solid #bfdbfe;
  }

  /* ── Scrollable body ── */
  .cd-body { flex:1; overflow-y:auto; padding:22px 28px; display:flex; flex-direction:column; gap:20px; }

  /* ── Section label ── */
  .cd-section-lbl { font-size:10px; font-weight:700; color:var(--cd-text-3); text-transform:uppercase; letter-spacing:.7px; margin-bottom:10px; }

  /* ── Generic card ── */
  .cd-card { background:var(--cd-bg-surface); border:1px solid var(--cd-border); border-radius:var(--cd-radius); box-shadow:var(--cd-shadow); overflow:hidden; }
  .cd-card__body  { padding:18px 20px; }
  .cd-card__title { font-size:14px; font-weight:700; color:var(--cd-text-1); display:flex; align-items:center; gap:7px; margin-bottom:4px; }
  .cd-card__sub   { font-size:11px; color:var(--cd-text-2); margin-bottom:14px; }

  /* ── Grid helpers ── */
  .cd-g4   { display:grid; grid-template-columns:repeat(4,1fr);  gap:14px; }
  .cd-g3   { display:grid; grid-template-columns:repeat(3,1fr);  gap:14px; }
  .cd-g2   { display:grid; grid-template-columns:1fr 1fr;        gap:14px; }
  .cd-g2-3 { display:grid; grid-template-columns:2fr 1fr;        gap:14px; }

  /* ── Stat card ── */
  .cd-stat {
    background:var(--cd-bg-surface); border:1px solid var(--cd-border);
    border-radius:var(--cd-radius); box-shadow:var(--cd-shadow);
    padding:16px 18px; position:relative; overflow:hidden;
    transition:transform var(--cd-tr), box-shadow var(--cd-tr);
  }
  .cd-stat:hover { transform:translateY(-2px); box-shadow:0 6px 22px rgba(0,0,0,.09); }
  .cd-stat__bar  { position:absolute; top:0; left:0; right:0; height:3px; }
  .cd-stat__icon { width:34px; height:34px; border-radius:var(--cd-radius-sm); display:flex; align-items:center; justify-content:center; font-size:17px; margin-bottom:10px; }
  .cd-stat__lbl  { font-size:11px; font-weight:600; color:var(--cd-text-3); text-transform:uppercase; letter-spacing:.4px; }
  .cd-stat__val  { font-size:21px; font-weight:700; color:var(--cd-text-1); margin-top:3px; }
  .cd-stat__chg  { font-size:11px; margin-top:4px; font-weight:500; }
  .cd-stat__chg--up   { color:var(--cd-green); }
  .cd-stat__chg--down { color:var(--cd-rose);  }

  /* ── Live badge ── */
  .cd-live-badge {
    display:inline-flex; align-items:center; gap:5px;
    font-size:10px; font-weight:600; color:var(--cd-green-tx);
    background:var(--cd-green-lt); padding:3px 9px; border-radius:99px;
  }
  .cd-live-dot {
    width:6px; height:6px; border-radius:50%; background:var(--cd-green);
    animation:cd-pulse 1.5s ease-in-out infinite;
  }
  @keyframes cd-pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

  /* ── Rates grid ── */
  .cd-rates-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(140px,1fr)); gap:10px; }
  .cd-rate-chip  {
    background:var(--cd-bg-muted); border:1px solid var(--cd-border);
    border-radius:var(--cd-radius-sm); padding:10px 12px;
    transition:border-color var(--cd-tr);
  }
  .cd-rate-chip:hover { border-color:#a3e0b5; }
  .cd-rate-chip__label { font-size:11px; font-weight:600; color:var(--cd-text-2); margin-bottom:5px; }
  .cd-rate-chip__val   { font-size:17px; font-weight:700; color:var(--cd-green); }
  .cd-rate-chip__unit  { font-size:10px; color:var(--cd-text-3); margin-top:2px; }

  /* ── ESG ── */
  .cd-esg-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
  .cd-esg-card { border-radius:var(--cd-radius-sm); padding:14px 16px; border:1px solid; }
  .cd-esg-e { background:#f0fdf4; border-color:#bbf7d0; }
  .cd-esg-s { background:#eff6ff; border-color:#bfdbfe; }
  .cd-esg-g { background:#faf5ff; border-color:#e9d5ff; }
  .cd-esg-head { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; margin-bottom:10px; }
  .cd-esg-e .cd-esg-head { color:var(--cd-green-tx); }
  .cd-esg-s .cd-esg-head { color:var(--cd-blue-tx); }
  .cd-esg-g .cd-esg-head { color:var(--cd-purple-tx); }
  .cd-esg-score { display:flex; align-items:baseline; gap:5px; margin-bottom:8px; }
  .cd-esg-score__num { font-size:28px; font-weight:700; line-height:1; }
  .cd-esg-score__max { font-size:12px; color:var(--cd-text-3); }
  .cd-esg-e .cd-esg-score__num { color:var(--cd-green-tx); }
  .cd-esg-s .cd-esg-score__num { color:var(--cd-blue-tx); }
  .cd-esg-g .cd-esg-score__num { color:var(--cd-purple-tx); }
  .cd-progress      { height:4px; border-radius:99px; background:#e5e7eb; overflow:hidden; margin-bottom:10px; }
  .cd-progress__fill{ height:100%; border-radius:99px; }
  .cd-esg-metric { display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid rgba(0,0,0,.06); font-size:11px; }
  .cd-esg-metric:last-child { border-bottom:none; }
  .cd-esg-metric__label { color:var(--cd-text-2); }
  .cd-esg-metric__val   { font-weight:700; color:var(--cd-text-1); }

  /* ── Supplier rows ── */
  .cd-sup-row { display:flex; align-items:center; gap:12px; padding:9px 0; border-bottom:1px solid var(--cd-border); }
  .cd-sup-row:last-child { border-bottom:none; }
  .cd-sup-avatar { width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#fff; flex-shrink:0; }
  .cd-sup-name   { font-size:12px; font-weight:600; color:var(--cd-text-1); }
  .cd-sup-sub    { font-size:10px; color:var(--cd-text-2); }
  .cd-sup-score  { margin-left:auto; text-align:right; flex-shrink:0; }
  .cd-sup-score__val { font-size:13px; font-weight:700; }
  .cd-sup-score__lbl { font-size:9px; color:var(--cd-text-3); }
  .cd-tier-badge { font-size:9px; font-weight:700; padding:1px 6px; border-radius:99px; margin-left:5px; }
  .cd-tier-a { background:#dcfce7; color:#166534; }
  .cd-tier-b { background:#dbeafe; color:#1e40af; }
  .cd-tier-c { background:#fef3c7; color:#92400e; }

  /* ── Contract rows ── */
  .cd-con-row {
    display:flex; align-items:center; justify-content:space-between;
    padding:10px 12px; background:var(--cd-bg-muted);
    border:1px solid var(--cd-border); border-radius:var(--cd-radius-sm);
    margin-bottom:7px; transition:border-color var(--cd-tr);
  }
  .cd-con-row:last-child { margin-bottom:0; }
  .cd-con-row:hover { border-color:#d1d5db; }
  .cd-con-name  { font-size:12px; font-weight:600; color:var(--cd-text-1); }
  .cd-con-meta  { font-size:10px; color:var(--cd-text-2); margin-top:2px; }
  .cd-con-right { display:flex; align-items:center; gap:8px; flex-shrink:0; }
  .cd-con-val   { font-size:12px; font-weight:700; color:var(--cd-text-1); }
  .cd-cstatus-badge { font-size:9px; font-weight:600; padding:2px 8px; border-radius:99px; }
  .cd-cstatus-badge--active   { background:var(--cd-green-lt); color:var(--cd-green-tx); }
  .cd-cstatus-badge--expiring { background:var(--cd-amber-lt); color:var(--cd-amber-tx); }
  .cd-cstatus-badge--expired  { background:var(--cd-rose-lt);  color:var(--cd-rose-tx);  }
  .cd-con-empty { padding:16px 12px; color:var(--cd-text-2); font-size:13px; text-align:center; background:var(--cd-bg-muted); border-radius:var(--cd-radius-sm); border:1px dashed var(--cd-border); }

  /* ── KPI pills ── */
  .cd-kpi-row { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:12px; }
  .cd-kpi { padding:3px 10px; border-radius:99px; font-size:10px; font-weight:600; }

  /* ── Bidding board ── */
  .cd-bid-card {
    border:1px solid var(--cd-border); border-radius:var(--cd-radius);
    padding:14px 16px; background:var(--cd-bg-surface);
    transition:box-shadow var(--cd-tr);
  }
  .cd-bid-card:hover { box-shadow:0 4px 16px rgba(0,0,0,.09); }
  .cd-bid-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:10px; }
  .cd-bid-mat { font-size:14px; font-weight:700; color:var(--cd-text-1); }
  .cd-bid-qty { font-size:10px; color:var(--cd-text-2); margin-top:2px; }
  .cd-bid-dl  { font-size:9px; font-weight:600; color:var(--cd-rose-tx); background:var(--cd-rose-lt); padding:2px 8px; border-radius:99px; }
  .cd-bid-price-row { display:flex; align-items:baseline; gap:4px; margin-bottom:8px; }
  .cd-bid-price { font-size:20px; font-weight:700; color:var(--cd-green); }
  .cd-bid-perkg { font-size:10px; color:var(--cd-text-3); }
  .cd-bid-prog-row { display:flex; justify-content:space-between; font-size:10px; color:var(--cd-text-2); margin-bottom:4px; }
  .cd-bid-bar  { height:4px; border-radius:99px; background:#e5e7eb; overflow:hidden; margin-bottom:10px; }
  .cd-bid-fill { height:100%; border-radius:99px; background:var(--cd-green); }
  .cd-bid-foot { display:flex; align-items:center; justify-content:space-between; }
  .cd-bid-bidders { font-size:10px; color:var(--cd-text-2); }
  .cd-bid-btn {
    padding:6px 14px; background:var(--cd-blue); color:#fff;
    border:none; border-radius:var(--cd-radius-xs); font-size:11px;
    font-weight:600; cursor:pointer; font-family:var(--cd-font);
    transition:background var(--cd-tr);
  }
  .cd-bid-btn:hover { background:var(--cd-blue-tx); }

  /* ── Table ── */
  .cd-table { width:100%; border-collapse:collapse; font-size:12px; }
  .cd-table th { text-align:left; padding:7px 10px; color:var(--cd-text-3); font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.4px; border-bottom:1px solid var(--cd-border); background:var(--cd-bg-muted); }
  .cd-table td { padding:9px 10px; border-bottom:1px solid var(--cd-border); color:var(--cd-text-1); vertical-align:middle; }
  .cd-table tr:last-child td { border-bottom:none; }
  .cd-table tr:hover td { background:var(--cd-bg-muted); }

  /* ── Activity feed ── */
  .cd-feed-item { display:flex; gap:10px; padding:9px 0; border-bottom:1px solid var(--cd-border); }
  .cd-feed-item:last-child { border-bottom:none; }
  .cd-feed-icon { width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; flex-shrink:0; }
  .cd-feed-title { font-size:12px; font-weight:600; color:var(--cd-text-1); }
  .cd-feed-sub   { font-size:10px; color:var(--cd-text-2); margin-top:1px; }
  .cd-feed-time  { font-size:10px; color:var(--cd-text-3); margin-left:auto; flex-shrink:0; white-space:nowrap; }

  /* ── Responsive ── */
  @media(max-width:1200px){
    .cd-g4  { grid-template-columns:repeat(2,1fr); }
    .cd-g3  { grid-template-columns:repeat(2,1fr); }
    .cd-g2-3{ grid-template-columns:1fr; }
    .cd-esg-grid { grid-template-columns:1fr; }
  }
  @media(max-width:700px){
    .cd-g4  { grid-template-columns:1fr 1fr; }
    .cd-g2  { grid-template-columns:1fr; }
    .cd-g3  { grid-template-columns:1fr; }
    .cd-body{ padding:14px 16px; }
    .cd-top { padding:12px 16px; }
  }
`;

/* ══════════════════════════════════════════════════
   STATIC / MOCK DATA
══════════════════════════════════════════════════ */
const PRICE_KEYS = [
  { icon: "🔩", label: "Metal", key: "Metal" },
  { icon: "🧴", label: "Plastic", key: "Plastic" },
  { icon: "📄", label: "Paper", key: "Paper" },
  { icon: "🪟", label: "Glass", key: "Glass" },
  { icon: "💻", label: "Electronics", key: "Electronics" },
  { icon: "👕", label: "Textiles", key: "Textiles" },
  { icon: "♻️", label: "Others", key: "Others" },
];

const CONTRACTS = [
  {
    name: "Annual Copper Supply",
    companyId: 101,
    party: "Kumar Recyclers",
    value: "₹48L",
    end: "Dec 2025",
    status: "active",
  },
  {
    name: "Steel Procurement Q4",
    companyId: 102,
    party: "Sharma Metals",
    value: "₹22L",
    end: "Oct 2025",
    status: "expiring",
  },
  {
    name: "E-Waste Disposal SLA",
    companyId: 101,
    party: "Gupta Eco",
    value: "₹9L",
    end: "Mar 2026",
    status: "active",
  },
  {
    name: "Plastic Recycling MOU",
    companyId: 103,
    party: "Sharma Plastics",
    value: "₹7L",
    end: "Aug 2025",
    status: "expired",
  },
];

const BIDS = [
  {
    material: "Copper Scrap",
    qty: "500 kg",
    target: 520,
    current: 490,
    bids: 6,
    deadline: "2h 14m",
  },
  {
    material: "Iron Scrap",
    qty: "2 MT",
    target: 35,
    current: 32,
    bids: 11,
    deadline: "5h 00m",
  },
  {
    material: "Aluminium",
    qty: "300 kg",
    target: 115,
    current: 108,
    bids: 4,
    deadline: "1d 3h",
  },
];

const ACTIVITY = [
  {
    icon: "📄",
    bg: "#dcfce7",
    title: "Contract renewed — Copper Supply",
    sub: "Kumar Recyclers signed updated terms",
    time: "2m ago",
  },
  {
    icon: "🏷️",
    bg: "#dbeafe",
    title: "New bid placed — Iron Scrap Lot #44",
    sub: "₹32/kg from Sharma Metals",
    time: "18m ago",
  },
  {
    icon: "⚠️",
    bg: "#fef3c7",
    title: "ESG Score dropped — Sharma Plastics",
    sub: "Carbon footprint exceeded threshold",
    time: "1h ago",
  },
  {
    icon: "✅",
    bg: "#f3e8ff",
    title: "Payment received — Steel Procurement",
    sub: "₹22L credited to account",
    time: "3h ago",
  },
  {
    icon: "📦",
    bg: "#cffafe",
    title: "Shipment confirmed — Aluminium Lot #9",
    sub: "ETA: 12 May 2026",
    time: "5h ago",
  },
];

/* ── helpers ── */

const cstatusClass = (s) =>
  s === "active"
    ? "cd-cstatus-badge--active"
    : s === "expiring"
      ? "cd-cstatus-badge--expiring"
      : "cd-cstatus-badge--expired";

/* ══════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════ */
const CompanyDashboard = () => {
  const [prices, setPrices] = useState({});

  /* ✅ ENTERPRISE FIX: logged-in company from localStorage */
  const companyId = Number(localStorage.getItem("companyId")) || 101;

  /* 🔥 LIVE PRICES */
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/prices/all?ownerId=2`,
        );
        if (!res.ok) return;
        const text = await res.text();
        const data = text ? JSON.parse(text) : [];
        const map = {};
        data.forEach((item) => {
          map[item.materialType] = item.companyPrice; // ✅ company rates
        });
        setPrices(map);
      } catch (err) {
        console.error("Price fetch error:", err);
      }
    };
    fetchPrices();
  }, []);

  /* ✅ ENTERPRISE FILTERING — only this company's contracts */
  const filteredContracts = CONTRACTS.filter((c) => c.companyId === companyId);

  const contractStats = {
    active: filteredContracts.filter((c) => c.status === "active").length,
    expiring: filteredContracts.filter((c) => c.status === "expiring").length,
    expired: filteredContracts.filter((c) => c.status === "expired").length,
  };

  return (
    <>
      <style>{CSS}</style>

      <div className="cd-wrap">
        <CompanySidebar />

        <div className="cd-main">
          {/* ── Topbar ── */}
          <div className="cd-top">
            <div className="cd-top__left">
              <h1>🏢 Dashboard — Company</h1>
              <p>Enterprise scrap procurement &amp; sustainability hub</p>
            </div>
            <div className="cd-top__right">
              <span className="cd-company-pill">
                🏭 Company ID: {companyId}
              </span>
              <button className="cd-notif" aria-label="Notifications">
                🔔
                <span className="cd-notif-dot" />
              </button>
              <LogoutMenu />
            </div>
          </div>

          <div className="cd-body">
            {/* ══ SECTION: Overview KPIs ══ */}
            {/* <div>
              <p className="cd-section-lbl">Overview</p>
              <div className="cd-g4">
                {[
                  {
                    label: "Quantity Available",
                    val: "—",
                    icon: "⚖️",
                    bar: "#16a34a",
                    iconBg: "#dcfce7",
                    chg: "▲ Live Inventory",
                    dir: "up",
                  },
                  {
                    label: "Quantity Sold",
                    val: "—",
                    icon: "📤",
                    bar: "#2563eb",
                    iconBg: "#dbeafe",
                    chg: "▲ Updated Daily",
                    dir: "up",
                  },
                  {
                    label: "Orders Received",
                    val: "—",
                    icon: "📦",
                    bar: "#d97706",
                    iconBg: "#fef3c7",
                    chg: null,
                    dir: null,
                  },
                  {
                    label: "Payment Received",
                    val: "₹ Live",
                    icon: "💰",
                    bar: "#9333ea",
                    iconBg: "#ede9fe",
                    chg: "▲ Live Tracking",
                    dir: "up",
                  },
                ].map(({ label, val, icon, bar, iconBg, chg, dir }) => (
                  <div className="cd-stat" key={label}>
                    <div className="cd-stat__bar" style={{ background: bar }} />
                    <div
                      className="cd-stat__icon"
                      style={{ background: iconBg }}
                    >
                      {icon}
                    </div>
                    <div className="cd-stat__lbl">{label}</div>
                    <div className="cd-stat__val">{val}</div>
                    {chg && (
                      <div className={`cd-stat__chg cd-stat__chg--${dir}`}>
                        {chg}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div> */}

            {/* ══ SECTION: Live Scrap Rates ══ */}
            <div className="cd-card">
              <div className="cd-card__body">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 14,
                  }}
                >
                  <div className="cd-card__title" style={{ marginBottom: 0 }}>
                    📊 Live Scrap Rates (₹/kg)
                  </div>
                  <span className="cd-live-badge">
                    <span className="cd-live-dot" /> LIVE
                  </span>
                </div>
                <div className="cd-rates-grid">
                  {PRICE_KEYS.map(({ icon, label, key }) => (
                    <div className="cd-rate-chip" key={key}>
                      <div className="cd-rate-chip__label">
                        {icon} {label}
                      </div>
                      <div className="cd-rate-chip__val">
                        ₹{prices[key] || "--"}
                      </div>
                      <div className="cd-rate-chip__unit">
                        per kg · company rate
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══ SECTION: Live Bidding Board ══ */}
            <div>
              <p className="cd-section-lbl">Live Bidding Board</p>
              <div className="cd-g3">
                {BIDS.map((b) => {
                  const pct = Math.round((b.current / b.target) * 100);
                  return (
                    <div className="cd-bid-card" key={b.material}>
                      <div className="cd-bid-top">
                        <div>
                          <div className="cd-bid-mat">{b.material}</div>
                          <div className="cd-bid-qty">{b.qty}</div>
                        </div>
                        <span className="cd-bid-dl">⏱ {b.deadline}</span>
                      </div>
                      <div className="cd-bid-price-row">
                        <span className="cd-bid-price">₹{b.current}</span>
                        <span className="cd-bid-perkg">/ kg · current bid</span>
                      </div>
                      <div className="cd-bid-prog-row">
                        <span>Floor ₹{Math.round(b.target * 0.85)}</span>
                        <span>{pct}% of target</span>
                        <span>Target ₹{b.target}</span>
                      </div>
                      <div className="cd-bid-bar">
                        <div
                          className="cd-bid-fill"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="cd-bid-foot">
                        <span className="cd-bid-bidders">
                          👥 {b.bids} bidders
                        </span>
                        <button className="cd-bid-btn">Place Bid →</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ══ SECTION: ESG Dashboard ══ */}

            <div className="cd-g2">
              {/* Activity Feed */}
              <div className="cd-card">
                <div className="cd-card__body">
                  <div className="cd-card__title">🕐 Recent Activity</div>
                  {ACTIVITY.map((a, i) => (
                    <div className="cd-feed-item" key={i}>
                      <div
                        className="cd-feed-icon"
                        style={{ background: a.bg }}
                      >
                        {a.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="cd-feed-title">{a.title}</div>
                        <div className="cd-feed-sub">{a.sub}</div>
                      </div>
                      <div className="cd-feed-time">{a.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Management — ✅ filtered by companyId */}
              <div className="cd-card">
                <div className="cd-card__body">
                  <div className="cd-card__title">📑 Contract Management</div>
                  <div className="cd-card__sub">
                    Filtered for Company ID: {companyId}
                  </div>
                  <div className="cd-kpi-row">
                    <span
                      className="cd-kpi"
                      style={{ background: "#dcfce7", color: "#166534" }}
                    >
                      Active: {contractStats.active}
                    </span>
                    <span
                      className="cd-kpi"
                      style={{ background: "#fef3c7", color: "#92400e" }}
                    >
                      Expiring: {contractStats.expiring}
                    </span>
                    <span
                      className="cd-kpi"
                      style={{ background: "#fee2e2", color: "#991b1b" }}
                    >
                      Expired: {contractStats.expired}
                    </span>
                  </div>

                  {/* ✅ FIXED: only this company's contracts */}
                  {filteredContracts.length === 0 ? (
                    <div className="cd-con-empty">
                      No contracts found for your company.
                    </div>
                  ) : (
                    filteredContracts.map((c) => (
                      <div className="cd-con-row" key={c.name}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="cd-con-name">{c.name}</div>
                          <div className="cd-con-meta">
                            {c.party} · Ends {c.end}
                          </div>
                        </div>
                        <div className="cd-con-right">
                          <div className="cd-con-val">{c.value}</div>
                          <span
                            className={`cd-cstatus-badge ${cstatusClass(c.status)}`}
                          >
                            {c.status.charAt(0).toUpperCase() +
                              c.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))
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

export default CompanyDashboard;
