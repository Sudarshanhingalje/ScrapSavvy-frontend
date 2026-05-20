// src/features/customer/cart/components/myOrders/OrderSkeleton.jsx

const SkeletonBox = ({ w, h, radius = 4 }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius,
      background: "#e0e0e0",
      animation: "pulse 1.5s ease-in-out infinite",
    }}
  />
);

const OrderSkeleton = () => (
  <div className="order-card">
    <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    <div className="order-top" style={{ gap: 12 }}>
      <div style={{ display: "flex", gap: 20 }}>
        <SkeletonBox w={80} h={18} />
        <SkeletonBox w={100} h={18} />
        <SkeletonBox w={80} h={18} />
      </div>
      <SkeletonBox w={90} h={26} radius={20} />
    </div>
    {[1, 2].map((i) => (
      <div key={i} className="item-row">
        <SkeletonBox w={80} h={80} />
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
        >
          <SkeletonBox w="70%" h={14} />
          <SkeletonBox w="40%" h={12} />
          <SkeletonBox w="50%" h={14} />
        </div>
      </div>
    ))}
    <div className="order-footer">
      <SkeletonBox w={100} h={34} />
      <SkeletonBox w={100} h={34} />
    </div>
  </div>
);

export default OrderSkeleton;
