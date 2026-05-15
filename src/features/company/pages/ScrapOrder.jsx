// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import CompanySidebar from "../../../shared/layout/CompanySidebar";
// import "../../../static/ScrapSale.css";

// const MOCK_RATES = {
//   Metal: 1,
//   Plastic: 1,
//   Paper: 1,
//   Glass: 1,
//   Electronics: 1,
//   Textiles: 1,
//   Others: 1,
// };

// const SCRAP_TYPES = [
//   "Metal",
//   "Plastic",
//   "Paper",
//   "Glass",
//   "Electronics",
//   "Textiles",
//   "Others",
// ];

// const random = (min, max) => Math.random() * (max - min) + min;
// const COLORS = [
//   "#16a34a",
//   "#22c55e",
//   "#facc15",
//   "#fb923c",
//   "#60a5fa",
//   "#c084fc",
//   "#f472b6",
// ];

// const ScrapSale = () => {
//   const navigate = useNavigate();
//   const canvasRef = useRef(null);
//   const particlesRef = useRef([]);
//   const animFrameRef = useRef(null);

//   const [form, setForm] = useState({
//     companyName: "",
//     contactNo: "",
//     scrapType: "Metal",
//     quantity: "",
//     pickupAddress: "",
//     preferredDate: "",
//   });

//   const [rates, setRates] = useState(MOCK_RATES);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [celebrating, setCelebrating] = useState(false);
//   const [countdown, setCountdown] = useState(4);

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         // const ownerId = localStorage.getItem("scrapyardOwnerId");
//         const ownerId = 2;

//         console.log("FETCHING PRICES FOR OWNER:", ownerId);

//         const res = await fetch(
//           `http://localhost:8080/api/prices/all?ownerId=${ownerId}`,
//         );

//         if (!res.ok) {
//           console.error("Failed to fetch prices");
//           return;
//         }

//         const data = await res.json();

//         console.log("PRICE DATA:", data);

//         const map = {};

//         data.forEach((item) => {
//           map[item.materialType] = item.companyPrice;
//         });

//         console.log("RATE MAP:", map);

//         setRates(map);
//       } catch (err) {
//         console.error("Price fetch error:", err);
//       }
//     };

//     fetchPrices();
//   }, []);

//   useEffect(() => {
//     const price = rates[form.scrapType] || 0;
//     const qty = Number(form.quantity || 0);
//     const total = Number(price * qty * 1.18);
//     setTotal(total);
//   }, [form.scrapType, form.quantity, rates]);

//   /* ── Confetti ── */
//   const startConfetti = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     const ctx = canvas.getContext("2d");
//     particlesRef.current = Array.from({ length: 160 }, () => ({
//       x: random(0, canvas.width),
//       y: random(-200, -10),
//       r: random(6, 12),
//       color: COLORS[Math.floor(Math.random() * COLORS.length)],
//       speed: random(3, 7),
//       angle: random(0, Math.PI * 2),
//       spin: random(-0.15, 0.15),
//       swing: random(1, 3),
//       swingSpeed: random(0.02, 0.05),
//       tick: 0,
//       shape: Math.random() > 0.5 ? "rect" : "circle",
//     }));
//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       let alive = false;
//       particlesRef.current.forEach((p) => {
//         p.y += p.speed;
//         p.angle += p.spin;
//         p.tick += p.swingSpeed;
//         p.x += Math.sin(p.tick) * p.swing;
//         if (p.y < canvas.height + 20) alive = true;
//         ctx.save();
//         ctx.translate(p.x, p.y);
//         ctx.rotate(p.angle);
//         ctx.fillStyle = p.color;
//         if (p.shape === "rect") {
//           ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
//         } else {
//           ctx.beginPath();
//           ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2);
//           ctx.fill();
//         }
//         ctx.restore();
//       });
//       if (alive) animFrameRef.current = requestAnimationFrame(draw);
//     };
//     draw();
//   };

//   const stopConfetti = () => {
//     if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
//     const canvas = canvasRef.current;
//     if (canvas)
//       canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const triggerCelebration = () => {
//     setCelebrating(true);
//     setCountdown(4);
//     startConfetti();
//     let count = 4;
//     const timer = setInterval(() => {
//       count -= 1;
//       setCountdown(count);
//       if (count <= 0) {
//         clearInterval(timer);
//         stopConfetti();
//         navigate("/company-dashboard");
//       }
//     }, 1000);
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: false });
//   };

//   const selectType = (type) => setForm({ ...form, scrapType: type });

//   const validate = () => {
//     const e = {};
//     if (!form.companyName.trim()) e.companyName = "Please enter your name";
//     if (!form.pickupAddress.trim())
//       e.pickupAddress = "Please enter a pickup address";
//     if (!form.quantity || Number(form.quantity) <= 0)
//       e.quantity = "Please enter a valid quantity";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const resetForm = () => {
//     setForm({
//       companyName: "",
//       contactNo: "",
//       scrapType: "Metal",
//       quantity: "",
//       pickupAddress: "",
//       preferredDate: "",
//     });
//     setTotal(0);
//     setErrors({});
//   };

