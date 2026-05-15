// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../../../config/env";
// import "../../../features/customer/styles/Customerdashboard.css";
// import LogoutMenu from "../../../shared/components/LogoutMenu";
// import CustomerSidebar from "../../../shared/layout/CustomerSidebar";

// const CustomerDashboard = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     customerName: "",
//     scrapType: "",
//     quantity: 0,
//     pickupAddress: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const placeOrder = () => {
//     fetch(`${API_BASE_URL}/api/scrap-orders/create`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         ...form,
//         orderType: "CUSTOMER", // ✅ VERY IMPORTANT
//         status: "PENDING",
//       }),
//     })
//       .then(async (res) => {
//         const text = await res.text();
//         return text ? JSON.parse(text) : {};
//       })
//       .then(() => alert("Order placed successfully"))
//       .catch((err) => console.error(err));
//   };

//   const [dailyRates, setDailyRates] = useState({});

//   const [availableItems] = useState([
//     {
//       id: 1,
//       item: "Second Hand Motor",
//       price: 1500,
//       condition: "Good",
//       seller: "Sharma Scrapyard",
//       image:
//         "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
//       inStock: 5,
//     },
//     {
//       id: 2,
//       item: "Steel Machine Parts",
//       price: 800,
//       condition: "Fair",
//       seller: "Kumar Metals",
//       image:
//         "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
//       inStock: 12,
//     },
//     {
//       id: 3,
//       item: "Iron Screws (Bulk)",
//       price: 200,
//       condition: "Good",
//       seller: "Patel Scrap Co.",
//       image:
//         "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&h=300&fit=crop",
//       inStock: 50,
//     },
//   ]);

//   const [runningAds] = useState([
//     "🔥 Best Scrap Rates Updated Live!",
//     "⚡ Sell Scrap & Earn Instant Cash!",
//     "💰 Copper & Iron High Demand Today!",
//     "♻️ Eco-friendly Scrap Recycling System!",
//     "🚛 Free Doorstep Pickup Available!",
//   ]);

//   const [customerStats] = useState({
//     itemsViewed: 25,
//     itemsPurchased: 8,
//     ordersPlaced: 12,
//     totalSpent: 8500,
//   });

//   const [wishlist, setWishlist] = useState([
//     { id: 1, item: "Electric Motor (5HP)", maxPrice: 2000 },
//     { id: 2, item: "Copper Pipes", maxPrice: 500 },
//     { id: 3, item: "Steel Rods", maxPrice: 700 },
//   ]);

//   useEffect(() => {
//     // const ownerId = localStorage.getItem("userId");
//     const ownerId = 2;
//     if (!ownerId) {
//       console.error("❌ ownerId missing in localStorage");
//       return;
//     }

//     const fetchRates = async () => {
//       try {
//         const ownerId = 2;

//         const res = await fetch(
//           `http://localhost:8080/api/prices/all?ownerId=${ownerId}`,
//         );

//         if (!res.ok) {
//           console.error("API error:", res.status);
//           setDailyRates({});
//           return;
//         }

//         const text = await res.text();
//         const data = text ? JSON.parse(text) : [];

//         const mapped = {};

//         data.forEach((item) => {
//           const material = item.materialType;
//           const customer = item.customerPrice;
//           const company = item.companyPrice;

//           mapped[material] = {
//             customerPrice: customer,
//             companyPrice: company,
//           };
//         });

//         setDailyRates(mapped);
//       } catch (err) {
//         console.error("Rate fetch error:", err);
//         setDailyRates({});
//       }
//     };

//     fetchRates();
//     const interval = setInterval(fetchRates, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const removeFromWishlist = (id) => {
//     setWishlist(wishlist.filter((w) => w.id !== id));
//   };

//   return (
//     <div className="cd-layout">
//       <CustomerSidebar />

//       <div className="cd-main">
//         {/* ── TOPBAR ── */}
//         <div className="cd-topbar">
//           <div>
//             <h1 className="cd-topbar__title">Welcome Back 👋</h1>

//             <p className="cd-topbar__subtitle">
//               Track scrap rates, orders and marketplace activity
//             </p>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//             }}
//           >
//             <div className="cd-live-pill">● Live Market</div>

//             <LogoutMenu />
//           </div>
//         </div>

//         <div className="cd-content">
//           {/* ── MARQUEE ADS ── */}
//           <div className="cd-ads-bar">
//             <div className="cd-ads-marquee">
//               <div className="cd-ads-content">{runningAds.join("   •   ")}</div>
//             </div>
//           </div>

