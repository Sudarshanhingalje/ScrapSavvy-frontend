import { useEffect, useMemo, useState } from "react";
import LogoutMenu from "../../../shared/components/LogoutMenu";
import ScrapyardSidebar from "../../../shared/layout/ScrapyardSidebar";

const PAGE_SIZE = 50;

const S = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  main: {
    flexGrow: 1,
    padding: "28px 24px",
    background: "#f8fafc",
    minHeight: "100vh",
    overflowY: "auto",
  },

  /* ── Top bar ── */
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 12,
  },
  titleGroup: { display: "flex", alignItems: "center", gap: 12 },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    background: "linear-gradient(135deg,#16A34A,#EA580C)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    boxShadow: "0 4px 14px rgba(22,163,74,0.25)",
    flexShrink: 0,
  },
  pageTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: "-0.4px",
  },
  pageSub: {
    margin: 0,
    fontSize: 11,
    color: "#16A34A",
    fontWeight: 700,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },

  /* ── Stat cards ── */
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 12,
    marginBottom: 20,
  },
  statCard: (borderColor) => ({
    background: "#ffffff",
    border: `1px solid #e2e8f0`,
    borderTop: `3px solid ${borderColor}`,
    borderRadius: 12,
    padding: "14px 18px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  }),
  statLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#64748b",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  statValue: (color) => ({
    fontSize: 22,
    fontWeight: 900,
    color: color,
    letterSpacing: "-0.5px",
  }),
  statSub: { fontSize: 11, color: "#94a3b8", marginTop: 2 },

  /* ── Controls ── */
  controlsRow: {
    display: "flex",
    gap: 10,
    marginBottom: 16,
    flexWrap: "wrap",
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    minWidth: 200,
    padding: "9px 14px",
    borderRadius: 10,
    border: "1px solid #e2e8f0",
    background: "#ffffff",
    color: "#0f172a",
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  filterBtn: (active) => ({
    padding: "8px 16px",
    borderRadius: 10,
    border: active ? "1.5px solid #16A34A" : "1.5px solid #e2e8f0",
    background: active ? "#dcfce7" : "#ffffff",
    color: active ? "#15803d" : "#64748b",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.15s",
    letterSpacing: 0.4,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  }),
  countBadge: {
    padding: "8px 14px",
    borderRadius: 10,
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    color: "#c2410c",
    fontSize: 12,
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  /* ── Table wrapper ── */
  tableWrap: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
  thead: {
    background: "#f1f5f9",
    borderBottom: "2px solid #e2e8f0",
  },
  th: {
    padding: "12px 14px",
    textAlign: "left",
    fontSize: 10,
    fontWeight: 800,
    color: "#475569",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  tr: (i) => ({
    borderBottom: "1px solid #f1f5f9",
    background: i % 2 === 0 ? "#ffffff" : "#fafafa",
    transition: "background 0.12s",
  }),
  td: {
    padding: "11px 14px",
    color: "#334155",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  },
  amountCell: (type) => ({
    fontWeight: 800,
    fontSize: 13,
    color:
      type === "REMOVE" ? "#dc2626" : type === "ADD" ? "#16A34A" : "#64748b",
  }),
  dateCell: { fontSize: 11, color: "#94a3b8" },
  refCell: {
    fontSize: 11,
    color: "#64748b",
    fontFamily: "monospace",
    maxWidth: 120,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  /* ── Empty ── */
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#94a3b8",
    fontSize: 15,
  },

  /* ── Pagination ── */
  paginationRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderTop: "1px solid #f1f5f9",
    background: "#fafafa",
    flexWrap: "wrap",
    gap: 10,
  },
  pageInfo: { fontSize: 12, color: "#94a3b8" },
  pageBtns: { display: "flex", gap: 6 },
  pageBtn: (active, disabled) => ({
    padding: "6px 13px",
    borderRadius: 8,
    border: active ? "1.5px solid #16A34A" : "1px solid #e2e8f0",
    background: active ? "#dcfce7" : "#ffffff",
    color: disabled ? "#cbd5e1" : active ? "#15803d" : "#64748b",
    fontSize: 12,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.12s",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  }),
};

/* ── Type badge component ── */
const TypeBadge = ({ type }) => {
  const map = {
    ADD: {
      bg: "#dcfce7",
      border: "#bbf7d0",
      color: "#15803d",
      icon: "🟢",
      label: "Stock Added",
    },
    REMOVE: {
      bg: "#fee2e2",
      border: "#fecaca",
      color: "#991b1b",
      icon: "🔴",
      label: "Stock Sold",
    },
  };
  const t = map[type] || {
    bg: "#f1f5f9",
    border: "#e2e8f0",
    color: "#475569",
    icon: "⚪",
    label: "Activity",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 20,
        border: `1px solid ${t.border}`,
        background: t.bg,
        color: t.color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.4,
        whiteSpace: "nowrap",
      }}
    >
      {t.icon} {t.label}
    </span>
  );
};

const ScrapyardTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL"); // ALL | ADD | REMOVE
  const [page, setPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) return [];
        const text = await res.text();
        return text ? JSON.parse(text) : [];
      })
      .then((data) => setTransactions(Array.isArray(data) ? data : []))
      .catch(() => setTransactions([]));
  }, []);

  /* ── Derived stats ── */
  const stats = useMemo(() => {
    const total = transactions.length;
    const added = transactions.filter((t) => t.type === "ADD").length;
    const sold = transactions.filter((t) => t.type === "REMOVE").length;
    const totalKg = transactions.reduce(
      (s, t) => s + (Number(t.quantity) || 0),
      0,
    );
    const totalVal = transactions.reduce(
      (s, t) => s + (Number(t.quantity) || 0) * (Number(t.pricePerKg) || 0),
      0,
    );
    return { total, added, sold, totalKg, totalVal };
  }, [transactions]);

  /* ── Filtered list ── */
  const filtered = useMemo(() => {
    let list = transactions;
    if (filter !== "ALL") list = list.filter((t) => t.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          (t.materialType || "").toLowerCase().includes(q) ||
          (t.source || "").toLowerCase().includes(q) ||
          (t.referenceId || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [transactions, filter, search]);

  /* ── Pagination ── */
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goPage = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  /* Reset to page 1 on filter/search change */
  const handleSearch = (v) => {
    setSearch(v);
    setPage(1);
  };
  const handleFilter = (v) => {
    setFilter(v);
    setPage(1);
  };

  /* Page number buttons (show max 5 around current) */
  const pageNums = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pageNums.push(i);

  return (
    <div style={S.page}>
      <ScrapyardSidebar />

      <div style={S.main}>
        {/* ── Top bar ── */}
        <div style={S.topBar}>
          <div style={S.titleGroup}>
            <div style={S.iconBox}>📊</div>
            <div>
              <p style={S.pageSub}>ScrapSavvy · Owner Panel</p>
              <h2 style={S.pageTitle}>Transactions</h2>
            </div>
          </div>
          <LogoutMenu />
        </div>

        {/* ── Stat cards ── */}
        <div style={S.statsRow}>
          <div style={S.statCard("#16A34A")}>
            <div style={S.statLabel}>Total Transactions</div>
            <div style={S.statValue("#0f172a")}>
              {stats.total.toLocaleString("en-IN")}
            </div>
            <div style={S.statSub}>all time</div>
          </div>
          <div style={S.statCard("#16A34A")}>
            <div style={S.statLabel}>Stock Added</div>
            <div style={S.statValue("#15803d")}>
              {stats.added.toLocaleString("en-IN")}
            </div>
            <div style={S.statSub}>ADD entries</div>
          </div>
          <div style={S.statCard("#dc2626")}>
            <div style={S.statLabel}>Stock Sold</div>
            <div style={S.statValue("#dc2626")}>
              {stats.sold.toLocaleString("en-IN")}
            </div>
            <div style={S.statSub}>REMOVE entries</div>
          </div>
          <div style={S.statCard("#0EA5E9")}>
            <div style={S.statLabel}>Total Volume</div>
            <div style={S.statValue("#0369a1")}>
              {stats.totalKg.toLocaleString("en-IN")} kg
            </div>
            <div style={S.statSub}>all materials</div>
          </div>
          <div style={S.statCard("#EA580C")}>
            <div style={S.statLabel}>Total Value</div>
            <div style={S.statValue("#c2410c")}>
              ₹{stats.totalVal.toLocaleString("en-IN")}
            </div>
            <div style={S.statSub}>combined</div>
          </div>
        </div>

        {/* ── Controls ── */}
        <div style={S.controlsRow}>
          {["ALL", "ADD", "REMOVE"].map((f) => (
            <button
              key={f}
              style={S.filterBtn(filter === f)}
              onClick={() => handleFilter(f)}
            >
              {f === "ALL" ? "All" : f === "ADD" ? "🟢 Added" : "🔴 Sold"}
            </button>
          ))}
          <span style={S.countBadge}>
            {filtered.length.toLocaleString("en-IN")} results
          </span>
        </div>

        {/* ── Table ── */}
        <div style={S.tableWrap}>
          {filtered.length === 0 ? (
            <div style={S.empty}>🗃️ No transactions match your filter.</div>
          ) : (
            <table style={S.table}>
              <thead style={S.thead}>
                <tr>
                  <th style={S.th}>#</th>
                  <th style={S.th}>Type</th>
                  <th style={S.th}>Material</th>
                  <th style={S.th}>Qty (kg)</th>
                  <th style={S.th}>Rate / kg</th>
                  <th style={S.th}>Value</th>
                  <th style={S.th}>Source</th>
                  <th style={S.th}>Reference</th>
                  <th style={S.th}>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((tx, i) => {
                  const value =
                    (Number(tx.quantity) || 0) * (Number(tx.pricePerKg) || 0);
                  const rowNum = (page - 1) * PAGE_SIZE + i + 1;
                  return (
                    <tr key={tx.id} style={S.tr(i)}>
                      <td style={{ ...S.td, color: "#cbd5e1", fontSize: 11 }}>
                        {rowNum.toLocaleString("en-IN")}
                      </td>
                      <td style={S.td}>
                        <TypeBadge type={tx.type} />
                      </td>
                      <td
                        style={{ ...S.td, fontWeight: 700, color: "#0f172a" }}
                      >
                        {tx.materialType || "—"}
                      </td>
                      <td style={{ ...S.td, fontWeight: 700 }}>
                        {tx.quantity} kg
                      </td>
                      <td style={S.td}>₹{tx.pricePerKg || 0}/kg</td>
                      <td style={{ ...S.td, ...S.amountCell(tx.type) }}>
                        ₹{value.toLocaleString("en-IN")}
                      </td>
                      <td style={{ ...S.td, color: "#16A34A" }}>
                        {tx.source || "—"}
                      </td>
                      <td style={{ ...S.td, ...S.refCell }}>
                        {tx.referenceId || "—"}
                      </td>
                      <td style={{ ...S.td, ...S.dateCell }}>
                        {tx.createdAt
                          ? new Date(tx.createdAt).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "No Date"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* ── Pagination ── */}
          {filtered.length > PAGE_SIZE && (
            <div style={S.paginationRow}>
              <span style={S.pageInfo}>
                Showing {((page - 1) * PAGE_SIZE + 1).toLocaleString("en-IN")}–
                {Math.min(page * PAGE_SIZE, filtered.length).toLocaleString(
                  "en-IN",
                )}{" "}
                of {filtered.length.toLocaleString("en-IN")}
              </span>
              <div style={S.pageBtns}>
                <button
                  style={S.pageBtn(false, page === 1)}
                  onClick={() => goPage(1)}
                  disabled={page === 1}
                >
                  «
                </button>
                <button
                  style={S.pageBtn(false, page === 1)}
                  onClick={() => goPage(page - 1)}
                  disabled={page === 1}
                >
                  ‹
                </button>
                {pageNums.map((n) => (
                  <button
                    key={n}
                    style={S.pageBtn(n === page, false)}
                    onClick={() => goPage(n)}
                  >
                    {n}
                  </button>
                ))}
                <button
                  style={S.pageBtn(false, page === totalPages)}
                  onClick={() => goPage(page + 1)}
                  disabled={page === totalPages}
                >
                  ›
                </button>
                <button
                  style={S.pageBtn(false, page === totalPages)}
                  onClick={() => goPage(totalPages)}
                  disabled={page === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrapyardTransactions;
