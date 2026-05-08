import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../Common/CustomerSidebar";
import LogoutMenu from "../Common/LogoutMenu";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customerName: "",
    scrapType: "",
    quantity: 0,
    pickupAddress: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    fetch("http://localhost:8080/api/scrap-orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        orderType: "CUSTOMER", // ✅ VERY IMPORTANT
        status: "PENDING",
      }),
    })
      .then(async (res) => {
        const text = await res.text();
        return text ? JSON.parse(text) : {};
      })
      .then(() => alert("Order placed successfully"))
      .catch((err) => console.error(err));
  };
  const [dailyRates, setDailyRates] = useState({});

  const [availableItems] = useState([
    {
      id: 1,
      item: "Second Hand Motor",
      price: 1500,
      condition: "Good",
      seller: "Sharma Scrapyard",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      inStock: 5,
    },
    {
      id: 2,
      item: "Steel Machine Parts",
      price: 800,
      condition: "Fair",
      seller: "Kumar Metals",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
      inStock: 12,
    },
    {
      id: 3,
      item: "Iron Screws (Bulk)",
      price: 200,
      condition: "Good",
      seller: "Patel Scrap Co.",
      image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
      inStock: 50,
    },
  ]);

  const [runningAds] = useState([
    "🔥 Best Scrap Rates Updated Live!",
    "⚡ Sell Scrap & Earn Instant Cash!",
    "💰 Copper & Iron High Demand Today!",
    "♻️ Eco-friendly Scrap Recycling System!",
    "🚛 Free Doorstep Pickup Available!",
  ]);

  const [customerStats] = useState({
    itemsViewed: 25,
    itemsPurchased: 8,
    ordersPlaced: 12,
    totalSpent: 8500,
  });

  const [wishlist, setWishlist] = useState([
    { id: 1, item: "Electric Motor (5HP)", maxPrice: 2000 },
    { id: 2, item: "Copper Pipes", maxPrice: 500 },
    { id: 3, item: "Steel Rods", maxPrice: 700 },
  ]);

  useEffect(() => {
    // const ownerId = localStorage.getItem("userId");
    const ownerId = 2;
    if (!ownerId) {
      console.error("❌ ownerId missing in localStorage");
      return;
    }

    const fetchRates = async () => {
      try {
        const ownerId = 2;

        const res = await fetch(
          `http://localhost:8080/api/prices/all?ownerId=${ownerId}`,
        );

        if (!res.ok) {
          console.error("API error:", res.status);
          setDailyRates({});
          return;
        }

        const text = await res.text();
        const data = text ? JSON.parse(text) : [];

        const mapped = {};

        data.forEach((item) => {
          const material = item.materialType;
          const customer = item.customerPrice;
          const company = item.companyPrice;

          mapped[material] = {
            customerPrice: customer,
            companyPrice: company,
          };
        });

        setDailyRates(mapped);
      } catch (err) {
        console.error("Rate fetch error:", err);
        setDailyRates({});
      }
    };
    fetchRates();
    const interval = setInterval(fetchRates, 10000);
    return () => clearInterval(interval);
  }, []);

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((w) => w.id !== id));
  };

  return (
    <div style={styles.layout}>
      <CustomerSidebar />

      <div style={styles.main}>
        {/* TOPBAR */}
        <div style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>Customer Dashboard</h1>
            <p style={styles.pageSubtitle}>Scrap Buyer Portal</p>
          </div>
          <LogoutMenu />
        </div>

        <div style={styles.content}>
          {/* MARQUEE ADS */}
          <div style={styles.adsBar}>
            <div style={styles.adsMarquee}>
              <div style={styles.adsContent}>{runningAds.join("   •   ")}</div>
            </div>
          </div>

          {/* STATS GRID
          <div style={styles.statsGrid}>
            {[
              {
                label: "Items Viewed",
                value: customerStats.itemsViewed,
                icon: "👁",
              },
              {
                label: "Purchased",
                value: customerStats.itemsPurchased,
                icon: "🛒",
              },
              {
                label: "Orders Placed",
                value: customerStats.ordersPlaced,
                icon: "📦",
              },
              {
                label: "Total Spent",
                value: `₹${customerStats.totalSpent.toLocaleString()}`,
                icon: "💰",
              },
            ].map((stat) => (
              <div key={stat.label} style={styles.statCard}>
                <span style={styles.statIcon}>{stat.icon}</span>
                <p style={styles.statLabel}>{stat.label}</p>
                <h3 style={styles.statValue}>{stat.value}</h3>
              </div>
            ))}
          </div> */}

          {/* LIVE RATES */}
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Today's Scrap Rates (Per Kg)</h2>
              <span style={styles.liveBadge}>● LIVE</span>
            </div>
            <p style={styles.sectionSub}>
              Synced with owner dashboard updates every 10 seconds
            </p>

            {Object.keys(dailyRates).length === 0 ? (
              <p style={styles.loadingText}>Loading latest rates...</p>
            ) : (
              <div style={styles.ratesGrid}>
                {Object.entries(dailyRates).map(([material, rate]) => (
                  <div key={material} style={styles.rateCard}>
                    <p style={styles.rateMaterial}>
                      {material.charAt(0).toUpperCase() + material.slice(1)}
                    </p>
                    <h3 style={styles.ratePrice}>
                      ₹{rate?.customerPrice ?? "--"}
                    </h3>
                    <span style={styles.rateUnit}>per kg</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AVAILABLE ITEMS */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Available Items</h2>
            <div style={styles.itemsGrid}>
              {availableItems.map((item) => (
                <div key={item.id} style={styles.itemCard}>
                  <img
                    src={item.image}
                    alt={item.item}
                    style={styles.itemImage}
                  />
                  <div style={styles.itemBody}>
                    <h4 style={styles.itemName}>{item.item}</h4>
                    <div style={styles.itemMeta}>
                      <span style={styles.itemConditionBadge}>
                        {item.condition}
                      </span>
                      <span style={styles.itemSeller}>{item.seller}</span>
                    </div>
                    <p style={styles.itemStock}>
                      In stock: {item.inStock} units
                    </p>
                    <div style={styles.itemFooter}>
                      <span style={styles.itemPrice}>₹{item.price}</span>
                      <button
                        style={styles.buyBtn}
                        onClick={() => placeOrder(item.id)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WISHLIST */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>My Wishlist</h2>
            {wishlist.length === 0 ? (
              <p style={styles.emptyText}>Your wishlist is empty.</p>
            ) : (
              <div style={styles.wishlistList}>
                {wishlist.map((item) => (
                  <div key={item.id} style={styles.wishlistItem}>
                    <div>
                      <p style={styles.wishlistName}>{item.item}</p>
                      <p style={styles.wishlistPrice}>
                        Max Budget: ₹{item.maxPrice}
                      </p>
                    </div>
                    <button
                      style={styles.removeBtn}
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .buy-btn:hover { background: #15803d !important; }
        .remove-btn:hover { background: #fee2e2 !important; color: #dc2626 !important; }
      `}</style>
    </div>
  );
};

const styles = {
  /* ── Outer shell ── */
  layout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f4",
    fontFamily: "'Segoe UI', sans-serif",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },

  /* ── Top bar ── */
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 28px 16px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  pageTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 600,
    color: "#111827",
  },
  pageSubtitle: {
    margin: "2px 0 0",
    fontSize: "13px",
    color: "#6b7280",
  },

  /* ── Scrollable body ── */
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 28px",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },

  /* ── Ads marquee ── */
  adsBar: {
    backgroundColor: "#16a34a",
    borderRadius: "10px",
    padding: "10px 0",
    overflow: "hidden",
  },
  adsMarquee: {
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  adsContent: {
    display: "inline-block",
    animation: "marquee 28s linear infinite",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "0.3px",
    paddingLeft: "100%",
  },

  /* ── Stats ── */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
  statCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  statIcon: {
    fontSize: "20px",
  },
  statLabel: {
    margin: 0,
    fontSize: "12px",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statValue: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
    color: "#111827",
  },

  /* ── Sections ── */
  section: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px 24px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "4px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    color: "#111827",
  },
  sectionSub: {
    margin: "0 0 16px",
    fontSize: "12px",
    color: "#9ca3af",
  },
  liveBadge: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#16a34a",
    backgroundColor: "#dcfce7",
    padding: "3px 10px",
    borderRadius: "20px",
  },
  loadingText: {
    fontSize: "14px",
    color: "#6b7280",
  },

  /* ── Rates ── */
  ratesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "12px",
  },
  rateCard: {
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "10px",
    padding: "14px 16px",
    textAlign: "center",
  },
  rateMaterial: {
    margin: "0 0 6px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#166534",
    textTransform: "capitalize",
  },
  ratePrice: {
    margin: "0 0 4px",
    fontSize: "20px",
    fontWeight: 700,
    color: "#15803d",
  },
  rateUnit: {
    fontSize: "11px",
    color: "#6b7280",
  },

  /* ── Items ── */
  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  },
  itemCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  itemImage: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },
  itemBody: {
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  itemName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
  },
  itemMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  itemConditionBadge: {
    fontSize: "11px",
    fontWeight: 500,
    backgroundColor: "#fffbeb",
    color: "#92400e",
    border: "1px solid #fde68a",
    borderRadius: "6px",
    padding: "2px 8px",
  },
  itemSeller: {
    fontSize: "12px",
    color: "#6b7280",
  },
  itemStock: {
    margin: 0,
    fontSize: "12px",
    color: "#9ca3af",
  },
  itemFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: "8px",
    borderTop: "1px solid #f3f4f6",
  },
  itemPrice: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#111827",
  },
  buyBtn: {
    backgroundColor: "#16a34a",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s",
  },

  /* ── Wishlist ── */
  wishlistList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "16px",
  },
  wishlistItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
  },
  wishlistName: {
    margin: "0 0 4px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#111827",
  },
  wishlistPrice: {
    margin: 0,
    fontSize: "12px",
    color: "#6b7280",
  },
  removeBtn: {
    backgroundColor: "transparent",
    color: "#ef4444",
    border: "1px solid #fca5a5",
    borderRadius: "8px",
    padding: "6px 14px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  emptyText: {
    fontSize: "14px",
    color: "#9ca3af",
    marginTop: "12px",
  },
};

export default CustomerDashboard;
