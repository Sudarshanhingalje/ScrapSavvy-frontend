// import { useEffect, useRef, useState } from "react";

// const CATEGORIES = [
//   { value: "1", label: "Metal" },
//   { value: "2", label: "Plastic" },
//   { value: "3", label: "Paper" },
//   { value: "4", label: "Glass" },
//   { value: "5", label: "Electronics" },
//   { value: "6", label: "Textiles" },
//   { value: "7", label: "Others" },
// ];

// const GST_RATES = ["0", "5", "12", "18", "28"];

// const WARRANTY_OPTIONS = [
//   { value: "", label: "No warranty" },
//   { value: "6m", label: "6 months" },
//   { value: "1y", label: "1 year" },
//   { value: "2y", label: "2 years" },
//   { value: "3y", label: "3 years" },
// ];

// const initialState = {
//   productName: "",
//   brand: "",
//   model: "",
//   description: "",
//   mrp: "",
//   price: "",
//   quantity: "",
//   minOrderQty: "1",
//   maxOrderQty: "",
//   categoryId: "",
//   subCategory: "",
//   gst: "12",
//   condition: "New",
//   warranty: "",
//   weight: "",
//   length: "",
//   width: "",
//   height: "",
//   fulfilledBy: "seller",
//   images: [],
//   specifications: [
//     { key: "", value: "" },
//     { key: "", value: "" },
//     { key: "", value: "" },
//   ],
//   tags: [],
// };