//   const placeOrder = () => {
//     if (!validate()) return;

//     const token = localStorage.getItem("token"); // ✅ GET TOKEN

//     if (!token) {
//       alert("❌ You are not logged in");
//       return;
//     }

//     setLoading(true);

//     fetch("http://localhost:8080/api/scrap-orders/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // ✅ ADD THIS
//       },
//       body: JSON.stringify({
//         companyName: form.companyName,
//         contactNo: form.contactNo,
//         scrapType: form.scrapType,
//         quantity: Number(form.quantity),
//         pickupAddress: form.pickupAddress,
//         preferredDate: form.preferredDate,

//         orderType: "COMPANY",
//         ownerId: 2,
//         // ❌ REMOVE THESE (backend should decide price)
//         // pricePerKg: rates[form.scrapType],
//         // totalPrice: total,
//       }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return res.text().then((text) => {
//             throw new Error(text || "Failed");
//           });
//         }
//         return res.json();
//       })
//       .then(() => {
//         resetForm();
//         triggerCelebration();
//       })
//       .catch((err) => {
//         console.error("ERROR:", err.message);
//         alert("❌ could not place order " + err.message);
//       })
//       .finally(() => setLoading(false));
//   };

//   const formattedTotal = total.toLocaleString("en-IN");

//   return (
//     /* ── Outermost shell: full viewport, sidebar LEFT + main RIGHT ── */
//     <div className="ss-shell">
//       {/* LEFT: Sidebar */}
//       <CompanySidebar />

//       {/* RIGHT: Everything else, stacked vertically, no outer scroll */}
//       <div className="ss-main">
//         {/* Confetti canvas (fixed, full screen) */}
//         <canvas ref={canvasRef} className="ss-confetti-canvas" />

//         {/* Celebration Overlay */}
//         {celebrating && (
//           <div className="ss-celeb-overlay">
//             <div className="ss-celeb-card">
//               <div className="ss-celeb-emoji">🎉</div>
//               <h2 className="ss-celeb-title">Order Placed!</h2>
//               <p className="ss-celeb-msg">
//                 Our team will contact you within 2 hours to confirm pickup.
//               </p>
//               <div className="ss-celeb-divider" />
//               <p className="ss-celeb-countdown">
//                 Redirecting to your dashboard in <strong>{countdown}s</strong>…
//               </p>
//               <div className="ss-progress-bar">
//                 <div className="ss-progress-fill" />
//               </div>
//               <button
//                 className="ss-go-now-btn"
//                 onClick={() => {
//                   stopConfetti();
//                   navigate("/company-dashboard");
//                 }}
//               >
//                 Go to Dashboard now →
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Step Bar */}
//         <div className="ss-stepbar">
//           <div className="ss-step ss-step--done">
//             <div className="ss-step-num">✓</div>
//             <span>Details</span>
//           </div>
//           <span className="ss-step-arrow">›</span>
//           <div className="ss-step ss-step--active">
//             <div className="ss-step-num">2</div>
//             <span>Review</span>
//           </div>
//           <span className="ss-step-arrow">›</span>
//           <div className="ss-step">
//             <div className="ss-step-num">3</div>
//             <span>Confirm</span>
//           </div>
//         </div>

