// ============================
// DELIVERY STATUS CONSTANTS
// ============================

export const DELIVERY_STATUS = {
  PICKUP_PENDING: "PICKUP_PENDING",
  PICKED_UP: "PICKED_UP",
  IN_TRANSIT: "IN_TRANSIT",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  FAILED: "FAILED",
  RETURNED: "RETURNED",
};

// ============================
// STATUS COLOR MAP
// ============================

export const DELIVERY_STATUS_COLORS = {
  PICKUP_PENDING: { bg: "#fef9c3", color: "#854d0e", border: "#fde047" },
  PICKED_UP: { bg: "#dbeafe", color: "#1e40af", border: "#93c5fd" },
  IN_TRANSIT: { bg: "#e0f2fe", color: "#075985", border: "#38bdf8" },
  OUT_FOR_DELIVERY: { bg: "#ffedd5", color: "#9a3412", border: "#fb923c" },
  DELIVERED: { bg: "#dcfce7", color: "#14532d", border: "#4ade80" },
  FAILED: { bg: "#fee2e2", color: "#7f1d1d", border: "#f87171" },
  RETURNED: { bg: "#f3e8ff", color: "#581c87", border: "#c084fc" },
};

// ============================
// STATUS LABEL MAP
// ============================

export const DELIVERY_STATUS_LABELS = {
  PICKUP_PENDING: "Pickup Pending",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out For Delivery",
  DELIVERED: "Delivered",
  FAILED: "Failed",
  RETURNED: "Returned",
};

// ============================
// TIMELINE STEPS (in order)
// ============================

export const TIMELINE_STEPS = [
  { key: "PICKUP_PENDING", label: "Pickup Pending", icon: "📦" },
  { key: "PICKED_UP", label: "Picked Up", icon: "🚚" },
  { key: "IN_TRANSIT", label: "In Transit", icon: "🛣️" },
  { key: "OUT_FOR_DELIVERY", label: "Out For Delivery", icon: "🏃" },
  { key: "DELIVERED", label: "Delivered", icon: "✅" },
];

// ============================
// GET STEP INDEX
// ============================

export const getStepIndex = (status) => {
  return TIMELINE_STEPS.findIndex((s) => s.key === status);
};

// ─────────────────────────────────────────────────────────────
// DRIVER CONSTANTS
// 7 Bike drivers + 3 Car drivers = 10 total
// ─────────────────────────────────────────────────────────────

export const DRIVERS = [
  // ── BIKE DRIVERS ─────────────────────────────────────────
  {
    id: 1,
    name: "Ramesh Patil",
    phone: "9823041567",
    vehicleType: "Bike",
    vehicleNumber: "MH-09-AB-4321",
    vehicleBrand: "Honda Activa",
  },
  {
    id: 2,
    name: "Suresh Kamble",
    phone: "9765432190",
    vehicleType: "Bike",
    vehicleNumber: "MH-09-CD-7865",
    vehicleBrand: "TVS Jupiter",
  },
  {
    id: 3,
    name: "Mahesh Jadhav",
    phone: "9881234560",
    vehicleType: "Bike",
    vehicleNumber: "MH-09-EF-1122",
    vehicleBrand: "Bajaj Pulsar",
  },
  {
    id: 4,
    name: "Ganesh Shinde",
    phone: "9970112345",
    vehicleType: "Bike",
    vehicleNumber: "MH-09-GH-3344",
    vehicleBrand: "Hero Splendor",
  },
  {
    id: 5,
    name: "Anil Bhosale",
    phone: "9823765401",
    vehicleType: "Bike",
    vehicleNumber: "MH-09-IJ-5566",
    vehicleBrand: "Royal Enfield",
  },
  {
    id: 6,
    name: "Vijay Mane",
    phone: "9765001234",
    vehicleType: "Bike",
    vehicleNumber: "MH-09-KL-7788",
    vehicleBrand: "Yamaha FZ",
  },
  {
    id: 7,
    name: "Rajesh Salunkhe",
    phone: "9890456123",
    vehicleType: "Bike",
    vehicleNumber: "MH-09-MN-9900",
    vehicleBrand: "Honda Shine",
  },

  // ── CAR DRIVERS ──────────────────────────────────────────
  {
    id: 8,
    name: "Santosh Desai",
    phone: "9823190045",
    vehicleType: "Car",
    vehicleNumber: "MH-09-OP-2211",
    vehicleBrand: "Maruti Swift",
  },
  {
    id: 9,
    name: "Prakash Kulkarni",
    phone: "9765876543",
    vehicleType: "Car",
    vehicleNumber: "MH-09-QR-4433",
    vehicleBrand: "Hyundai i20",
  },
  {
    id: 10,
    name: "Deepak Gaikwad",
    phone: "9890123789",
    vehicleType: "Car",
    vehicleNumber: "MH-09-ST-6655",
    vehicleBrand: "Tata Nexon",
  },
];

// ─────────────────────────────────────────────────────────────
// DELIVERY PARTNERS
// ─────────────────────────────────────────────────────────────

export const DELIVERY_PARTNERS = [
  { id: 1, name: "ScrapSavvy Own Delivery", icon: "🟢" },
  { id: 2, name: "Delhivery", icon: "📦" },
];