// /* ─── Inline Styles ─── */
// const S = {
//   wrap: {
//     fontFamily: "'Segoe UI', system-ui, sans-serif",
//     maxWidth: 900,
//     margin: "0 auto",
//     padding: "24px 16px",
//     color: "#111",
//   },
//   pageHeader: {
//     display: "flex",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 24,
//     paddingBottom: 16,
//     borderBottom: "1px solid #e5e7eb",
//   },
//   badge: (color) => ({
//     fontSize: 11,
//     fontWeight: 600,
//     padding: "3px 10px",
//     borderRadius: 20,
//     background: color === "blue" ? "#dbeafe" : "#fef3c7",
//     color: color === "blue" ? "#1d4ed8" : "#92400e",
//   }),
//   stepBar: {
//     display: "flex",
//     gap: 0,
//     marginBottom: 24,
//     background: "#f9fafb",
//     borderRadius: 10,
//     overflow: "hidden",
//     border: "1px solid #e5e7eb",
//   },
//   step: (active) => ({
//     flex: 1,
//     textAlign: "center",
//     padding: "10px 6px",
//     fontSize: 11,
//     fontWeight: 600,
//     color: active ? "#1d4ed8" : "#9ca3af",
//     borderBottom: active ? "2px solid #1d4ed8" : "2px solid transparent",
//     background: active ? "#eff6ff" : "transparent",
//     transition: "all 0.2s",
//   }),
//   card: {
//     background: "#fff",
//     border: "1px solid #e5e7eb",
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: "hidden",
//   },
//   cardHeader: {
//     padding: "12px 20px",
//     borderBottom: "1px solid #e5e7eb",
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     background: "#f9fafb",
//   },
//   cardHeaderTitle: {
//     fontSize: 14,
//     fontWeight: 600,
//     color: "#374151",
//     flex: 1,
//   },
//   cardHeaderBadge: (type) => ({
//     fontSize: 11,
//     fontWeight: 500,
//     padding: "2px 8px",
//     borderRadius: 10,
//     background: type === "required" ? "#fee2e2" : "#f0fdf4",
//     color: type === "required" ? "#dc2626" : "#16a34a",
//   }),
//   cardBody: { padding: "20px" },
//   fieldGroup: { marginBottom: 16 },
//   label: {
//     display: "flex",
//     alignItems: "center",
//     gap: 4,
//     fontSize: 12,
//     fontWeight: 600,
//     color: "#4b5563",
//     marginBottom: 6,
//     textTransform: "uppercase",
//     letterSpacing: "0.04em",
//   },
//   req: { color: "#dc2626", fontSize: 11 },
//   input: {
//     width: "100%",
//     border: "1px solid #d1d5db",
//     borderRadius: 8,
//     padding: "9px 12px",
//     fontSize: 13,
//     color: "#111",
//     background: "#fff",
//     outline: "none",
//     boxSizing: "border-box",
//     transition: "border-color 0.15s, box-shadow 0.15s",
//   },
//   inputFocus: {
//     borderColor: "#2563eb",
//     boxShadow: "0 0 0 3px rgba(37,99,235,0.12)",
//   },
//   hint: { fontSize: 11, color: "#9ca3af", marginTop: 4 },
//   grid2: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: 14,
//   },
//   grid3: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr 1fr",
//     gap: 14,
//   },
//   infoBox: {
//     background: "#eff6ff",
//     border: "1px solid #bfdbfe",
//     borderRadius: 8,
//     padding: "10px 14px",
//     fontSize: 12,
//     color: "#1d4ed8",
//     display: "flex",
//     gap: 8,
//     alignItems: "flex-start",
//     marginBottom: 14,
//   },
//   prefixWrap: { position: "relative" },
//   prefix: {
//     position: "absolute",
//     left: 10,
//     top: "50%",
//     transform: "translateY(-50%)",
//     fontSize: 13,
//     color: "#6b7280",
//     pointerEvents: "none",
//   },
//   discountBadge: (hasDiscount) => ({
//     background: hasDiscount ? "#f0fdf4" : "#f9fafb",
//     border: `1px solid ${hasDiscount ? "#86efac" : "#e5e7eb"}`,
//     borderRadius: 8,
//     padding: "9px 12px",
//     fontSize: 13,
//     fontWeight: 600,
//     color: hasDiscount ? "#15803d" : "#9ca3af",
//     textAlign: "center",
//     minHeight: 40,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   }),
//   radioGroup: { display: "flex", gap: 8, flexWrap: "wrap" },
//   radioOpt: (active) => ({
//     display: "flex",
//     alignItems: "center",
//     gap: 6,
//     padding: "8px 14px",
//     border: `1px solid ${active ? "#2563eb" : "#d1d5db"}`,
//     borderRadius: 8,
//     cursor: "pointer",
//     fontSize: 13,
//     color: active ? "#1d4ed8" : "#6b7280",
//     background: active ? "#eff6ff" : "#fff",
//     fontWeight: active ? 600 : 400,
//     transition: "all 0.15s",
//     userSelect: "none",
//   }),
//   uploadZone: (drag) => ({
//     border: `2px dashed ${drag ? "#2563eb" : "#d1d5db"}`,
//     borderRadius: 12,
//     padding: "28px 20px",
//     textAlign: "center",
//     cursor: "pointer",
//     background: drag ? "#eff6ff" : "#fafafa",
//     transition: "all 0.2s",
//     position: "relative",
//   }),
//   imgGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(5, 1fr)",
//     gap: 10,
//     marginTop: 14,
//   },
//   imgThumb: {
//     position: "relative",
//     aspectRatio: "1",
//     borderRadius: 10,
//     overflow: "hidden",
//     border: "1px solid #e5e7eb",
//   },
//   imgEmpty: {
//     aspectRatio: "1",
//     borderRadius: 10,
//     border: "2px dashed #e5e7eb",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "#f9fafb",
//     color: "#d1d5db",
//     fontSize: 22,
//   },
//   primaryBadge: {
//     position: "absolute",
//     bottom: 4,
//     left: 4,
//     background: "rgba(29,78,216,0.9)",
//     color: "#fff",
//     fontSize: 9,
//     fontWeight: 700,
//     padding: "2px 7px",
//     borderRadius: 4,
//     letterSpacing: "0.05em",
//   },
//   delBtn: {
//     position: "absolute",
//     top: 4,
//     right: 4,
//     width: 22,
//     height: 22,
//     borderRadius: "50%",
//     background: "rgba(220,38,38,0.9)",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: 700,
//     fontSize: 14,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     lineHeight: 1,
//   },
//   specRow: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr auto",
//     gap: 8,
//     marginBottom: 8,
//     alignItems: "center",
//   },
//   tagWrap: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: 6,
//     border: "1px solid #d1d5db",
//     borderRadius: 8,
//     padding: "8px 10px",
//     minHeight: 44,
//     background: "#fff",
//     cursor: "text",
//   },
//   tag: {
//     background: "#dbeafe",
//     color: "#1d4ed8",
//     fontSize: 12,
//     fontWeight: 500,
//     padding: "3px 10px",
//     borderRadius: 20,
//     display: "flex",
//     alignItems: "center",
//     gap: 5,
//   },
//   tagRemove: {
//     border: "none",
//     background: "none",
//     cursor: "pointer",
//     color: "#1d4ed8",
//     fontSize: 14,
//     lineHeight: 1,
//     padding: 0,
//     fontWeight: 700,
//   },
//   charCount: {
//     fontSize: 11,
//     color: "#9ca3af",
//     textAlign: "right",
//     marginTop: 4,
//   },
//   qualityBar: {
//     display: "flex",
//     gap: 3,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   qb: (filled, good) => ({
//     height: 6,
//     flex: 1,
//     borderRadius: 3,
//     background: filled ? (good ? "#16a34a" : "#2563eb") : "#e5e7eb",
//     transition: "background 0.3s",
//   }),
//   footerBar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "14px 20px",
//     background: "#f9fafb",
//     borderTop: "1px solid #e5e7eb",
//   },
//   btnPrimary: {
//     background: "#1d4ed8",
//     color: "#fff",
//     border: "none",
//     borderRadius: 8,
//     padding: "10px 24px",
//     fontSize: 13,
//     fontWeight: 600,
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: 7,
//   },
//   btnSecondary: {
//     background: "transparent",
//     color: "#6b7280",
//     border: "1px solid #d1d5db",
//     borderRadius: 8,
//     padding: "10px 20px",
//     fontSize: 13,
//     fontWeight: 500,
//     cursor: "pointer",
//   },
//   btnGhost: {
//     background: "transparent",
//     color: "#2563eb",
//     border: "none",
//     padding: "6px 0",
//     fontSize: 12,
//     fontWeight: 600,
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: 4,
//   },
//   iconBtn: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     color: "#dc2626",
//     fontSize: 16,
//     padding: "4px",
//     borderRadius: 4,
//     display: "flex",
//     alignItems: "center",
//   },
//   select: {
//     width: "100%",
//     border: "1px solid #d1d5db",
//     borderRadius: 8,
//     padding: "9px 12px",
//     fontSize: 13,
//     color: "#111",
//     background: "#fff",
//     outline: "none",
//     boxSizing: "border-box",
//     cursor: "pointer",
//   },
//   textarea: {
//     width: "100%",
//     border: "1px solid #d1d5db",
//     borderRadius: 8,
//     padding: "10px 12px",
//     fontSize: 13,
//     color: "#111",
//     background: "#fff",
//     outline: "none",
//     resize: "vertical",
//     boxSizing: "border-box",
//     fontFamily: "inherit",
//     lineHeight: 1.6,
//   },
// };