//         {/* Page body: form LEFT + summary RIGHT, no outer scroll */}
//         <div className="ss-page">
//           {/* Form column — scrolls internally if overflow */}
//           <div className="ss-form-col">
//             {/* Card 1: Customer Info */}
//             <div className="ss-card">
//               <div className="ss-card-header">
//                 <h2>Company information</h2>
//                 <p>Your contact details for the pickup</p>
//               </div>
//               <div className="ss-card-body">
//                 <div className="ss-field">
//                   <label>Company name</label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={form.companyName}
//                     placeholder="e.g. Ramesh Patil"
//                     onChange={handleChange}
//                     className={errors.companyName ? "ss-input-error" : ""}
//                   />
//                   {errors.companyName && (
//                     <p className="ss-field-error">{errors.companyName}</p>
//                   )}
//                 </div>
//                 <div className="ss-field">
//                   <label>Contact number</label>
//                   <input
//                     type="tel"
//                     name="contactNo"
//                     value={form.contactNo}
//                     placeholder="e.g. 9876543210"
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="ss-field">
//                   <label>Pickup address</label>
//                   <textarea
//                     name="pickupAddress"
//                     value={form.pickupAddress}
//                     placeholder="House No., Street, Area, City, PIN"
//                     onChange={handleChange}
//                     rows={3}
//                     className={errors.pickupAddress ? "ss-input-error" : ""}
//                   />
//                   {errors.pickupAddress && (
//                     <p className="ss-field-error">{errors.pickupAddress}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Card 2: Material Details */}
//             <div className="ss-card">
//               <div className="ss-card-header">
//                 <h2>Material details</h2>
//                 <p>Tell us what scrap you want to sell</p>
//               </div>
//               <div className="ss-card-body">
//                 <div className="ss-field">
//                   <label>Scrap type</label>
//                   <div className="ss-chip-group">
//                     {SCRAP_TYPES.map((type) => (
//                       <div
//                         key={type}
//                         className={`ss-chip ${
//                           form.scrapType === type ? "ss-chip--active" : ""
//                         }`}
//                         onClick={() => selectType(type)}
//                       >
//                         {type}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="ss-row2">
//                   <div className="ss-field">
//                     <label>Quantity (kg)</label>
//                     <input
//                       type="number"
//                       name="quantity"
//                       value={form.quantity}
//                       placeholder="e.g. 50"
//                       min="1"
//                       onChange={handleChange}
//                       className={errors.quantity ? "ss-input-error" : ""}
//                     />
//                     {errors.quantity && (
//                       <p className="ss-field-error">{errors.quantity}</p>
//                     )}
//                   </div>
//                   <div className="ss-field">
//                     <label>Preferred date</label>
//                     <input
//                       type="date"
//                       name="preferredDate"
//                       value={form.preferredDate}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Summary sidebar */}
//           <div className="ss-summary">
//             <div className="ss-summary-head">
//               <h3>Order summary</h3>
//               <p>Live price estimate</p>
//             </div>
//             <div className="ss-summary-body">
//               <div className="ss-sum-row">
//                 <span>Material</span>
//                 <span>{form.scrapType}</span>
//               </div>
//               <div className="ss-sum-row">
//                 <span>Quantity</span>
//                 <span>{form.quantity ? `${form.quantity} kg` : "— kg"}</span>
//               </div>
//               <div className="ss-sum-row">
//                 <span>Rate</span>
//                 <span className="ss-rate-pill">
//                   ₹{rates[form.scrapType] || 0} / kg
//                 </span>
//               </div>
//               <div className="ss-total-box">
//                 <span>Estimated total</span>
//                 <span className="ss-total-amount">₹{formattedTotal}</span>
//               </div>
//               <div className="ss-pickup-note">
//                 <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
//                   <circle
//                     cx="8"
//                     cy="8"
//                     r="7"
//                     stroke="#F57F17"
//                     strokeWidth="1.4"
//                   />
//                   <path
//                     d="M8 5v4M8 11v1"
//                     stroke="#F57F17"
//                     strokeWidth="1.4"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//                 <p>Free pickup. Cash payment on collection day.</p>
//               </div>
//             </div>
//             <div className="ss-summary-actions">
//               <button
//                 className="ss-btn-primary"
//                 onClick={placeOrder}
//                 disabled={loading}
//               >
//                 {loading ? "Placing order…" : "Confirm order"}
//               </button>
//               <button className="ss-btn-ghost" onClick={resetForm}>
//                 Clear form
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScrapSale;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CompanySidebar from "../../../shared/layout/CompanySidebar";

import "../styles/ScrapSale.css";

import ScrapForm from "../../company/dashboard/ScrapForm";
import StepBar from "../../company/dashboard/StepBar";

import useOrderForm from "../../company/hooks/useOrderForm";
import useScrapPrices from "../../company/hooks/useScrapPrices";

import { createScrapOrder } from "../services/scrapSaleApi";
import { calculateTotal } from "../utils/calculateTotal";
import { validateOrder } from "../utils/validateOrder";

import OrderSummary from "../dashboard/OrderSummary";
const ScrapSale = () => {
  const navigate = useNavigate();

  const rates = useScrapPrices();

  const { form, setForm, resetForm } = useOrderForm();

  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const price = rates[form.scrapType] || 0;

    const qty = Number(form.quantity || 0);

    const totalAmount = calculateTotal(price, qty);

    setTotal(totalAmount);
  }, [form.scrapType, form.quantity, rates]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: false,
    });
  };

  const selectType = (type) => {
    setForm({
      ...form,
      scrapType: type,
    });
  };

  const placeOrder = async () => {
    const validationErrors = validateOrder(form);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ You are not logged in");
      return;
    }

    try {
      setLoading(true);

      await createScrapOrder(
        {
          companyName: form.companyName,
          contactNo: form.contactNo,
          scrapType: form.scrapType,
          quantity: Number(form.quantity),
          pickupAddress: form.pickupAddress,
          preferredDate: form.preferredDate,
          orderType: "COMPANY",
          ownerId: 2,
        },
        token,
      );

      resetForm();

      alert("✅ Order placed successfully");

      navigate("/company-dashboard");
    } catch (err) {
      console.error(err);

      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ss-shell">
      <CompanySidebar />

      <div className="ss-main">
        <StepBar />

        <div className="ss-page">
          <ScrapForm
            form={form}
            errors={errors}
            handleChange={handleChange}
            selectType={selectType}
          />

          <OrderSummary
            form={form}
            rates={rates}
            total={total}
            loading={loading}
            placeOrder={placeOrder}
            resetForm={resetForm}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrapSale;
