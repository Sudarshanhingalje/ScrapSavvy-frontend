// src/features/customer/cart/components/myOrders/OrderItem.jsx

const OrderItem = ({ item }) => {
  const price = item.priceAtPurchase ?? 0;

  return (
    <div className="item-row">
      <div className="item-img">
        <img
          src={`http://localhost:8080${item.productImage}`}
          alt={item.productName}
        />
      </div>

      <div className="item-details">
        <div className="item-name">{item.productName}</div>

        <div className="item-sub">
          Seller ID: #{item.sellerUserId}
          <span className="seller-badge">ID #{item.productId}</span>
        </div>

        <div className="item-price-row">
          <span className="item-price">₹ {price}</span>

          <span className="item-qty">Qty: {item.quantity}</span>

          <span className="item-total">
            Item Total: ₹ {price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