// /* ─── Sub-components ─── */

// const SectionCard = ({ icon, title, badge, children }) => (
//   <div style={S.card}>
//     <div style={S.cardHeader}>
//       <span style={{ fontSize: 18, color: "#6b7280" }}>{icon}</span>
//       <span style={S.cardHeaderTitle}>{title}</span>
//       {badge && (
//         <span
//           style={S.cardHeaderBadge(
//             badge === "Required" ? "required" : "optional",
//           )}
//         >
//           {badge}
//         </span>
//       )}
//     </div>
//     <div style={S.cardBody}>{children}</div>
//   </div>
// );

// const Field = ({ label, required, hint, children, style }) => (
//   <div style={{ ...S.fieldGroup, ...style }}>
//     <div style={S.label}>
//       {label} {required && <span style={S.req}>*</span>}
//     </div>
//     {children}
//     {hint && <div style={S.hint}>{hint}</div>}
//   </div>
// );

// const FocusInput = ({ style, ...props }) => {
//   const [focused, setFocused] = useState(false);
//   return (
//     <input
//       style={{ ...S.input, ...(focused ? S.inputFocus : {}), ...style }}
//       onFocus={() => setFocused(true)}
//       onBlur={() => setFocused(false)}
//       {...props}
//     />
//   );
// };

// const FocusSelect = ({ children, ...props }) => {
//   const [focused, setFocused] = useState(false);
//   return (
//     <select
//       style={{ ...S.select, ...(focused ? S.inputFocus : {}) }}
//       onFocus={() => setFocused(true)}
//       onBlur={() => setFocused(false)}
//       {...props}
//     >
//       {children}
//     </select>
//   );
// };

// const FocusTextarea = ({ rows = 5, ...props }) => {
//   const [focused, setFocused] = useState(false);
//   return (
//     <textarea
//       rows={rows}
//       style={{ ...S.textarea, ...(focused ? S.inputFocus : {}) }}
//       onFocus={() => setFocused(true)}
//       onBlur={() => setFocused(false)}
//       {...props}
//     />
//   );
// };