//           {/* ── STATS GRID ──
//           <div className="cd-stats-grid">
//             {[
//               {
//                 label: "Items Viewed",
//                 value: customerStats.itemsViewed,
//                 icon: "👁",
//               },
//               {
//                 label: "Purchased",
//                 value: customerStats.itemsPurchased,
//                 icon: "🛒",
//               },
//               {
//                 label: "Orders Placed",
//                 value: customerStats.ordersPlaced,
//                 icon: "📦",
//               },
//               {
//                 label: "Total Spent",
//                 value: `₹${customerStats.totalSpent.toLocaleString()}`,
//                 icon: "💰",
//               },
//             ].map((stat) => (
//               <div key={stat.label} className="cd-stat-card">
//                 <span className="cd-stat-card__icon">{stat.icon}</span>
//                 <p className="cd-stat-card__label">{stat.label}</p>
//                 <h3 className="cd-stat-card__value">{stat.value}</h3>
//               </div>
//             ))}
//           </div> */}

//           {/* ── LIVE RATES ── */}
//           <div className="cd-section">
//             <div className="cd-section__header">
//               <h2 className="cd-section__title">
//                 Today's Scrap Rates (Per Kg)
//               </h2>
//               <span className="cd-badge--live">● LIVE</span>
//             </div>
//             <p className="cd-section__subtitle">
//               Synced with owner dashboard updates every 10 seconds
//             </p>

//             {Object.keys(dailyRates).length === 0 ? (
//               <p className="cd-loading-text">Loading latest rates...</p>
//             ) : (
//               <div className="cd-rates-grid">
//                 {Object.entries(dailyRates).map(([material, rate]) => (
//                   <div key={material} className="cd-rate-card">
//                     <p className="cd-rate-card__material">
//                       {material.charAt(0).toUpperCase() + material.slice(1)}
//                     </p>
//                     <h3 className="cd-rate-card__price">
//                       ₹{rate?.customerPrice ?? "--"}
//                     </h3>
//                     <span className="cd-rate-card__unit">per kg</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* ── AVAILABLE ITEMS ── */}
//           <div className="cd-section">
//             <h2 className="cd-section__title">Available Items</h2>
//             <div className="cd-items-grid">
//               {availableItems.map((item) => (
//                 <div key={item.id} className="cd-item-card">
//                   <img
//                     src={item.image}
//                     alt={item.item}
//                     className="cd-item-card__image"
//                   />
//                   <div className="cd-item-card__body">
//                     <h4 className="cd-item-card__name">{item.item}</h4>
//                     <div className="cd-item-card__meta">
//                       <span className="cd-item-card__condition">
//                         {item.condition}
//                       </span>
//                       <span className="cd-item-card__seller">
//                         {item.seller}
//                       </span>
//                     </div>
//                     <p className="cd-item-card__stock">
//                       In stock: {item.inStock} units
//                     </p>
//                     <div className="cd-item-card__footer">
//                       <span className="cd-item-card__price">₹{item.price}</span>
//                       <button
//                         className="cd-btn cd-btn--primary"
//                         onClick={() => placeOrder(item.id)}
//                       >
//                         Buy Now
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── WISHLIST ── */}
//           <div className="cd-section">
//             <h2 className="cd-section__title">My Wishlist</h2>
//             {wishlist.length === 0 ? (
//               <p className="cd-empty-text">Your wishlist is empty.</p>
//             ) : (
//               <div className="cd-wishlist-list">
//                 {wishlist.map((item) => (
//                   <div key={item.id} className="cd-wishlist-item">
//                     <div>
//                       <p className="cd-wishlist-item__name">{item.item}</p>
//                       <p className="cd-wishlist-item__budget">
//                         Max Budget: ₹{item.maxPrice}
//                       </p>
//                     </div>
//                     <button
//                       className="cd-btn cd-btn--danger-outline"
//                       onClick={() => removeFromWishlist(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;
import { useState } from "react";

import "../../../features/customer/styles/Customerdashboard.css";

import CustomerSidebar from "../../../shared/layout/CustomerSidebar";

import AvailableItemsSection from "../dashboard/AvailableItemsSection";
import CustomerAdsBar from "../dashboard/CustomerAdsBar";
import CustomerTopbar from "../dashboard/CustomerTopbar";
import ScrapRatesSection from "../dashboard/ScrapRatesSection";
import WishlistSection from "../dashboard/WishlistSection";

import { AVAILABLE_ITEMS, RUNNING_ADS } from "../utils/customerConstants";

import useLiveRates from "../hooks/useLiveRates";

const CustomerDashboard = () => {
  const { dailyRates } = useLiveRates();

  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      item: "Electric Motor (5HP)",
      maxPrice: 2000,
    },
    {
      id: 2,
      item: "Copper Pipes",
      maxPrice: 500,
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="cd-layout">
      <CustomerSidebar />

      <div className="cd-main">
        <CustomerTopbar />

        <div className="cd-content">
          <CustomerAdsBar ads={RUNNING_ADS} />

          <ScrapRatesSection dailyRates={dailyRates} />

          <AvailableItemsSection items={AVAILABLE_ITEMS} />

          <WishlistSection
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