// /* ─── Quality Score ─── */
// const calcQuality = (f) => {
//   let s = 0;
//   if (f.productName.length > 10) s += 15;
//   if (f.productName.length > 40) s += 10;
//   if (f.description.length > 50) s += 10;
//   if (f.description.length > 150) s += 15;
//   if (f.categoryId) s += 10;
//   if (f.price) s += 10;
//   if (f.mrp) s += 5;
//   if (f.quantity) s += 5;
//   if (f.images.length >= 1) s += 10;
//   if (f.images.length >= 3) s += 5;
//   if (f.brand) s += 5;
//   return Math.min(s, 100);
// };

// const qualityLabel = (s) => {
//   if (s < 30) return { text: "Poor", color: "#dc2626" };
//   if (s < 60) return { text: "Fair", color: "#d97706" };
//   if (s < 80) return { text: "Good", color: "#2563eb" };
//   return { text: "Excellent", color: "#16a34a" };
// };

// /* ─── Main Component ─── */
// const ProductForm = ({ onSubmit, editingProduct, loading }) => {
//   const [formData, setFormData] = useState(initialState);
//   const [tagInput, setTagInput] = useState("");
//   const [dragging, setDragging] = useState(false);
//   const fileInputRef = useRef();
//   const tagInputRef = useRef();

//   useEffect(() => {
//     if (editingProduct) {
//       setFormData({
//         ...initialState,
//         productName: editingProduct.productName || "",
//         description: editingProduct.description || "",
//         price: editingProduct.price || "",
//         mrp: editingProduct.mrp || "",
//         quantity: editingProduct.quantity || "",
//         categoryId: editingProduct.categoryId || "",
//         brand: editingProduct.brand || "",
//         model: editingProduct.model || "",
//         images: editingProduct.images?.map((img) => ({ url: img })) || [],
//         specifications:
//           editingProduct.specifications || initialState.specifications,
//         tags: editingProduct.tags || [],
//       });
//     } else {
//       setFormData(initialState);
//     }
//   }, [editingProduct]);

//   const handle = (e) =>
//     setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

//   /* Images */
//   const addImages = (files) => {
//     const remaining = 5 - formData.images.length;
//     const toAdd = Array.from(files).slice(0, remaining);
//     const previews = toAdd.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//     }));
//     setFormData((p) => ({ ...p, images: [...p.images, ...previews] }));
//   };

//   const removeImage = (i) => {
//     setFormData((p) => {
//       const imgs = [...p.images];
//       imgs.splice(i, 1);
//       return { ...p, images: imgs };
//     });
//   };

//   /* Tags */
//   const addTag = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const val = tagInput.trim().toLowerCase();
//       if (val && !formData.tags.includes(val) && formData.tags.length < 10) {
//         setFormData((p) => ({ ...p, tags: [...p.tags, val] }));
//         setTagInput("");
//       }
//     }
//   };

//   const removeTag = (i) =>
//     setFormData((p) => {
//       const t = [...p.tags];
//       t.splice(i, 1);
//       return { ...p, tags: t };
//     });

//   /* Specifications */
//   const handleSpec = (i, field, value) => {
//     setFormData((p) => {
//       const specs = [...p.specifications];
//       specs[i] = { ...specs[i], [field]: value };
//       return { ...p, specifications: specs };
//     });
//   };

//   const addSpec = () =>
//     setFormData((p) => ({
//       ...p,
//       specifications: [...p.specifications, { key: "", value: "" }],
//     }));

//   const removeSpec = (i) =>
//     setFormData((p) => {
//       const specs = [...p.specifications];
//       specs.splice(i, 1);
//       return { ...p, specifications: specs };
//     });

//   /* Discount */
//   const discount = (() => {
//     const m = parseFloat(formData.mrp);
//     const s = parseFloat(formData.price);
//     if (m > 0 && s > 0 && s < m)
//       return `${Math.round(((m - s) / m) * 100)}% off`;
//     return null;
//   })();

//   /* Submit */
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.images.length < 1) {
//       alert("Please add at least 1 product image.");
//       return;
//     }
//     onSubmit(formData);
//     if (!editingProduct) setFormData(initialState);
//   };

//   const score = calcQuality(formData);
//   const ql = qualityLabel(score);
//   const filledBars = Math.round(score / 10);

//   const STEPS = [
//     { label: "Basic info", icon: "ℹ️" },
//     { label: "Pricing", icon: "🏷️" },
//     { label: "Images", icon: "📷" },
//     { label: "Specs", icon: "📋" },
//     { label: "Shipping", icon: "🚚" },
//   ];

//   return (
//     <form onSubmit={handleSubmit} style={S.wrap}>
//       {/* Page Header */}
//       <div style={S.pageHeader}>
//         <span style={{ fontSize: 24 }}>📦</span>
//         <div style={{ flex: 1 }}>
//           <p
//             style={{
//               fontSize: 18,
//               fontWeight: 700,
//               color: "#111",
//               marginBottom: 2,
//             }}
//           >
//             {editingProduct ? "Edit product" : "Add new product"}
//           </p>
//           <p style={{ fontSize: 12, color: "#9ca3af" }}>
//             Fill in all details for better visibility and sales
//           </p>
//         </div>
//         <span style={S.badge(editingProduct ? "yellow" : "blue")}>
//           {editingProduct ? "Editing" : "New listing"}
//         </span>
//       </div>

//       {/* Step Bar */}
//       <div style={S.stepBar}>
//         {STEPS.map((s, i) => (
//           <div key={i} style={S.step(i < 3)}>
//             <div style={{ marginBottom: 2 }}>{s.icon}</div>
//             {s.label}
//           </div>
//         ))}
//       </div>

//       {/* ── SECTION 1: BASIC INFO ── */}
//       <SectionCard icon="ℹ️" title="Basic information" badge="Required">
//         <Field
//           label="Product title"
//           required
//           hint="Include brand, model & key feature. Keep under 80 characters."
//         >
//           <FocusInput
//             type="text"
//             name="productName"
//             value={formData.productName}
//             onChange={handle}
//             placeholder="e.g. Bosch 18V Cordless Drill Kit with 2 Batteries"
//             maxLength={80}
//             required
//           />
//           <div style={S.charCount}>{formData.productName.length}/80</div>
//         </Field>

//         <div style={S.grid2}>
//           <Field label="Brand" required>
//             <FocusInput
//               type="text"
//               name="brand"
//               value={formData.brand}
//               onChange={handle}
//               placeholder="e.g. Bosch, Samsung, Nike"
//               required
//             />
//           </Field>
//           <Field label="Model / SKU">
//             <FocusInput
//               type="text"
//               name="model"
//               value={formData.model}
//               onChange={handle}
//               placeholder="e.g. GSB-18V-21"
//             />
//           </Field>
//         </div>

//         <div style={S.grid2}>
//           <Field label="Category" required>
//             <FocusSelect
//               name="categoryId"
//               value={formData.categoryId}
//               onChange={handle}
//               required
//             >
//               <option value="">Select category</option>
//               {CATEGORIES.map((c) => (
//                 <option key={c.value} value={c.value}>
//                   {c.label}
//                 </option>
//               ))}
//             </FocusSelect>
//           </Field>
//           <Field label="Condition">
//             <FocusSelect
//               name="condition"
//               value={formData.condition}
//               onChange={handle}
//             >
//               <option>New</option>
//               <option>Refurbished</option>
//               <option>Used — like new</option>
//               <option>Used — good</option>
//             </FocusSelect>
//           </Field>
//         </div>

//         <Field
//           label="Description"
//           hint="Minimum 100 characters. Describe features, materials, use cases, and what's in the box."
//         >
//           <div style={S.infoBox}>
//             <span>💡</span>
//             <span>
//               Good descriptions highlight key features, materials, usage, and
//               compatibility. Aim for 150–500 characters.
//             </span>
//           </div>
//           <FocusTextarea
//             name="description"
//             rows={5}
//             value={formData.description}
//             onChange={handle}
//             placeholder="Describe your product clearly — features, materials, use cases, compatibility, and what's included in the package."
//             maxLength={500}
//           />
//           <div style={S.charCount}>{formData.description.length}/500</div>
//         </Field>
//       </SectionCard>

//       {/* ── SECTION 2: PRICING ── */}
//       <SectionCard icon="🏷️" title="Pricing & inventory" badge="Required">
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "1fr 1fr 1fr",
//             gap: 14,
//             marginBottom: 16,
//           }}
//         >
//           <Field
//             label="MRP (₹)"
//             required
//             hint="Maximum retail price (incl. taxes)"
//           >
//             <div style={S.prefixWrap}>
//               <span style={S.prefix}>₹</span>
//               <FocusInput
//                 type="number"
//                 name="mrp"
//                 value={formData.mrp}
//                 onChange={handle}
//                 placeholder="0.00"
//                 style={{ paddingLeft: 26 }}
//                 required
//               />
//             </div>
//           </Field>
//           <Field
//             label="Selling price (₹)"
//             required
//             hint="Your listed selling price"
//           >
//             <div style={S.prefixWrap}>
//               <span style={S.prefix}>₹</span>
//               <FocusInput
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handle}
//                 placeholder="0.00"
//                 style={{ paddingLeft: 26 }}
//                 required
//               />
//             </div>
//           </Field>
//           <Field label="Discount" hint="Auto-calculated">
//             <div style={S.discountBadge(!!discount)}>{discount || "—"}</div>
//           </Field>
//         </div>

//         <div style={S.grid3}>
//           <Field label="Stock quantity" required>
//             <FocusInput
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handle}
//               placeholder="e.g. 100"
//               required
//             />
//           </Field>
//           <Field label="Min. order qty">
//             <FocusInput
//               type="number"
//               name="minOrderQty"
//               value={formData.minOrderQty}
//               onChange={handle}
//               placeholder="e.g. 1"
//             />
//           </Field>
//           <Field label="Max. order qty">
//             <FocusInput
//               type="number"
//               name="maxOrderQty"
//               value={formData.maxOrderQty}
//               onChange={handle}
//               placeholder="e.g. 10"
//             />
//           </Field>
//         </div>

//         <Field label="GST rate">
//           <div style={S.radioGroup}>
//             {GST_RATES.map((r) => (
//               <div
//                 key={r}
//                 style={S.radioOpt(formData.gst === r)}
//                 onClick={() => setFormData((p) => ({ ...p, gst: r }))}
//               >
//                 {r}%
//               </div>
//             ))}
//           </div>
//         </Field>
//       </SectionCard>

//       {/* ── SECTION 3: IMAGES ── */}
//       <SectionCard icon="📷" title="Product images" badge="Required">
//         <div style={S.infoBox}>
//           <span>ℹ️</span>
//           <span>
//             Use a white background for the primary image. Min 500×500px, JPG or
//             PNG. The first image is shown as the main product photo.
//           </span>
//         </div>

//         {/* Drop Zone */}
//         <div
//           style={S.uploadZone(dragging)}
//           onDragOver={(e) => {
//             e.preventDefault();
//             setDragging(true);
//           }}
//           onDragLeave={() => setDragging(false)}
//           onDrop={(e) => {
//             e.preventDefault();
//             setDragging(false);
//             addImages(e.dataTransfer.files);
//           }}
//           onClick={() => fileInputRef.current?.click()}
//         >
//           <input
//             type="file"
//             ref={fileInputRef}
//             accept="image/*"
//             multiple
//             style={{ display: "none" }}
//             onChange={(e) => addImages(e.target.files)}
//           />
//           <div style={{ fontSize: 32, marginBottom: 8 }}>☁️</div>
//           <p
//             style={{
//               fontSize: 13,
//               color: "#374151",
//               fontWeight: 500,
//               marginBottom: 4,
//             }}
//           >
//             Drag & drop images here or click to browse
//           </p>
//           <p style={{ fontSize: 11, color: "#9ca3af" }}>
//             JPG, PNG — min 500×500px — max 5MB each — up to 5 images
//           </p>
//           {formData.images.length > 0 && (
//             <p
//               style={{
//                 fontSize: 12,
//                 color: "#2563eb",
//                 fontWeight: 600,
//                 marginTop: 8,
//               }}
//             >
//               {formData.images.length}/5 uploaded
//               {formData.images.length < 5 &&
//                 ` · ${5 - formData.images.length} more allowed`}
//             </p>
//           )}
//         </div>

//         {/* Image Grid */}
//         <div style={S.imgGrid}>
//           {Array.from({ length: 5 }).map((_, i) => {
//             const img = formData.images[i];
//             return img ? (
//               <div key={i} style={S.imgThumb}>
//                 <img
//                   src={img.url}
//                   alt={`Product ${i + 1}`}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//                 {i === 0 && <div style={S.primaryBadge}>MAIN</div>}
//                 <button
//                   type="button"
//                   style={S.delBtn}
//                   onClick={() => removeImage(i)}
//                   aria-label={`Remove image ${i + 1}`}
//                 >
//                   ×
//                 </button>
//               </div>
//             ) : (
//               <div key={i} style={S.imgEmpty}>
//                 +
//               </div>
//             );
//           })}
//         </div>
//       </SectionCard>

//       {/* ── SECTION 4: SPECIFICATIONS ── */}
//       <SectionCard icon="📋" title="Specifications" badge="Recommended">
//         <div style={S.grid2}>
//           <Field label="Warranty">
//             <FocusSelect
//               name="warranty"
//               value={formData.warranty}
//               onChange={handle}
//             >
//               {WARRANTY_OPTIONS.map((w) => (
//                 <option key={w.value} value={w.value}>
//                   {w.label}
//                 </option>
//               ))}
//             </FocusSelect>
//           </Field>
//           <Field label="Country of origin">
//             <FocusInput
//               type="text"
//               name="countryOfOrigin"
//               value={formData.countryOfOrigin || ""}
//               onChange={handle}
//               placeholder="e.g. India, China, USA"
//             />
//           </Field>
//         </div>

//         <Field
//           label="Key specifications"
//           hint="Add attributes like Colour, Material, Weight, Size, etc."
//         >
//           {formData.specifications.map((spec, i) => (
//             <div key={i} style={S.specRow}>
//               <FocusInput
//                 type="text"
//                 value={spec.key}
//                 onChange={(e) => handleSpec(i, "key", e.target.value)}
//                 placeholder="e.g. Colour"
//               />
//               <FocusInput
//                 type="text"
//                 value={spec.value}
//                 onChange={(e) => handleSpec(i, "value", e.target.value)}
//                 placeholder="e.g. Blue"
//               />
//               <button
//                 type="button"
//                 style={S.iconBtn}
//                 onClick={() => removeSpec(i)}
//                 aria-label="Remove specification"
//               >
//                 🗑
//               </button>
//             </div>
//           ))}
//           <button type="button" style={S.btnGhost} onClick={addSpec}>
//             ＋ Add specification
//           </button>
//         </Field>

//         <Field
//           label="Search tags / keywords"
//           hint="Press Enter to add each tag. Good tags improve search ranking. Max 10 tags."
//         >
//           <div style={S.tagWrap} onClick={() => tagInputRef.current?.focus()}>
//             {formData.tags.map((t, i) => (
//               <div key={i} style={S.tag}>
//                 {t}
//                 <button
//                   type="button"
//                   style={S.tagRemove}
//                   onClick={() => removeTag(i)}
//                   aria-label={`Remove tag ${t}`}
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//             <input
//               ref={tagInputRef}
//               value={tagInput}
//               onChange={(e) => setTagInput(e.target.value)}
//               onKeyDown={addTag}
//               placeholder={
//                 formData.tags.length === 0 ? "Type a tag and press Enter…" : ""
//               }
//               style={{
//                 border: "none",
//                 outline: "none",
//                 fontSize: 13,
//                 flex: 1,
//                 minWidth: 80,
//                 background: "transparent",
//                 color: "#111",
//               }}
//             />
//           </div>
//         </Field>
//       </SectionCard>

//       {/* ── SECTION 5: SHIPPING ── */}
//       <SectionCard icon="🚚" title="Shipping & delivery" badge="Recommended">
//         <div style={S.grid3}>
//           <Field label="Weight (kg)">
//             <FocusInput
//               type="number"
//               name="weight"
//               step="0.1"
//               value={formData.weight}
//               onChange={handle}
//               placeholder="e.g. 1.5"
//             />
//           </Field>
//           <Field label="Length (cm)">
//             <FocusInput
//               type="number"
//               name="length"
//               value={formData.length}
//               onChange={handle}
//               placeholder="e.g. 30"
//             />
//           </Field>
//           <Field label="Width (cm)">
//             <FocusInput
//               type="number"
//               name="width"
//               value={formData.width}
//               onChange={handle}
//               placeholder="e.g. 20"
//             />
//           </Field>
//         </div>
//         <Field label="Height (cm)" style={{ maxWidth: "33%" }}>
//           <FocusInput
//             type="number"
//             name="height"
//             value={formData.height}
//             onChange={handle}
//             placeholder="e.g. 15"
//           />
//         </Field>

//         <Field label="Fulfilled by">
//           <div style={S.radioGroup}>
//             {[
//               { value: "seller", label: "Seller (self-ship)" },
//               { value: "platform", label: "Platform (managed)" },
//             ].map((opt) => (
//               <div
//                 key={opt.value}
//                 style={S.radioOpt(formData.fulfilledBy === opt.value)}
//                 onClick={() =>
//                   setFormData((p) => ({ ...p, fulfilledBy: opt.value }))
//                 }
//               >
//                 {opt.label}
//               </div>
//             ))}
//           </div>
//         </Field>
//       </SectionCard>

//       {/* ── LISTING QUALITY ── */}
//       <div style={S.card}>
//         <div style={S.cardHeader}>
//           <span style={{ fontSize: 18 }}>📊</span>
//           <span style={S.cardHeaderTitle}>Listing quality score</span>
//           <span style={{ fontSize: 13, fontWeight: 700, color: ql.color }}>
//             {score} / 100 — {ql.text}
//           </span>
//         </div>
//         <div style={S.cardBody}>
//           <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
//             Complete all sections to maximise your product's visibility and
//             conversion rate.
//           </p>
//           <div style={S.qualityBar}>
//             {Array.from({ length: 10 }).map((_, i) => (
//               <div key={i} style={S.qb(i < filledBars, score >= 70)} />
//             ))}
//             <span
//               style={{
//                 fontSize: 12,
//                 color: ql.color,
//                 fontWeight: 600,
//                 marginLeft: 10,
//                 minWidth: 60,
//               }}
//             >
//               {ql.text}
//             </span>
//           </div>
//           {score < 60 && (
//             <div style={{ ...S.infoBox, marginTop: 12, marginBottom: 0 }}>
//               <span>💡</span>
//               <span>
//                 {!formData.brand && "Add a brand name. "}
//                 {formData.description.length < 100 &&
//                   "Write a longer description (100+ chars). "}
//                 {formData.images.length === 0 &&
//                   "Upload at least 1 product image. "}
//                 {!formData.mrp && "Set an MRP. "}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Footer Actions */}
//         <div style={S.footerBar}>
//           <button type="button" style={S.btnSecondary}>
//             Save as draft
//           </button>
//           <div style={{ display: "flex", gap: 10 }}>
//             <button type="button" style={S.btnSecondary}>
//               Preview listing
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 ...S.btnPrimary,
//                 opacity: loading ? 0.7 : 1,
//                 cursor: loading ? "not-allowed" : "pointer",
//               }}
//             >
//               {loading
//                 ? "⏳ Saving..."
//                 : editingProduct
//                   ? "✅ Update product"
//                   : "🚀 Publish product"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ProductForm;

import "../../../scrapyard/products/product-form/styles/inputs.css";
import "../../../scrapyard/products/product-form/styles/productForm.css";
import "../../../scrapyard/products/product-form/styles/responsive.css";
import "../../../scrapyard/products/product-form/styles/sections.css";
import "../../../scrapyard/products/product-form/styles/upload.css";

import { useImageUpload } from "./hooks/useImageUpload";
import { useProductForm } from "./hooks/useProductForm";
import { useTags } from "./hooks/useTags";
import { validateProductForm } from "./utils/validateProductForm";

import BasicInfoSection from "./sections/BasicInfoSection";
import ImageUploadSection from "./sections/ImageUploadSection";
import PricingSection from "./sections/PricingSection";
import ProductStatusSection from "./sections/ProductStatusSection";
import ShippingSection from "./sections/ShippingSection";
import SpecificationSection from "./sections/SpecificationSection";
import QualityScore from "./shared/QualityScore";

const ProductForm = ({ onSubmit, editingProduct, loading }) => {
  const { formData, handle, handleSpec, addSpec, removeSpec, setField, reset } =
    useProductForm(editingProduct);

  const { dragging, setDragging, addImages, removeImage } = useImageUpload(
    formData.images,
    setField,
  );

  const { tagInput, setTagInput, addTag, removeTag } = useTags(
    formData.tags,
    setField,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, message } = validateProductForm(formData);
    if (!valid) {
      alert(message);
      return;
    }
    onSubmit(formData);
    if (!editingProduct) reset();
  };

  return (
    <form onSubmit={handleSubmit} className="pf-wrap">
      <ProductStatusSection editingProduct={editingProduct} />

      <BasicInfoSection formData={formData} handle={handle} />

      <PricingSection formData={formData} handle={handle} setField={setField} />

      <ImageUploadSection
        images={formData.images}
        dragging={dragging}
        setDragging={setDragging}
        addImages={addImages}
        removeImage={removeImage}
      />

      <SpecificationSection
        formData={formData}
        handle={handle}
        handleSpec={handleSpec}
        addSpec={addSpec}
        removeSpec={removeSpec}
        tagInput={tagInput}
        setTagInput={setTagInput}
        addTag={addTag}
        removeTag={removeTag}
      />

      <ShippingSection
        formData={formData}
        handle={handle}
        setField={setField}
      />

      <QualityScore formData={formData} />

      <div className="pf-footer-bar">
        <button type="button" className="pf-btn-secondary">
          Save as draft
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button type="button" className="pf-btn-secondary">
            Preview listing
          </button>
          <button type="submit" disabled={loading} className="pf-btn-primary">
            {loading
              ? "⏳ Saving..."
              : editingProduct
                ? "✅ Update product"
                : "🚀 Publish product"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
